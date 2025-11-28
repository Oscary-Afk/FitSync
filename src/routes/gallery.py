from flask import Blueprint, request, jsonify
from keys import supabase
import os
import traceback
from werkzeug.utils import secure_filename

gallery = Blueprint('gallery', __name__)

UPLOAD_FOLDER = "static/galleryImages"  # carpeta donde guardar
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

# GET /gallery  -> list
@gallery.route('/', methods=['GET'])
def list_images():
    try:
        resp = supabase.table('galery_gym') \
            .select('id, titulo, ruta_imagen, fecha_subida') \
            .order('titulo') \
            .execute()

        #print("Supabase data:", getattr(resp, "data", None), flush=True)
        #print("Supabase error:", getattr(resp, "error", None), flush=True)

        if hasattr(resp, "error") and resp.error:
            return jsonify({"message": "Supabase query failed", "error": str(resp.error)}), 500

        rows = getattr(resp, "data", []) or []
        return jsonify(rows), 200

    except Exception as e:
        print("GALLERY LIST ERROR:", e, flush=True)
        traceback.print_exc()
        return jsonify({"message": "Internal Server Error", "error": str(e)}), 500


# POST /gallery -> create
@gallery.route('/', methods=['POST'])
def create_image():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["file"]
    titulo = request.form.get("titulo", "")

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(path)

        # Crear la imagen en la carpeta public
        ruta_db = f"{UPLOAD_FOLDER}/{filename}"


        # Guarda en Supabase o tu DB
        resp = supabase.table("galery_gym").insert({
            "titulo": titulo,
            "ruta_imagen": ruta_db,
        }).execute()

        return jsonify(resp.data[0]), 201

    return jsonify({"error": "Invalid file"}), 400

# PUT /gallery/<id> -> update
@gallery.route('/<int:image_id>', methods=['PUT'])
def update_image(image_id):
    try:
        if 'file' not in request.files:
            return jsonify({"message": "No file provided"}), 400

        file = request.files['file']
        titulo = request.form.get('titulo', '')

        # 1. Buscar la ruta anterior en la BD
        old_resp = supabase.table('galery_gym').select('ruta_imagen').eq('id', image_id).execute()
        old_rows = getattr(old_resp, 'data', None) or []
        old_path = old_rows[0]['ruta_imagen'] if old_rows else None

        # 2. Si existe archivo anterior, eliminarlo
        if old_path and os.path.exists(old_path):
            os.remove(old_path)

        # 3. Guardar el nuevo archivo
        filename = secure_filename(file.filename)
        path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(path)

        ruta_db = f"{UPLOAD_FOLDER}/{filename}"

        # 4. Actualizar registro en la BD
        resp = supabase.table('galery_gym').update({
            "titulo": titulo,
            "ruta_imagen": ruta_db
        }).eq('id', image_id).execute()

        rows = getattr(resp, 'data', None) or []
        if not rows:
            return jsonify({"message": "Imagen no encontrada"}), 404

        return jsonify(rows[0]), 200

    except Exception as e:
        print("GALLERY UPDATE ERROR:", e, flush=True)
        traceback.print_exc()
        return jsonify({"message": "Internal Server Error"}), 500


# DELETE /gallery/<id> -> delete
@gallery.route('/<int:image_id>', methods=['DELETE'])
def delete_image(image_id):
    try:
        # 1. Buscar la ruta de la imagen antes de eliminar
        old_resp = supabase.table('galery_gym').select('ruta_imagen').eq('id', image_id).execute()
        old_rows = getattr(old_resp, 'data', None) or []
        old_path = old_rows[0]['ruta_imagen'] if old_rows else None

        # 2. Eliminar el registro en la BD
        resp = supabase.table('galery_gym').delete().eq('id', image_id).execute()
        rows = getattr(resp, 'data', None) or []
        if not rows:
            return jsonify({"message": "Imagen no encontrada"}), 404

        # 3. Eliminar el archivo físico si existe
        if old_path and os.path.exists(old_path):
            os.remove(old_path)

        return jsonify({"message": "Imagen eliminada"}), 200
    except Exception as e:
        print("GALLERY DELETE ERROR:", e, flush=True)
        traceback.print_exc()
        return jsonify({"message": "Internal Server Error"}), 500

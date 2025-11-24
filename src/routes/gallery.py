from flask import Blueprint, request, jsonify
from keys import supabase
import traceback

gallery = Blueprint('gallery', __name__)

# GET /gallery  -> list
@gallery.route('/', methods=['GET'])
def list_images():
    try:
        resp = supabase.table('galery_gym') \
            .select('id, titulo, ruta_imagen, fecha_subida') \
            .order('fecha_subida', desc=True) \
            .execute()

        print("Supabase data:", resp.data, flush=True)
        print("Supabase error:", resp.error, flush=True)

        if resp.error:
            return jsonify({"message": "Supabase query failed", "error": str(resp.error)}), 500

        rows = resp.data or []
        return jsonify(rows), 200

    except Exception as e:
        print("GALLERY LIST ERROR:", e, flush=True)
        traceback.print_exc()
        return jsonify({"message": "Internal Server Error", "error": str(e)}), 500

# POST /gallery -> create
@gallery.route('/', methods=['POST'])
def create_image():
    try:
        data = request.get_json(silent=True) or {}
        titulo = data.get('titulo')
        ruta = data.get('ruta_imagen')
        if not titulo or not ruta:
            return jsonify({"message": "titulo y ruta_imagen son requeridos"}), 400

        payload = {
            "titulo": titulo,
            "ruta_imagen": ruta
            # fecha_subida puede ser manejada por DB si tienes default
        }
        resp = supabase.table('galery_gym').insert(payload).execute()
        rows = getattr(resp, 'data', None) or (resp.get('data') if hasattr(resp, 'get') else []) or []
        if not rows:
            return jsonify({"message": "No se creó la imagen"}), 500
        created = rows[0]
        return jsonify(created), 201
    except Exception as e:
        print("GALLERY CREATE ERROR:", e, flush=True)
        traceback.print_exc()
        return jsonify({"message": "Internal Server Error"}), 500

# PUT /gallery/<id> -> update
@gallery.route('/<int:image_id>', methods=['PUT'])
def update_image(image_id):
    try:
        data = request.get_json(silent=True) or {}
        update_payload = {}
        if 'titulo' in data:
            update_payload['titulo'] = data['titulo']
        if 'ruta_imagen' in data:
            update_payload['ruta_imagen'] = data['ruta_imagen']
        if not update_payload:
            return jsonify({"message": "Nada que actualizar"}), 400

        resp = supabase.table('galery_gym').update(update_payload).eq('id', image_id).execute()
        rows = getattr(resp, 'data', None) or (resp.get('data') if hasattr(resp, 'get') else []) or []
        if not rows:
            return jsonify({"message": "Imagen no encontrada o no actualizada"}), 404
        return jsonify(rows[0]), 200
    except Exception as e:
        print("GALLERY UPDATE ERROR:", e, flush=True)
        traceback.print_exc()
        return jsonify({"message": "Internal Server Error"}), 500

# DELETE /gallery/<id> -> delete
@gallery.route('/<int:image_id>', methods=['DELETE'])
def delete_image(image_id):
    try:
        resp = supabase.table('galery_gym').delete().eq('id', image_id).execute()
        # resp.data normalmente contiene filas eliminadas
        rows = getattr(resp, 'data', None) or (resp.get('data') if hasattr(resp, 'get') else []) or []
        if not rows:
            return jsonify({"message": "Imagen no encontrada"}), 404
        return jsonify({"message": "Imagen eliminada"}), 200
    except Exception as e:
        print("GALLERY DELETE ERROR:", e, flush=True)
        traceback.print_exc()
        return jsonify({"message": "Internal Server Error"}), 500
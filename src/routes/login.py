from flask import jsonify, request, Blueprint
from keys import supabase

from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity, create_access_token

from werkzeug.security import check_password_hash

login = Blueprint('login', __name__)

@login.route('/login', methods=['POST'])
def Login():
    data = request.get_json()
    email = data.get('email')
    password_plaintext = data.get('password_encrypted')

    try:
        # 1. Buscar usuario por email
        response = supabase.table('User').select('id_user, email, password_encrypted').eq('email', email).execute()
        user = response.data

        if not user:
            return jsonify({"message": "Invalid email or password"}), 401

        user = user[0]
        stored_hash = user.get('password_encrypted')

        # 2. Verificar contraseña
        if not check_password_hash(stored_hash, password_plaintext):
            return jsonify({"message": "Invalid email or password"}), 401
        
        # 3. ✅ OBTENER EL ID_USER 
        user_id = user.get('id_user')
        
        if user_id is None:
            return jsonify({"message": "Internal error: User ID not found"}), 500
            
        # 4. ✅ CONVERTIR A INTEGER Y DEBUG
        print(f"🔐 ANTES DE CONVERSIÓN: id_user = {user_id}, type = {type(user_id)}")
        
        user_id = int(user_id)  # Convertir a integer
        print(f"✅ DESPUÉS DE CONVERSIÓN: id_user = {user_id}, type = {type(user_id)}")
        
        # 5. ✅ CREAR TOKEN CON ID NUMÉRICO - ¡ESTA LÍNEA ES CLAVE!
        access_token = create_access_token(identity=user_id)
        
        print(f"🎉 TOKEN CREADO CON identity (id_user): {user_id}")
        
        return jsonify({
            "message": "Login successful", 
            "user": {
                "id_user": user_id,
                "email": email
            },
            "access_token": access_token 
        }), 200

    except Exception as e:
        print(f"❌ ERROR DE LOGIN: {e}")
        return jsonify({"message": "Internal Server Error"}), 500
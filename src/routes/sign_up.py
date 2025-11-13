import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from flask import Blueprint, jsonify, request
from dotenv import load_dotenv
from keys import supabase

sign_up = Blueprint('sign_up', __name__)

load_dotenv()

@sign_up.route('/', methods=['POST'])
def signnup():
    try:
        data = request.get_json()

        name = data.get("name")
        last_name = data.get("last_name")
        email = data.get("email")
        password_encrypted = data.get("password_encrypted")
        number = data.get("number")
        # id_rol = 1

        # 1. Verificación de campos vacíos
        if not all([name, last_name, email, password_encrypted, number]):
            return jsonify({"message": "Faltan campos por llenar"}), 400
        
        # 2. Verificación de unicidad (Preventiva, puede fallar por RLS)
        check_response = supabase.table("User").select("email, number").or_(
            f"email.eq.{email},number.eq.{number}"
        ).limit(1).execute()

        existing_users = check_response.data

        if existing_users:
            existing_user = existing_users[0]
            
            # Comprobamos exactamente qué campo existe
            if existing_user.get('email') == email:
                return jsonify({"message": "El email ya está registrado"}), 409
            # Nota: Los datos de Supabase deben devolver el número como string o el tipo original
            if str(existing_user.get('number')) == str(number):
                return jsonify({"message": "El número de teléfono ya está registrado"}), 409

        # 3. Inserción
        user_data = {
            "name": name,
            "last_name": last_name,
            "email": email,
            "password_encrypted": password_encrypted,
            "number": number
        }

        response = supabase.table("User").insert(user_data).execute()

        if response.data:
            return jsonify({"message": "Usuario creado exitosamente", "user": response.data[0]}), 201
        else:
            return jsonify({"message": "error al crear usuario"}), 500
        
    except Exception as e:
        # 4. Manejo de Errores de Supabase (Respaldo robusto si la verificación 2 falla por RLS)
        error_str = str(e)
        
        if "23505" in error_str:
            # Captura violación de unicidad para EMAIL
            # Buscamos 'Key (email)=' O el nombre de restricción para email (generalmente lowercase)
            if "Key (email)=" in error_str or "user_email_key" in error_str.lower():
                return jsonify({"message": "El email ya está registrado"}), 409
            
            # Captura violación de unicidad para NUMBER (¡CORRECCIÓN AQUÍ!)
            # Buscamos 'Key (number)=' O el nombre de restricción exacto que nos dio el error: "User_number_key"
            if "Key (number)=" in error_str or "User_number_key" in error_str:
                return jsonify({"message": "El número de teléfono ya está registrado"}), 409
            
        # Manejo de cualquier otro error
        print(f"ERROR al registrar usuario: {e}")
        return jsonify({"message": str(e)}), 500
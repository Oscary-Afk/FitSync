import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from flask import Blueprint, jsonify, request
from dotenv import load_dotenv
# from supabase import create_client, Client
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

        if not name or not last_name or not email or not password_encrypted or not number:
            return jsonify("message: Faltan campos por llenar"), 400
        
        response = supabase.table("User").insert({
                "name": name,
                "last_name": last_name,
                "email": email,
                "password_encrypted": password_encrypted,
                "number":number
                # "id_rol": id_rol
        }).execute()

        if response.data:
            return jsonify({"message": "Usuario creado exitosamente", "user": response.data[0]}), 201
        else:
            return jsonify({"message": "error al crear usuario"}), 500
        
    except Exception as e:
        print(f"ERROR al registrar usuario: {e}")
        return jsonify({"message": str(e)}), 500
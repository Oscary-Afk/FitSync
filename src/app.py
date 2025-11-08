from flask import Flask, jsonify, request
from flask_cors import CORS
from routes.Bp_modify import Bp_modify
from routes.sign_up import sign_up
from routes.delete_user import delete_user
from routes.get_users import get_users
from keys import supabase
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

app.register_blueprint(Bp_modify, url_prefix='/api/user')
app.register_blueprint(sign_up, url_prefix='/signup')
app.register_blueprint(delete_user, url_prefix='/user/delete')
app.register_blueprint(get_users, url_prefix= '/user')

@app.route('/api/users', methods=['GET'])
def get_all_users():
    try:
        response = supabase.table('User').select('*').execute()
        user_data = response.data
        
        if user_data:
            return jsonify(user_data), 200
        else:
            return jsonify({"message": "No users found"}), 404

    except Exception as e:
        print(f"ERROR DE SUPABASE: {e}")
        return jsonify({"message": "Internal Server Error"}), 500


# @app.route('/signup', methods=['POST'])
# def signnup():
#     try:
#         data = request.get_json()

#         name = data.get("name")
#         last_name = data.get("last_name")
#         email = data.get("email")
#         password_encrypted = data.get("password_encrypted")
#         number = data.get("number")
#         # id_rol = 1

#         if not name or not last_name or not email or not password_encrypted or not number:
#             return jsonify("message: Faltan campos por llenar"), 400
        
#         response = supabase.table("User").insert({
#                 "name": name,
#                 "last_name": last_name,
#                 "email": email,
#                 "password_encrypted": password_encrypted,
#                 "number":number
#                 # "id_rol": id_rol
#         }).execute()

#         if response.data:
#             return jsonify({"message": "Usuario creado exitosamente", "user": response.data[0]}), 201
#         else:
#             return jsonify({"message": "error al crear usuario"}), 500
        
#     except Exception as e:
#         print(f"ERROR al registrar usuario: {e}")
#         return jsonify({"message": str(e)}), 500
if __name__ == '__main__':
    app.run(debug=True)
from flask import jsonify, request, Blueprint
from keys import supabase


login = Blueprint('login', __name__)


@login.route('/login', methods=['POST'])
def Login():
    data = request.get_json()

    email = data.get('email')
    password = data.get('password_encrypted')

    try:
        response = supabase.table('User').select('*').eq('email', email).eq('password_encrypted', password).execute()
        user = response.data

        if user:
            return jsonify({"message": "Login successful", "user": user[0]}), 200
        else:
            return jsonify({"message": "Invalid email or password"}), 401

    except Exception as e:
        print(f"ERROR DE SUPABASE: {e}")
        return jsonify({"message": "Internal Server Error"}), 500

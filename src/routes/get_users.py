from flask import jsonify, request, Blueprint
from keys import supabase

get_users = Blueprint('get_users', __name__)

@get_users.route('/<int:user_id>', methods=['GET'])
def get_single_user(user_id):
    try:
        response = supabase.table('User').select('*').eq('id_user', user_id).execute()
        
        user_data = response.data
        
        if user_data:
            return jsonify(user_data[0]), 200
        else:
            return jsonify({"message": f"User with ID {user_id} not found"}), 404

    except Exception as e:
        print(f"ERROR DE SUPABASE: {e}")
        return jsonify({"message": "Internal Server Error"}), 500
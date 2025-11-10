from flask import jsonify, request, Blueprint
from keys import supabase

delete_user = Blueprint('delete_user', __name__)


@delete_user.route('/<int:user_id>', methods=['DELETE'])
def deleteUser(user_id):
    try:
        response = supabase.table('User').delete().eq('id_user', user_id).execute()
        
        if response.data:
            return jsonify({"message": "User deleted successfully"}), 200
        else:
            return jsonify({"message": "User not found"}), 404

    except Exception as e:
        print(f"ERROR DE SUPABASE: {e}")
        return jsonify({"message": "Internal Server Error"}), 500
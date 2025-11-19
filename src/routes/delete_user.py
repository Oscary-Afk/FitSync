from flask import jsonify, request, Blueprint
from keys import supabase

from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity

delete_user = Blueprint('delete_user', __name__)


@delete_user.route('/<int:user_id>', methods=['DELETE'])
@jwt_required()
def deleteUser(user_id):
    current_user_identity = get_jwt_identity()
    print(f"Usuario autenticado: {current_user_identity}")
    try:
        response = supabase.table('User').delete().eq('id_user', user_id).execute()
        
        if response.data:
            return jsonify({"message": "User deleted successfully"}), 200
        else:
            return jsonify({"message": "User not found"}), 404

    except Exception as e:
        print(f"ERROR DE SUPABASE: {e}")
        return jsonify({"message": "Internal Server Error"}), 500
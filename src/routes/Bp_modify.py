from flask import jsonify, request, Blueprint
from keys import supabase

Bp_modify = Blueprint('Bp_modify', __name__)


@Bp_modify.route('/<int:user_id>', methods=['GET'])
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


@Bp_modify.route('/update/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    try:
        data = request.get_json()  
        allow_update = ['number', 'password_encrypted']

        check_user = supabase.table("User").select("id_user").eq("id_user", user_id).limit(1).execute()

        if not check_user.data:
            return jsonify({"message": f"User with ID {user_id} not found"}), 404

        update_data = {
            key: value 
            for key, value in data.items() 
            if key in allow_update
        }

        if not update_data:
            return jsonify({"message": "No valid fields to update (only 'number' and 'password_encrypted' are allowed)"}), 400
        
        response = supabase.table("User").update(update_data).eq("id_user", user_id).execute()

        return jsonify({"message": "User updated successfully"}), 200
    
    except Exception as e:
        print(f"ERROR DE SUPABASE: {e}")
        return jsonify({"message": "Internal Server Error"}), 500


@Bp_modify.route('/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    try:
        response = supabase.table('User').delete().eq('id_user', user_id).execute()
        
        if response.data:
            return jsonify({"message": "User deleted successfully"}), 200
        else:
            return jsonify({"message": "User not found"}), 404

    except Exception as e:
        print(f"ERROR DE SUPABASE: {e}")
        return jsonify({"message": "Internal Server Error"}), 500
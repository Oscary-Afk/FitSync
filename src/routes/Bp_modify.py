from flask import jsonify, request, Blueprint
from keys import supabase

Bp_modify = Blueprint('Bp_modify', __name__)

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


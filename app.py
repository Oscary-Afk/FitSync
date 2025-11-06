from flask import Flask, jsonify, request, Blueprint
from flask_cors import CORS
from routes.Bp_modify import Bp_modify
from keys import supabase

app = Flask(__name__)

CORS(app)

app.register_blueprint(Bp_modify, url_prefix='/api/user')


@app.route('/api/user/<int:user_id>', methods=['GET'])
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



if __name__ == '__main__':
    app.run(debug=True)
    
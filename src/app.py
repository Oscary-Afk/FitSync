from flask import Flask, jsonify
from flask_cors import CORS
from routes.Bp_modify import Bp_modify
from keys import supabase
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

app.register_blueprint(Bp_modify, url_prefix='/api/user')

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

if __name__ == '__main__':
    app.run(debug=True)
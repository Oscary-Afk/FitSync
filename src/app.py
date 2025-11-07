from flask import Flask, jsonify
from flask_cors import CORS
from routes.Bp_modify import Bp_modify
from keys import supabase
from dotenv import load_dotenv
from supabase import create_client, Client
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_KEY')
if not SUPABASE_URL or not SUPABASE_KEY:
    raise RuntimeError('Set url and key environment variables')

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

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
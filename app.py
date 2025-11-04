from flask import Flask, jsonify
from supabase import create_client, Client
from dotenv import load_dotenv
import os

load_dotenv() 

app = Flask(__name__)

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY") 
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

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
    
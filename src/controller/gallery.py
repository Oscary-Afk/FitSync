from flask import Flask, jsonify
from flask_cors import CORS
import os
from supabase import create_client, Client

app = Flask(__name__)
CORS(app)

SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_ANON_KEY')
if not SUPABASE_URL or not SUPABASE_KEY:
    raise RuntimeError('Set url and key environment variables')

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

@app.route('/api/gallery')
def gallery_api():
    resp = supabase.table('gallery_images').select('id, titulo, ruta_imagen, fecha_subida').order('id', ascending=True).execute()
    rows = getattr(resp, 'data', None) or resp.get('data', [])
    return jsonify(rows)

if __name__ == "__main__":
    app.run(debug=True)
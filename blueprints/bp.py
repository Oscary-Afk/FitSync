from flask import Flask
from flask_cors import CORS
from supabase import create_client, Client
import os

class SupabaseConfig:
    def __init__(self):
        self.url = os.environ.get('SUPABASE_URL')
        self.key = os.environ.get('SUPABASE_KEY')
        self.client: Client = create_client(self.url, self.key)


supabase = SupabaseConfig()

def create_app():
    app = Flask(__name__)
    
  
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret-key')
 
    CORS(app, origins=["http://localhost:5173"])
    
 
    from app.routes.users import users_bp

    app.register_blueprint(users_bp, url_prefix='/api/users')

    return app
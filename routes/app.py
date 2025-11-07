
"""

from flask import Blueprint, jsonify
from app.config import Config

users_bp = Blueprint('users', __name__)


@users_bp.route('/', methods=['GET'])
def get_all_users():
    try:
    
        response = Config.supabase.table('users').select('*').execute()
        
       
       return jsonify({
            "success": True,
            "data": response.data,
            "count": len(response.data)
        })
"""""
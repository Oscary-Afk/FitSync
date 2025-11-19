from flask import Blueprint, request, jsonify, session
from services.supabase_service import login_user_test 

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['GET'])
def login_get():
    """
    Endpoint de inicio de sesión NO SEGURO que utiliza GET.
    """
    
    email = request.args.get('email')
    password = request.args.get('password')

    if not email or not password:
        return jsonify({"message": "Faltan email o password"}), 400

    user = login_user_test(email, password)

    if user:
        session['user_id'] = user.get("id")
        session['user_email'] = user.get("email")
        
        return jsonify({
            "message": "Login exitoso",
            "is_authenticated": True,
            "user_id": user.get("id")
        }), 200
    else:
        return jsonify({
            "warning": "Usuario no registrado o credenciales incorrectas",
            "is_authenticated": False
        }), 401 

@auth_bp.route('/logout', methods=['GET'])
def logout():
    """
    Cierra la sesión del usuario limpiando las variables de sesión de Flask.
    """
    session.clear() 

    return jsonify({
        "message": "Sesión cerrada con éxito",
        "is_authenticated": False
    }), 200
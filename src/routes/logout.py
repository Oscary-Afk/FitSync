from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt

logout_bp = Blueprint('logout', __name__)

# almacenamiento simple en memoria (usar Redis/DB en producción)
REVOKED_TOKENS = set()

@logout_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    jti = get_jwt().get('jti')
    if not jti:
        return jsonify({"msg": "No token id"}), 400
    REVOKED_TOKENS.add(jti)
    return jsonify({"msg": "Logged out"}), 200

# exportar la estructura para que app la use (si necesitas)
def get_revoked_set():
    return REVOKED_TOKENS
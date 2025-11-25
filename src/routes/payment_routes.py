from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from keys import supabase 
from .paypal_client import PayPalClient
from paypalcheckoutsdk.orders import OrdersCreateRequest, OrdersCaptureRequest
from paypalhttp import HttpError
from datetime import datetime, date
from routes.payments import PaymentService


payment_service = PaymentService()



plans_bp = Blueprint('plans', __name__)
create_payment_bp = Blueprint('create_payment', __name__)
user_payments_bp = Blueprint('user_payments', __name__)
exchange_bp = Blueprint('exchange', __name__)
methods_bp = Blueprint('methods', __name__)


# --- ENDPOINTS PÚBLICOS ---

@plans_bp.route('/', methods=['GET'])
def get_plans():
    """Endpoint público: No requiere JWT"""
    try:
        response = supabase.table('subscription_plans').select('*').eq('active', True).execute()
        plans = response.data
        # Calculamos el precio en BSD al vuelo
        for plan in plans:
            plan['price_bsd'] = payment_service.calculate_bsd_price(plan['price_usd'])
        return jsonify(plans), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@exchange_bp.route('/', methods=['GET'])
def get_exchange_rate():
    """Endpoint público para ver la tasa del día"""
    return jsonify({
        'exchange_rate': payment_service.exchange_rate,
        'last_updated': 'Hoy'
    }), 200


@methods_bp.route('/', methods=['GET'])
def get_payment_methods():
    try:
        response = supabase.table('payment_methods').select('*').eq('active', True).execute()
        return jsonify(response.data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# --- ENDPOINTS PRIVADOS (Requieren JWT) ---

@create_payment_bp.route('/', methods=['POST'])
@jwt_required()
def create_order():
    current_user_id = get_jwt_identity()
    
    print(f"🔐 DEBUG JWT: '{current_user_id}' (type: {type(current_user_id)})")
    
    data = request.get_json()
    if not data:
        return jsonify({"error": "JSON body required"}), 400
        
    plan_id = data.get('plan_id')
    payment_method_id = data.get('payment_method_id')
    
    if not plan_id or not payment_method_id:
        return jsonify({"error": "Missing plan_id or payment_method_id"}), 400
    
    user_ip = request.remote_addr
    user_agent = request.headers.get('User-Agent')

    result, status = payment_service.create_payment_intent(
        user_id=current_user_id,
        plan_id=plan_id,
        payment_method_id=payment_method_id,
        ip_address=user_ip,
        user_agent=user_agent
    )
    return jsonify(result), status



@user_payments_bp.route('/history', methods=['GET'])
@jwt_required()
def get_my_payments():
    """
    Historial de pagos.
    SEGURIDAD: No pasamos user_id por URL. Usamos el del token.
    """
    current_user_id = get_jwt_identity()
    try:
        response = supabase.table('payments')\
            .select('*, subscription_plans(name, price_usd), payment_methods(name)')\
            .eq('id_user', current_user_id)\
            .order('created_at', desc=True)\
            .execute()
        
        return jsonify(response.data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
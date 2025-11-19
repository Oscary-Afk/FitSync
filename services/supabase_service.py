# FitSync/services/supabase_service.py

import os
from dotenv import load_dotenv
from supabase import create_client, Client
# Ya que la importación de gotrue.errors falla (image_174601.png, image_174946.png), 
# usamos el manejo genérico de excepciones (Exception as e)

# Cargar variables de entorno del archivo .env
load_dotenv()

# --- Configuración e Inicialización de Supabase ---
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    # Esto ya fue corregido en app.py, pero se mantiene como buena práctica
    raise EnvironmentError("Las variables SUPABASE_URL o SUPABASE_KEY no están configuradas en .env")

# Inicializar el cliente Supabase
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def login_user_test(email: str, password: str):
    
    try:
        # Llama al servicio de autenticación de Supabase
        response = supabase.auth.sign_in_with_password(
            {
                "email": email,
                "password": password
            }
        )
        
        # Devuelve el objeto de usuario (maneja el formato de respuesta del cliente supabase-py)
        if isinstance(response, dict):
            return response.get("user")
        return getattr(response, "user", None)

    except Exception as e:
        # --- LÍNEA DE DEPURACIÓN CRUCIAL ---
        # Esto imprimirá el error exacto de Supabase (ej: "Invalid login credentials") en tu terminal
        print(f"DEBUG SUPABASE ERROR: {e}") 
        # ------------------------------------
        return None
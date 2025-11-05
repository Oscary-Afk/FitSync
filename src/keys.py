from supabase import create_client, Client
from dotenv import load_dotenv
import os

# Asegura que se cargue el archivo .env desde el mismo directorio del proyecto principal
env_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path=env_path)

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("❌ ERROR: SUPABASE_URL or SUPABASE_KEY not found. Check your .env file.")

# Crear cliente global
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

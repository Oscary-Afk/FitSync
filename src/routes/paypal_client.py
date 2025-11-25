import os
try:
    from paypalcheckoutsdk.core import PayPalHttpClient, SandboxEnvironment
except Exception:
    PayPalHttpClient = None
    SandboxEnvironment = None


class PayPalClient:
    """Simple PayPal client wrapper.

    Uses environment variables `PAYPAL_CLIENT_ID` and `PAYPAL_CLIENT_SECRET`.
    If the real PayPal SDK isn't available or the variables are missing,
    this creates a stub `client` that raises at runtime so the project
    still imports cleanly in the editor.
    """

    def __init__(self):
        client_id = os.environ.get('PAYPAL_CLIENT_ID')
        client_secret = os.environ.get('PAYPAL_CLIENT_SECRET')

        if PayPalHttpClient and SandboxEnvironment and client_id and client_secret:
            env = SandboxEnvironment(client_id=client_id, client_secret=client_secret)
            self.client = PayPalHttpClient(env)
        else:
            # Minimal stub client to avoid import-time errors in the editor.
            class _StubClient:
                def execute(self, request):
                    raise RuntimeError('PayPal SDK not configured. Set PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET to use PayPal features.')

            self.client = _StubClient()

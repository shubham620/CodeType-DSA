from flask import Flask
from flask_cors import CORS
from api.routes import api_blueprint
from models.database import get_db

app = Flask(__name__)

# IMPORTANT: This allows your friend's Next.js frontend to talk to this backend
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# Register the routes we will define in api/routes.py
app.register_blueprint(api_blueprint, url_prefix='/api')

@app.route('/')
def index():
    return {"message": "CodeType Backend is running!"}

if __name__ == '__main__':
    # Initialize DB connection on startup to check for errors
    get_db()
    app.run(debug=True, port=5000)

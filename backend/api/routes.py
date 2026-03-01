from flask import Blueprint, request, jsonify
from models.database import get_db

api_blueprint = Blueprint('api', __name__)

@api_blueprint.route('/submit-session', methods=['POST'])
def submit_session():
    data = request.json
    db = get_db()
    
    if not db:
        return jsonify({"error": "Database connection failed"}), 500

    # Basic data we expect from the frontend TypingInterface
    session_results = {
        "user_id": data.get("user_id"),
        "wpm": data.get("wpm"),
        "accuracy": data.get("accuracy"),
        "errors": data.get("errors"),  # List of keys they missed
        "language": data.get("language"),
        "topic": data.get("topic")      # e.g., "Arrays"
    }

    # Save to MongoDB
    db.sessions.insert_one(session_results)

    return jsonify({
        "status": "success",
        "message": "Session saved! AI analysis is pending.",
        "received": session_results
    }), 201

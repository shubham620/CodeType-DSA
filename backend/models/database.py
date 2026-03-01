import os
from pymongo import MongoClient
from dotenv import load_dotenv

# Load variables from .env
load_dotenv()

def get_db():
    """Returns the MongoDB database object."""
    try:
        # Get URI from your .env file
        mongo_uri = os.getenv("MONGO_URI", "mongodb://localhost:27017")
        client = MongoClient(mongo_uri)
        
        # This will create/use a database named 'codetype_db'
        db = client['codetype_db']
        print("Successfully connected to MongoDB")
        return db
    except Exception as e:
        print(f"Could not connect to MongoDB: {e}")
        return None

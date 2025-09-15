import os
import json
from flask import Flask, request, jsonify
# The correct import based on the documentation you provided
import vertexai
import re
from vertexai.generative_models import GenerativeModel
from flask_cors import CORS
from dotenv import load_dotenv # <-- Add this line

# You'll need to manually set these variables for local testing
# For now, replace the placeholder with your project ID

load_dotenv()
PROJECT_ID = os.getenv("GCLOUD_PROJECT_ID")
REGION = os.getenv("REGION")
app = Flask(__name__)
CORS(app)

# Initialize Vertex AI with your project ID and a region
# This is a key step shown in your documentation
vertexai.init(project=PROJECT_ID, location=REGION)
model = GenerativeModel(model_name="gemini-2.5-flash-lite")

@app.route('/api/generate_content', methods=['POST'])
def generate_content_endpoint():
    try:
        # Get the data from the frontend's request
        data = request.json
        product_type = data.get('product_type')
        keywords = data.get('keywords')

        # Your detailed AI prompt
        prompt_text = f"You are a skilled copywriter for handmade Indian crafts. Write a compelling product description and three Instagram captions with hashtags for a {product_type}. Keywords: {keywords}."
        
        # Call the Gemini model via Vertex AI
        response = model.generate_content(prompt_text)
        
        # Extract the generated text from the response
        # The response is a single block of text
        generated_text = response.text
        
        # You'll likely want to split the response into description and captions
        # This is a basic way to do it. You can improve this later.
        # --- Parsing Logic ---
        # Look for the 'Description:' and 'Captions:' labels
        description_match = re.search(r"Description:(.*?)Captions:", generated_text, re.DOTALL)
        captions_match = re.search(r"Captions:(.*)", generated_text, re.DOTALL)

        description = description_match.group(1).strip() if description_match else generated_text
        captions = captions_match.group(1).strip() if captions_match else ""

        # Return the AI-generated content as a JSON response
        return jsonify({
            "description": description,
            "captions": captions
        })

    except Exception as e:
        # Log the error and return a helpful message
        print(f"An error occurred: {e}")
        return jsonify({"error": "An error occurred during content generation."}), 500

if __name__ == '__main__':
    # Running in debug mode is great for development
    app.run(debug=True)
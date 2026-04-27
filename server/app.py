        # PYTHON TO HANDLE TAVILY API

import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from tavily import TavilyClient

load_dotenv()
app = Flask(__name__)
CORS(app)
tavily = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"))

@app.route('/map-signal', methods=['POST'])
def map_signal():
    """Webpage 1: Maps an informal skill to formal ISCO standards"""
    data = request.json
    user_skill = data.get('skill', '')
    
    query = (
        f"Map the informal skill '{user_skill}' to formal standards. "
        f"You MUST reply strictly in this format:\n"
        f"ISCO_TITLE: [Formal Job Title]\n"
        f"ISCO_CODE: [4-digit code]"
    )
    
    try:
        res = tavily.search(query=query, search_depth="basic")
        return jsonify({"status": "success", "data": res['results'][0]['content']})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@app.route('/radar-risk', methods=['POST'])
def radar_risk():
    data = request.json
    country, skills = data.get('country', ''), ", ".join(data.get('skills', []))
    
    query = f"What is the AI automation risk percentage for {skills} in {country}? Reply ONLY with a single number."
    try:
       
        res = tavily.search(query=query, search_depth="advanced")
        return jsonify({"status": "success", "data": res['results'][0]['content']})
    except: return jsonify({"status": "error"})


@app.route('/radar-impacts', methods=['POST'])
def radar_impacts():
    data = request.json
    country, skills = data.get('country', ''), ", ".join(data.get('skills', []))
    
    
    query = (
        f"Summarize the AI impact on {skills} in {country} into exactly two sentences. "
        f"Start your response with 'The integration of AI...' "
        f"Do not use lists, tables, or introductory fluff."
    )
    
    try:
        res = tavily.search(query=query, search_depth="advanced")
        return jsonify({"status": "success", "data": res['results'][0]['content']})
    except: return jsonify({"status": "error"})


@app.route('/radar-future', methods=['POST'])
def radar_future():
    data = request.json
    country, skills = data.get('country', ''), ", ".join(data.get('skills', []))
    
    query = (
        f"Predict the 10-year career future for {skills} in {country} in two sentences. "
        f"Start your response with 'By 2035...' "
        f"Provide a unified outlook, not separate points for each skill."
    )
    
    try:
        res = tavily.search(query=query, search_depth="advanced")
        return jsonify({"status": "success", "data": res['results'][0]['content']})
    except: return jsonify({"status": "error"})


if __name__ == '__main__':
    app.run(debug=True, port=5000)
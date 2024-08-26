from flask import Flask, jsonify
from flask_cors import CORS
import requests
from concurrent.futures import ThreadPoolExecutor, as_completed
import time


app = Flask(__name__)
cors = CORS(app, origins="*")

glb_slugs = set()
glb_valid_slugs = []
glb_auction_slugs = []
glb_auction_data = {"data": [], "time": 0}

def check_slug(slug):
    url = f'https://whiskyhunter.net/api/distillery_data/{slug}/'
    response = requests.get(url)
    if response.status_code == 200:
        return slug
    return None

@app.route("/distilleries", methods=["GET"])
def distilleries():
    api_url = "https://whiskyhunter.net/api/distilleries_info/"
    response = requests.get(api_url)

    if response.status_code == 200:
        data = response.json()
        return jsonify(data)
    else:
        return jsonify({'error': 'Failed to fetch API'}, response.status_code)

@app.route("/distilleries-info", methods=["GET"])
def distilleries_info():
    api_url = "https://whiskyhunter.net/api/distilleries_info/"
    response = requests.get(api_url)

    if response.status_code == 200:
        data = response.json()
        countries = {item["country"] for item in data}
        return jsonify({"countries":list(countries)})
    else:
        return jsonify({'error': 'Failed to fetch API'}, response.status_code)
    
@app.route("/slugs-info",methods=["GET"])
def slugs_info():
    api_url = "https://whiskyhunter.net/api/distilleries_info/"
    response = requests.get(api_url)
    global glb_slugs
    global glb_valid_slugs

    if response.status_code == 200:
        data = response.json()
        slugs = {item["slug"] for item in data}

        valid_slugs = []
        with ThreadPoolExecutor(max_workers=10) as executor:
            futures = []
            for slug in list(slugs):
                if slug not in glb_slugs:
                    glb_slugs.add(slug)
                    futures.append(executor.submit(check_slug, slug))
            for future in as_completed(futures):
                result = future.result()
                if result:
                    valid_slugs.append(result)
                    glb_valid_slugs.append(result)

        
        return jsonify({"slugs":glb_valid_slugs})
    else:
        return jsonify({'error': 'Failed to fetch API'}, response.status_code)
   

@app.route("/auctions-info", methods=["GET"])
def auctions_info():
    print("request received")
    api_url = "https://whiskyhunter.net/api/auctions_info"
    response = requests.get(api_url)

    if response.status_code == 200:
        print("api response obtained successfully")
        data = response.json()
        return jsonify({"auctions":data})
    else:
        return jsonify({'error': 'Failed to fetch API'}, response.status_code)
    
@app.route("/auctions-slugs", methods=["GET"])
def return_auction_slugs():
    global glb_auction_slugs
    if glb_auction_slugs == []:
        api_url = "https://whiskyhunter.net/api/auctions_data/"
        response = requests.get(api_url)
        glb_auction_slugs
        if response.status_code == 200:
            data = response.json()
            for item in data:
                if item["auction_slug"] not in glb_auction_slugs:
                    glb_auction_slugs.append(item["auction_slug"])
            return jsonify({"slugs":glb_auction_slugs})
        else:
            return jsonify({'error': 'Failed to fetch API'}, response.status_code)
    else:
        return jsonify({"slugs":glb_auction_slugs})
    

@app.route("/auctions-data/<string:slug>", methods=["GET"])
def slug_auction_data(slug):
    api_url = f"https://whiskyhunter.net/api/auction_data/{slug}/"
    response = requests.get(api_url)

    if response.status_code == 200:
        data = response.json()
        res = {"info": data}
        return jsonify(res)
    else:
        return jsonify({'error': 'Failed to fetch API'}, response.status_code)
    
@app.route("/auctions-data", methods=["GET"])
def auctions_data():
    global glb_auction_slugs
    global glb_auction_data
    if glb_auction_data["data"] != [] and (time.time() - glb_auction_data["time"] < 60*60):
        return jsonify({
            "auctions": glb_auction_data["data"]
        })
    api_url = "https://whiskyhunter.net/api/auctions_data/"
    response = requests.get(api_url)
    if response.status_code == 200:
        data = response.json()
        print(data)
        for item in data:
            if item["auction_slug"] not in glb_auction_slugs:
                glb_auction_slugs.append(item["auction_slug"])
        glb_auction_data["data"] = data
        glb_auction_data["time"] = time.time()
        return jsonify({"auctions":data})
    else:
        return jsonify({'error': 'Failed to fetch API'}, response.status_code)
    
@app.route("/slugs-info/<string:slug>", methods=["GET"])
def get_slugs_info(slug):
    api_url = f"https://whiskyhunter.net/api/distillery_data/{slug}/"
    response = requests.get(api_url)

    if response.status_code == 200:
        data = response.json()
        res = {"info": data}
        return jsonify(res)
    else:
        return jsonify({'error': 'Failed to fetch API'}, response.status_code)

@app.route("/distilleries-info/<string:country>", methods=["GET"])
def get_info_per_country(country):
    api_url = "https://whiskyhunter.net/api/distilleries_info/"
    response = requests.get(api_url)

    if response.status_code == 200:
        data = response.json()
        res = {"info": []}
        for item in data:
            if item["country"] == country:
                res["info"].append(item)
        return jsonify(res)
    else:
        return jsonify({'error': 'Failed to fetch API'}, response.status_code)


if __name__ == "__main__":
    app.run(host="0.0.0.0",port=5000, debug=True)
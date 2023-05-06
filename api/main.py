import os
import random
import numpy as np
from flask import Flask, jsonify, request, make_response
from values_set import values_set, probabilities_set

app = Flask(__name__)

def datui_randomImgID(request):
    input_value = int(request.args.get('input', 0))

    if input_value < 1 or input_value > 5:
        return "Invalid input. Must be between 1 and 5.", 400

    probabilities = probabilities_set[input_value]
    level = int(np.random.choice([1, 2, 3, 4, 5], p=probabilities))
    values = values_set[level]
    random_value = random.choice(values)

    response = make_response(jsonify({"randomValue": random_value}), 200)
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response





"""to deploy to google cloud functions, run the following command in the terminal:

cd api

gcloud auth login

gcloud config set project PROJECT_ID

gcloud functions deploy datui_randomImgID --runtime python311 --trigger-http --allow-unauthenticated --entry-point datui_randomImgID --region us-west1

"""
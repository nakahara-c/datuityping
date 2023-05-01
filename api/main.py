import os
import random
from flask import Flask, jsonify, request, make_response

app = Flask(__name__)

values_set = {
    1: [10, 20, 30],
    2: [40, 50, 60],
    3: [70, 80, 90],
    4: [100, 110, 120],
    5: [130, 140, 150]
}

def datui_randomImgID(request):
    input_value = int(request.args.get('input', 0))

    if input_value < 1 or input_value > 5:
        return "Invalid input. Must be between 1 and 5.", 400

    values = values_set[input_value]
    random_value = random.choice(values)

    response = make_response(jsonify({"randomValue": random_value}), 200)
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response

import sys
import joblib
import numpy as np
import json
import os

try:
    # Read input from args
    features = [float(arg) for arg in sys.argv[1:]]
    input_data = np.array([features])

    # Load model
    model_path = os.path.join(os.path.dirname(__file__), "decision_tree_model.pkl")
    model = joblib.load(model_path)

    # Predict
    prediction = model.predict(input_data)
    result = {"prediction": str(prediction[0])}
    print(json.dumps(result))
except Exception as e:
    print(json.dumps({"error": str(e)}))

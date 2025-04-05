from flask import Flask, render_template, request
app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    # dummy return for now
    return "Prediction logic pending"

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.form['user_query']
    # dummy chatbot logic
    return render_template('index.html', response="Chatbot says: Understood!")

if __name__ == "__main__":
    app.run(debug=True)

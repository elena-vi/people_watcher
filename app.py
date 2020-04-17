from flask import Flask
from flask import render_template

from worldmeter.population import PopulationMeter
app = Flask(__name__)


@app.route('/data')
def data():
    c = PopulationMeter()
    data = c.get_population_data()
    return data

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)

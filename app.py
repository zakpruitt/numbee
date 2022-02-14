import json
from datetime import date
from flask import Flask, render_template
from word_parser import letter_value, select_word, get_all_words, get_current_word

app = Flask(__name__)

@app.route("/")
def home():
    today = date.today()
    todayDate = today.strftime("%m/%d/%Y")
    return render_template("index.html", number=get_current_word()['value'], date=todayDate)


@app.route("/not-supported")
def not_supported():
    return render_template("not_supported.html")


@app.route("/word")
def get_word():
    return get_current_word()


@app.route("/words")
def get_words():
    return get_all_words()


@app.route("/values")
def get_values():
    return json.dumps(letter_value)


if __name__ == '__main__':
    select_word()
    app.run(debug=True)

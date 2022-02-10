import time
import atexit

from flask import Flask, render_template
from apscheduler.schedulers.background import BackgroundScheduler
from word_parser import select_word


app = Flask(__name__)
word = None

#### select and schedule a new word daily ####
def select_new_word():
    if (time.strftime("%I%p") == "12AM"):
        global word
        word = select_word()
    else:
        print("Not time to select a new word")


scheduler = BackgroundScheduler()
scheduler.add_job(func=select_new_word, trigger="interval", seconds=120)
scheduler.start() 
atexit.register(lambda: scheduler.shutdown())

#### routes ####
@app.route("/")
def home():
    return render_template("index.html")


@app.route("/word")
def get_word():
    global word
    if word == None:
        word = select_word()
    return word

#### main function ####
if __name__ == '__main__':
    app.run(debug=True)

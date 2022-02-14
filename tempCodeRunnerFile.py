def get_word():
    if globals.word == "none":
        globals.word = select_word()
    return globals.word
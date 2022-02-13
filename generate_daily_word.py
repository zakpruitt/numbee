import time
from word_parser import select_word, delete_word, get_current_word

if __name__ == "__main__":
    print("Generating new word at " + time.strftime("%I%p") + ".")
    print(get_current_word())
    delete_word(get_current_word()["word"])
    select_word()
    print(get_current_word())
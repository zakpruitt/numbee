import json
import random
import os

THIS_FOLDER = os.path.dirname(os.path.abspath(__file__))

letter_value = {
    'a': 1,
    'b': 2,
    'c': 3,
    'd': 4,
    'e': 1,
    'f': 5,
    'g': 6,
    'h': 7,
    'i': 1,
    'j': 8,
    'k': 9,
    'l': 10,
    'm': 11,
    'n': 12,
    'o': 1,
    'p': 13,
    'q': 14,
    'r': 15,
    's': 16,
    't': 17,
    'u': 1,
    'v': 18,
    'w': 19,
    'x': 20,
    'y': 1,
    'z': 21
}


def calculate_word_value(word):
    value = 0
    for letter in word:
        value += letter_value[letter]
    return value


def load_words(word_to_remove="none"):
    with open(THIS_FOLDER + '/words.json') as words_file, open(THIS_FOLDER + "/six_letter_words.json", "r+") as six_letter_words_file:
        word_json = json.load(words_file)
        six_letter_words_json = {}
        for key, value in word_json.items():
            if (key == word_to_remove):
                continue
            elif (len(key) == 6):
                word_value = calculate_word_value(key)
                six_letter_words_json[key] = {
                    "word": key,
                    "definition": value,
                    "value": word_value
                }
        json.dump(six_letter_words_json, six_letter_words_file, indent=4)


def rank_words_by_value():
    with open(THIS_FOLDER + "/six_letter_words.json", "r") as six_letter_words_file:
        six_letter_words_json = json.load(six_letter_words_file)
        occurences = {}
        for key, value in six_letter_words_json.items():
            word_value = value["value"]
            if word_value in occurences:
                occurences[word_value] += 1
            else:
                occurences[word_value] = 1
        print("Occurences sorted by value frequency: ")
        print(dict(sorted(occurences.items(), key=lambda item: item[1])))
        print("\nOccurences sorted by key's numeric value: ")
        print(dict(sorted(occurences.items(), key=lambda item: item[0])))


def delete_word(word):
    with open(THIS_FOLDER + "/six_letter_words.json", "r+") as six_letter_words_file:
        six_letter_words_file.truncate(0)
        load_words(word)


def select_word():
    with open(THIS_FOLDER + "/six_letter_words.json", "r+") as six_letter_words_file:
        six_letter_words_json = json.load(six_letter_words_file)
        chosen_word = random.choice(list(six_letter_words_json.keys()))
        chosen_word_json = six_letter_words_json[chosen_word]
        json.dump(chosen_word_json, open(
            THIS_FOLDER + "/daily_word.json", "w"), indent=4)


def get_current_word():
    with open(THIS_FOLDER + "/daily_word.json", "r") as daily_word_file:
        daily_word_json = json.load(daily_word_file)
        word = daily_word_json
        return word


def get_all_words():
    with open(THIS_FOLDER + "/six_letter_words.json", "r") as six_letter_words_file:
        word_json = json.load(six_letter_words_file)
        words = [word for word in word_json.keys()]
        word_response = json.dumps(words)
        return word_response


if __name__ == "__main__":
    load_words()
    print("Words loaded!")

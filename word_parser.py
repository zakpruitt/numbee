import json

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


def load_words():
    with open('words.json') as words_file, open("six_letter_words.json", "r+") as six_letter_words_file:
        word_json = json.load(words_file)
        six_letter_words_json = { }
        for key, value in word_json.items():
            if (len(key) == 6):
                word_value = calculate_word_value(key)
                six_letter_words_json[key] = { 
                    key: value,
                    "value": word_value
                }
        json.dump(six_letter_words_json, six_letter_words_file, indent=4)  


def rank_words_by_value():
    with open("six_letter_words.json", "r") as six_letter_words_file:
        six_letter_words_json = json.load(six_letter_words_file)
        for key, value in six_letter_words_json.items():
            print(key, value[0])
        # for word in sorted_words:
        #     print(word[0], word[1]['value'])


if __name__ == "__main__":
    load_words()
    rank_words_by_value()

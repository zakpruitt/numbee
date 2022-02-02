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


with open('words.json') as words_file, open("six_letter_words.json", "r+") as six_letter_words_file:
    word_json = json.load(words_file)
    six_letter_json = json.load(six_letter_words_file)
    for key, value in word_json.items():
        if (len(key) == 6):
            wordJSON = {
                key: value,
                "value": calculate_word_value(key),
            }
            six_letter_json.append(wordJSON)
    json.dump(six_letter_json, six_letter_words_file, 
                        indent=4,  
                        separators=(',',': '))

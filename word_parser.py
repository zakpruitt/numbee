import json


with open('words.json') as words_file, open("six_letter_words.json", "w") as six_letter_words_file:
    six_letter_words_file.write('{')
    data = json.load(words_file)
    for key, value in data.items():
        if (len(key) == 6):
            wordJSON ={
                key : value,
                "value" : 1,
            }
            json.dump(wordJSON, six_letter_words_file)
    six_letter_words_file.write('}')
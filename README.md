# numbee

## 1. Project Overview
numbee is a Flask-based daily numbers puzzle inspired by word games. Every day, players are given a target number that corresponds to the sum of values assigned to each letter in a six-letter word. The goal is to guess the hidden word whose letters produce the displayed number. The application serves both the game interface and supporting APIs for fetching words, letter values, and suggestions.

## 2. Features
- 🎯 Daily challenge that rotates through six-letter words and displays their numeric value.
- 🔢 Custom letter-to-number scoring system that drives the puzzle mechanic.
- 💡 Word suggestion endpoint to nudge players toward the answer.
- 📚 Complete word list API for building custom tools or visualizations.
- 🌐 Responsive web UI built with Bootstrap and Animate.css.

## 3. Tech Stack
- **Backend:** Python, Flask
- **Frontend:** HTML, Bootstrap 5, Animate.css, Font Awesome
- **Data:** JSON word lists (`all_words.json`, `selectable_words.json`, `six_letter_words.json`, `daily_word.json`)

## 4. Getting Started

### Prerequisites
- Python 3.10+
- pip
- (Optional) Virtual environment tool such as `venv` or `virtualenv`

### Installation
```bash
# Clone the repository
git clone https://github.com/<your-org>/numbee.git
cd numbee

# Create and activate a virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows use: .venv\Scripts\activate

# Install dependencies
pip install flask
```

### Configuration
- Ensure the JSON data files in the project root (`selectable_words.json`, `six_letter_words.json`, `daily_word.json`, `all_words.json`) remain writable by the Flask process. They are used to store the playable word lists and the current day's puzzle.
- If you want to regenerate the list of playable words, run `python word_parser.py` to rebuild `six_letter_words.json` from `selectable_words.json`.
- (Optional) Set the environment variable `FLASK_ENV=development` for auto-reload while developing.

### Run Locally
```bash
flask --app app run --debug
```
The application will be available at http://127.0.0.1:5000/.

### Run Tests
The project does not yet ship with automated tests. Feel free to add `pytest`-based suites and document them here in the future.

## 5. API Documentation
| Endpoint | Method | Description |
| --- | --- | --- |
| `/` | GET | Render the game interface with the current day's target number. |
| `/word` | GET | Returns the JSON representation of the current daily word (word and value). |
| `/suggest` | GET | Returns a random six-letter word suggestion and its value. |
| `/words` | GET | Returns a JSON array of all available words. |
| `/values` | GET | Returns the JSON mapping of each letter to its numeric value. |
| `/not-supported` | GET | Renders a fallback page for unsupported browsers or screen sizes. |

## 6. Project Structure
```
numbee/
├── app.py                  # Flask app entry point
├── word_parser.py          # Utilities for loading, scoring, and selecting words
├── static/
│   └── css/styles.css      # Game styling
├── templates/
│   ├── index.html          # Main game UI
│   └── not_supported.html  # Fallback UI
├── all_words.json          # Master list of candidate words
├── selectable_words.json   # List used to derive six-letter options
├── six_letter_words.json   # Precomputed six-letter words and their values
└── daily_word.json         # Stores the currently active daily word
```

## 7. Contributing
Contributions are welcome! Please:
1. Fork the repository and create a feature branch.
2. Make your changes with descriptive commit messages.
3. Open a pull request that explains the motivation, implementation details, and testing strategy.
4. Ensure JSON word files remain valid and that the application starts without errors.

## 8. License
This project does not currently specify a license. If you plan to use or distribute the code, please contact the maintainers to discuss licensing.

## 9. Contact
For questions or feedback, please open an issue or reach out to the maintainers at [maintainers@example.com](mailto:maintainers@example.com).

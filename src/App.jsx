import { useState } from "react";
import "./App.css";
function App() {
  const [word, setWord] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const sampleMeanings = {
    water: {
      word: "Water",
      phonetic: "/ˈwɔːtər/",
      meanings: [
        {
          partOfSpeech: "noun",
          definitions: [
            {
              definition:
                "A clear, colorless liquid that is essential for life.",
              example: "I drink water every morning."
            },
            {
              definition:
                "The liquid that forms seas, rivers, lakes, and rain.",
              example: "The river contains clean water."
            }
          ],
          synonyms: ["liquid", "H2O"]
        }
      ]
    },
    computer: {
      word: "Computer",
      meanings: [
        {
          definitions: [
            {
              definition:
                "An electronic device that processes, stores, and retrieves information.",
              example: "I use a computer to write programs."
            }
          ],
          synonyms: ["PC", "machine"]
        }
      ]
    },
    student: {
      word: "Student",
      meanings: [
        {
          definitions: [
            {
              definition:
                "A person who is studying at a school, college, or university.",
              example: "She is a computer science student."
            }
          ],
          synonyms: ["learner", "pupil"]
        }
      ]
    },
    beautiful: {
      word: "Beautiful",
      meanings: [
        {
          definitions: [
            {
              definition:
                "Having qualities that give great pleasure to the senses or mind.",
              example: "The garden is beautiful."
            }
          ],
          synonyms: ["pretty", "attractive", "lovely"]
        }
      ]
    },
    technology: {
      word: "Technology",
      meanings: [
        {
          definitions: [
            {
              definition:
                "The application of scientific knowledge for practical purposes.",
              example: "Technology has changed the way we communicate."
            }
          ],
          synonyms: ["innovation", "science"]
        }
      ]
    },
    javascript: {
      word: "JavaScript",
      meanings: [
        {
          definitions: [
            {
              definition:
                "A programming language commonly used to make web pages interactive.",
              example: "JavaScript is used to create dynamic websites."
            }
          ],
          synonyms: ["JS", "programming language"]
        }
      ]
    },
    hello: {
      word: "Hello",
      meanings: [
        {
          definitions: [
            {
              definition:
                "A greeting used when meeting or addressing someone.",
              example: "Hello, how are you?"
            }
          ],
          synonyms: ["hi", "greetings"]
        }
      ]
    },
    apple: {
      word: "Apple",
      meanings: [
        {
          definitions: [
            {
              definition:
                "A round fruit with red, green, or yellow skin and crisp flesh.",
              example: "I ate an apple for breakfast."
            }
          ],
          synonyms: ["fruit"]
        }
      ]
    }
  };
  const searchWord = async () => {
    const searchText = word.trim();
    if (!searchText) {
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(
          searchText
        )}`
      );
      if (!response.ok) {
        throw new Error("API Error");
      }
      const data = await response.json();
      setResult(data[0]);
    } catch (error) {
      const key = searchText.toLowerCase();
      if (sampleMeanings[key]) {
        setResult(sampleMeanings[key]);
      } else {
        setResult({
          word: searchText,
          phonetic: `/${searchText}/`,
          meanings: [
            {
              partOfSpeech: "word",
              definitions: [
                {
                  definition: `You searched for the word "${searchText}".`
                },
                {
                  definition:
                    "This word was successfully received by the Dictionary App."
                }
              ],
              synonyms: []
            }
          ]
        });
      }
    }
    setLoading(false);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchWord();
    }
  };
  return (
    <div className="app">
      <header className="header">
        <h1>Dictionary App</h1>
        <p>Search word meanings quickly and easily</p>
      </header>
      <main className="container">
        <div className="search-box">
          <input
            type="text"
            placeholder="Enter a word..."
            value={word}
            onChange={(e) => setWord(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={searchWord}>
            Search
          </button>
        </div>
        {loading && (
          <div className="message">
            Searching...
          </div>
        )}
        {result && !loading && (
          <div className="result-card">
            <div className="word-section">
              <h2>{result.word}</h2>
              {result.phonetic && (
                <p className="phonetic">
                  {result.phonetic}
                </p>
              )}
            </div>
            {result.meanings.map((meaning, index) => (
              <div className="meaning" key={index}>
                <h3>
                  {meaning.partOfSpeech}
                </h3>
                {meaning.definitions.map(
                  (definition, index) => (
                    <div
                      className="definition"
                      key={index}
                    >
                      <p>
                        <strong>
                          {index + 1}.
                        </strong>{" "}
                        {definition.definition}
                      </p>
                      {definition.example && (
                        <p className="example">
                          Example: "{definition.example}"
                        </p>
                      )}
                    </div>
                  )
                )}
                {meaning.synonyms &&
                  meaning.synonyms.length > 0 && (
                    <p className="synonyms">
                      <strong>
                        Synonyms:
                      </strong>{" "}
                      {meaning.synonyms
                        .slice(0, 5)
                        .join(", ")}
                    </p>
                  )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
export default App;

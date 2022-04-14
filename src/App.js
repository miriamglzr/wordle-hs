import {useState, useEffect} from 'react';
import './App.css';
import KeyboardLayout from './KeyboardLayout';
import './styles.css';
import WordColumns from './WordColumns';
import database from './database.json';

function App () {
  const [attempts, setAttempts] = useState (0);
  const [wordList, setWordList] = useState ([
    {word: '', blocked: false},
    {word: '', blocked: true},
    {word: '', blocked: true},
    {word: '', blocked: true},
    {word: '', blocked: true},
  ]);
  const [keyboardKey, setKeyboardKey] = useState ('');
  const [selectedFood, setSelectedFood] = useState (database[61].name);

  const onPressedKey = key => {
    // listen to keyboardLayout key pressed and clear
    setKeyboardKey (key);
    setKeyboardKey ('');
  };

  return (
    <div className="App">

      <header className="App-header">
        <h1 className="mt-3">Food Wordle</h1>
        <div className="container mt-5 word-list">
          {wordList.map ((attempt, index) => (
            <WordColumns
              setAttempts={setAttempts}
              attempts={attempts}
              wordList={wordList}
              setWordList={setWordList}
              key={index}
              attempt={attempt}
              attemptIndex={index}
              keyboardKey={keyboardKey}
              selectedFood={selectedFood}
            />
          ))}

        </div>
        <div className="container d-flex justify-content-center">
          <KeyboardLayout onPressedKey={onPressedKey} />
        </div>
      </header>

    </div>
  );
}

export default App;

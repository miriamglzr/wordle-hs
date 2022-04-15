import {useEffect, useState} from 'react';
import './styles/App.css';
import KeyboardLayout from './Components/KeyboardLayout';
import './styles/styles.css';
import WordColumns from './Components/WordColumns';
import database from './database.json';
import Navbar from './Components/Navbar';

function App () {
  //for grid rows are based wordList arrray which is composed by 5 attempts from parent App
  //rendering 5 times each "wordColumns" component
  //each WordColumns component consists of 5 letterbox divided in columns with individual properties for letter and style

  const [attempts, setAttempts] = useState (0);
  const [wordList, setWordList] = useState ([
    {word: '', blocked: false},
    {word: '', blocked: true},
    {word: '', blocked: true},
    {word: '', blocked: true},
    {word: '', blocked: true},
  ]);
  let number = Math.floor (Math.random () * 93);
  const [keyboardKey, setKeyboardKey] = useState ('');
  const [selectedFood] = useState (database[number].name);
  const [usedLetters, setUsedLetters] = useState ([]);

  const onPressedKey = key => {
    // listen to keyboardLayout key pressed and clear
    setKeyboardKey (key);
    setKeyboardKey ('');
  };
  useEffect (
    () => {
      if (attempts === 5)
        setTimeout (function () {
          alert (selectedFood.toUpperCase ());
        }, 2000);
    },
    [attempts]
  );
  return (
    <div className="App ">

      <header className="App-header ">
        <Navbar />

        <div className="container mt-5  mb-5 word-list grid">
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
              setUsedLetters={setUsedLetters}
            />
          ))}

        </div>
        <div className="container d-flex justify-content-center">
          <KeyboardLayout
            onPressedKey={onPressedKey}
            usedLetters={usedLetters}
          />
        </div>
      </header>

    </div>
  );
}

export default App;

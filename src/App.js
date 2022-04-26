import {useEffect, useState} from 'react';

import KeyboardLayout from './Components/KeyboardLayout';
import WordColumns from './Components/WordColumns';
import database from './database.json';
import Navbar from './Components/Navbar/Navbar';
import Modal from './Components/Modal';
import './styles/App.css';
import './styles/styles.css';
import 'antd/dist/antd.css';

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
  const [message, setMessage] = useState ('');

  const onPressedKey = key => {
    // listen to keyboardLayout key pressed and clear
    setKeyboardKey (key);
    setKeyboardKey ('');
  };

  useEffect (
    () => {
      if (attempts === 5 && message !== 'Nice!')
        setMessage (selectedFood.toUpperCase ());
    },
    [attempts]
  );
  return (
    <div className="App ">

      <header className="App-header ">

        <Navbar />
        <Modal message={message} />
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
              setMessage={setMessage}
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

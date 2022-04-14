import React, {useState, useEffect} from 'react';
import useKeypress from './useKeypress';
import {isFood} from './isFood';

export default function WordColumns({
  attempts,
  setAttempts,
  wordList,
  setWordList,
  attempt,
  attemptIndex,
  keyboardKey,
  selectedFood,
}) {
  let pizza = selectedFood;
  const [wordle, setWordle] = useState ([
    {letter: '', style: 'none'},
    {letter: '', style: 'none'},
    {letter: '', style: 'none'},
    {letter: '', style: 'none'},
    {letter: '', style: 'none'},
  ]);
  const [length, setlength] = useState (0);
  const [blockedWord, setBlockedWord] = useState (false);

  //listen if keyboardkeyLayout pressed
  useEffect (
    () => {
      checkKey (keyboardKey);
    },
    [keyboardKey]
  );

  const checkKey = async key => {
    if (!attempt.blocked) {
      if (key === 'Backspace') {
        const newWordle = wordle;
        newWordle.splice (length - 1, 1, {letter: '', style: 'none'});
        setWordle (newWordle);
        length !== 0 && setlength (length - 1);
      } else if (length === 5 && key === 'Enter') {
        await isFood (wordle);
        await submitWord ();
        await setBlockedWord (true);

        let newWordle = wordle
          .map (letter => {
            return letter.letter;
          })
          .join ('');
        let wordAttempt = {word: newWordle, blocked: true};

        let nextWordAttempt = {word: '', blocked: false};
        const newWordList = wordList;
        newWordList.splice (attemptIndex, 1, wordAttempt);
        attemptIndex !== 4 &&
          newWordList.splice (attemptIndex + 1, 1, nextWordAttempt);
        console.log (newWordList);
        await setWordList (newWordList);
        await setAttempts (attempts + 1);
        await setlength (0);
        console.log (newWordList);
      } else if (length === 5 && key.length === 1 && /[a-zA-Z]/.test (key)) {
        alert ('5 letters max');
      } else if (/[a-zA-Z]/.test (key) && key.length === 1) {
        //get the next "" or empty letter
        let blank = wordle.map (object => object.letter).indexOf ('');

        let newWord = wordle;
        newWord.splice (blank, 1, {
          letter: key.toLowerCase (),
          style: 'none',
        });
        setWordle (newWord);
        setlength (length + 1);
      }
    }
  };

  useKeypress (key => {
    checkKey (key);
  });

  const submitWord = () => {
    let newWord = wordle;
    //let wordArr = newWord.map (object => object.letter);
    let correctwordArr = pizza.split ('');

    wordle.map ((attemptLetter, i) => {
      //set background color gray for wrong letters as default
      attemptLetter.style = 'wrong-letter';

      if (attemptLetter.letter === correctwordArr[i]) {
        newWord[i].style = 'correct-letter-placement';
      } else if (correctwordArr.includes (attemptLetter.letter)) {
        newWord[i].style = 'missed-letter-placement';
      }
    });

    //(await wordArr.join ('')) === pizza && alert ('Good job!');
    return setWordle (newWord);
  };

  return (
    <div className="container">

      <div className="row align-items-center word-list">

        <div className={`col word-box ${wordle[0].style}`}>
          <p>{wordle[0].letter}</p>
        </div>
        <div className={`col word-box ${wordle[1].style}`}>
          <p>{wordle[1].letter}</p>
        </div>
        <div className={`col word-box ${wordle[2].style}`}>
          <p>{wordle[2].letter}</p>
        </div>
        <div className={`col word-box ${wordle[3].style}`}>
          <p>{wordle[3].letter}</p>
        </div>
        <div className={`col word-box ${wordle[4].style}`}>
          <p>{wordle[4].letter}</p>
        </div>
      </div>

    </div>
  );
}

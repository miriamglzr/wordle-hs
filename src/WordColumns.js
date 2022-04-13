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
}) {
  let pizza = 'pizza';
  const [wordle, setWordle] = useState ([
    {letter: '', style: 'none'},
    {letter: '', style: 'none'},
    {letter: '', style: 'none'},
    {letter: '', style: 'none'},
    {letter: '', style: 'none'},
  ]);
  const [length, setlength] = useState (0);
  const [blockedWord, setBlockedWord] = useState (false);

  //if keyboardkeyLayout pressed
  useEffect (
    () => {
      console.log (keyboardKey);
    },
    [keyboardKey]
  );

  useKeypress (async key => {
    // console.log (wordList[1].blocked);
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
        await setAttempts (attempts + 1);
        let newWordle = [];
        wordle.map (letter => {
          newWordle.push (letter.letter);
        });
        newWordle = newWordle.join ('');
        let wordAttempt = {word: newWordle, blocked: true};
        let nextWordAttempt = {word: '', blocked: false};
        const newWordList = wordList;
        wordList.splice (attemptIndex, 1, wordAttempt);
        attemptIndex !== 4 &&
          wordList.splice (attemptIndex + 1, 1, nextWordAttempt);
        await setWordList (newWordList);
        await setlength (0);

        // alert (pizza);
        /// check if correct word
      } else if (length === 5 && key.length === 1 && /[a-zA-Z]/.test (key)) {
        alert ('5 letters max');
      } else if (/[a-zA-Z]/.test (key) && key.length === 1) {
        let blank = wordle.map (object => object.letter).indexOf ('');
        console.log (blank);
        // if (blank >= 0) {
        let newWord = wordle;
        newWord.splice (blank, 1, {
          letter: key.toLowerCase (),
          style: 'none',
        });
        setWordle (newWord);
        setlength (length + 1);
        // }
      }
    }
  });

  const submitWord = () => {
    let newWord = wordle;
    wordle.map ((attemptLetter, i) => {
      //set background color gray for wrong letters as default
      attemptLetter.style = 'wrong-letter';
      pizza.split ('').map ((correctLetter, j) => {
        //console.log (correctLetter);
        //if correct letter found change background color
        if (attemptLetter.letter === correctLetter) {
          //  console.log ('same letter');
          let letterIndex = newWord
            .map (object => object.letter)
            .indexOf (attemptLetter.letter);
          i === j
            ? (newWord[letterIndex].style = 'correct-letter-placement')
            : (newWord[letterIndex].style = 'missed-letter-placement');
        }
      });
    });

    return setWordle (newWord);
  };

  return (
    <div className="container">

      <div className="row align-items-center word-list">

        <div className={`col word-box ${wordle[0].style}`}>
          <text>{wordle[0].letter}</text>
        </div>
        <div className={`col word-box ${wordle[1].style}`}>
          <text>{wordle[1].letter}</text>
        </div>
        <div className={`col word-box ${wordle[2].style}`}>
          <text>{wordle[2].letter}</text>
        </div>
        <div className={`col word-box ${wordle[3].style}`}>
          <text>{wordle[3].letter}</text>
        </div>
        <div className={`col word-box ${wordle[4].style}`}>
          <text>{wordle[4].letter}</text>
        </div>
      </div>

    </div>
  );
}

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
  setUsedLetters,
  setMessage,
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

  //listen if keyboardkeyLayout pressed
  useEffect (
    () => {
      checkKey (keyboardKey);
    },
    [keyboardKey]
  );

  //listen if real keayboard pressed
  useKeypress (key => {
    checkKey (key);
  });

  //INPUT VALIDATION
  const checkKey = async key => {
    //check if the line is not blocked
    if (!attempt.blocked) {
      if (key === 'Backspace') {
        const newWordle = wordle;
        newWordle.splice (length - 1, 1, {letter: '', style: 'none'});
        setWordle (newWordle);
        length !== 0 && setlength (length - 1);
      } else if (length === 5 && key === 'Enter') {
        //if the word is 5 letters long, sumbit answer
        if (await !isFood (wordle))
          setMessage ('Sorry, this word is not in our food list');
        await submitWord ();
        let newWordle = wordle
          .map (letter => {
            return letter.letter;
          })
          .join ('');
        //save aand update
        let wordAttempt = {word: newWordle, blocked: true};
        const newWordList = wordList;
        newWordList.splice (attemptIndex, 1, wordAttempt);
        //if correct end game
        if (newWordle === pizza) {
          setMessage ('Nice!');
        } else {
          //set blocked row and release the next one
          let nextWordAttempt = {word: '', blocked: false};
          //newWordList.splice (attemptIndex, 1, wordAttempt);
          attemptIndex !== 4 &&
            newWordList.splice (attemptIndex + 1, 1, nextWordAttempt);
        }
        await setWordList (newWordList);
        await setUsedLetters (wordle);
        await setlength (0);
        await setAttempts (attempts + 1);
      } else if (length === 5 && key.length === 1 && /[a-zA-Z]/.test (key)) {
        //SHAKE on attempt to add another letter and remove class
        document
          .getElementById ('wordRow' + attemptIndex)
          .classList.add ('rowbox');
        setTimeout (function () {
          document
            .getElementById ('wordRow' + attemptIndex)
            .classList.remove ('rowbox');
        }, 1500);

        // alert ('5 letters max');
      } else if (/[a-zA-Z]/.test (key) && key.length === 1) {
        //get the next "" or empty letter
        let blankIndex = wordle.map (object => object.letter).indexOf ('');

        let newWord = wordle;
        newWord.splice (blankIndex, 1, {
          letter: key.toLowerCase (),
          style: 'none',
        });
        setWordle (newWord);
        //grow box animation as it is typed
        document
          .getElementById ('letter-box' + blankIndex + attemptIndex)
          .classList.add ('grow');
        //remove class animation
        setTimeout (function () {
          document
            .getElementById ('letter-box' + blankIndex + attemptIndex)
            .classList.remove ('grow');
        }, 500);
        setlength (length + 1);
      }
    }
  };

  const submitWord = () => {
    let newWord = wordle;
    //let wordArr = newWord.map (object => object.letter);
    let correctwordArr = pizza.split ('');

    wordle.map ((attemptLetter, i) => {
      //CHANGE CLASS OF EACH LETTER BOX
      if (attemptLetter.letter === correctwordArr[i]) {
        newWord[i].style = 'correct-letter-placement';
      } else if (correctwordArr.includes (attemptLetter.letter)) {
        newWord[i].style = 'missed-letter-placement';
      } else {
        //set background color gray for wrong letters as default
        attemptLetter.style = 'wrong-letter';
      }
    });
    return setWordle (newWord);
    //(await wordArr.join ('')) === pizza && alert ('Good job!');
    // ;
  };

  return (
    <div className="container">
      <div
        className="row align-items-center word-list"
        id={'wordRow' + attemptIndex}
      >
        {wordle.map ((letterBox, i) => {
          return (
            <div
              className={`col word-box ${letterBox.style} `}
              key={i}
              id={'letter-box' + i + attemptIndex}
              style={{animationDelay: i * 100 + 'ms'}}
            >
              <p>{letterBox.letter}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

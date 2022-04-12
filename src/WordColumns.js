import React, {useState} from 'react';
import useKeypress from './useKeypress';
import './index.css';

export default function WordColumns () {
  const pizza = ['p', 'i', 'z', 'z', 'a'];
  const [wordle, setWordle] = useState ([
    {letter: '', style: 'none'},
    {letter: '', style: 'none'},
    {letter: '', style: 'none'},
    {letter: '', style: 'none'},
    {letter: '', style: 'none'},
  ]);
  const [length, setlength] = useState (0);
  //const [text, setText] = useState ('');

  useKeypress (key => {
    if (key === 'Backspace') {
      const newWordle = wordle;
      newWordle.splice (length - 1, 1, {letter: '', style: 'none'});
      setWordle (newWordle);
      length !== 0 && setlength (length - 1);
    } else if (length === 5 && key === 'Enter') {
      submitWord ();
      // alert (pizza);
      /// check if correct word
    } else if (length === 5 && key.length === 1 && /[a-zA-Z]/.test (key)) {
      alert ('5 letters max');
    } else if (/[a-zA-Z]/.test (key) && key.length === 1) {
      let blank = wordle.map (object => object.letter).indexOf ('');
      console.log (blank);
      let newWord = wordle;
      newWord.splice (blank, 1, {letter: key.toLowerCase (), style: 'none'});
      setWordle (newWord);
      setlength (length + 1);
    }
  });

  const submitWord = () => {
    let newWord = wordle;
    wordle.map ((attemptLetter, i) => {
      attemptLetter.style = 'wrong-letter';
      pizza.map ((correctLetter, j) => {
        console.log (correctLetter);
        if (attemptLetter.letter === correctLetter) {
          console.log ('same letter');
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

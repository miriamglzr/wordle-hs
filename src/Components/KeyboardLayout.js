import React, {useEffect, useRef, useState} from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

export default function KeyboardLayout({onPressedKey, usedLetters}) {
  let theme = [
    {
      class: 'keyboard-letter-button',
      buttons: 'q w e r t y u i o p a s d f g h j k l z x c v b n m',
    },
    {
      class: 'special-keyboard-button',
      buttons: '{enter} {bksp}',
    },
    {
      class: 'wrong-letter',
      buttons: ' ',
    },
    {
      class: 'correct-letter-placement',
      buttons: ' ',
    },
    {
      class: 'missed-letter-placement',
      buttons: ' ',
    },
  ];
  const [length, setLength] = useState (0);
  const [buttonTheme, setButtonTheme] = useState (theme);
  const [wrong, setWrong] = useState ([' ']);
  const [correct, setCorrect] = useState ([' ']);
  const [misplaced, setMisplaced] = useState ([' ']);

  useEffect (
    () => {
      changeTheme (usedLetters);
    },
    [usedLetters]
  );

  const changeTheme = arr => {
    //console.log (arr);
    let wrongLetters = wrong;
    let misplacedLetters = misplaced;
    let correctLetters = correct;
    arr.map ((box, i) => {
      if (box.style === 'wrong-letter' && !wrong.includes (box.letter)) {
        wrongLetters = [...wrongLetters, box.letter];
        setWrong ([wrongLetters.join (' ')]);
      } else if (
        box.style === 'correct-letter-placement' &&
        !correctLetters.includes (box.letter)
      ) {
        correctLetters = [...correctLetters, box.letter];
        setCorrect ([correctLetters.join (' ')]);
      } else if (
        box.style === 'missed-letter-placement' &&
        !misplacedLetters.includes (box.letter)
      ) {
        misplacedLetters = [...misplacedLetters, box.letter];
        setMisplaced ([misplacedLetters.join (' ')]);
      }
    });
    theme[2].buttons = wrongLetters.join (' ');
    theme[3].buttons = correctLetters.join (' ');
    theme[4].buttons = misplacedLetters.join (' ');

    if (wrongLetters || misplacedLetters || correctLetters)
      setButtonTheme (theme);
  };
  const keyboard = useRef ();

  const onKeyPress = async button => {
    console.log ('Button pressed', button);
    /**
     * cspecial actions for enter or backspace in condition to length
     */
    if (button === '{enter}') {
      button = 'Enter';
      onPressedKey (button);
      if (length === 5) {
        setLength (0);
      }
    } else if (button === '{bksp}') {
      button = 'Backspace';
      onPressedKey (button);
      if (length !== 0) setLength (length - 1);
    } else if (length !== 5) {
      setLength (length + 1);
      onPressedKey (button);
    }
  };

  return (
    <div className="App">

      <Keyboard
        keyboardRef={r => (keyboard.current = r)}
        onKeyPress={onKeyPress}
        layout={{
          default: [
            'q w e r t y u i o p',
            'a s d f g h j k l',
            '{enter} z x c v b n m {bksp}',
          ],
        }}
        display={{
          '{bksp}': '←',
          '{enter}': 'ENTER',
        }}
        buttonTheme={buttonTheme}
      />
    </div>
  );
}

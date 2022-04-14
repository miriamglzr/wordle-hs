import React, {useRef, useState} from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import './styles.css';

export default function KeyboardLayout({onPressedKey}) {
  const [length, setLength] = useState (0);

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
        buttonTheme={[
          {
            class: 'keyboard-letter-button',
            buttons: 'q w e r t y u i o p a s d f g h j k l z x c v b n m',
          },
          {
            class: 'special-keyboard-button',
            buttons: '{enter} {bksp}',
          },
        ]}
      />
    </div>
  );
}

import React, {useRef, useState} from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

import './styles.css';

export default function KeyboardLayout({onPressedKey}) {
  const [input, setInput] = useState ('');
  const [layout, setLayout] = useState ('default');
  const keyboard = useRef ();

  const onChange = input => {
    setInput (input);
    console.log ('Input changed', input);
  };

  const handleShift = () => {
    const newLayoutName = layout === 'default' ? 'shift' : 'default';
    setLayout (newLayoutName);
  };

  const onKeyPress = button => {
    console.log ('Button pressed', button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === '{shift}' || button === '{lock}') handleShift ();
    onPressedKey (button);
  };

  const onChangeInput = event => {
    const input = event.target.value;
    setInput (input);
    keyboard.current.setInput (input);
  };

  return (
    <div className="App">
      <input
        value={input}
        placeholder={'Tap on the virtual keyboard to start'}
        onChange={onChangeInput}
      />
      <Keyboard
        keyboardRef={r => (keyboard.current = r)}
        layoutName={layout}
        onChange={onChange}
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

import './App.css';
import WordColumns from './WordColumns';

function App () {
  return (
    <div className="App">

      <header className="App-header">
        <h1 className="mt-3"> Food Wordle</h1>
        <div className="container mt-5 word-list">
          <WordColumns />

        </div>
      </header>

    </div>
  );
}

export default App;

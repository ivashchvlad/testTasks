import React from 'react';
import plane from './planeicon.svg'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={plane} className="App-logo" alt="logo" />
      </header>
      <main className="App-main">
        <div className="peresadki">

          <h1>Количество пересадок</h1>
          <div className="filters">
            <p>
              <input type="checkbox" name="option2" value="a2" />
              <span className="checkmark"></span>
            Все</p>
            <p><input type="checkbox" name="option2" value="a2" />Без пересадок</p>
            <p><input type="checkbox" name="option2" value="a2" />1 пересадка</p>
            <p><input type="checkbox" name="option2" value="a2" />2 пересадки</p>
            <p><input type="checkbox" name="option2" value="a2" />3 пересадки</p>
          </div>
        </div>
        <div className="content">

        </div>
      </main>
    </div>
  );
}

export default App;

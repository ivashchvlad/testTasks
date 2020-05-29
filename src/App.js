import React, { useState, useEffect } from 'react';
import plane from './planeicon.svg'
import './App.css';

import axios from 'axios'

import Ticket from './Ticket'

function App() {
  const [searchId, setSearchId] = useState('');
  const [tikets, setTikets] = useState([]);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('cheap');

  useEffect(() => {
    axios.get('https://front-test.beta.aviasales.ru/search').then((res) => {
      setSearchId(res.data.searchId);
      axios.get('https://front-test.beta.aviasales.ru/tickets', {
        params: {
          searchId: res.data.searchId,
        }
      }).then((res) => {
        setTikets( [...tikets, ...res.data.tickets]);
      }).catch(e => console.log(e));
    });
  }, []);



  const handleClickCheap = () => {
    setSort('cheap');
  }

  const handleClickFast = () => {
    setSort('fast');
  }

  const sorting = (a,b) => {
    if(sort === 'cheap') return a.price - b.price;
    if(sort === 'fast') {
      return Math.min(...a.segments.map((x)=>x.duration)) - Math.min(...b.segments.map((x)=>x.duration));
    }
  }

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
              <label className="checkbox-container">Все
                <input type="checkbox" />
                <span className="checkmark"></span>
              </label>
            </p>
            <p>
              <label className="checkbox-container">Без пересадок
                <input type="checkbox" />
                <span className="checkmark"></span>
              </label>
            </p>
            <p>
              <label className="checkbox-container">1 пересадка
                <input type="checkbox" />
                <span className="checkmark"></span>
              </label>
            </p>
            <p>
              <label className="checkbox-container">2 пересадки
                <input type="checkbox" />
                <span className="checkmark"></span>
              </label>
            </p>
            <p>
              <label className="checkbox-container">3 пересадки
                <input type="checkbox" />
                <span className="checkmark"></span>
              </label>
            </p>
          </div>
        </div>
        <div className="content">
          <div className='top-buttons'>
            <button 
              className={'left-button ' + (sort==='cheap' && 'active-button')} 
              onClick={handleClickCheap}>
                Самый дешевый
            </button>
            <button 
              className={'right-button ' + (sort==='fast' && 'active-button')} 
              onClick={handleClickFast}>
                Самый быстрый
            </button>
          </div>
          <div className="tickets">
            {
              tikets.length ? tikets.sort(sorting).map((tiket, i) => 
                <Ticket tiket={tiket} key={i}/>
              ) : 'Loading...'
            }
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

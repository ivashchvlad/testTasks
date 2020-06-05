import React, { useState, useEffect } from 'react'
import plane from './planeicon.svg'
import './App.css'

import axios from 'axios'

import Ticket from './Ticket'

function App() {
  const [searchId, setSearchId] = useState('');
  const [stopSearch, setStopSearch] = useState(false);
  const [tikets, setTikets] = useState([]);
  const [filter, setFilter] = useState([false, false, false, false, true]);
  const [sort, setSort] = useState('cheap');

  //Get SearchId On Mount
  useEffect(() => {
    axios.get('https://front-test.beta.aviasales.ru/search').then((res) => {
      setSearchId(res.data.searchId);
    });
  }, []);

  //Get Tikets Until they available
  useEffect(() => {
    if (!stopSearch) {
      axios.get('https://front-test.beta.aviasales.ru/tickets', {
        params: {
          searchId: searchId,
        }
      }).then((res) => {
        setTikets(tikets => [...tikets, ...res.data.tickets]);
        setStopSearch(stopSearch => res.data.stop);
      }).catch(e => { 
        console.log(e);
        setStopSearch(false);
      });
    }
  }, [searchId, stopSearch]);



  const handleClickCheap = () => {
    setSort('cheap');
  }

  const handleClickFast = () => {
    setSort('fast');
  }

  const handleChangeFilter = (e) => {
    let newFilter = [...filter];
    switch (e.target.name) {
      case 'all':
        if (!newFilter[4]) {
          newFilter.fill(false, 0);
          newFilter[4] = true;
        } else newFilter[4] = false;
        break;
      case 'none':
        if (newFilter[4]) newFilter[4] = false;
        newFilter[0] = !newFilter[0];
        break;
      case 'one':
        if (newFilter[4]) newFilter[4] = false;
        newFilter[1] = !newFilter[1];
        break;
      case 'two':
        if (newFilter[4]) newFilter[4] = false;
        newFilter[2] = !newFilter[2];
        break;
      case 'three':
        if (newFilter[4]) newFilter[4] = false;
        newFilter[3] = !newFilter[3]
        break;
      default: break;
    }
    setFilter(newFilter);
  }

  const sorting = (a, b) => {
    if (sort === 'cheap') return a.price - b.price;
    if (sort === 'fast') {
      return (a.segments[0].duration + a.segments[1].duration) - (b.segments[0].duration + b.segments[1].duration);
    }
  }

  const filtering = (tiket) => {
    if (filter[4]) return true;
    for (let i = 1; i < filter.length; i++) {
      if (filter[i] && (tiket.segments[0].stops.length === i && tiket.segments[1].stops.length === i))
        return true;
    }
    return false;
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
                <input type="checkbox"
                  name="all"
                  checked={filter[4]}
                  onChange={handleChangeFilter}
                />
                <span className="checkmark"></span>
              </label>
            </p>
            <p>
              <label className="checkbox-container">Без пересадок
                <input type="checkbox"
                  name="none"
                  checked={filter[0]}
                  onChange={handleChangeFilter}
                />
                <span className="checkmark"></span>
              </label>
            </p>
            <p>
              <label className="checkbox-container">1 пересадка
                <input type="checkbox"
                  name="one"
                  checked={filter[1]}
                  onChange={handleChangeFilter}
                />
                <span className="checkmark"></span>
              </label>
            </p>
            <p>
              <label className="checkbox-container">2 пересадки
                <input type="checkbox"
                  name="two"
                  checked={filter[2]}
                  onChange={handleChangeFilter}
                />
                <span className="checkmark"></span>
              </label>
            </p>
            <p>
              <label className="checkbox-container">3 пересадки
                <input type="checkbox"
                  name="three"
                  checked={filter[3]}
                  onChange={handleChangeFilter}
                />
                <span className="checkmark"></span>
              </label>
            </p>
          </div>
        </div>
        <div className="content">
          <div className='top-buttons'>
            <button
              className={'left-button ' + (sort === 'cheap' && 'active-button')}
              onClick={handleClickCheap}>
              Самый дешевый
            </button>
            <button
              className={'right-button ' + (sort === 'fast' && 'active-button')}
              onClick={handleClickFast}>
              Самый быстрый
            </button>
          </div>
          <div className="tickets">
            {
              tikets.length ? tikets.sort(sorting).filter(filtering).map((tiket, i) =>
                <Ticket tiket={tiket} key={i} />
              ) : 'Loading...'
            }
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

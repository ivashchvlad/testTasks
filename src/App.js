import React, { useState, useEffect } from 'react';
import plane from './planeicon.svg'
import './App.css';

import axios from 'axios'

import Ticket from './Ticket'

function App() {
  const [searchId, setSearchId] = useState('');
  const [tikets, setTikets] = useState([]);
  const [filter, setFilter] = useState([false,false,false,false,true]);
  const [sort, setSort] = useState('cheap');

  useEffect(() => {
    axios.get('https://front-test.beta.aviasales.ru/search').then((res) => {
      setSearchId(res.data.searchId);
      axios.get('https://front-test.beta.aviasales.ru/tickets', {
        params: {
          searchId: res.data.searchId,
        }
      }).then((res) => {
        setTikets([...tikets, ...res.data.tickets]);
      }).catch(e => console.log(e));
    });
  }, []);



  const handleClickCheap = () => {
    setSort('cheap');
  }

  const handleClickFast = () => {
    setSort('fast');
  }

  const handleChangeFilter = (e) => {
    switch (e.target.name) {
      case 'all': {
        setFilter([...filter.slice(0,4), !filter[4]])
        break;
      }
      case 'none': {
        setFilter([!filter[0], ...filter.slice(1,5)]);
        break;
      }
      case 'one': {
        setFilter([filter[0], !filter[1], ...filter.slice(2,5)]);
        break;
      }
      case 'two': {
        setFilter([...filter.slice(0,2), !filter[2], ...filter.slice(3,5)]);
        break;
      }
      case 'three': {
        setFilter([...filter.slice(0,3), !filter[3], filter[4]]);
        break;
      }
      default: break;
    }
  }

  const sorting = (a, b) => {
    if (sort === 'cheap') return a.price - b.price;
    if (sort === 'fast') {
      return Math.min(a.segments[0].duration + a.segments[1].duration) - Math.min(b.segments[0].duration + b.segments[1].duration);
    }
  }

  const filtering = (x) => {
    if (filter[4]) return true;
    let res = x.segments[0].stops.length + x.segments[1].stops.length;
    for (let i = 1; i < filter.length; i++) {
      if (filter[i]&&res===i) return true;
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

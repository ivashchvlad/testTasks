import React from 'react'
import s7 from './s7logo.svg'
import './Ticket.css'

export function Ticket({ tiket }) {

    const suffiks = (number) => {
        if (number % 10 === 1) return 'ка';
        if (number>0 && number<5) return 'ки';
        return 'ок';
    }

    const toTimeFormat = (time) => {
        let rez = '';
        if (Math.floor(time/60)) rez += Math.floor(time/60) + 'ч ';
        rez += time%60 + 'м';
        return rez;
    }

    const formatDate = (_date, duration) => {
        let date = new Date(_date);
        let res =  date.getHours() + ':' + date.getMinutes() + '-';
        date = new Date(date.getTime() + duration*60000);
        res += date.getHours() + ':' + date.getMinutes();
        return res;
    }

    return (
        <div className='ticket'>
            <div className='header'>
                <div className='price'>
                    {tiket.price} P
                </div>
                <div className='logo'>
                    <img src={s7} className="logo-img" alt="logo" />
                </div>
            </div>
            <div className='body'>
                {
                    tiket.segments.map((segment, i) => (
                        <div className='segment' key={i}>
                            <div className='details'>
                                <h1>{segment.origin}-{segment.destination}</h1>
                                <h2>{formatDate(segment.date, segment.duration)}</h2>
                            </div>
                            <div className='details'>
                                <h1>В пути</h1>
                                <h2>{toTimeFormat(segment.duration)}</h2>
                            </div>
                            <div className='details'>
                                <h1>{`${segment.stops.length} пересад${suffiks(segment.stops.length)}`}</h1>
                                <h2>{segment.stops.length ? segment.stops.join(', ') : '--'}</h2>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Ticket

import React from 'react'
import s7 from './s7logo.svg'
import './Ticket.css'

export function Ticket() {
    return (
        <div className='ticket'>
            <div className='header'>
                <div className='price'>
                    13 400 P
                </div>
                <div className='logo'>
                    <img src={s7} className="logo-img" alt="logo" />
                </div>
            </div>
            <div className='body'>
                <div className='segment'>
                    <div className='details'>
                        <h1>MOW-HKT</h1>
                        <h2>20:20-00:02</h2>
                    </div>
                    <div className='details'>
                        <h1>В пути</h1>
                        <h2>1ч 12м</h2>
                    </div>
                    <div className='details'>
                        <h1>2 пересадки</h1>
                        <h2>HKB, JNB</h2>
                    </div>
                </div>
                <div className='segment'>
                    <div className='details'>
                        <h1>MOW-HKT</h1>
                        <h2>20:20-00:02</h2>
                    </div>
                    <div className='details'>
                        <h1>В пути</h1>
                        <h2>1ч 12м</h2>
                    </div>
                    <div className='details'>
                        <h1>2 пересадки</h1>
                        <h2>HKB, JNB</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Ticket

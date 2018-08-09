import React from 'react';
import AccountsUIWrapper from './AccountsUIWrapper.js';
const Header = (props) => {
    return (
        <div className="header">
            <p>
                <button style={{ visibility: 'hidden' }}>No one</button>
            </p>
            <h1>Datachat</h1>
            <p>
                <button className="btn-head" onClick={() => props.toggleClass()}>
                    <img src="images/menu.png" alt="" />
                </button>
            </p>
            <div className={props.drop ? 'dropdown dropdown-up' : 'dropdown'}>
                <div className="login"><AccountsUIWrapper /></div>
                <ul>
                    <h3>Channels</h3>
                    <li><button onClick={() => props.handleChannel('general')}>#General</button></li>
                    <li><button onClick={() => props.handleChannel('simplon')}>#Simplon</button></li>
                </ul>
            </div>
        </div >
    )
}
export default Header;
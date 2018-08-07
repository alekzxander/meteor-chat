import React from 'react';
import menu from '../../client/images/menu.svg'
const Header = (props) => {
    return (
        <div className="header">
            <h1>Datachat</h1>
            <button className="btn-head">
                {menu}
            </button>
        </div >
    )
}
export default Header;
import React, { Component } from 'react';
import Menu from './menu-new';

class Navbar extends Component {

    render() {
        return (
            <div>
                <Menu/>
                <h3 className="header-title">GPA Calculator</h3>
            </div>
        );
    }
}

export default Navbar;
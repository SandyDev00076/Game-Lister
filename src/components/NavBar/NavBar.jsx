import React, { Component } from 'react';
import './NavBar.css';

export class NavBarComponent extends Component {
    state = {

    }

    render() {
        return (<div className="navbarcontainer">
            <a href="https://hardcore-bell-311e30.netlify.com/" className="mylink">Sanjeet Tiwari</a>
            <input placeholder="Search for games via their names..." className="searchgame" onChange={(event) => this.props.searchFor(event.target.value)}/>
            <div className="orderby">
                Order By 
                &nbsp;
                <select placeholder="Order By" className="sortopts" onChange={(event) => this.getSortingOption(event)}>
                    <option>None</option>
                    <option>Oldest To Latest</option>
                    <option>Latest To Oldest</option>
                    <option>Rankings</option>
                </select>
            </div>
        </div>)
    }

    getSortingOption = (event) => {
        this.props.sortingOption(event.target.value);
    }
}
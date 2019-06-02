import React, { Component } from 'react';
import './ListPage.css';
import * as StorageService from '../../services/storage.service';

export class ListPageComponent extends Component {
    state = {
        offset: 0,
        limit: 20,
        gamesToDisplay: [],
        searchMode: false
    }

    render() {
        return (<div className="listcontainer">
            {this.state.gamesToDisplay.map(game => {
                return (<div className="game" key={game.Rank}>
                    <div className="gamerank">
                        {(parseInt(game.Rank) >= 100) ?
                        (parseInt(game.Rank) >= 10000) ?
                        <span style={{ fontSize: '1em' }}>{game.Rank}</span>
                        : <span style={{ fontSize: '1.5em' }}>{game.Rank}</span>    
                        : <span style={{ fontSize: '2em' }}>{game.Rank}</span> }
                    </div>
                    <div className="gamedetails">
                        <span className="gamename">{game.Name}</span>
                        &nbsp;
                        <span className="gameplatform">({game.Platform})</span>
                        <br />
                        <span className="gamepub">By {game.Publisher}</span>
                        <br />
                        <br />
                        <span className="gamegenre">{game.Genre}</span>
                    </div>
                    <div className="gamesales">
                        <span className="gameyear">{game.Year}</span>
                        <br />
                        <br />
                        <span style={{ color: 'grey', fontSize: '0.7em' }}>Sales:</span>
                        <br />
                        <span className="gamegsales">{game.Global_Sales}</span>
                    </div>
                </div>)
            })}
            {(!this.state.searchMode) ? <div className="navdiv">
                <div className="getprev" onClick={this.getPrevious}>
                    <i style={{ fontSize: '2em', color: 'grey' }} className="fas fa-chevron-circle-left"></i>
                    <br />
                    Get Previous 20
                </div>
                <div className="getnext" onClick={this.getNext}>
                    <i style={{ fontSize: '2em', color: 'green' }} className="fas fa-chevron-circle-right"></i>
                    <br />
                    Get Next 20
                </div>
            </div>: null}
        </div>);
    }

    componentDidMount() {
        // setting things up
        this.setGamesToDisplay();
    }

    componentWillReceiveProps(nextProps, nextState) {
        if (nextProps.searchStr.length !== 0) {
            this.setState({ searchMode: true }, () => {
                let gamesToDisplay = StorageService.getSearchedGames(nextProps.searchStr);
                this.setState({ gamesToDisplay });
            });
        } else {
            this.setState({ searchMode: false }, () => {
                this.setGamesToDisplay();
            });
        }

        if (nextProps.sortOption !== 'None') {
            StorageService.getSortedGames(nextProps.sortOption);
            this.setGamesToDisplay();
        }
    }

    setGamesToDisplay = () => {
        let gamesToDisplay = StorageService.getGames(this.state.offset, this.state.limit);
        this.setState({ gamesToDisplay });
    }

    getPrevious = () => {
        if (this.state.offset !== 0) {
            this.setState({ offset: this.state.offset - 1 }, () => {
                this.setGamesToDisplay();
            });
        }
    }

    getNext = () => {
        this.setState({ offset: this.state.offset + 1 }, () => {
            this.setGamesToDisplay();
        });
    }
}
import React, { Component } from 'react';
import './App.css';
import { ListPageComponent } from './components/ListPage/ListPage';
import gamesJson from './assets/games.json';
import * as StorageService from './services/storage.service';
import { NavBarComponent } from './components/NavBar/NavBar';

export class AppComponent extends Component {
  state = {
    searchStr: '',
    sortingOption: 'None'
  }

  render() {
    return (
      <div className="App">
        <NavBarComponent searchFor={this.getSearchResult} sortingOption={this.getSortedResult}/>
        <ListPageComponent searchStr={this.state.searchStr} sortOption={this.state.sortingOption}/>
      </div>
    )
  }

  componentDidMount()  {
    // getting the csv details
    // storing it in the localStorage using the storage service
    StorageService.saveGames(gamesJson);
  }

  getSearchResult = (searchStr) => {
    this.setState({ searchStr });
  }

  getSortedResult = (option) => {
    this.setState({ sortingOption: option });
  }
}

export default AppComponent;

import React, { Component } from 'react';
import axios from 'axios';
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";



//App comps
import PhotoList from './Components/PhotoList';
import SearchForm from './Components/SearchForm';
import Nav from './Components/Nav';



// imported config files variables for a hidden apiKey
import apiKey from './Config.js';

class App extends Component {



  constructor () {
    super();
    this.state = {
      photos: [],
      cats: [],
      dogs: [],
      trees: [],
      tag: "",
      isLoading: true,
      path: ''
    };
  }

  componentDidMount() {
    this.performSearchForCats();
    this.performSearchForDogs();
    this.performSearchForTrees();



  }

  performSearch = (query) => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {

        this.setState({
          photos: response.data.photos.photo,
          tag: query,
          titles: `${query}: gallery`,
          isLoading: false,
        }
        );
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });

  };

  performSearchForCats = () => {

    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cats&per_page=24&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          cats: responseData.photos.photo,
          isLoading: false,
          titleCat: `cats gallery`
        });
      })
      .catch(error => {
        console.log('error fetching', error);
      });
  };

  performSearchForDogs = () => {

    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=dogs&per_page=24&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          dogs: responseData.photos.photo,
          isLoading: false,
          titleDogs: `dogs gallery`
        });
      })
      .catch(error => {
        console.log('error fetching', error);
      });
  };

  performSearchForTrees = () => {

    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=trees&per_page=24&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          trees: responseData.photos.photo,
          isLoading: false,
          titleTrees: `Trees gallery`
        });
      })
      .catch(error => {
        console.log('error fetching', error);
      });
  };


  render() {
    return (
      <BrowserRouter>
        <div className="main-container">
          <h1>Image Search</h1>
          <SearchForm onSearch={this.performSearch} />
          <Nav />
          <Switch>
            <Route exact path="/" render={() => <Redirect to='/cats' />} />
            <Route exact path="/cats" render={() => <PhotoList data={this.state.cats} title={this.state.titleCat} loading={this.state.isLoading} />} />
            <Route exact path="/dogs" render={() => <PhotoList data={this.state.dogs} title={this.state.titleDogs} loading={this.state.isLoading} />} />
            <Route exact path="/trees" render={() => <PhotoList data={this.state.trees} title={this.state.titleTrees} loading={this.state.isLoading} />} />
            <Route path="/search" render={() => (this.state.isLoading) ?
              <p>Loading</p> : <PhotoList data={this.state.photos} title={this.state.titles} />

            } />

          </Switch>
        </div>

      </BrowserRouter >

    );



  }

}

export default App;


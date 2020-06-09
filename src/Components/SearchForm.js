import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class SearchForm extends Component {

  state = {
    searchText: '',
    
  };

  onSearchChange = e => {
    this.setState({ searchText: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSearch(this.query.value);
    this.props.history.push(`/search/${this.state.searchText}`);
    e.currentTarget.reset();
  };

  render() {
    return (

      <form className="search-form" onSubmit={this.handleSubmit} >
        <input type="search"
          onChange={this.onSearchChange}
          name="search"
          ref={(input) => this.query = input}
          placeholder="Search..." />
        <button type="submit" id="submit" className="search-button"><i className="material-icons icn-search">search</i></button>
      </form>






    );
  }
}


export default withRouter(SearchForm);
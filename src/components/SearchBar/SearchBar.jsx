import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Notiflix from 'notiflix';
import {
  SearchBarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './SearchBar.styled';

export default class SearchBar extends Component {
  static propTypes = {
    nameExample: PropTypes.func.isRequired,
  };
  state = {
    searchQuery: '',
  };

  handleInput = e => {
    const { value } = e.currentTarget;

    this.setState({
      searchQuery: value.toLowerCase(),
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      Notiflix.Notify.warning('empty search field', {
        position: 'center-center',
      });
      return;
    }
    this.props.nameExample(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };
  render() {
    return (
      <SearchBarHeader>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.handleInput}
          />
        </SearchForm>
      </SearchBarHeader>
    );
  }
}

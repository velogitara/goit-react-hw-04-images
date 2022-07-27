import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Notiflix from 'notiflix';
import {
  SearchBarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './SearchBar.styled';

export default function SearchBar({ nameExample }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInput = e => {
    const { value } = e.currentTarget;

    setSearchQuery(value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      Notiflix.Notify.warning('empty search field', {
        position: 'center-center',
      });
      return;
    }
    nameExample(searchQuery);

    // setSearchQuery('');  а Репета делал!!!
  };

  return (
    <SearchBarHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleInput}
        />
      </SearchForm>
    </SearchBarHeader>
  );
}

SearchBar.propTypes = {
  nameExample: PropTypes.func.isRequired,
};

// export default class SearchBar extends Component {
//   static propTypes = {
//     nameExample: PropTypes.func.isRequired,
//   };
//   state = {
//     searchQuery: '',
//   };

//   handleInput = e => {
//     const { value } = e.currentTarget;

//     this.setState({
//       searchQuery: value.toLowerCase(),
//     });
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     if (this.state.searchQuery.trim() === '') {
//       Notiflix.Notify.warning('empty search field', {
//         position: 'center-center',
//       });
//       return;
//     }
//     this.props.nameExample(this.state.searchQuery);
//     this.setState({ searchQuery: '' });
//   };
//   render() {
//     return (
//       <SearchBarHeader>
//         <SearchForm onSubmit={this.handleSubmit}>
//           <SearchFormButton type="submit">
//             <SearchFormButtonLabel>Search</SearchFormButtonLabel>
//           </SearchFormButton>

//           <SearchFormInput
//             className="input"
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             value={this.state.searchQuery}
//             onChange={this.handleInput}
//           />
//         </SearchForm>
//       </SearchBarHeader>
//     );
//   }
// }

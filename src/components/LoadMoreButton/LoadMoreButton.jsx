import React, { Component } from 'react';
import { Button } from './LoadMoreButton.styled';

export default class LoadMoreButton extends Component {
  render() {
    return (
      <Button
        type="button"
        aria-label="load more button"
        onClick={this.props.onClick}
      >
        Load more...
      </Button>
    );
  }
}

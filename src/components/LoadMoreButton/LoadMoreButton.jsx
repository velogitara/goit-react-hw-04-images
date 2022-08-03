import PropTypes from 'prop-types';
import React from 'react';
import { Button } from './LoadMoreButton.styled';

export default function LoadMoreButton({ onClick }) {
  return (
    <Button type="button" aria-label="load more button" onClick={onClick}>
      Load more...
    </Button>
  );
}

LoadMoreButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

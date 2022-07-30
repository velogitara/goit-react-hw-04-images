import PropTypes from 'prop-types';
import React from 'react';
import { ImageGalleryList } from './ImageGallery.styled';
import GalleryItem from '../ImageGalleryItem';

export default function ImageGallery({
  error,
  status,
  galleryData,
  getLargeImg,
}) {
  if (status === 'idle') {
    return (
      <ImageGalleryList>
        <p>Введите слово поиска</p>
      </ImageGalleryList>
    );
  }

  if (status === 'rejected') {
    return (
      <ImageGalleryList>
        <p>{error}</p>
      </ImageGalleryList>
    );
  }

  if (status === 'resolved') {
    return (
      <ImageGalleryList>
        {galleryData.map(item => (
          <li key={item.id}>
            <GalleryItem
              webformatURL={item.webformatURL}
              largeImageURL={item.largeImageURL}
              tags={item.tags}
              getLargeImg={getLargeImg}
            />
          </li>
        ))}
      </ImageGalleryList>
    );
  }
}

ImageGallery.propTypes = {
  error: PropTypes.string,
  status: PropTypes.string.isRequired,
  galleryData: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  getLargeImg: PropTypes.func.isRequired,
};

import PropTypes, { object } from 'prop-types';
import React from 'react';
import { ImageGalleryList } from './ImageGallery.styled';
import GalleryItem from '../ImageGalleryItem';

ImageGallery.propTypes = {
  error: PropTypes.object,
  status: PropTypes.string.isRequired,
  galleryData: PropTypes.arrayOf(object).isRequired,
};
export default function ImageGallery({
  error,
  status,
  galleryData,
  toggleModal,
  getLargeImg,
}) {
  if (status === 'idle') {
    return <ImageGalleryList>Введите слово поиска</ImageGalleryList>;
  }

  if (status === 'rejected') {
    console.log(error.message);
    return <ImageGalleryList>{error.message}</ImageGalleryList>;
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
              //   showModal={toggleModal}
              getLargeImg={getLargeImg}
            />
          </li>
        ))}
      </ImageGalleryList>
    );
  }
}

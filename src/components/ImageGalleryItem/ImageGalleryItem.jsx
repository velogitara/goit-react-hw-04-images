import React from 'react';
import {
  ImageGalleryItem,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';

export default function GalleryItem({
  webformatURL,
  largeImageURL,
  tags,
  getLargeImg,
}) {
  return (
    <ImageGalleryItem>
      <ImageGalleryItemImage
        src={webformatURL}
        alt={tags}
        onClick={() => {
          getLargeImg(largeImageURL);
        }}
      />
    </ImageGalleryItem>
  );
}

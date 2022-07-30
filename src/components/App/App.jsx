import imageApi from '../../services/Api';
import SearchBar from '../SearchBar';
import ImageGallery from 'components/ImageGallery';
import LoadMoreButton from 'components/LoadMoreButton';
import Loader from 'components/Loader';
import ModalWindow from '..//ModalWindow';
import { ContainerApp } from './app.styled';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [total, setTotal] = useState(null);
  const [hits, setHits] = useState(null);
  const [page, setPage] = useState(1);
  const [galleryData, setGalleryData] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [largeImgUrl, setLargeImgUrl] = useState('');
  const [response, setResponse] = useState(true);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    // const getResponse = resp => {
    //   if (resp !== response) {
    //     setResponse(resp);
    //   }
    // };
    setTimeout(() => {
      imageApi
        .fetchPic(searchQuery, page)
        .then(data => {
          if (data.total === 0) {
            return Promise.reject(new Error(`нет такого в поиске >>> `));
          }
          return (
            setGalleryData(galleryData => [...galleryData, ...data.hits]),
            setStatus('resolved'),
            setTotal(data.total),
            setHits(data.hits.length),
            setResponse(true)
          );
        })
        .catch(error => {
          setError(error.message);
          setStatus('rejected');
        });
    }, 1000);
  }, [page, searchQuery]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const getQuery = searchQ => {
    if (searchQ !== searchQuery) {
      setSearchQuery(searchQ);
      setPage(1);
      setGalleryData([]);
      setStatus('pending');
      setHits(null);
      setTotal(null);
    } else {
      toast.info('its Same Search');
    }
  };
  const getLargeImg = largeImgUrl => {
    setLargeImgUrl(largeImgUrl);
    toggleModal();
  };

  const handlerClick = () => {
    setPage(page => page + 1);
    setResponse(false);
  };

  return (
    <ContainerApp>
      <SearchBar nameExample={getQuery} />
      <ImageGallery
        galleryData={galleryData}
        status={status}
        error={error}
        getLargeImg={getLargeImg}
      />
      {status === 'pending' && <Loader />}

      {!response && <Loader />}

      {response && total > 12 && hits !== total && (
        <LoadMoreButton onClick={handlerClick} />
      )}
      {showModal && (
        <ModalWindow toggleModal={toggleModal}>
          <img src={largeImgUrl} alt="" />
        </ModalWindow>
      )}

      <ToastContainer autoClose={3000} position="top-center" closeOnClick />
    </ContainerApp>
  );
}

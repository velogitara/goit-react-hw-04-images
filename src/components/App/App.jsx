import imageApi from '../../services/Api';
import SearchBar from '../SearchBar';
import ImageGallery from 'components/ImageGallery';
import LoadMoreButton from 'components/LoadMoreButton';
import Loader from 'components/Loader';
import ModalWindow from '..//ModalWindow';
import { ContainerApp } from './app.styled';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { Component } from 'react';
import { toast } from 'react-toastify';

export default class App extends Component {
  state = {
    searchQuery: '',
    total: null,
    hits: null,
    page: 1,
    galleryData: [],
    error: null,
    status: 'idle',
    showModal: false,
    largeImgUrl: '',
    response: true,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevValue = prevState.searchQuery;
    const nextValue = this.state.searchQuery;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevValue !== nextValue || prevPage !== nextPage) {
      setTimeout(() => {
        imageApi
          .fetchPic(nextValue, this.state.page, this.getResponse)
          .then(galleryData => {
            if (!galleryData.total) {
              return Promise.reject(new Error(`нет такой херни >>> `));
            }

            return this.setState(prevState => ({
              galleryData: [...prevState.galleryData, ...galleryData.hits],
              status: 'resolved',
              total: galleryData.total,
              hits: galleryData.hits.length,
            }));
          })
          .catch(error => this.setState({ error, status: 'rejected' }));
      }, 500);
    }
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  getQuery = searchQuery => {
    if (this.state.searchQuery !== searchQuery) {
      this.setState({
        searchQuery,
        page: 1,
        galleryData: [],
        status: 'pending',
      });
    } else {
      toast.info('its Same Search');
    }
  };
  getLargeImg = largeImgUrl => {
    this.setState({
      largeImgUrl,
    });
    this.toggleModal();
  };
  getResponse = response => {
    if (this.state.response !== response) {
      this.setState({
        response,
      });
    }
  };

  handlerClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      response: false,
      // loader: true,
    }));
  };

  render() {
    const { total, hits, status, showModal, response } = this.state;
    return (
      <ContainerApp>
        <SearchBar nameExample={this.getQuery} />
        <ImageGallery
          galleryData={this.state.galleryData}
          status={this.state.status}
          error={this.state.error}
          getLargeImg={this.getLargeImg}
        />
        {status === 'pending' && <Loader />}

        {!response && <Loader />}

        {total > 12 && hits !== total && (
          <LoadMoreButton onClick={this.handlerClick} />
        )}
        {showModal && (
          <ModalWindow toggleModal={this.toggleModal}>
            <img src={this.state.largeImgUrl} alt="" />
          </ModalWindow>
        )}

        <ToastContainer autoClose={3000} position="top-center" closeOnClick />
      </ContainerApp>
    );
  }
}

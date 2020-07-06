import React, { Component } from "react";
import Searchbar from "./Components/Searchbar/Searchbar";
import ImageGallery from "./Components/ImageGallery/ImageGallery";
import * as imagesApi from "./utils/imagesApi";
import Button from "./Components/Button/Button";
import Loader from "./Components/Loader/Loader";
import Modal from "./Components/Modal/Modal";
import styles from "./App.module.css";

export default class App extends Component {
  static defaultProps = {};

  static propTypes = {};

  state = {
    images: [],
    page: 1,
    search: "",
    error: "",
    isLoading: false,
    isModalOpen: false,
    largeImageId: null,
    largeImage: []
  };

  componentDidMount() {}
  componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search) {
      this.fetchImages(false);
    }
  }

  onSearch = search => {
    this.setState({ search, images: [], page: 1 });
  };

  fetchImagesWithScroll = () => {
    this.fetchImages(true);
  };

  fetchImages = scroll => {
    this.setState({ isLoading: true });
    const { search, page } = this.state;
    imagesApi
      .fetchImages(search, page)
      .then(images => {
        this.setState(state => ({
          images: [...state.images, ...images],
          page: state.page + 1
        }));
        return images[0];
      })
      .catch(error => {
        this.setState({ error });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      })
      .then(firstLoadedImage => {
        if (scroll) {
          const { id } = firstLoadedImage;

          const y =
            document.getElementById(id).getBoundingClientRect().top +
            window.scrollY -
            80;
          window.scrollTo({
            top: y,
            behavior: "smooth"
          });
        }
      });
  };

  findImg = () => {
    const largeImg = this.state.images.find(image => {
      return image.id === this.state.largeImageId;
    });
    return largeImg;
  };

  openModal = e => {
    this.setState({
      isModalOpen: true,
      largeImageId: Number(e.currentTarget.id)
    });
  };
  closeModal = () => this.setState({ isModalOpen: false });

  render() {
    const { isLoading, images, isModalOpen, largeImageId } = this.state;

    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.onSearch} />
        <ImageGallery openModal={this.openModal} images={images} />
        {isLoading && <Loader />}
        {images.length > 0 && (
          <Button fetchImages={this.fetchImagesWithScroll} />
        )}
        {isModalOpen && (
          <Modal largeImageId={largeImageId} onClose={this.closeModal}>
            <img src={this.findImg().largeImageURL} alt={this.findImg().tags} />
          </Modal>
        )}
      </div>
    );
  }
}

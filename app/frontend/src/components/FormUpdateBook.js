import React, { useState, useEffect } from 'react';
import { useContext } from "react";
import PropTypes from 'prop-types';
import HeaderContext from "../context/HeaderContext";
import { axiosGetBookById, axiosUpdateBook } from '../services/fetchs';
import { useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Modal from 'react-modal';

function FormUpdateBook(props) {
  const navigate = useNavigate();
  const { bookId, setShowUpdateForm, showUpdateForm } = props;
  const { setRenderBooks } = useContext(HeaderContext);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    pages: "",
    year: "",
    edition: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    const getBooks = async (bookId) => {
    try {
        const response = await axiosGetBookById(bookId);
        setFormData({
          title: response.data.title,
          author: response.data.author,
          genre: response.data.genre,
          pages: response.data.pages,
          year: response.data.year,
          edition: response.data.edition,
          price: response.data.price,
          image: response.data.image,
        })
      } catch (error) {
        if (error.response && error.response.status === 401) {
          toast.info("Desculpe, sua sessão expirou. Por favor, faça login novamente para continuar.")
          navigate('/');
        } else {
          console.error('Erro na requisição:', error.message);
        }
      }
    }
    getBooks(bookId);
  }, [bookId, navigate]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosUpdateBook(formData, bookId);
      setShowUpdateForm((prevValue) => !prevValue);
      setRenderBooks((prevValue) => !prevValue);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.info("Desculpe, sua sessão expirou. Por favor, faça login novamente para continuar.")
        navigate('/');          
      } else {
        console.error('Erro na requisição:', error.message);
      }
    }
  };

  const handleCloseForm = () => {
    setShowUpdateForm((prevValue) => !prevValue);
  }
  
  return (
    <div className="container-modal">
      <Modal
        isOpen={showUpdateForm}
        onRequestClose={() => setShowUpdateForm}
        className="react-modal"
        overlayClassName="overlay-react-modal"
      >            
        <div className="book-form-update">
          <ToastContainer />
          <form onSubmit={handleSubmit}>
            <label htmlFor="input-update-title">
              Título:
              <input
                id="input-update-title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </label>
            <label htmlFor="input-update-author">
              Autor:
              <input
                id="input-update-author"
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
              />
            </label>
            <label htmlFor="input-update-genre">
              Gênero:
              <input
                id="input-update-genre"
                type="text"
                name="genre"
                value={formData.genre}
                onChange={handleInputChange}
              />
            </label>
            <label htmlFor="input-update-pages">
              Gênero:
              <input
                id="input-update-pages"
                type="text"
                name="pages"
                value={formData.pages}
                onChange={handleInputChange}
              />
            </label>
            <label htmlFor="input-update-year">
              Ano:
              <input
                id="input-update-year"
                type="text"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
              />
            </label>
            <label htmlFor="input-update-edition">
              Edição:
              <input
                id="input-update-edition"
                type="text"
                name="edition"
                value={formData.edition}
                onChange={handleInputChange}
              />
            </label>
            <label htmlFor="input-update-price">
              Preço: R$ 
              <input
                id="input-update-price"
                type="text"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
              />
            </label>
            <label htmlFor="input-update-image">
              Imagem:
              <input
                id="input-update-image"
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
              />
            </label>
            <button
              className='btn'
              type="submit"
              disabled={true}
            >
              Update Book
            </button>
            <button
              onClick={() => handleCloseForm()}
              className='btn'
              type="button"
            >
              Close
            </button>
          </form>
        </div>
      </Modal>
    </div>    
  )
}

FormUpdateBook.propTypes = {
  bookId: PropTypes.string.isRequired, // Correção na definição de PropTypes
  setShowUpdateForm: PropTypes.func.isRequired,
  showUpdateForm: PropTypes.bool.isRequired
};

export default FormUpdateBook;
import PropTypes from 'prop-types';
import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { useContext, useState } from "react";
import FormUpdateBook from './FormUpdateBook';
import { axiosDeleteBook } from '../services/fetchs';
import HeaderContext from '../context/HeaderContext';
import { ToastContainer, toast } from 'react-toastify';

export default function CardBook(props) {
  const { setRenderBooks } = useContext(HeaderContext);
  const { _id, title, author, genre, image, pages, year, edition, price } = props;
  const formattedPrice = price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const [showUpdateFormForThisBook, setShowUpdateFormForThisBook] = useState(false);
  const updateBook = () => {
    console.log("Update book clicked");
    console.log("showUpdateFormForThisBook: ", showUpdateFormForThisBook);
    setShowUpdateFormForThisBook(true);  
  }

  const removeBook = async (id) => {
    try {
      await axiosDeleteBook(id);
      toast.success("O livro foi deletado com sucesso!");
      setRenderBooks((prevValue) => !prevValue);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.info("Desculpe, sua sessão expirou. Por favor, faça login novamente para continuar.")
        navigate('/');          
      } else {
        toast.error('Erro na requisição:', error.message)
        console.error('Erro na requisição:', error.message);
      }
    }
  }
  
  return (
    <div className="box-cards">
      <div className="card">
      <ToastContainer />
      <img className="book-image" src={image} alt={title}/>
      <div className="book-info-icon">
        <div className="book-info">
          <h3>Título: { title }</h3>
          <h4>Autor: { author }</h4>
          <h4>Gênero: { genre }</h4>
          <h4>Páginas totais: { pages }</h4>
          <h4>Ano: { year }</h4>
          <h4>Edição: { edition }</h4>
          <h4>Preço: { formattedPrice }</h4>
        </div>
        <div className="icon_holder">
          <BiEditAlt className="icon" onClick={() => updateBook()} />
          <BsTrash className="icon" onClick={() => removeBook(_id)} />
        </div>
      </div>      
    </div>
      <div className="container-modal">
        <FormUpdateBook
          bookId={_id}
          key={`${_id}${Math.round(Math.random*10)}`}
          setShowUpdateForm={setShowUpdateFormForThisBook}
          showUpdateForm={showUpdateFormForThisBook}
        />
      </div>
    </div>
  )
}

CardBook.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  genre: PropTypes.string,
  image: PropTypes.string,
  pages: PropTypes.string,
  year: PropTypes.string,
  edition: PropTypes.string,
  price: PropTypes.number,
}.isRequired;

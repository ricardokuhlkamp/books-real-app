import React, { useContext, useEffect } from 'react'
import CardBook from '../components/CardBook';
import HeaderContext from '../context/HeaderContext';
import { axiosGetAllBooks } from '../services/fetchs';
import { useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function Home() {
  const navigate = useNavigate();

  const { setShowHeader, renderBooks } = useContext(HeaderContext);
  const { booksContext, setBooksContext } = useContext(HeaderContext);

  useEffect(() => {
    // estado para controlar a exibição do header
    setShowHeader(true);
  }, [setShowHeader]);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await axiosGetAllBooks();
        setBooksContext(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          toast.info("Desculpe, sua sessão expirou. Por favor, faça login novamente para continuar.")
          navigate('/');          
        } else {
          console.error('Erro na requisição:', error.message);
        }
      }
    }
    getBooks();
  }, [renderBooks, setBooksContext, navigate]);
  return (
    <div className="container-books">
      <ToastContainer />
      { booksContext?.length > 0 ? (
     booksContext.map((book) => {
      return (
        <CardBook { ...book} key={ `${book.title}${Math.round(Math.random*10)}` } />
      )
     })
    ) : <></>}</div>
  )
}

export default Home;
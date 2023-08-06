import { NavLink } from 'react-router-dom';
import { useContext } from "react";
import HeaderContext from "../context/HeaderContext";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate} from 'react-router-dom';
import {
  axiosGetBookByTitle,
  axiosGetBooksByAuthor,
  axiosGetAllBooks,
  axiosGetBooksByGenre
} from '../services/fetchs';

function NavBar() {
  const navigate = useNavigate();
  const { showHeader, selected, setSelected, setBooksContext } = useContext(HeaderContext);
  const handleTokenEmpty = () => {
    localStorage.removeItem('user');
  }

  const getBookByTitle = async () => {
    try {
      const response = await axiosGetBookByTitle(selected.searchInput);
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

  const getBooksByAuthor = async () => {
    try {
      const response = await axiosGetBooksByAuthor(selected.searchInput);
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

  const getBookByGenre = async () => {
    try {
      const response = await axiosGetBooksByGenre(selected.searchInput);
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

  const searchOptionsMap = {
    title: getBookByTitle,  // Use o nome da função diretamente, sem "()"
    author: getBooksByAuthor,
    genre: getBookByGenre,
  };
  const handleFilter = () => {
    if (selected.searchInput.length < 1) {      
      return toast.info("Para efetuar a busca é necessário digitar a requisição desejada!");
    }
    const searchFunction = searchOptionsMap[selected.searchRadio];
    setSelected({
      searchInput: '',
      searchRadio: '',
    });
    if (searchFunction) {
      setBooksContext(searchFunction(selected.searchInput));
    } else {
      toast.error("Opção de busca inválida");
    }    
  }

  const handleRenderHome = async () => {
    try {
      const response = await axiosGetAllBooks();
      setBooksContext(response.data);
      navigate('/home');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.info("Desculpe, sua sessão expirou. Por favor, faça login novamente para continuar.")
        navigate('/');          
      } else {
        console.error('Erro na requisição:', error.message);
      }
    }

  }
  return (
    <div className="navbar">
      <ToastContainer />
      {showHeader && (
        <nav>
          <div className="left-bar">
            <label
              htmlFor="search-input"
            >
              <input
                placeholder="search"
                id="search-input"
                className="search-input"
                type="search"
                value={ selected.searchInput}
                onChange={ (e) => setSelected({ ...selected, searchInput: e.target.value })}
              >
              </input>
            </label>
            <label htmlFor="title">
              <input
                placeholder="title"
                type="radio"
                id="title"
                value="title"
                name="search-radio"
                onChange={ (e) => setSelected({ ...selected, searchRadio: e.target.value }) }
                checked={selected.searchRadio === 'title'} 
              />
              Title
            </label>
            <label htmlFor="author">
              <input
                placeholder="author"
                type="radio"
                id="author"
                value="author"
                name="search-radio"
                onChange={ (e) => setSelected({ ...selected, searchRadio: e.target.value }) }
              />
              Author
            </label>
            <label htmlFor="genre">
              <input
                placeholder="genre"
                type="radio"
                id="genre"
                value="genre"
                name="search-radio"
                onChange={ (e) => setSelected({ ...selected, searchRadio: e.target.value }) }
              />
              Genre
            </label>
            <button
              onClick={ () => {
                handleFilter();
                setSelected({
                  searchInput: '',
                  searchRadio: '',
                });
              }}
            >
              Search
            </button>
          </div>
          <div className="central-bar">
            <button
              onClick={ () => {
                setSelected({
                  searchInput: '',
                });
                handleRenderHome();
              }}
            >
              All Books
            </button>
          </div>
          <div className="right-bar">
            <NavLink
              onClick={() => handleTokenEmpty()}
              to="/"
            >Logout
            </NavLink>
            {/* <NavLink to="/signin">Sign In</NavLink> */}
            <NavLink
              to="/home"
              // onClick={handleRenderHome}
            >Home</NavLink>
            <NavLink to="/newbook">NewBook</NavLink>
          </div>
        </nav>
      )}
    </div>    
  )
}

export default NavBar;

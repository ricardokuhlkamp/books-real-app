import React, { useState } from 'react'
import { axiosCreateBook } from '../services/fetchs';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function NewBook() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [edition, setEdition] = useState("");
  const [genre, setGenre] = useState("");
  const [image, setImage] = useState("");
  const [pages, setPages] = useState("");
  const [year, setYear] = useState("");

  const handleCreate = async () => {
    try {
      const bodyData = {
        title,
        author,
        genre,
        image,
        pages,
        year,
        edition,
        price,
      };
      console.log(bodyData)
      const response = await axiosCreateBook(bodyData);
      if (String(response.statusText) === "Created") {
        toast.success('Livro criado!');
        navigate('/home');
      } else {
        toast.error('não foi possível criar o livro');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Redirecionar para a página de login
        toast.info("Desculpe, sua sessão expirou. Por favor, faça login novamente para continuar.");
        navigate('/');
      } else {
        // Lidar com outros erros
        console.error('Erro na requisição:', error.message);
      }
    }    
  }

  return (
    <main>
      <ToastContainer />
      <form>
        <fieldset>
          <label htmlFor="input-title">
            <input
              className="input"
              id="input-title"
              type="text"
              value={title}
              placeholder="title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
        </fieldset>
        <fieldset>
          <label htmlFor="input-author">
            <input
              id="input-author"
              type="text"
              value={author}
              placeholder="author"
              onChange={(e) => setAuthor(e.target.value)}
            />
          </label>
        </fieldset>
        <fieldset>

          <label htmlFor="input-price">
            <input
              id="input-price"
              type="text"
              value={price}
              placeholder="price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
        </fieldset>
        <fieldset>
          <label htmlFor="input-edition">
            <input
              id="input-edition"
              type="text"
              value={edition}
              placeholder="edition"
              onChange={(e) => setEdition(e.target.value)}
            />
          </label>
        </fieldset>
        <fieldset>
          <label htmlFor="input-genre">
            <input
              id="input-genre"
              type="text"
              value={genre}
              placeholder="genre"
              onChange={(e) => setGenre(e.target.value)}
            />
          </label>
        </fieldset>
        <fieldset>
          <label htmlFor="input-image">
            <input
              id="input-image"
              type="text"
              value={image}
              placeholder="image"
              onChange={(e) => setImage(e.target.value)}
            />
          </label>
        </fieldset>
        <fieldset>
          <label htmlFor="input-pages">
            <input
              id="input-pages"
              type="text"
              value={pages}
              placeholder="pages"
              onChange={(e) => setPages(e.target.value)}
            />
          </label>
        </fieldset>
        <fieldset>
          <label htmlFor="input-year">
            <input
              id="input-year"
              type="text"
              value={year}
              placeholder="year"
              onChange={(e) => setYear(e.target.value)}
            />
          </label>
        </fieldset>
        <button
          className='btn'
          type="submit"
          disabled={localStorage.getItem('adminBooks') === process.env.ADMIN ? true : false}
          onClick={() => handleCreate()}
        >
          Create
        </button>
      </form>
    </main>
  )
}

export default NewBook;
import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import HeaderContext from './HeaderContext';

function HeaderProvider({children}) {
  const [showHeader, setShowHeader] = useState(true);
  // const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [renderBooks, setRenderBooks] = useState(false);
  const [selected, setSelected] = useState({ // cria um objeto com o valor digitado e radio button selecionado pelo usuário
    searchInput: '',
    searchRadio: '',
  });
  const [booksContext, setBooksContext] = useState([]); // armazena todos os livros

  const contextValue = useMemo(() => (
    {showHeader, setShowHeader, renderBooks, setRenderBooks, selected, setSelected, booksContext, setBooksContext}
  ), [showHeader, setShowHeader, renderBooks, setRenderBooks, selected, setSelected, booksContext, setBooksContext]);

  return (
    <HeaderContext.Provider value={contextValue}>
      {children}
    </HeaderContext.Provider>
  );
}

HeaderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HeaderProvider;

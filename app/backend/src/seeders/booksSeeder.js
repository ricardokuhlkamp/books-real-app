const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Book = require("../models/BookModel");

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

// Configuração do Mongoose para conectar ao banco de dados
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected...");
    seedBooks();
  })
  .catch((err) => console.log(err));

// Função para criar dados iniciais de exemplo
const seedBooks = async () => {
  try {
    await Book.deleteMany({}); // Limpa todos os documentos existentes na coleção Book

    const booksData = [
      {
        title:"Silo",
        author:"Hugh Howey",
        genre:"ficção cietífica",
        image:"https://m.media-amazon.com/images/I/71nwuHd0KTL._AC_UF1000,1000_QL80_.jpg",
        pages:"500",
        year: 2014,
        edition:"1 ª edição",
        price: 30.00,
      },
      {
        title:"Trilogia da Fundação - Deluxe",
        author:"Isaac Asimov",
        genre:"ficção cietífica",
        image:"https://m.media-amazon.com/images/I/41D5QQMs-TL._SY498_BO1,204,203,200_.jpg",
        pages:"880",
        year: 2019,
        edition:"Ed. comemorativa",
        price: 117.99,
      },
      {
        title:"Duna",
        author:"Frank Herbert",
        genre:"ficção científica",
        image:"https://m.media-amazon.com/images/I/41MRn6hy8-L._SY344_BO1,204,203,200_QL70_ML2_.jpg",
        pages:"680",
        year: 2017,
        edition:"2. ed.",
        price: 50.00,
      },
      {
        title:"Perdido Em Marte",
        author:"Andy Weir",
        genre:"ficção científica",
        image:"https://m.media-amazon.com/images/I/41FhMSiWxrL._SY344_BO1,204,203,200_QL70_ML2_.jpg",
        pages:"335",
        year: 2014,
        edition:"1. ed.",
        price: 25.90,
      }   
      // Adicione mais objetos de livro aqui, se necessário
    ];

    await Book.insertMany(booksData); // Insere os dados iniciais na coleção Book

    console.log("Dados de exemplo criados com sucesso.");
    mongoose.connection.close(); // Fecha a conexão do Mongoose após a conclusão da inserção
  } catch (err) {
    console.error("Erro ao criar dados de exemplo:", err);
  }
};

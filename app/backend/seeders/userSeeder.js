const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/UserModel");

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

// Configuração do Mongoose para conectar ao banco de dados
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected...");
    seedUsers();
  })
  .catch((err) => console.log(err));

// Função para criar dados iniciais de exemplo
const seedUsers = async () => {
  try {
    // await User.deleteMany({}); // Limpa todos os documentos existentes na coleção User

    const usersData = [
      {
        username: "Ricardo",
        email: "ricardo@email.com",
        password: "1234",
      },
      {
        username: "Rafael",
        email: "rafael@email.com",
        password: "12345a",
      },
      {
        username: "Felicio",
        email: "felicio@email.com",
        password: "fff12345a",
      },
      {
        username: "Edna",
        email: "edna@email.com",
        password: "eff77f15a",
      },
      // Adicione mais objetos de livro aqui, se necessário
    ];

    await User.insertMany(usersData); // Insere os dados iniciais na coleção User

    console.log("Dados de exemplo criados com sucesso.");
    mongoose.connection.close(); // Fecha a conexão do Mongoose após a conclusão da inserção
  } catch (err) {
    console.error("Erro ao criar dados de exemplo:", err);
  }
};

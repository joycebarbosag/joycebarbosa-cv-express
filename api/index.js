import "dotenv/config";
import cors from "cors";
import express from "express";
import models, { sequelize } from "./models/index.js";
import routes from "./routes/index.js"; 

const app = express();
const port = process.env.PORT || 3000;
const eraseDatabaseOnSync = process.env.ERASE_DB === "true" ?? false;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`🔹 ${req.method} ${req.url} - Body:`, req.body);
  next();
});

app.use((req, res, next) => {
  req.context = { models };
  next();
});

app.use("/persons", routes.person);
app.use("/contacts", routes.contact);
app.use("/addresses", routes.address);

app.get("/", (req, res) => {
  res.send("A API do currículo da aluna Joyce Barbosa está rodando! Explore as rotas criadas.");
});

sequelize
  .sync({ force: eraseDatabaseOnSync })
  .then(() => {
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar com o banco de dados:", err);
  });
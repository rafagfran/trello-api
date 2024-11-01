import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const apiKey = "10809aedbb263ff07ffacdf532319fe6";
const apiToken = "ATTA60bcd0b8af169fbcf513860e0dd71d6d5d724e55054e63bdbb6538bcf49a2c8b2AE5F7C7";
const listId = "6724ba8ac9debce5801a27da";

app.get("/", (req, res) => {
  res.send("Olá, mundo! Servidor Express está rodando!");
});

app.post("/create-card", async (req, res) => {
  const { name, description } = req.body;
	console.log(name, description);
  try {
    const response = await axios.post(
      `https://api.trello.com/1/cards?idList=${listId}&key=${apiKey}&token=${apiToken}`,
      {
        name: name,
        desc: description,
      }
    );

    res.status(201).json({ message: "Card criado com sucesso!", card: response.data });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar o card", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

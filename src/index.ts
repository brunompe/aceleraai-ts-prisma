import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();

const PORT: number = parseInt(process.env.PORT as string) || 9000;

const app = express();

app.use(cors());
app.use(express.json());

app.listen(PORT, () =>
  console.log(`Server está rodando com poder maior que ${PORT}`)
);

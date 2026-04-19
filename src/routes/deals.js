import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Pobieranie wszystkich okazji
router.get("/", async (req, res) => {
  const deals = await prisma.deal.findMany({
    orderBy: { createdAt: "desc" }
  });
  res.json(deals);
});

// Dodawanie okazji
router.post("/", async (req, res) => {
  const { title, description, price, url, store, userId } = req.body;

  const deal = await prisma.deal.create({
    data: {
      title,
      description,
      price,
      url,
      store,
      userId
    }
  });

  res.json(deal);
});

export default router;

`js
import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Oddanie głosu
router.post("/", async (req, res) => {
  const { userId, dealId, value } = req.body;

  // Sprawdź, czy użytkownik już głosował
  const existing = await prisma.vote.findFirst({
    where: { userId, dealId }
  });

  if (existing) {
    // Aktualizacja głosu
    const updated = await prisma.vote.update({
      where: { id: existing.id },
      data: { value }
    });
    return res.json(updated);
  }

  // Nowy głos
  const vote = await prisma.vote.create({
    data: { userId, dealId, value }
  });

  res.json(vote);
});

// Pobieranie sumy głosów
router.get("/:dealId", async (req, res) => {
  const dealId = parseInt(req.params.dealId);

  const votes = await prisma.vote.findMany({
    where: { dealId }
  });

  const score = votes.reduce((sum, v) => sum + v.value, 0);

  res.json({ score });
});

export default router;
`

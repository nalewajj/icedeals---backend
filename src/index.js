import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import dealRoutes from "./routes/deals.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/deals", dealRoutes);

app.get("/", (req, res) => {
  res.send("IceDeals backend działa");
});

app.listen(4000, () => console.log("Backend running on port 4000"));
`js
import voteRoutes from "./routes/votes.js";
app.use("/votes", voteRoutes);
`

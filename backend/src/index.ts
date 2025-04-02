import express, { type Express, Request, Response } from "express";
import { Pool } from "pg";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const APP_PORT = process.env.PORT || 3000;
const pg_user = process.env.PG_USER || "postgres";
const pg_host = process.env.PG_HOST || "localhost";
const pg_database = process.env.PG_DATABASE || "postgres";
const pg_password = process.env.PG_PASSWORD || "postgres";
const pg_port = parseInt(process.env.PG_PORT || "5432");

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: pg_user,
  host: pg_host,
  database: pg_database,
  password: pg_password,
  port: pg_port,
});

// Routes
// GET all active opportunities
app.get("/api/opportunities", async (req: Request, res: Response) => {
  try {
    const todayDate = new Date().toISOString();
    const query = `
      SELECT * FROM "Opportunities"
      WHERE close_date > $1
      ORDER BY publish_date DESC
    `;
    const result = await pool.query(query, [todayDate]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching opportunities:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET all followed opportunities
app.get("/api/opportunities/followed", async (req: Request, res: Response) => {
  try {
    const todayDate = new Date().toISOString();
    const query = `
      SELECT * FROM "Opportunities"
      WHERE is_followed = true AND close_date > $1
      ORDER BY publish_date DESC
    `;

    const result = await pool.query(query, [todayDate]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching followed opportunities:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// UPDATE opportunity as followed
app.patch(
  "/api/opportunities/:id/follow",
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { isFollowed }: { isFollowed: boolean } = req.body;

    try {
      const query = `
      UPDATE "Opportunities"
      SET is_followed = $1
      WHERE id = $2
      RETURNING *
    `;

      const result = await pool.query(query, [isFollowed, id]);

      if (result.rows.length === 0) {
        res.status(404).json({ error: "Opportunity not found" });
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error("Error updating opportunity:", error);
      res
        .status(500)
        .json({ error: "Failed to update opportunity follow status" });
    }
  }
);

app.listen(APP_PORT, () => {
  console.log(`Server running on port ${APP_PORT}`);
});

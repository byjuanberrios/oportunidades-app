import type { Request, Response } from "express";
import pool from "../config/db";

// get all active opportunities
export const getOpportunities = async (req: Request, res: Response) => {
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
};

// get all followed opportunities
export const getFollowedOpportunities = async (req: Request, res: Response) => {
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
};

// update opportunity follow status
export const updateFollowedOpportunity = async (
  req: Request,
  res: Response
) => {
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
};

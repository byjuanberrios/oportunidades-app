import pool from "../config/db";

import type { Request, Response } from "express";
import type {
  OpportunitiesResponse,
  OpportunityResponse,
} from "../types/oportunities";

// get all active opportunities
export const getOpportunities = async (
  req: Request,
  res: Response
): Promise<OpportunitiesResponse> => {
  try {
    const todayDate = new Date().toISOString();
    const query = `
        SELECT * FROM "Opportunities"
        WHERE close_date > $1
        ORDER BY publish_date DESC
      `;
    const result = await pool.query(query, [todayDate]);
    return res.json(result.rows);
  } catch (error) {
    console.error("Error fetching opportunities:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// get all followed opportunities
export const getFollowedOpportunities = async (
  req: Request,
  res: Response
): Promise<OpportunitiesResponse> => {
  try {
    const todayDate = new Date().toISOString();
    const query = `
        SELECT * FROM "Opportunities"
        WHERE is_followed = true AND close_date > $1
        ORDER BY publish_date DESC
      `;

    const result = await pool.query(query, [todayDate]);
    return res.json(result.rows);
  } catch (error) {
    console.error("Error fetching followed opportunities:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// update opportunity follow status
export const updateFollowedOpportunity = async (
  req: Request,
  res: Response
): Promise<OpportunityResponse> => {
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
      return res.status(404).json({ error: "Opportunity not found" });
    }
    return res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating opportunity:", error);
    return res
      .status(500)
      .json({ error: "Failed to update opportunity follow status" });
  }
};

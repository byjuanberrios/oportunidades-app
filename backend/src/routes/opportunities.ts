import { Router } from "express";
import {
  getOpportunities,
  getFollowedOpportunities,
  updateFollowedOpportunity,
} from "../controllers/opportunities";

const router = Router();

// GET all active opportunities
router.get("/opportunities", getOpportunities);

// GET all followed opportunities
router.get("/opportunities/followed", getFollowedOpportunities);

// UPDATE opportunity follow status
router.patch("/opportunities/:id/follow", updateFollowedOpportunity);

export default router;

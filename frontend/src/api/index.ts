import { createAsyncThunk } from "@reduxjs/toolkit";
import { Opportunity } from "@/types";

const API_URL = import.meta.env.VITE_API_URL;

export const getOpportunities = createAsyncThunk(
  "opportunities/getOpportunities",
  async (): Promise<Opportunity[]> => {
    const response = await fetch(`${API_URL}/opportunities`);
    return response.json();
  }
);

export const getFollowedOpportunities = createAsyncThunk(
  "opportunities/getFollowedOpportunities",
  async (): Promise<Opportunity[]> => {
    const response = await fetch(`${API_URL}/opportunities/followed`);
    return response.json();
  }
);

export const toggleFollow = createAsyncThunk(
  "opportunities/toggleFollow",
  async ({
    id,
    isFollowed,
  }: {
    id: string;
    isFollowed: boolean;
  }): Promise<Opportunity> => {
    const response = await fetch(`${API_URL}/opportunities/${id}/follow`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isFollowed: !isFollowed }),
    });
    return response.json();
  }
);

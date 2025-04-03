import { Opportunity } from "@/types";

const API_URL = "http://localhost:3000/api";

export const getOpportunities = async (): Promise<Opportunity[]> => {
  const response = await fetch(`${API_URL}/opportunities`);
  return response.json();
};

export const getFollowedOpportunities = async (): Promise<Opportunity[]> => {
  const response = await fetch(`${API_URL}/opportunities/followed`);
  return response.json();
};

export const toggleFollow = async (id: string): Promise<Opportunity> => {
  const response = await fetch(`${API_URL}/opportunities/toggle-follow/${id}`);
  return response.json();
};

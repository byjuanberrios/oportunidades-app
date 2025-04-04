import { OpportunitiesState, Opportunity } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const filterOpportunities = (
  opportunities: Opportunity[],
  filters: OpportunitiesState["filters"]
) => {
  const { startDate, endDate, type } = filters;
  const filteredOpportunities = opportunities.filter((opportunity) => {
    if (startDate && opportunity.publish_date < startDate) return false;
    if (endDate && opportunity.publish_date > endDate) return false;
    if (type && opportunity.type !== type) return false;
    return true;
  });
  return filteredOpportunities;
};

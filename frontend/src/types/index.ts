import { OpportunityType } from "@/lib/constants";

export type Opportunity = {
  id: number;
  code: string;
  title: string;
  type: OpportunityType;
  is_followed: boolean;
  publish_date: string;
  close_date: string;
};

export type OpportunitiesTableProps = {
  fetchData: () => Promise<Opportunity[]>;
};

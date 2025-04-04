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

export type OpportunitiesListProps = {
  showOnlyFollowed?: boolean;
};

export type OpportunitiesState = {
  list: Opportunity[];
  filteredList: Opportunity[];
  followedList: Opportunity[];
  filteredFollowedList: Opportunity[];
  filters: {
    startDate: string | null;
    endDate: string | null;
    type: string | null;
  };
  loading: boolean;
  error: string | null;
};

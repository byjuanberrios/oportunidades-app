export type Opportunity = {
  id: number;
  code: string;
  title: string;
  type: string;
  is_followed: boolean;
  publish_date: string;
  close_date: string;
};

export type OpportunitiesTableProps = {
  fetchData: () => Promise<Opportunity[]>;
  title?: string;
};

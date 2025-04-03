export enum OpportunityType {
  TENDER = "tender",
  AGILE = "agile",
}

export const OPPORTUNITY_TYPE_LABELS: Record<OpportunityType, string> = {
  [OpportunityType.TENDER]: "Licitación",
  [OpportunityType.AGILE]: "Compra ágil",
};

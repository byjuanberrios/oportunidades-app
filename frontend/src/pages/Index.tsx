import OpportunitiesTable from "@/components/OpportunitiesTable";
import { getOpportunities } from "@/api";

const Index = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Oportunidades Disponibles</h1>
      <OpportunitiesTable fetchData={getOpportunities} />
    </div>
  );
};

export default Index;

import OpportunitiesTable from "@/components/OpportunitiesTable";
import { getOpportunities } from "@/api";

const Index = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <OpportunitiesTable
        fetchData={getOpportunities}
        title="Oportunidades Disponibles"
      />
    </div>
  );
};

export default Index;

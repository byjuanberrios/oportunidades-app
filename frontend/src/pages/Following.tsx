import OpportunitiesTable from "@/components/OpportunitiesTable";
import { getFollowedOpportunities } from "@/api";

const Following = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Oportunidades en Seguimiento</h1>
      <OpportunitiesTable fetchData={getFollowedOpportunities} />
    </div>
  );
};

export default Following;

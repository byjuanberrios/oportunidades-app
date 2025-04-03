import OpportunitiesTable from "@/components/OpportunitiesTable";
import { getFollowedOpportunities } from "@/api";

const Following = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <OpportunitiesTable
        fetchData={getFollowedOpportunities}
        title="Oportunidades en Seguimiento"
      />
    </div>
  );
};

export default Following;

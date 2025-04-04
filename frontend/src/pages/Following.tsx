import OpportunitiesFilter from "@/components/OpportunitiesFilter";
import OpportunitiesList from "@/components/OpportunitiesList";

const Following = () => {
  return (
    <div className="container mx-auto px-4 lg:px-0 py-8">
      <h1 className="text-2xl font-semibold mb-4 lg:mb-6">
        👀 Oportunidades en Seguimiento
      </h1>
      <OpportunitiesFilter />
      <OpportunitiesList showOnlyFollowed={true} />
    </div>
  );
};

export default Following;

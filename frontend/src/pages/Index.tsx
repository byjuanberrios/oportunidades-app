import OpportunitiesList from "@/components/OpportunitiesList";
import OpportunitiesFilter from "@/components/OpportunitiesFilter";

const Index = () => {
  return (
    <div className="container mx-auto px-4 lg:px-0 py-8">
      <h1 className="text-2xl font-semibold mb-4 lg:mb-6">
        🛎️ Oportunidades Disponibles
      </h1>
      <OpportunitiesFilter />
      <OpportunitiesList />
    </div>
  );
};

export default Index;

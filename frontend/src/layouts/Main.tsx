import { Outlet } from "react-router";
import { Link } from "react-router";

const Main = () => {
  return (
    <>
      <header className="bg-gray-100 px-4 lg:px-12 py-4 md:py-6">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/">
            <p className="text-lg md:text-xl font-semibold">
              🌟 Oportunidades App
            </p>
          </Link>
          <nav className="flex justify-end gap-4 md:gap-6 lg:gap-10">
            <Link to="/">🛎️ Disponibles</Link>
            <Link to="/following">👀 En seguimiento</Link>
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Main;

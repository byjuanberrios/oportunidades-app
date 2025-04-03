import { Outlet } from "react-router";

const Main = () => {
  return (
    <>
      <header className="bg-gray-100 px-12 py-4">
        <nav className="flex justify-end gap-4">
          <a href="/">Oportunidades disponibles</a>
          <a href="/following">Oportunidades en seguimiento</a>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Main;

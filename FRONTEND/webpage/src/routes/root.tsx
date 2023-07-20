import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <header className="mx-auto h-10 bg-gray-300"></header>
      <div className="h-auto min-h-full pb-20">
        <div className="bg-green-300 h-96">Root Router</div>
        <Outlet />
      </div>
      <footer className="relative h-20 -translate-y-full bg-gray-400">
        <a href="">회사소개</a>
      </footer>
    </>
  );
}

import { Outlet } from 'react-router';
import { NavBar } from './NavBar';

export function Layout() {
  return (
    <div className="min-h-screen" style={{ background: '#f4f5f7' }}>
      <NavBar />
      <main className="pt-14 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
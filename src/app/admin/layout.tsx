import React from 'react';
import { Nav } from '@/components/nav/nav';
import { NavLink } from '@/components/nav/nav';

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <Nav>
       <NavLink href='/admin'>DashBoard</NavLink>
       <NavLink href='/admin/products'>Products</NavLink>
       <NavLink href='/admin/users'>Customers</NavLink>
       <NavLink href='/admin/orders'>Sales</NavLink>
    </Nav>
      <div className="container my-4">{children}</div>
    </>
  );
}

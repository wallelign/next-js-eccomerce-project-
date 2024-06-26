import React from 'react';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <nav></nav>
      <div className="container my-4">{children}</div>
    </>
  );
}

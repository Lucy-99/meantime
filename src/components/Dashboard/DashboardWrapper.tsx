import React from 'react';

export default function DashboardWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-4/5 flex flex-col border-solid border-l-2 border-r-2 border-b-2 border-gray-200">
      {children}
    </main>
  );
}

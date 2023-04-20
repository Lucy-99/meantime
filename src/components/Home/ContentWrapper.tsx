import React from 'react';
type Props = {
  children: React.ReactNode;
};
function ContentWrapper({ children }: Props) {
  return (
    <main className="w-4/5 flex border-solid border-l-2 border-r-2 border-gray-200 h-full">
      {children}
    </main>
  );
}

export default ContentWrapper;

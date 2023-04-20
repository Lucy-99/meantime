import React from 'react';
type Props = {
  children: React.ReactNode;
};
function Wrapper({ children }: Props) {
  return <div className="w-full  flex flex-col items-center">{children}</div>;
}

export default Wrapper;

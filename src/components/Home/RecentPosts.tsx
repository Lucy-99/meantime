import React from 'react';

type Props = {
  children: React.ReactNode;
};

function RecentPosts({ children }: Props) {
  return (
    <section
      className="w-full h-full flex flex-col items-center
    "
    >
      {children}
    </section>
  );
}

export default RecentPosts;

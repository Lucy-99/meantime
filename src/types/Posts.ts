export type RecentPost = {
  id: number;
  image: string;
  title: string;
  nickname: string;
  avatar: string |null;
  content: string;
  likes: number;
  createdAt: Date;
  tokenId: string;
  contract: string;
  userAddress: string;
  comments: Comment[];
};

export type Comment = {
  id: number;
  nickname: string;
  content: string;
};

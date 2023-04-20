import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from '../components/common/Header';
import Wrapper from '../components/common/Wrapper';
import { SERVER_URL } from '../constants';
import { useAuth } from '../contexts/AuthContext';
import Profile from '../components/Dashboard/Profile';
import DashboardWrapper from '../components/Dashboard/DashboardWrapper';
import RecentPosts from '../components/Home/RecentPosts';
import RecentPostItem from '../components/Home/RecentPostItem';
import { RecentPost } from '../types/Posts';
import NoPosts from '../components/Dashboard/NoPosts';
import { useParams } from 'react-router-dom';

interface User {
  address: string;
  nickname: string;
  avatar: string | null;
}

function UserProfile() {
  const params = useParams();
  const auth = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [recentPosts, setRecentPosts] = useState<RecentPost[]>([]);
  useEffect(() => {
    async function fetchData() {
      const user = auth?.user;
      axios.defaults.headers.common['Authorization'] = `Bearer ${user}`;
      try {
        const profileRes = await axios.get(
          `${SERVER_URL}/users/${params.address}`
        );
        setUser(profileRes.data);
      } catch (e) {
        console.log('error', e);
      }
    }
    fetchData();
  }, [auth?.user]);

  useEffect(() => {
    if (!user) return;
    async function fetchData() {
      const userToken = auth?.user;
      axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
      try {
        const postsRes = await axios.get(
          `${SERVER_URL}/posts/users/${params?.address}`
        );
        const posts = postsRes.data.posts.map((p: any) => {
          return {
            ...p,
            nickname: user?.nickname,
            avatar: user?.avatar,
            likes: Math.floor(Math.random() * 30),
          };
        });
        setRecentPosts(posts);
      } catch (e) {
        console.log('error', e);
      }
    }
    fetchData();
  }, [user]);
  return (
    <Wrapper>
      <Header />
      <DashboardWrapper>
        <Profile
          avatar={user?.avatar}
          nickname={user?.nickname}
          address={user?.address}
          mine={false}
        />
        <RecentPosts>
          {recentPosts.length === 0 ? (
            <NoPosts />
          ) : (
            recentPosts.map((post) => (
              <RecentPostItem post={post} key={post.id} />
            ))
          )}
        </RecentPosts>
      </DashboardWrapper>
    </Wrapper>
  );
}

export default UserProfile;

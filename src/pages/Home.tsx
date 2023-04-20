import axios from 'axios';
import { useEffect, useState } from 'react';
import Header from '../components/common/Header';
import Wrapper from '../components/common/Wrapper';
import ContentWrapper from '../components/Home/ContentWrapper';
import RecentPostItem from '../components/Home/RecentPostItem';
import RecentPosts from '../components/Home/RecentPosts';
import { SERVER_URL } from '../constants';
import { useAuth } from '../contexts/AuthContext';
import { RecentPost } from '../types/Posts';
// import { recentPosts_dummy } from './dummy';

function Home() {
  const [recentPosts, setRecentPosts] = useState<RecentPost[]>([]);
  const auth = useAuth();
  useEffect(() => {
    // TODO: fetch data from server
    // setRecentPosts(recentPosts_dummy);
    fetchData();
    async function fetchData() {
      const user = auth?.user;
      axios.defaults.headers.common['Authorization'] = `Bearer ${user}`;
      try {
        const profileRes = await axios.get(`${SERVER_URL}/users/profile`);
        // console.log(profileRes.data);
        const postsRes = await axios.get(`${SERVER_URL}/posts/recent`);
        console.log(postsRes.data.posts)
        setRecentPosts(postsRes.data.posts);
      } catch (e) {
        console.log('error', e);
      }
    }
  }, []);

  return (
    <Wrapper>
      <Header />
      <ContentWrapper>
        <RecentPosts>
          {recentPosts && recentPosts.map((post) => (
            <RecentPostItem post={post} key={post.id} />
          ))}
        </RecentPosts>
      </ContentWrapper>
    </Wrapper>
  );
}

export default Home;

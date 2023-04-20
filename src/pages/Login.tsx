import { useWeb3React } from '@web3-react/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/common/Logo';
import LoginButton from '../components/Login/LoginButtton';
import { injected } from '../connector';
import { useAuth } from '../contexts/AuthContext';

const columnClassName = 'w-full flex justify-center items-center py-5';

function Login() {
  const { library, account, activate, active, deactivate } = useWeb3React();
  const navigate = useNavigate();
  const auth = useAuth();
  const [clicked, setClicked] = useState(false);
  const onClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setClicked(true);
    try {
      await activate(injected, (error) => {
        console.log('error', error);
        throw new Error('Please install metamask');
      });
    } catch (e) {
      alert(e);
    }
  };
  const serverURL = 'http://localhost:3090/api';
  useEffect(() => {
    console.log('useeffect called', auth);

    if (active) {
      fetchData();
    }
    async function fetchData() {
      try {
        // 1. nonce 요청
        const res = await axios.get(`${serverURL}/users/nonce/${account}`);
        let nonce = res.data.nonce;
        // nonce 없음 -> 유저 없으므로 생성 요청
        if (!nonce) {
          const joinRes = await axios.post(`${serverURL}/users/join`, {
            address: account,
          });
          nonce = joinRes.data.nonce;
        }

        // 2. nonce에 서명해 로그인 요청
        const signer = library.getSigner();
        const sig = await signer.signMessage(nonce + '');
        const loginRes = await axios.post(
          'http://localhost:3090/api/users/login',
          {
            address: account,
            signature: sig,
          }
        );
        const accessToken = loginRes.data.access_token;
        console.log(accessToken);
        if (auth) {
          await auth.login(accessToken);
        }
      } catch (e) {
        console.log('error occurred', e);
      }
    }
  }, [account]);
  useEffect(() => {
    if (auth?.user) {
      navigate('/');
      return;
    }
  }, [auth?.user, navigate]);
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 border-solid border-2 border-gray-200 rounded-sm flex-col items-center py-5">
        <div className={columnClassName}>
          <Logo />
        </div>
        <div className={columnClassName}>
          <span className="italic text-teal-500">- NFT Based Community -</span>
        </div>
        <div className={columnClassName}>
          <form className="">
            <LoginButton onClick={onClick} />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

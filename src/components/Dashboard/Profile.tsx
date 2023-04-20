import React, { useState } from 'react';
import { FaEdit, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import Modal from 'react-modal';
import { useAuth } from '../../contexts/AuthContext';
import DashboardModal from './DashboardModal';

function Profile({
  avatar,
  address,
  nickname,
  mine,
}: {
  avatar: string | null;
  address: string;
  nickname: string;
  mine: boolean;
}) {
  const auth = useAuth();
  const [isOpen, setOpen] = useState(false);
  const logout = () => {
    auth?.logout();
  };

  const openModal = () => {
    setOpen(true);
  };

  const handleSubmit = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className=" w-full flex justify-center  items-center py-4 border-b-2 border-solid border-gray-200">
      <div className="w-12 h-12 flex justify-center items-center">
        {avatar ? (
          <img src={avatar} className="w-12 h-12 rounded-full" />
        ) : (
          <FaUserCircle className=" text-5xl" />
        )}
      </div>
      <div className="ml-4 flex flex-col">
        <div className=" text-lg">{nickname}</div>
        <div className="text-sm text-gray-400">{address}</div>
      </div>
      {mine && (
        <div className="ml-5 flex">
          <FaEdit
            className="text-2xl cursor-pointer text-teal-500"
            onClick={openModal}
          />
          <FaSignOutAlt
            className="text-2xl cursor-pointer text-teal-500 ml-1"
            onClick={logout}
          />
        </div>
      )}

      <DashboardModal
        isOpen={isOpen}
        nickname={nickname}
        avatar={avatar}
        onSubmit={handleSubmit}
        onClose={handleClose}
      />
    </div>
  );
}

Profile.defaultProps = {
  avatar: null,
  address: '',
  nickname: '',
};

export default Profile;

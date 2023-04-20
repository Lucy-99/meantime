import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaUserCircle, FaWindowClose } from 'react-icons/fa';
import ReactModal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../../constants';
import { useAuth } from '../../contexts/AuthContext';

const styles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default function DashboardModal({
  isOpen,
  nickname,
  avatar,
  onSubmit,
  onClose,
}: {
  isOpen: any;
  nickname: string;
  avatar: string | null;
  onSubmit: any;
  onClose: any;
}) {
  const { register, handleSubmit, watch } = useForm();
  const auth = useAuth();

  const image = watch('avatar');
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(
    process.env.PUBLIC_URL + 'no-image.png'
  );
  useEffect(() => {
    if (image && image.length > 0) {
      const file = image[0];
      setImagePreview(URL.createObjectURL(file));
    }
  }, [image]);

  const submit = async (data: any) => {
    const user = auth?.user;
    axios.defaults.headers.common['Authorization'] = `Bearer ${user}`;
    try {
      const formData = new FormData();
      if (data.nickname.length > 0) {
        formData.append('nickname', data.nickname);
      } else {
        formData.append('nickname', nickname);
      }
      if (image && image.length > 0) {
        formData.append('file', data.avatar[0]);
      }
      const res = await axios.patch(`${SERVER_URL}/users/profile`, formData);
      alert('Profile changed!');
      window.location.reload();
    } catch (e) {
      console.log('error', e);
    }
  };
  const handleClose = () => {
    onClose();
  };
  return (
    <ReactModal isOpen={isOpen} style={styles}>
      <form
        className="flex flex-col w-full h-full"
        onSubmit={handleSubmit(submit)}
      >
        <FaWindowClose
          className="text-lg cursor-pointer text-teal-500 self-end"
          onClick={handleClose}
        />
        <div className="self-center mt-2">
          <label htmlFor="avatar">
            {avatar ? (
              <img alt="img" src={avatar} className=" w-24 h-24 rounded-full" />
            ) : image ? (
              <img
                alt="img"
                src={imagePreview}
                className=" w-24 h-24 rounded-full"
              />
            ) : (
              <FaUserCircle className="text-8xl cursor-pointer" />
            )}
          </label>
          <input
            id="avatar"
            type="file"
            className="hidden"
            accept="image/*"
            {...register('avatar')}
          />
        </div>

        <div className="font-semibold mt-3">Nickname</div>
        <input
          id="nickname"
          placeholder={nickname}
          className="w-full border-solid border p-2 mt-2"
          {...register('nickname', {
            minLength: {
              value: 2,
              message: '2글자 이상 입력하세요.',
            },
          })}
        />
        <div className="flex justify-center mt-5">
          <input
            className=" bg-teal-300 h-10 w-full text-white cursor-pointer font-bold  rounded-sm"
            type="submit"
            value="Update Profile"
          />
        </div>
      </form>
    </ReactModal>
  );
}

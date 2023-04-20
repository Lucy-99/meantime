import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Wrapper from '../components/common/Wrapper';
import { SERVER_URL } from '../constants';
import { useAuth } from '../contexts/AuthContext';

const columnClassName = 'w-full flex justify-center items-center py-5';

function Upload() {
  const { register, handleSubmit, watch } = useForm();
  const [imagePreview, setImagePreview] = useState(
    process.env.PUBLIC_URL + 'no-image.png'
  );
  const image = watch('image');
  const navigate = useNavigate();
  useEffect(() => {
    if (image && image.length > 0) {
      const file = image[0];
      setImagePreview(URL.createObjectURL(file));
    }
  }, [image]);

  const auth = useAuth();
  return (
    <Wrapper>
      <Header />
      <div className="flex justify-center items-center mt-10 mb-10">
        <form
          className="w-96 border-solid border-2 border-gray-200 rounded-sm flex-col items-center py-5"
          onSubmit={handleSubmit(async (data) => {
            const user = auth?.user;
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('content', data.content);
            formData.append('file', data.image[0]);
            axios.defaults.headers.common['Authorization'] = `Bearer ${user}`;
            try {
              const res = await axios.post(`${SERVER_URL}/posts`, formData);
              alert('Post uploaded!');
              navigate('/');
            } catch (e) {
              console.log('error', e);
            }
          })}
        >
          <div className={columnClassName}>
            <input
              className="w-3/5 h-10 px-5 border-solid border-2 border-gray-200 rounded-sm"
              placeholder="Enter title"
              id="title"
              {...register('title')}
            />
          </div>
          <div className={columnClassName}>
            <label htmlFor="image">
              <img
                alt="img"
                src={imagePreview}
                className=" w-60"
              />
            </label>
            <input
              id="image"
              type="file"
              className="hidden"
              accept="image/*"
              {...register('image')}
            />
          </div>
          <div className={columnClassName}>
            <input
              className="w-4/5  h-28 px-5
            border-solid border-2 border-gray-200 rounded-sm"
              placeholder="Enter content"
              id="content"
              {...register('content')}
            />
          </div>

          <div className={columnClassName}>
            <input
              className=" bg-teal-300 h-10 w-2/5 text-white cursor-pointer font-bold  rounded-sm"
              type="submit"
              value="upload"
            />
          </div>
        </form>
      </div>
    </Wrapper>
  );
}

export default Upload;

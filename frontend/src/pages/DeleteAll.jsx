import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton';
import axios from 'axios';
import { ThreeDots } from 'react-loading-icons';

const DeleteAll = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books`)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        alert('error');
        console.log(error);
      })
  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete All</h1>
      {loading ? (
          <div className='flex justify-center'>
          <ThreeDots fill="#000000" />
          </div>
      ) : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are you sure you want to delete ALL books?</h3>
        <button className='p-4 bg-red-600 text-white m-8 w-full' onClick={handleDeleteBook}>Yes, Delete them</button>
      </div>
    </div>
  )
}

export default DeleteAll
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BackButton from '../components/BackButton';
import axios from 'axios';
import { ThreeDots } from 'react-loading-icons';
import { useSnackbar } from 'notistack';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book deleted successfully", {variant:'success'});
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error", {variant:'error'});
        console.log(error);
        navigate("/");
      })
  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading ? (
          <div className='flex justify-center'>
          <ThreeDots fill="#000000" />
          </div>
      ) : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are you sure you want to delete this book?</h3>
        <button className='p-4 bg-red-600 text-white m-8 w-full' onClick={handleDeleteBook}>Yes, Delete it</button>
      </div>
    </div>
  )
}

export default DeleteBook
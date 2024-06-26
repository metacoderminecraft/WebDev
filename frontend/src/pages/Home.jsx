import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MdOutlineAddBox } from 'react-icons/md';
import { ThreeDots } from 'react-loading-icons';
import Cards from '../components/home/CardsDisplay';
import Table from '../components/home/Table';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showState, setShowState] = useState('card');

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      })
  }, [])

  return (
      <div className='p-4'>
        <div className='flex justify-center items-center gap-x-4'>
          <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg' onClick={()=> setShowState('card')}>Card</button>
          <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg' onClick={()=> setShowState('table')}>Table</button>
        </div>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl my-8">Books List</h1>
          <Link to="/books/create">
            <MdOutlineAddBox className='text-sky-600 text-4xl' />
          </Link>
        </div>
        {loading ? (
          <div className='flex justify-center'>
          <ThreeDots fill="#000000" />
          </div>
        ) : showState == 'table' ? (
          <Table books={books} />
        ) : (
          <Cards books={books} />
        )}
      </div>
  )
}

export default Home
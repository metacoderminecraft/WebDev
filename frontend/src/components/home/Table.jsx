import { Link } from "react-router-dom";
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';

const Table = ({ books }) => {
    return (
        <div>
            <div>
                <table className='w-full border-seperate border-spacing-2'>
                    <thead>
                        <tr>
                            <th className='border borderslate-600 rounded-md'>#</th>
                            <th className='border borderslate-600 rounded-md'>Title</th>
                            <th className='border borderslate-600 rounded-md max-md:hidden'>Author</th>
                            <th className='border borderslate-600 rounded-md max-md:hidden'>Publish Year</th>
                            <th className='border borderslate-600 rounded-md'>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book, index) => (
                            <tr key={book._id} className="h-8">
                                <td className='border border-slate-700 rounded-md text-center'>{index + 1}</td>
                                <td className='border border-slate-700 rounded-md text-center'>{book.title}</td>
                                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{book.author}</td>
                                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{book.publishYear}</td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    <div className='flex justify-center gap-x-4'>
                                        <Link to={`/books/details/${book._id}`}>
                                            <BsInfoCircle className='text-2xl text-green-500'></BsInfoCircle>
                                        </Link>
                                        <Link to={`/books/edit/${book._id}`}>
                                            <AiOutlineEdit className='text-2xl text-yellow-500'></AiOutlineEdit>
                                        </Link>
                                        <Link to={`/books/delete/${book._id}`}>
                                            <MdOutlineDelete className='text-2xl text-red-500'></MdOutlineDelete>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <Link to={'/books/delete/all'} className='flex justify-center'>
                    <button className='p-4 bg-red-600 text-white my-8 w-1/4 rounded-full'>Delete ALL</button>
                </Link>
            </div>
        </div>
    )
}

export default Table
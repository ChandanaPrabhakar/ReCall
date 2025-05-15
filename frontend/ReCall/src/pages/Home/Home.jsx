import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import NoteCards from '../../components/Cards/NoteCards';
import { MdAdd } from 'react-icons/md';
import AddEditNotes from './AddEditNotes';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';

const Home = () => {

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [userInfo, setUserInfo] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get('/get-user');

      console.log('im here');

      console.log(localStorage.getItem('token'));

      console.log(response.data);

      if (response.data?.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      setError( error.response.status === 401);
      localStorage.clear();
      navigate('/login');
    }
  }

  useEffect(() => {
    getUserInfo();
    return () => {}
  },[]);

  return (
    <>
      <Navbar userInfo = {userInfo}/>
      <div className='container mx-auto'>
        <div className='grid grid-cols-3 gap-4 mt-8'>
          <NoteCards
            title="Meeting on 7th april"
            date="3rd April 2025"
            content="Meeting on 7th April 2025"
            tags="#meeting"
            isPinned={true}
            onEdit={() => { }}
            onDelete={() => { }}
            onPinnedNote={() => { }}
          />
        </div>
      </div>

      <button
        className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-secondary absolute right-10 bottom-10'
        onClick={() => {
          setOpenAddEditModal({
            isShown: true,
            type: "add",
            data: null
          })
        }}
      >
        <MdAdd className="text-[32px] text-secondary hover:text-primary" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => { }}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-hidden"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          data={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({
              isShown: false, type: "add", data: null
            })
          }} />
      </Modal>
    </>
  )
}

export default Home

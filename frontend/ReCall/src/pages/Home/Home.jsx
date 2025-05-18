import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import NoteCards from '../../components/Cards/NoteCards';
import { MdAdd, MdOutlineSignalWifiStatusbarConnectedNoInternet4 } from 'react-icons/md';
import AddEditNotes from './AddEditNotes';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { EmptyCard } from '../../components/EmptyCard/EmptyCard';
import AddNoteImg from '../../assets/Add-notes.svg';
import NoDataImg from '../../assets/No-notes.svg';
import Toast from '../../components/ToastMessage/Toast';

const Home = () => {

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToastMessage, setShowToastMessage] = useState({
    isShown: false,
    message: "",
    type: 'add'
  });

  const [userInfo, setUserInfo] = useState("");
  const [allNotes, setAllNotes] = useState([]);
  const [searchNote, setSearchNote] = useState(false);
  const navigate = useNavigate();

  //Show Toast

  const handleShowToast = (message, type) => {
    setShowToastMessage({
      isShown: true,
      message,
      type
    })
  }

  //Toast Close

  const handleCloseToast = () => {
    setShowToastMessage({
      isShown: false,
      message: ""
    })
  }

  //Get user info

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get('/get-user');

      if (response.data?.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate('/login');
      }
    }
  }

  //Get all notes

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get('/get-all-notes');
      if (response.data?.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An unexpected error occured. Please try again later.");
    }
  }

  //Edit Note

  const handleEditNote = async (noteDetails) => {
    setOpenAddEditModal({
      isShown: true,
      type: 'edit',
      data: noteDetails
    })
  }

  //Delete Note

  const deleteNote = async (data) => {
    const noteId = data._id;
    try {
      const response = await axiosInstance.delete('/delete-note/noteId/' + noteId);
      if (!response.data?.success) {
        handleShowToast("Note deleted sucessfully", 'delete')
        getAllNotes();
      }
    } catch (error) {
      if (error.response?.data?.message) {
        console.log("An unexpected error occured, Please try again later");
      }
    }
  }

  //Pin Note

  const pinnedNote = async (noteData) => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put('/update-note-pinned/noteId/' + noteId, {
        isPinned: !noteData.isPinned
      });

      if (response.data?.updatedNote) {
        handleShowToast(
          response.data.updatedNote.isPinned ? "Note pinned" : "Note unpinned"
        );
        getAllNotes();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Search Note

  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get('/search-note', {
        params: { query }
      });

      console.log(response.data);

      if (response.data?.note) {
        setSearchNote(true);
        setAllNotes(response.data?.note);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleClearSearch = () => {
    setSearchNote(false);
    getAllNotes();
  }

  useEffect(() => {
    getAllNotes();
    getUserInfo();
    return () => { }
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />
      <div className='container mx-auto'>
        {allNotes.length > 0 ? (
          <div className='grid grid-cols-3 gap-4 mt-8'>
            {allNotes.map((item, index) => (
              <NoteCards
                key={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => handleEditNote(item)}
                onDelete={() => deleteNote(item)}
                onPinnedNote={() => pinnedNote(item)}
              />
            ))}
          </div>
        ) : (
          <EmptyCard imgSrc={searchNote ? NoDataImg : AddNoteImg} message={searchNote ? (`Oops no notes found matching your serach`) : (`Start creating your notes! click ADD button to note down your thoughts, ideas, and remainders. Lets get strarted!!`)} />
        )}
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
        className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] max-h-[90vh bg-white rounded-md mx-auto mt-14 p-5 overflow-auto"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({
              isShown: false, type: "add", data: null
            })
          }}
          getAllNotes={getAllNotes}
          handleShowToast={handleShowToast}
        />
      </Modal>

      <Toast
        isShown={showToastMessage.isShown}
        message={showToastMessage.message}
        type={showToastMessage.type}
        onClose={handleCloseToast}
      />
    </>
  )
}

export default Home

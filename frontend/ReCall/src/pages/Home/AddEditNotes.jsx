import React, { useState } from 'react';
import TagInput from '../../components/Inputs/TagInput';
import { MdClose } from 'react-icons/md';

const AddEditNotes = ({noteData, type, onClose }) => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState([]);
    const [error, setError] = useState(null);

    const addNewNote = async() => {};

    const editNote = async() => {};

    const handleAddNote = () => {
        if(!title){
            setError('Please enter the title');
            return;
        }

        if(!content){
            setError('Please enter the content');
            return;
        }

        setError("");

        if(type === 'edit'){
            editNote();
        }else{
            addNewNote();
        }
    }

    return (
        <div className='relative'>

            <button
                className='w-10 h-10 rounded-full flex items-center justify-center bg-primary absolute -top-3 -right-3 hover:bg-secondary'
                onClick={onClose}
            >
                <MdClose className='text-xl text-secondary cursor-pointer hover:text-red-800' />
            </button>

            <div className='flex flex-col gap-2'>
                <label className='input-label'>
                    Title
                </label>

                <input
                    type='text'
                    className='text-2xl text-slate-950 outline-none'
                    placeholder='Go To Gym At 6 PM'
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>

            <div className='flex flex-col gap-2 mt-4'>
                <label className='input-label'>Content</label>
                <textarea
                    type="text"
                    className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded'
                    placeholder='Content'
                    rows={10}
                    value={content}
                    onChange={({ target }) => setContent(target.value)}
                />
            </div>

            <div className='mt-3'>
                <label className='input-label'>Tags
                    <TagInput tags={tags} setTags={setTags} />
                </label>
            </div>

            {error && <p className='text-red-600 text-xs pt-4'>{error}</p>}
            <button className='btn-primary font-medium mt-5 p-3' onClick={handleAddNote} >
                ADD NOTE
            </button>
        </div>
    )
}

export default AddEditNotes

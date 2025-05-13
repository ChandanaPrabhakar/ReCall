import React, { useState } from 'react';
import { MdAdd, MdClose } from 'react-icons/md';

const TagInput = ({ tags, setTags }) => {

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  }

  const addNewTags = () => {
    if (inputValue.trim !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addNewTags();
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  }
  return (
    <div>
      {tags.length > 0 &&
        (<div className='flex items-center gap-2 flex-wrap mt-2'>
          {tags.map((tag, index) => (
            <span key={index} className='flex items-center gap-2 text-sm px-3 py-1 rounded bg-secondary'>
              #{tag}
              <button onClick={() => {
                handleRemoveTag(tag);
              }}>
                <MdClose className='cursor-pointer' />
              </button>
            </span>
          ))}
        </div>)}

      <div className='flex items-center gap-4 mt-3'>
        <input
          type='text'
          placeholder='Add Tags'
          value={inputValue}
          className='text-sm bg-transparent border border-primary px-3 py-2 rounded outline-none'
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />

        <button className='w-8 h-8 flex items-center justify-center rounded-full bg-secondary hover:bg-primary'
          onClick={() => {
            addNewTags()
          }}
        >
          <MdAdd className="text-2xl text-primary hover:text-secondary" />
        </button>
      </div>
    </div>
  )
}

export default TagInput

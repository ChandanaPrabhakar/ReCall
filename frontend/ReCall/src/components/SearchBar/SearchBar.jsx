import React from 'react';
import {FaMagnifyingGlass} from 'react-icons/fa6';
import {IoMdClose} from 'react-icons/io';

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
    return (
        <div className='w-80 flex items-center px-4 bg-secondary rounded-md' >
            <input
                type='text'
                placeholder='Search Notes'
                className='w-full bg-transparent text-xs py-[11px] outline-none'
                value={value}
                onChange={onChange}
            />
            {value && (<IoMdClose className='text-primary cursor-pointer hover:text-slate-700 mr-3' onClick={onClearSearch} /> )}
            <FaMagnifyingGlass className='text-primary cursor-pointer hover:text-slate-700' onClick={handleSearch} />
        </div>
    )
}

export default SearchBar

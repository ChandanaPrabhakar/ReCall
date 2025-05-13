import React, { useState } from 'react';
import ProfileInfoCard from '../Cards/ProfileInfoCard';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';

const Navbar = () => {

  const navigate = useNavigate;
  const [searchQuery, setSearchQuery] = useState("");

  const onLogout = () => {
    navigate("/login");
  }

  const handleSearch = () => {

  }

  const onClearSearch = () => {
    setSearchQuery("");
  }

  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow-2xl'>
      <h2 className='text-xl font-medium text-black py-2'>ReCall</h2>
      <SearchBar
        value={searchQuery}
        onChange={(e) => { setSearchQuery(e.target.value) }}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />
      <ProfileInfoCard onLogout={onLogout} />
    </div>
  )
}

export default Navbar

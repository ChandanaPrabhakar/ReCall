import React, { useState } from 'react';
import ProfileInfoCard from '../Cards/ProfileInfoCard';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {

  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const onLogout = () => {
    navigate("/login");
    localStorage.clear();
  }

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  }

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  }

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow-2xl'>
      <h2 className='text-xl font-medium text-black py-2'>ReCall</h2>
      {!isAuthPage && (
        <>
          <SearchBar
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value) }}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
          />
          <ProfileInfoCard userInfo={userInfo} onLogout={onLogout} />
        </>
      )}
    </div>
  )
}

export default Navbar

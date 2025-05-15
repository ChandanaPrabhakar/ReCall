import React from 'react';
import {getInitials} from '../../utils/helper';

const ProfileInfoCard = ({userInfo, onLogout }) => {
  return (
    <div className='flex items-center gap-3'>
      <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-secondary'>
        {getInitials(userInfo?.fullName)}
      </div>
      <div className=''>
        <p className='text-xs font-medium'>{userInfo?.fullName}</p>
        <button className='text-sm text-primary cursor-pointer underline hover:text-slate-700' onClick={onLogout}>Log Out</button>
      </div>

    </div>
  )
}

export default ProfileInfoCard

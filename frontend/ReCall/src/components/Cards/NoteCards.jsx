import moment from 'moment';
import React from 'react';
import {MdOutlinePushPin} from 'react-icons/md';
import { MdCreate, MdDelete } from 'react-icons/md';

const NoteCards = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinnedNote
}) => {
  return (
    <div className='border border-primary rounded bg-white p-4 hover:shadow-xl translate-all ease-in-out'>
      <div className='flex items-center justify-between'>
        <div>
          <h6 className='text-sm font-medium'>{title}</h6>
          <span className='text-xs text-slate-500'> {moment(date).format('Do MMM YYYY')} </span>
        </div>

        <MdOutlinePushPin className={`icon-btn ${isPinned ? 'text-primary' : 'text-slate-500'}`} onClick={onPinnedNote} />
      </div>

      <p className='text-xs text-slate-600 mt-2'> {content?.slice(0, 60)} </p>

      <div className='flex items-center justify-between mt-2'>
        <div className='text-xs text-slate-500'>
          {tags.map((item) => `#${item}`)}
        </div>

        <div className='flex items-center gap-2'>
          <MdCreate className='icon-btn text-primary hover:text-slate-600 cursor-pointer' onClick={onEdit}/>
          <MdDelete className='icon-btn text-red-500 hover:text-slate-600 cursor-pointer' onClick={onDelete} />
        </div>
      </div>
    </div>
  )
}

export default NoteCards

import React, { useEffect, useRef, useState } from 'react';
import './headerTitle.scss';
import EditIcon from '../../assets/icons/ddq-edit.svg';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const HeaderTitle: React.FC = () => {
  const [chatName,setChatName] = useState<string>('Chatbot');
  const [isChatDisabled, setIsChatDisabled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null); 

  const handleEditClick = () => {
    setIsChatDisabled(true); // Enable the input
    setTimeout(() => {
      inputRef.current?.focus(); // Auto-focus the input after enabling
    }, 0); // Ensure focus is applied after state update
  };
  const handleDoneClick = () => {
    setIsChatDisabled(false);
  }
  return (
    <div className='header-box'>
      <div className='input-box'>
      <input type="text" ref={inputRef} value={chatName} onChange={(e)=> setChatName(e.target.value)}  className='header-input' disabled={!isChatDisabled} />
      </div>
      {!isChatDisabled? 
      <button className='edit-btn' onClick={handleEditClick}>
      <img src={EditIcon} alt="" height={15}/>
      </button>:
      <button className='done-btn' onClick={handleDoneClick}>
      <CheckCircleIcon/>
      </button>}
    </div>
  )
}

export default HeaderTitle

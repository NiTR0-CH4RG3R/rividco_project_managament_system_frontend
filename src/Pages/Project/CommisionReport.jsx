import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTopbarContext } from '../../Contexts/TopbarContext';
import ListPage from '../../Components/ListPage/ListPage';
import { AppRoutes } from '../../Data/AppRoutes';

const columns = [
    { id: 'fileName', label: 'File Name', align: 'left' },
    { id: 'addedDate', label: 'Added Date', align: 'left' },
    
];

export default function CommisionReport() {
  return (
    <div>
      
    </div>
  );
}

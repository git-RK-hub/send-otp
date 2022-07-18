import React from 'react';

import './App.css';

import Routers from '../src/routers/router';
import MessageContextProvider from './contexts/message';
import ContactContextProvider from './contexts/contact';

const App = () => (
  <ContactContextProvider>
    <MessageContextProvider>
      <div className='dashboard'>
        <Routers />
      </div>
    </MessageContextProvider>
  </ContactContextProvider>
);

export default App;

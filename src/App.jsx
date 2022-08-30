import React from 'react';
import './App.css';
import Filters from './components/Filters';
import Table from './components/Table';
import AppProvider from './context/AppProvider';

function App() {
  return (
    <AppProvider>
      <Filters />
      <Table />
    </AppProvider>
  );
}

export default App;

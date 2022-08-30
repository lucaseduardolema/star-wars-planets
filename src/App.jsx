import React from 'react';
import './App.css';
import Filters from './components/Filters';
import Hero from './components/Hero';
import Table from './components/Table';
import AppProvider from './context/AppProvider';

function App() {
  return (
    <AppProvider>
      <Hero />
      <Filters />
      <Table />
    </AppProvider>
  );
}

export default App;

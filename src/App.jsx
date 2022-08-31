import React from 'react';
import { Container } from 'react-bootstrap';
import './App.css';
import Filters from './components/Filters';
import Hero from './components/Hero';
import Table from './components/Table';
import AppProvider from './context/AppProvider';

function App() {
  return (
    <AppProvider>
      <Hero />
      <Container className='text-center'>
        <h1 className='display-1'>Star Wars Planets</h1>
      </Container>
      <Filters />
      <Table />
    </AppProvider>
  );
}

export default App;

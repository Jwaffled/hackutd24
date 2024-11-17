import { MantineProvider } from '@mantine/core';
import React from 'react';
import HomePage from './components/pages/HomePage';

const App: React.FC = () => {
  return (
    <div id="root">
      <MantineProvider>
        <HomePage/>
      </MantineProvider>
    </div>
  );
};

export default App;
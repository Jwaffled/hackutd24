// App.tsx
import { MantineProvider } from '@mantine/core';
import HomePage from './components/pages/HomePage';
import '@mantine/core/styles.css';

function App() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <HomePage />
    </MantineProvider>
  );
}

export default App;
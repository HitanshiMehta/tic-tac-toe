import React from 'react';
import Index from './components';
import ThemeContextProvider from './context/ThemeContext';

function App() {
  return (
    <ThemeContextProvider>
      <div className="App">
        <Index />
      </div>
    </ThemeContextProvider>
  );
}

export default App;

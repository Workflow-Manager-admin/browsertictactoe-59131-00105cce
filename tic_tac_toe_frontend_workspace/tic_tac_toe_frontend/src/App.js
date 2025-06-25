import React from 'react';
import './App.css';
import './TicTacToe.css';
import TicTacToe from './TicTacToe';

/**
 * App component - renders centered TicTacToe game with given theme colors.
 */
// PUBLIC_INTERFACE
function App() {
  // Color theme as per requirements
  const theme = {
    accent: '#ffeb3b',
    primary: '#1976d2',
    secondary: '#424242'
  };

  return (
    <div className="App">
      <main>
        <TicTacToe theme={theme} />
      </main>
    </div>
  );
}

export default App;

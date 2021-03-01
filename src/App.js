import React from 'react';
import Router from "./routes/Router";

import IfutureProvider from './Context/IfutureProvider';

function App() {
  return (
    <IfutureProvider>
      <Router/>
    </IfutureProvider>
  );
}

export default App;

// client/src/App.tsx
import React from 'react';
import { ProductList } from '../components/ProductList';

const App: React.FC = () => {
  return (
    <div className="app">
      <main>
        <ProductList />
      </main>
    </div>
  );
};

export default App;

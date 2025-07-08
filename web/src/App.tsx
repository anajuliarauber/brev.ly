import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { NotFound } from './pages/NotFound';
import { Redirecting } from './pages/Redirecting';

const queryClient = new QueryClient();

export const App: React.FC = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:shortUrl" element={<Redirecting />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import AppPage from './pages/AppPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing'); // landing, app

  const handleStartAnalysis = () => {
    setCurrentPage('app');
  };

  const handleResetNavigation = () => {
    setCurrentPage('landing');
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Navigation */}
      <Navbar onReset={handleResetNavigation} />

      {/* Main Workspace */}
      <main className="flex-grow">
        {currentPage === 'landing' ? (
          <LandingPage onStart={handleStartAnalysis} />
        ) : (
          <AppPage />
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

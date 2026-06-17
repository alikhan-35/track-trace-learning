import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import FAQPage from './pages/FAQPage';
import HomePage from './pages/HomePage';
import LearningPathPage from './pages/LearningPathPage';
import ModulePage from './pages/ModulePage';
import QuizPage from './pages/QuizPage';
import RoleSelectionPage from './pages/RoleSelectionPage';
import SupportPage from './pages/SupportPage';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Закрываем мобильное меню при переходе между разделами.
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header onMenuClick={() => setIsSidebarOpen(true)} />
      <div className="mx-auto flex max-w-7xl">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <div key={location.pathname} className="min-w-0 flex-1">
          <main className="px-4 py-6 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/roles" element={<RoleSelectionPage />} />
              <Route path="/roles/:roleId" element={<LearningPathPage />} />
              <Route path="/roles/:roleId/modules/:moduleId" element={<ModulePage />} />
              <Route path="/roles/:roleId/modules/:moduleId/quiz" element={<QuizPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;

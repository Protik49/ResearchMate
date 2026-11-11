import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import FacultyDetailPage from './pages/FacultyDetailPage';
import SavedFacultyPage from './pages/SavedFacultyPage';
import UpdatesPage from './pages/UpdatesPage';
import ExamsPage from './pages/ExamsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminGatewayPage from './pages/AdminGatewayPage';
import FacultyDetailModal from './components/FacultyDetailModal';
import Modal from './components/ui/Modal';
import LoginForm from './components/forms/LoginForm';
import RegisterForm from './components/forms/RegisterForm';
import { useAuth } from './context/AuthContext';
import { INITIAL_FACULTY, INITIAL_UPDATES, INITIAL_EXAMS } from './data/mockData';
import { API_BASE } from './lib/api';

export default function App() {
  const { user } = useAuth();
  const [facultyList, setFacultyList] = useState(INITIAL_FACULTY);
  const [updatesList, setUpdatesList] = useState(INITIAL_UPDATES);
  const [examsList, setExamsList] = useState(INITIAL_EXAMS);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'

  // Fetch live faculty from server
  useEffect(() => {
    let mounted = true;
    async function loadLive() {
      try {
        const res = await fetch(`${API_BASE}/api/faculty`);
        if (res.ok) {
          const data = await res.json();
          if (mounted && Array.isArray(data) && data.length > 0) {
            setFacultyList(data);
          }
        }
      } catch (e) {
        console.info('Live API offline, serving client faculty roster.');
      } finally {
        if (mounted) setIsLoading(false);
      }
    }
    loadLive();
    return () => { mounted = false; };
  }, []);

  const handleAddUpdate = (newUpdate) => {
    setUpdatesList(prev => [newUpdate, ...prev]);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#FAFAFA] dark:bg-[#09090B] text-zinc-900 dark:text-zinc-100 selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-900 transition-colors duration-150">
        
        {/* Navigation */}
        <Navbar onOpenAuth={() => { setAuthMode('login'); setIsAuthOpen(true); }} />

        {/* Routes */}
        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  facultyList={facultyList}
                  updatesList={updatesList}
                  isLoading={isLoading}
                  onSelectFaculty={setSelectedFaculty}
                  onRequireAuth={() => { setAuthMode('login'); setIsAuthOpen(true); }}
                />
              }
            />

            <Route
              path="/explore"
              element={
                <ExplorePage
                  facultyList={facultyList}
                  isLoading={isLoading}
                  onSelectFaculty={setSelectedFaculty}
                  onRequireAuth={() => { setAuthMode('login'); setIsAuthOpen(true); }}
                />
              }
            />

            <Route
              path="/faculty/:id"
              element={
                <FacultyDetailPage
                  facultyList={facultyList}
                  onSelectFaculty={setSelectedFaculty}
                  onRequireAuth={() => { setAuthMode('login'); setIsAuthOpen(true); }}
                />
              }
            />

            <Route
              path="/saved"
              element={
                <SavedFacultyPage
                  facultyList={facultyList}
                  onSelectFaculty={setSelectedFaculty}
                  onOpenAuth={() => { setAuthMode('login'); setIsAuthOpen(true); }}
                />
              }
            />

            <Route
              path="/updates"
              element={
                <UpdatesPage
                  updatesList={updatesList}
                  onAddUpdate={handleAddUpdate}
                  facultyList={facultyList}
                  onOpenAuth={() => { setAuthMode('login'); setIsAuthOpen(true); }}
                />
              }
            />

            <Route
              path="/exams"
              element={<ExamsPage examsList={examsList} />}
            />

            <Route
              path="/about"
              element={<AboutPage />}
            />

            <Route
              path="/contact"
              element={<ContactPage />}
            />

            {/* Protected Role-Based Dashboards */}
            <Route
              path="/dashboard"
              element={
                user ? (
                  <UserDashboard
                    facultyList={facultyList}
                    examsList={examsList}
                    updatesList={updatesList}
                    onSelectFaculty={setSelectedFaculty}
                  />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />

            <Route
              path="/admin"
              element={
                user && user.role === 'admin' ? (
                  <AdminDashboard
                    facultyList={facultyList}
                    onSelectFaculty={setSelectedFaculty}
                  />
                ) : (
                  <AdminGatewayPage currentUser={user} />
                )
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Quick Profile Modal */}
        {selectedFaculty && (
          <FacultyDetailModal
            faculty={selectedFaculty}
            onClose={() => setSelectedFaculty(null)}
            onRequireAuth={() => {
              setSelectedFaculty(null);
              setAuthMode('login');
              setIsAuthOpen(true);
            }}
          />
        )}

        {/* Standard Auth Modal */}
        <Modal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          title={authMode === 'login' ? 'Academic Portal Sign In' : 'Create Academic Account'}
          subtitle={
            authMode === 'login'
              ? 'Access saved faculty, advising hours, and exam alerts'
              : 'Register your university profile for thesis & course updates'
          }
        >
          {authMode === 'login' ? (
            <LoginForm
              onSuccess={() => setIsAuthOpen(false)}
              onSwitchToRegister={() => setAuthMode('register')}
            />
          ) : (
            <RegisterForm
              onSuccess={() => setIsAuthOpen(false)}
              onSwitchToLogin={() => setAuthMode('login')}
            />
          )}
        </Modal>

      </div>
    </BrowserRouter>
  );
}

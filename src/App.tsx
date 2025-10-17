import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Articles from './pages/Articles';
import Article from './pages/Article';
import About from './pages/About';
import AdminDashboard from './pages/admin/AdminDashboard';
import Subscribers from './pages/admin/Subscribers';
import SendNewsletter from './pages/admin/SendNewsletter';
import CommentManagement from './pages/admin/CommentManagement';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App bg-navy-blue min-h-screen">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/article/:id" element={<Article />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/subscribers" element={<Subscribers />} />
            <Route path="/admin/newsletter" element={<SendNewsletter />} />
            <Route path="/admin/comments" element={<CommentManagement />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Mail, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-blue border-t border-warm-brown/20 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-6 w-6 text-burgundy" />
              <span className="font-display text-xl text-parchment font-semibold">
                Doterran
              </span>
            </div>
            <p className="text-parchment/70 text-sm leading-relaxed max-w-md">
              A sanctuary for philosophical inquiry and existential exploration. 
              Join us in the examined life through thoughtful essays, ethical dilemmas, 
              and timeless wisdom for modern living.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-parchment font-semibold mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/articles" className="text-parchment/70 hover:text-parchment transition-colors">
                  All Articles
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-parchment/70 hover:text-parchment transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-parchment font-semibold mb-4">Connect</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://wa.me/2349032650856" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-parchment/70 hover:text-parchment transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:thoughts@doterran.com"
                  className="flex items-center space-x-2 text-parchment/70 hover:text-parchment transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span>Email</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-warm-brown/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-parchment/60 text-sm">
            © 2024 Doterran. Pursuing authentic being.
          </p>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <Mail className="h-4 w-4 text-parchment/60" />
            <span className="text-parchment/60 text-sm">thoughts@doterran.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
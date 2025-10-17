import React, { useState } from 'react';
import { Mail, CheckCircle, XCircle } from 'lucide-react';
import { apiService } from '../../services/api';

interface NewsletterSignupProps {
  variant?: 'default' | 'minimal';
}

const NewsletterSignup: React.FC<NewsletterSignupProps> = ({ variant = 'default' }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    const response = await apiService.subscribeToNewsletter(email);
    
    setIsSubmitting(false);
    
    if (response.error) {
      setError(response.error);
    } else {
      setIsSubmitted(true);
      setEmail('');
      
      // Reset after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setError(null);
      }, 5000);
    }
  };

  if (variant === 'minimal') {
    return (
      <div className="bg-parchment/5 border border-warm-brown/20 rounded-lg p-4">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email for wisdom..."
            className="flex-1 px-3 py-2 bg-parchment/10 border border-warm-brown/20 rounded text-parchment placeholder-parchment/50 focus:outline-none focus:border-burgundy transition-colors"
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-burgundy text-parchment rounded hover:bg-burgundy/80 disabled:opacity-50 transition-colors font-medium"
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
        
        {isSubmitted && (
          <div className="mt-2 flex items-center space-x-2 text-forest-green text-sm">
            <CheckCircle className="h-4 w-4" />
            <span>Thank you for joining our philosophical journey!</span>
          </div>
        )}
        
        {error && (
          <div className="mt-2 flex items-center space-x-2 text-burgundy text-sm">
            <XCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-leather-texture bg-warm-brown/10 border border-warm-brown/30 rounded-xl p-8 shadow-lg">
      <div className="flex items-start space-x-4 mb-4">
        <div className="bg-burgundy/20 p-3 rounded-full">
          <Mail className="h-6 w-6 text-burgundy" />
        </div>
        <div>
          <h3 className="font-display text-xl text-parchment font-semibold mb-2">
            The Examined Life Newsletter
          </h3>
          <p className="text-parchment/80 text-sm leading-relaxed">
            Receive weekly philosophical insights, thought experiments, 
            and existential musings directly in your inbox. Join fellow seekers 
            in the pursuit of wisdom.
          </p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            className="flex-1 px-4 py-3 bg-parchment border border-warm-brown/20 rounded-lg text-navy-blue placeholder-navy-blue/50 focus:outline-none focus:ring-2 focus:ring-burgundy focus:border-transparent transition-all"
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-burgundy text-parchment rounded-lg hover:bg-burgundy/80 disabled:opacity-50 transition-all font-medium shadow-md hover:shadow-lg"
          >
            {isSubmitting ? 'Subscribing...' : 'Join the Dialogue'}
          </button>
        </div>
        
        {isSubmitted && (
          <div className="flex items-center space-x-2 text-forest-green bg-forest-green/10 p-3 rounded-lg">
            <CheckCircle className="h-5 w-5" />
            <span className="text-sm">
              Welcome to the philosophical dialogue! Check your email for a welcome message.
            </span>
          </div>
        )}
        
        {error && (
          <div className="flex items-center space-x-2 text-burgundy bg-burgundy/10 p-3 rounded-lg">
            <XCircle className="h-5 w-5" />
            <span className="text-sm">{error}</span>
          </div>
        )}
      </form>
      
      <p className="text-parchment/60 text-xs mt-3">
        Unsubscribe at any time. We respect your digital autonomy.
      </p>
    </div>
  );
};

export default NewsletterSignup;
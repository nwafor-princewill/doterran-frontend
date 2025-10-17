import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Mail, Users, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { apiService } from '../../services/api';

interface NewsletterStats {
  totalSubscribers: number;
  activeSubscribers: number;
  inactiveSubscribers: number;
}

const SendNewsletter: React.FC = () => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [stats, setStats] = useState<NewsletterStats | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const response = await apiService.getNewsletterStats();
    if (response.data) {
      setStats(response.data);
    }
  };

  const handleSend = async () => {
    if (!subject.trim() || !content.trim()) {
      setMessage({ type: 'error', text: 'Subject and content are required' });
      return;
    }

    setIsSending(true);
    setMessage(null);

    try {
      const response = await apiService.sendNewsletter({ subject, content });
      
      if (response.data) {
        setMessage({ 
          type: 'success', 
          text: `Newsletter sent successfully to ${stats?.activeSubscribers} subscribers!` 
        });
        setSubject('');
        setContent('');
      } else {
        setMessage({ 
          type: 'error', 
          text: response.error || 'Failed to send newsletter' 
        });
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Network error. Please try again.' 
      });
    } finally {
      setIsSending(false);
    }
  };

  const sampleContent = `\
<p>Greetings, fellow seeker.</p>

<p>In this week's contemplation, we explore the nature of authentic being in a world of digital identities...</p>

<div class="quote">
"The unexamined life is not worth living." — Socrates
</div>

<p>As we navigate between our online personas and true selves, remember that authenticity is not found, but created through conscious choice.</p>

<p>May your week be filled with meaningful reflections,<br>
Doterra</p>`;

  return (
    <div className="min-h-screen bg-navy-blue py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/admin')}
              className="flex items-center text-parchment/80 hover:text-parchment transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Dashboard
            </button>
            <h1 className="font-display text-3xl text-parchment font-semibold">
              Send Newsletter
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="flex items-center px-4 py-2 bg-warm-brown text-parchment rounded-lg hover:bg-warm-brown/80 transition-colors"
            >
              {previewMode ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
              {previewMode ? 'Edit' : 'Preview'}
            </button>
          </div>
        </div>

        {/* Stats */}
        {stats && (
          <div className="bg-parchment/5 border border-parchment/10 rounded-xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <Users className="h-8 w-8 text-burgundy mx-auto mb-2" />
                <div className="text-2xl font-bold text-parchment">{stats.totalSubscribers}</div>
                <div className="text-parchment/70 text-sm">Total Subscribers</div>
              </div>
              <div>
                <Mail className="h-8 w-8 text-forest-green mx-auto mb-2" />
                <div className="text-2xl font-bold text-parchment">{stats.activeSubscribers}</div>
                <div className="text-parchment/70 text-sm">Active</div>
              </div>
              <div>
                <Send className="h-8 w-8 text-warm-brown mx-auto mb-2" />
                <div className="text-2xl font-bold text-parchment">
                  Ready to Send
                </div>
                <div className="text-parchment/70 text-sm">Newsletter</div>
              </div>
            </div>
          </div>
        )}

        {/* Message */}
        {message && (
          <div className={`p-4 rounded-lg mb-6 ${
            message.type === 'success' 
              ? 'bg-forest-green/20 border border-forest-green/30 text-forest-green' 
              : 'bg-burgundy/20 border border-burgundy/30 text-burgundy'
          }`}>
            {message.text}
          </div>
        )}

        {previewMode ? (
          /* Preview Mode */
          <div className="bg-parchment rounded-2xl shadow-lg border border-warm-brown/30 p-8">
            <div className="prose prose-lg max-w-none">
              <h1 className="text-3xl text-navy-blue font-display font-bold mb-4">{subject}</h1>
              <div dangerouslySetInnerHTML={{ __html: content || '<p>Start writing your newsletter content...</p>' }} />
            </div>
          </div>
        ) : (
          /* Edit Mode */
          <div className="space-y-6">
            {/* Subject */}
            <div>
              <label className="block text-parchment font-medium mb-2">
                Subject *
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Weekly Philosophical Insights..."
                className="w-full px-4 py-3 bg-parchment border border-warm-brown/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy text-navy-blue"
              />
            </div>

            {/* Content Editor */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-parchment font-medium">
                  Content *
                </label>
                <button
                  type="button"
                  onClick={() => setContent(sampleContent)}
                  className="text-sm text-burgundy hover:text-burgundy/80 transition-colors"
                >
                  Use Sample Content
                </button>
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={15}
                placeholder="Write your philosophical newsletter content here... You can use basic HTML tags like &lt;p&gt;, &lt;br&gt;, &lt;strong&gt;, &lt;em&gt;. Use &lt;div class='quote'&gt; for quotes."
                className="w-full px-4 py-3 bg-parchment border border-warm-brown/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy text-navy-blue font-mono"
              />
              <div className="text-parchment/60 text-sm mt-2">
                Supports HTML. Use &lt;div class="quote"&gt; for highlighted quotes.
              </div>
            </div>

            {/* Send Button */}
            <div className="flex justify-end">
              <button
                onClick={handleSend}
                disabled={isSending || !subject.trim() || !content.trim()}
                className="flex items-center px-8 py-3 bg-burgundy text-parchment rounded-lg hover:bg-burgundy/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-lg"
              >
                <Send className="h-5 w-5 mr-2" />
                {isSending ? 'Sending...' : `Send to ${stats?.activeSubscribers} Subscribers`}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SendNewsletter;
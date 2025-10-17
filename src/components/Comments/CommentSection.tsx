import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, User, Mail, Calendar } from 'lucide-react';
import { apiService } from '../../services/api';

interface Comment {
  _id: string;
  author: string;
  content: string;
  createdAt: string;
  isAdminReply: boolean;
  replies?: Comment[];
}

interface CommentSectionProps {
  postId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    author: '',
    email: '',
    content: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadComments();
  }, [postId]);

  const loadComments = async () => {
    try {
      const response = await apiService.getComments(postId);
      if (response.data) {
        setComments(response.data);
      }
    } catch (error) {
      console.error('Error loading comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      const response = await apiService.createComment({
        postId,
        ...formData
      });

      if (response.data) {
        setMessage({
          type: 'success',
          text: 'Thank you! Your comment is awaiting moderation.'
        });
        setFormData({ author: '', email: '', content: '' });
        setShowForm(false);
        // Reload comments to show the new one (when approved)
        setTimeout(() => loadComments(), 1000);
      } else {
        setMessage({
          type: 'error',
          text: response.error || 'Failed to submit comment'
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Network error. Please try again.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="text-center py-8 text-parchment/70">
        Loading comments...
      </div>
    );
  }

  return (
    <div className="mt-16 border-t border-warm-brown/20 pt-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <MessageSquare className="h-6 w-6 text-burgundy" />
          <h3 className="font-display text-2xl text-parchment font-semibold">
            Philosophical Dialogue
          </h3>
        </div>
        <span className="text-parchment/60 text-sm">
          {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
        </span>
      </div>

      {/* Comment Form */}
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="w-full p-6 border-2 border-dashed border-parchment/30 rounded-xl text-parchment/60 hover:text-parchment hover:border-parchment/50 transition-all duration-300 mb-8"
        >
          <div className="flex items-center justify-center space-x-2">
            <MessageSquare className="h-5 w-5" />
            <span>Join the philosophical dialogue...</span>
          </div>
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="bg-parchment/5 border border-parchment/10 rounded-xl p-6 mb-8">
          <h4 className="font-display text-lg text-parchment font-semibold mb-4">
            Share Your Perspective
          </h4>

          {message && (
            <div className={`p-3 rounded-lg mb-4 ${
              message.type === 'success' 
                ? 'bg-forest-green/20 border border-forest-green/30 text-forest-green' 
                : 'bg-burgundy/20 border border-burgundy/30 text-burgundy'
            }`}>
              {message.text}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-parchment text-sm font-medium mb-2">
                Your Name *
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                required
                className="w-full px-3 py-2 bg-parchment border border-warm-brown/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy text-navy-blue"
                placeholder="How would you like to be called?"
              />
            </div>
            <div>
              <label className="block text-parchment text-sm font-medium mb-2">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-3 py-2 bg-parchment border border-warm-brown/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy text-navy-blue"
                placeholder="Your email (never shared)"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-parchment text-sm font-medium mb-2">
              Your Thoughts *
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
              rows={4}
              className="w-full px-3 py-2 bg-parchment border border-warm-brown/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy text-navy-blue"
              placeholder="Share your philosophical perspective, agreement, disagreement, or questions..."
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="text-parchment/70 hover:text-parchment transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center px-6 py-2 bg-burgundy text-parchment rounded-lg hover:bg-burgundy/80 disabled:opacity-50 transition-colors"
            >
              <Send className="h-4 w-4 mr-2" />
              {submitting ? 'Submitting...' : 'Share Thoughts'}
            </button>
          </div>
        </form>
      )}

      {/* Comments List */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-parchment/60">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No comments yet. Start the philosophical dialogue!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="bg-parchment/5 border border-parchment/10 rounded-xl p-6">
              {/* Main Comment */}
              <div className="flex items-start space-x-4">
                {/* <div className={`p-2 rounded-full ${
                  comment.isAdminReply 
                    ? 'bg-forest-green/20 text-forest-green' 
                    : 'bg-burgundy/20 text-burgundy'
                }`}> */}
                <div className={`p-2 rounded-full ${
                comment.isAdminReply 
                    ? 'bg-warm-brown/20 text-warm-brown' 
                    : 'bg-burgundy/20 text-burgundy'
                }`}>
                <User className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {/* <span className={`font-semibold ${
                      comment.isAdminReply ? 'text-forest-green' : 'text-parchment'
                    }`}> */}
                    <span className={`font-semibold ${
                    comment.isAdminReply ? 'text-warm-brown' : 'text-parchment'
                    }`}>
                      {comment.author}
                    </span>
                    {comment.isAdminReply && (
                      <span className="bg-burgundy/20 text-burgundy px-2 py-1 rounded text-xs">
                        Author
                      </span>
                    )}
                    <span className="text-parchment/60 text-sm flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-parchment/80 leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              </div>

              {/* Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="ml-12 mt-4 space-y-4 border-l-2 border-warm-brown/20 pl-4">
                  {comment.replies.map((reply) => (
                    <div key={reply._id} className="flex items-start space-x-4">
                      {/* <div className="p-2 rounded-full bg-forest-green/20 text-forest-green"> */}
                      <div className="p-2 rounded-full bg-warm-brown/20 text-warm-brown">
                        <User className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          {/* <span className="font-semibold text-forest-green"> */}
                          <span className="font-semibold text-warm-brown">
                            {reply.author}
                          </span>
                          <span className=" text-warm-brown px-2 py-1 rounded text-xs">
                            Author
                          </span>
                          <span className="text-parchment/60 text-sm flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {formatDate(reply.createdAt)}
                          </span>
                        </div>
                        <p className="text-parchment/80 leading-relaxed">
                          {reply.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
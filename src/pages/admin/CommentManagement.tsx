import React, { useState, useEffect } from 'react';
import { MessageSquare, Check, X, Reply, Trash2, Calendar, Search } from 'lucide-react';
import { apiService } from '../../services/api';

interface Comment {
  _id: string;
  author: string;
  email: string;
  content: string;
  createdAt: string;
  isApproved: boolean;
  isAdminReply: boolean;
  postId: {
    _id: string;
    title: string;
  };
}

const CommentManagement: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'pending' | 'approved'>('pending');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  useEffect(() => {
    loadComments();
  }, [selectedTab]);

  const loadComments = async () => {
    setLoading(true);
    const response = await apiService.getAdminComments(selectedTab);
    if (response.data) {
      setComments(response.data.comments);
    }
    setLoading(false);
  };

  const handleApprove = async (commentId: string) => {
    const response = await apiService.approveComment(commentId);
    if (response.data) {
      loadComments(); // Reload the list
    }
  };

  const handleDelete = async (commentId: string) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      const response = await apiService.deleteComment(commentId);
      if (response.data) {
        loadComments(); // Reload the list
      }
    }
  };

  const handleReply = async (commentId: string) => {
    if (!replyContent.trim()) return;

    const response = await apiService.addCommentReply(commentId, replyContent);
    if (response.data) {
      setReplyingTo(null);
      setReplyContent('');
      loadComments(); // Reload to show the reply
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-navy-blue py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl text-parchment font-semibold mb-8">
          Comment Management
        </h1>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setSelectedTab('pending')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedTab === 'pending'
                ? 'bg-burgundy text-parchment'
                : 'bg-parchment/10 text-parchment/70 hover:text-parchment'
            }`}
          >
            Pending Moderation
          </button>
          <button
            onClick={() => setSelectedTab('approved')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedTab === 'approved'
                ? 'bg-forest-green text-parchment'
                : 'bg-parchment/10 text-parchment/70 hover:text-parchment'
            }`}
          >
            Approved Comments
          </button>
        </div>

        {loading ? (
          <div className="text-parchment">Loading comments...</div>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment._id} className="bg-parchment/5 border border-parchment/10 rounded-xl p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="font-semibold text-parchment">{comment.author}</span>
                      <span className="text-parchment/60 text-sm">{comment.email}</span>
                      <span className="text-parchment/60 text-sm flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                    <div className="text-forest-green text-sm mb-2">
                      On: "{comment.postId.title}"
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    {selectedTab === 'pending' && (
                      <button
                        onClick={() => handleApprove(comment._id)}
                        className="p-2 text-forest-green hover:bg-forest-green/20 rounded transition-colors"
                        title="Approve comment"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                    )}
                    <button
                      onClick={() => setReplyingTo(replyingTo === comment._id ? null : comment._id)}
                      className="p-2 text-warm-brown hover:bg-warm-brown/20 rounded transition-colors"
                      title="Reply to comment"
                    >
                      <Reply className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(comment._id)}
                      className="p-2 text-burgundy hover:bg-burgundy/20 rounded transition-colors"
                      title="Delete comment"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <p className="text-parchment/80 mb-4">{comment.content}</p>

                {/* Reply Form */}
                {replyingTo === comment._id && (
                  <div className="bg-parchment/10 border border-parchment/20 rounded-lg p-4 mt-4">
                    <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Write your reply as Doterra..."
                      rows={3}
                      className="w-full px-3 py-2 bg-parchment border border-warm-brown/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy text-navy-blue mb-2"
                    />
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => setReplyingTo(null)}
                        className="px-3 py-1 text-parchment/70 hover:text-parchment transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleReply(comment._id)}
                        disabled={!replyContent.trim()}
                        className="px-4 py-1 bg-forest-green text-parchment rounded hover:bg-forest-green/80 disabled:opacity-50 transition-colors"
                      >
                        Send Reply
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {comments.length === 0 && (
              <div className="text-center py-12 text-parchment/60">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No {selectedTab} comments found.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentManagement;
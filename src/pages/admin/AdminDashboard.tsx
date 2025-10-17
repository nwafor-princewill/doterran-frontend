import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, Save, X, Upload, Image as ImageIcon, Send } from 'lucide-react';
import { BlogPost } from '../../types';
import { apiService } from '../../services/api'
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { MessageSquare } from 'lucide-react';



const AdminDashboard: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const response = await apiService.getAdminBlogPosts();
      if (response.data) {
        setPosts(response.data);
      } else if (response.error) {
        setError(response.error);
      }
    } catch (err) {
      setError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    return `http://localhost:5000${imagePath}`;
  };

  const handleCreate = () => {
    const newPost: BlogPost = {
      title: '',
      excerpt: '',
      content: '',
      featuredImage: '',
      category: 'Ethics',
      tags: [],
      readTime: 5,
      publishedAt: new Date().toISOString().split('T')[0],
      author: 'Doterra',
      isPublished: false
    };
    setEditingPost(newPost);
    setIsCreating(true);
    setImagePreview(null);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setIsCreating(false);
    setImagePreview(getImageUrl(post.featuredImage));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };


  // In the handleSave function, update the error handling:
const handleSave = async () => {
  if (!editingPost) return;

  try {
    const formData = new FormData();
    
    // Append all post data
    formData.append('title', editingPost.title);
    formData.append('excerpt', editingPost.excerpt);
    formData.append('content', editingPost.content);
    formData.append('category', editingPost.category);
    formData.append('tags', JSON.stringify(editingPost.tags));
    formData.append('readTime', editingPost.readTime.toString());
    formData.append('isPublished', editingPost.isPublished.toString());
    formData.append('author', editingPost.author);

    // Append image if a new one was selected
    const imageInput = document.getElementById('featuredImage') as HTMLInputElement;
    if (imageInput?.files?.[0]) {
      // Check file size before uploading
      const file = imageInput.files[0];
      if (file.size > 20 * 1024 * 1024) { // 20MB
        setError('Image file is too large. Maximum size is 20MB.');
        return;
      }
      formData.append('featuredImage', file);
    }

    let response;
    if (isCreating) {
      response = await apiService.createBlogPost(formData);
    } else {
      response = await apiService.updateBlogPost(editingPost._id || editingPost.id!, formData);
    }

    if (response.data) {
      await loadPosts();
      setEditingPost(null);
      setIsCreating(false);
      setImagePreview(null);
      setError(null);
    } else {
      setError(response.error || 'Error saving post. Please try again.');
    }
  } catch (err) {
    setError('Network error. Please check if the backend server is running.');
  }
};

  const handleDelete = async (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const response = await apiService.deleteBlogPost(postId);
        if (!response.error) {
          await loadPosts();
        } else {
          setError(response.error);
        }
      } catch (err) {
        setError('Error deleting post');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-blue flex items-center justify-center">
        <div className="text-parchment">Loading...</div>
      </div>
    );
  }

  if (editingPost) {
    return (
      <div className="min-h-screen bg-navy-blue py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-parchment rounded-2xl shadow-lg border border-warm-brown/30 p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-display text-2xl text-navy-blue font-semibold">
                {isCreating ? 'Create New Post' : 'Edit Post'}
              </h2>
              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  className="flex items-center px-4 py-2 bg-forest-green text-parchment rounded-lg hover:bg-forest-green/80 transition-colors"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditingPost(null);
                    setImagePreview(null);
                  }}
                  className="flex items-center px-4 py-2 bg-burgundy text-parchment rounded-lg hover:bg-burgundy/80 transition-colors"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </button>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-burgundy/10 border border-burgundy/20 rounded-lg">
                <p className="text-burgundy text-sm">{error}</p>
              </div>
            )}

            <div className="space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-navy-blue font-medium mb-2">Featured Image</label>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <input
                      id="featuredImage"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="featuredImage"
                      className="cursor-pointer flex items-center justify-center px-4 py-3 border-2 border-dashed border-warm-brown/30 rounded-lg hover:border-burgundy transition-colors"
                    >
                      <Upload className="h-5 w-5 text-navy-blue/60 mr-2" />
                      <span className="text-navy-blue/70">
                        {imagePreview ? 'Change image' : 'Choose image'}
                      </span>
                    </label>
                  </div>
                  
                  {imagePreview && (
                    <div className="w-24 h-24 rounded-lg overflow-hidden border border-warm-brown/30">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-navy-blue font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={editingPost.title}
                  onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                  className="w-full px-3 py-2 border border-warm-brown/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy"
                  placeholder="Enter post title..."
                />
              </div>

              <div>
                <label className="block text-navy-blue font-medium mb-2">Excerpt</label>
                <textarea
                  value={editingPost.excerpt}
                  onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-warm-brown/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy"
                  placeholder="Brief description of the post..."
                />
              </div>

              <div>
                <label className="block text-navy-blue font-medium mb-2">Content</label>
                <textarea
                  value={editingPost.content}
                  onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                  rows={15}
                  className="w-full px-3 py-2 border border-warm-brown/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy font-mono"
                  placeholder="Write your post content here..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-navy-blue font-medium mb-2">Category</label>
                  <select
                    value={editingPost.category}
                    onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                    className="w-full px-3 py-2 border border-warm-brown/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy"
                  >
                    <option value="Ethics">Ethics</option>
                    <option value="Existentialism">Existentialism</option>
                    <option value="Metaphysics">Metaphysics</option>
                    <option value="Epistemology">Epistemology</option>
                    <option value="Political Philosophy">Political Philosophy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-navy-blue font-medium mb-2">Read Time (minutes)</label>
                  <input
                    type="number"
                    value={editingPost.readTime}
                    onChange={(e) => setEditingPost({ ...editingPost, readTime: parseInt(e.target.value) || 5 })}
                    className="w-full px-3 py-2 border border-warm-brown/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy"
                    min="1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-navy-blue font-medium mb-2">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={editingPost.tags.join(', ')}
                  onChange={(e) => setEditingPost({ 
                    ...editingPost, 
                    tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag) 
                  })}
                  className="w-full px-3 py-2 border border-warm-brown/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy"
                  placeholder="ethics, morality, philosophy"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isPublished"
                  checked={editingPost.isPublished}
                  onChange={(e) => setEditingPost({ ...editingPost, isPublished: e.target.checked })}
                  className="rounded border-warm-brown/30 text-burgundy focus:ring-burgundy"
                />
                <label htmlFor="isPublished" className="text-navy-blue font-medium">
                  Publish immediately
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-blue py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* <div className="flex justify-between items-center mb-8">
          <h1 className="font-display text-3xl text-parchment font-semibold">
            Admin Dashboard
          </h1>
          <button
            onClick={handleCreate}
            className="flex items-center px-4 py-2 bg-burgundy text-parchment rounded-lg hover:bg-burgundy/80 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </button>
        </div> */}

        {/* Then replace the header section with */}
        <div className="mb-8">
        <h1 className="font-display text-3xl text-parchment font-semibold mb-4">
            Admin Dashboard
        </h1>
        <div className="flex space-x-4">
            <Link
            to="/admin/subscribers"
            className="flex items-center px-4 py-2 bg-forest-green text-parchment rounded-lg hover:bg-forest-green/80 transition-colors"
            >
            <Mail className="h-4 w-4 mr-2" />
            View Subscribers
            </Link>

            {/* In the button section, add this button */}
            <Link
            to="/admin/newsletter"
            className="flex items-center px-4 py-2 bg-warm-brown text-parchment rounded-lg hover:bg-warm-brown/80 transition-colors"
            >
            <Send className="h-4 w-4 mr-2" />
            Send Newsletter
            </Link>

             {/* Add this button to the button group: */}
            <Link
              to="/admin/comments"
              className="flex items-center px-4 py-2 bg-warm-brown text-parchment rounded-lg hover:bg-warm-brown/80 transition-colors"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Manage Comments
            </Link>
            <button
            onClick={handleCreate}
            className="flex items-center px-4 py-2 bg-burgundy text-parchment rounded-lg hover:bg-burgundy/80 transition-colors"
            >
            <Plus className="h-4 w-4 mr-2" />
            New Post
            </button>
        </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-burgundy/10 border border-burgundy/20 rounded-lg">
            <p className="text-parchment">{error}</p>
            <button 
              onClick={loadPosts}
              className="mt-2 px-3 py-1 bg-burgundy text-parchment rounded text-sm hover:bg-burgundy/80 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        <div className="bg-parchment/5 border border-parchment/10 rounded-xl overflow-hidden">
          {posts.length === 0 ? (
            <div className="p-8 text-center text-parchment/70">
              <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No posts yet. Create your first philosophical essay.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 divide-y divide-parchment/10">
              {posts.map((post) => (
                <div key={post._id || post.id} className="p-6 hover:bg-parchment/5 transition-colors">
                  <div className="flex items-start space-x-4">
                    {post.featuredImage && (
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={getImageUrl(post.featuredImage) || '/api/placeholder/80/80'} 
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-lg text-parchment font-semibold mb-2 truncate">
                        {post.title}
                      </h3>
                      <p className="text-parchment/70 text-sm mb-2 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-parchment/60">
                        <span className="bg-burgundy/20 text-burgundy px-2 py-1 rounded">
                          {post.category}
                        </span>
                        <span>{post.readTime} min read</span>
                        <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                        <span className={post.isPublished ? 'text-forest-green' : 'text-warm-brown'}>
                          {post.isPublished ? 'Published' : 'Draft'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => handleEdit(post)}
                        className="p-2 text-parchment/70 hover:text-parchment transition-colors"
                        title="Edit post"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(post._id || post.id!)}
                        className="p-2 text-parchment/70 hover:text-burgundy transition-colors"
                        title="Delete post"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <a
                        href={`/article/${post._id || post.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-parchment/70 hover:text-forest-green transition-colors"
                        title="View post"
                      >
                        <Eye className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
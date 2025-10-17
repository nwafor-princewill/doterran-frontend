import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Clock, User } from 'lucide-react';
import { BlogPost } from '../types';
import { apiService } from '../services/api';

const Articles: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const categories = ['All', 'Ethics', 'Existentialism', 'Metaphysics', 'Epistemology', 'Political Philosophy'];

  useEffect(() => {
    loadPosts();
  }, [searchTerm, selectedCategory]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const response = await apiService.getBlogPosts({
        category: selectedCategory !== 'All' ? selectedCategory : undefined,
        search: searchTerm || undefined,
        limit: 20
      });
      
      if (response.data) {
        setPosts(response.data.posts);
      } else if (response.error) {
        setError(response.error);
      }
    } catch (err) {
      setError('Failed to load articles');
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '/api/placeholder/400/200';
    if (imagePath.startsWith('http')) return imagePath;
    return `http://localhost:5000${imagePath}`;
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-blue py-12 flex items-center justify-center">
        <div className="text-parchment text-lg">Loading articles...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-blue py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl text-parchment font-semibold mb-4">
            Philosophical Essays
          </h1>
          <p className="text-parchment/70 text-lg max-w-2xl mx-auto">
            Explore timeless wisdom, ethical dilemmas, and existential inquiries 
            through our collection of thoughtful essays and contemplations.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-parchment/5 border border-parchment/10 rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-parchment/50" />
              <input
                type="text"
                placeholder="Search articles, tags, or concepts..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-3 bg-parchment/10 border border-parchment/20 rounded-lg text-parchment placeholder-parchment/50 focus:outline-none focus:border-burgundy transition-colors"
              />
            </div>
            
            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-parchment/50" />
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="px-4 py-3 bg-parchment/10 border border-parchment/20 rounded-lg text-parchment focus:outline-none focus:border-burgundy transition-colors"
              >
                {categories.map(category => (
                  <option key={category} value={category} className="bg-navy-blue">
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-burgundy/10 border border-burgundy/20 rounded-xl p-6 mb-8 text-center">
            <p className="text-parchment">{error}</p>
            <button 
              onClick={loadPosts}
              className="mt-3 px-4 py-2 bg-burgundy text-parchment rounded-lg hover:bg-burgundy/80 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post._id || post.id}
              className="bg-parchment rounded-xl shadow-lg border border-warm-brown/20 overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              {/* Image */}
              <div className="h-48 bg-gradient-to-br from-warm-brown/40 to-burgundy/40 overflow-hidden">
                <img 
                  src={getImageUrl(post.featuredImage)} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block bg-burgundy/10 text-burgundy px-2 py-1 rounded text-xs font-medium">
                    {post.category}
                  </span>
                  <div className="flex items-center space-x-1 text-navy-blue/60 text-xs">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime} min</span>
                  </div>
                </div>
                
                <h2 className="font-display text-xl text-navy-blue font-semibold mb-3 group-hover:text-burgundy transition-colors leading-tight">
                  {post.title}
                </h2>
                
                <p className="text-navy-blue/70 text-sm leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-navy-blue/60 text-xs">
                    <User className="h-3 w-3" />
                    <span>{post.author}</span>
                  </div>
                  <Link
                    to={`/article/${post._id || post.id}`}
                    className="text-burgundy hover:text-burgundy/80 font-medium text-sm flex items-center space-x-1 transition-colors"
                  >
                    <span>Read Essay</span>
                  </Link>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mt-4">
                  {post.tags.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      className="inline-block bg-parchment/20 text-navy-blue/70 px-2 py-1 rounded text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="inline-block bg-parchment/20 text-navy-blue/70 px-2 py-1 rounded text-xs">
                      +{post.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {posts.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-parchment/70 text-lg">
              No articles found matching your criteria.
            </p>
            {(searchTerm || selectedCategory !== 'All') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="mt-4 px-4 py-2 bg-burgundy text-parchment rounded-lg hover:bg-burgundy/80 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Articles;
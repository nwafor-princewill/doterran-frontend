import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, User, Calendar, Share2, ArrowLeft, Plus, Minus } from 'lucide-react';
import { BlogPost } from '../types';
import { apiService } from '../services/api';
import NewsletterSignup from '../components/Newsletter/NewsletterSignup';
import ThoughtExperiment from '../components/Interactive/ThoughtExperiment';
import PhilosophyQuiz from '../components/Interactive/PhilosophyQuiz';
import { thoughtExperiments, philosophyQuiz } from '../data/mockData';
import CommentSection from '../components/Comments/CommentSection';

const Article: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [expandedDives, setExpandedDives] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadPost();
    }
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const loadPost = async () => {
    try {
      setLoading(true);
      const response = await apiService.getBlogPost(id!);
      
      if (response.data) {
        setPost(response.data);
        loadRelatedPosts(response.data.category, response.data._id || response.data.id!);
      } else if (response.error) {
        setError(response.error);
      }
    } catch (err) {
      setError('Failed to load article');
    } finally {
      setLoading(false);
    }
  };

  const loadRelatedPosts = async (category: string, currentPostId: string) => {
    const response = await apiService.getBlogPosts({ 
      category, 
      limit: 3 
    });
    
    if (response.data) {
      const related = response.data.posts.filter(
        p => (p._id || p.id) !== currentPostId
      ).slice(0, 2);
      setRelatedPosts(related);
    }
  };

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '/api/placeholder/800/400';
    if (imagePath.startsWith('http')) return imagePath;
    return `http://localhost:5000${imagePath}`;
  };

  const toggleDeepDive = (diveId: string) => {
    const newExpanded = new Set(expandedDives);
    if (newExpanded.has(diveId)) {
      newExpanded.delete(diveId);
    } else {
      newExpanded.add(diveId);
    }
    setExpandedDives(newExpanded);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        text: post?.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-blue flex items-center justify-center">
        <div className="text-parchment text-lg">Loading philosophical wisdom...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-navy-blue flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-2xl text-parchment mb-4">
            {error || 'Article Not Found'}
          </h2>
          <Link to="/articles" className="text-burgundy hover:text-burgundy/80">
            Return to Articles
          </Link>
        </div>
      </div>
    );
  }

  // Simple markdown parser for demonstration
  const renderContent = (content: string) => {
    const sections = content.split('### Deep Dive:');
    
    return (
      <div className="prose prose-lg max-w-none">
        {sections.map((section, index) => {
          if (index === 0) {
            // Main content before first deep dive
            return (
              <div key="main" className="text-navy-blue/80 leading-relaxed">
                {section.split('\n').map((line, i) => {
                  if (line.startsWith('# ')) {
                    return <h1 key={i} className="font-display text-4xl text-navy-blue font-semibold mb-6">{line.substring(2)}</h1>;
                  } else if (line.startsWith('## ')) {
                    return <h2 key={i} className="font-display text-2xl text-navy-blue font-semibold mt-8 mb-4">{line.substring(3)}</h2>;
                  } else if (line.trim() === '') {
                    return <br key={i} />;
                  } else {
                    return <p key={i} className="mb-4 leading-8">{line}</p>;
                  }
                })}
              </div>
            );
          } else {
            // Deep dive sections
            const [title, ...contentLines] = section.split('\n');
            const diveId = `dive-${index}`;
            const isExpanded = expandedDives.has(diveId);
            
            return (
              <div key={diveId} className="my-8">
                <button
                  onClick={() => toggleDeepDive(diveId)}
                  className="w-full flex items-center justify-between p-4 bg-forest-green/10 border border-forest-green/20 rounded-lg hover:bg-forest-green/15 transition-colors group"
                >
                  <span className="font-display text-lg text-forest-green font-semibold">
                    Deep Dive: {title}
                  </span>
                  {isExpanded ? (
                    <Minus className="h-5 w-5 text-forest-green" />
                  ) : (
                    <Plus className="h-5 w-5 text-forest-green" />
                  )}
                </button>
                
                {isExpanded && (
                  <div className="mt-4 p-6 bg-parchment/5 border border-parchment/10 rounded-lg animate-fadeIn">
                    <div className="text-navy-blue/80 leading-relaxed">
                      {contentLines.map((line, i) => (
                        <p key={i} className="mb-3">{line}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          }
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-paper-texture">
      {/* Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-burgundy z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          to="/articles"
          className="inline-flex items-center text-burgundy hover:text-burgundy/80 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Articles
        </Link>

        {/* Article Header */}
        <header className="mb-12 text-center">
          <div className="inline-block bg-burgundy/10 text-burgundy px-3 py-1 rounded-full text-sm font-medium mb-4">
            {post.category}
          </div>
          <h1 className="font-display text-4xl md:text-5xl  group-hover:text-burgundy transition-colors font-semibold mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap justify-center items-center gap-6 text-white/60 text-sm">
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{post.readTime} min read</span>
            </div>
            <button 
              onClick={handleShare}
              className="flex items-center space-x-1 text-burgundy hover:text-burgundy/80 transition-colors"
            >
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </button>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-12 rounded-xl overflow-hidden shadow-lg">
          <div className="h-64 md:h-96 bg-gradient-to-br from-warm-brown/40 to-burgundy/40 overflow-hidden">
            <img 
              src={getImageUrl(post.featuredImage)} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Article Content */}
        <article className="bg-parchment rounded-2xl shadow-lg border border-warm-brown/30 p-8 md:p-12 mb-12">
          {renderContent(post.content)}

          {/* Thought Experiment */}
          {thoughtExperiments.length > 0 && (
            <div className="my-12">
              <ThoughtExperiment experiment={thoughtExperiments[0]} />
            </div>
          )}
        </article>

        {/* Philosophy Quiz */}
        <div className="mb-12">
          <PhilosophyQuiz questions={philosophyQuiz} />
        </div>

        {/* Newsletter Signup */}
        <div className="mb-12">
          <NewsletterSignup variant="minimal" />
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="mb-12">
            <h3 className="font-display text-2xl text-navy-blue font-semibold mb-6">
              Further Contemplations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map(relatedPost => (
                <Link
                  key={relatedPost._id || relatedPost.id}
                  to={`/article/${relatedPost._id || relatedPost.id}`}
                  className="block bg-parchment/5 border border-parchment/10 rounded-xl p-6 hover:bg-parchment/10 hover:border-parchment/20 transition-all group"
                >
                  <span className="inline-block bg-burgundy/10 text-burgundy px-2 py-1 rounded text-xs font-medium mb-2">
                    {relatedPost.category}
                  </span>
                  <h4 className="font-display text-lg text-parchment font-semibold mb-2 group-hover:text-burgundy transition-colors">
                    {relatedPost.title}
                  </h4>
                  <p className="text-parchment/70 text-sm line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
      <CommentSection postId={post._id || post.id!} />
    </div>
  );
};

export default Article;
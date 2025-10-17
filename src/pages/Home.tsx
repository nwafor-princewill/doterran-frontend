import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, User } from 'lucide-react';
import { BlogPost } from '../types';
import { apiService } from '../services/api';
import NewsletterSignup from '../components/Newsletter/NewsletterSignup';

const Home: React.FC = () => {
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const response = await apiService.getFeaturedPosts(5);
      
      if (response.data) {
        const posts = response.data.posts;
        if (posts.length > 0) {
          setFeaturedPost(posts[0]);
          setRecentPosts(posts.slice(1, 5));
        }
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
    if (!imagePath) return '/api/placeholder/800/400';
    if (imagePath.startsWith('http')) return imagePath;
    return `http://localhost:5000${imagePath}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-blue flex items-center justify-center">
        <div className="text-parchment text-lg">Loading philosophical wisdom...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-navy-blue flex items-center justify-center">
        <div className="text-parchment text-lg text-center">
          <p>Error loading content: {error}</p>
          <button 
            onClick={loadPosts}
            className="mt-4 px-4 py-2 bg-burgundy text-parchment rounded-lg hover:bg-burgundy/80 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-blue">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-navy-blue via-burgundy/20 to-forest-green/20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block bg-parchment/10 backdrop-blur-sm border border-parchment/20 rounded-2xl px-6 py-3 mb-8">
              <span className="text-parchment/80 text-sm font-medium tracking-wide">
                BY DOTERRA • THE EXAMINED LIFE
              </span>
            </div>
            
            <h1 className="font-display text-5xl md:text-7xl text-parchment font-bold mb-6 leading-tight">
              <span className="block">Who Am I?</span>
              <span className="block text-burgundy text-3xl md:text-4xl mt-2">
                Beyond Names, Beyond Labels
              </span>
            </h1>
            
            <div className="bg-parchment/10 backdrop-blur-sm border border-parchment/20 rounded-2xl p-6 mb-8 max-w-3xl mx-auto">
              <p className="text-xl text-parchment/80 leading-relaxed italic">
                "I am not my name. My name is an arbitrary label, an accident of my birth, 
                given to me by others. From <span className="line-through text-parchment/60">Nwafor Princewill</span> to <span className="text-burgundy font-semibold">Doterra</span>— 
                my goal is to move past superficial labels and into Authentic Being."
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/articles"
                className="inline-flex items-center px-8 py-4 bg-burgundy text-parchment rounded-lg hover:bg-burgundy/80 transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-xl"
              >
                Explore Philosophical Essays
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center px-8 py-4 border-2 border-parchment/30 text-parchment rounded-lg hover:border-parchment/60 hover:bg-parchment/5 transition-all duration-300 font-medium text-lg"
              >
                The Doterra Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredPost && (
        <section className="py-16 bg-paper-texture">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl text-parchment font-semibold mb-4">
                Featured Contemplation
              </h2>
              <div className="w-24 h-1 bg-burgundy mx-auto"></div>
            </div>

            <div className="bg-parchment rounded-2xl shadow-2xl overflow-hidden border border-warm-brown/30">
              <div className="md:flex">
                <div className="md:flex-1 p-8 md:p-12">
                  <div className="inline-block bg-forest-green/10 text-forest-green px-3 py-1 rounded-full text-sm font-medium mb-4">
                    {featuredPost.category}
                  </div>
                  {/* <h3 className="font-display text-3xl text-navy-blue font-semibold mb-4 leading-tight">
                    {featuredPost.title}
                  </h3> */}
                  <h3 className="font-display text-xl text-parchment font-semibold mb-3 group-hover:text-burgundy transition-colors">
                    {featuredPost.title}
                    </h3>
                  <p className="text-navy-blue/70 text-lg leading-relaxed mb-6">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center space-x-6 text-navy-blue/60 mb-6">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{featuredPost.readTime} min read</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span className="text-sm">Doterra</span>
                    </div>
                  </div>
                  <Link
                    to={`/article/${featuredPost._id || featuredPost.id}`}
                    className="inline-flex items-center px-6 py-3 bg-burgundy text-parchment rounded-lg hover:bg-burgundy/80 transition-colors font-medium"
                  >
                    Continue Reading
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
                <div className="md:w-2/5 bg-gradient-to-br from-warm-brown/20 to-burgundy/20 flex items-center justify-center p-8">
                  <div className="w-full h-64 md:h-full bg-warm-brown/30 rounded-lg overflow-hidden">
                    <img 
                      src={getImageUrl(featuredPost.featuredImage)} 
                      alt={featuredPost.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Recent Articles */}
      <section className="py-16 bg-navy-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl text-parchment font-semibold mb-4">
              Recent Musings
            </h2>
            <div className="w-24 h-1 bg-burgundy mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <article
                key={post._id || post.id}
                className="bg-parchment/5 border border-parchment/10 rounded-xl p-6 hover:bg-parchment/10 hover:border-parchment/20 transition-all duration-300 group"
              >
                <div className="inline-block bg-burgundy/20 text-burgundy px-2 py-1 rounded text-xs font-medium mb-3">
                  {post.category}
                </div>
                <h3 className="font-display text-xl text-parchment font-semibold mb-3 group-hover:text-burgundy transition-colors">
                  {post.title}
                </h3>
                <p className="text-parchment/70 text-sm leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-parchment/60 text-sm">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime} min</span>
                  </div>
                  <Link
                    to={`/article/${post._id || post.id}`}
                    className="text-burgundy hover:text-burgundy/80 transition-colors font-medium flex items-center space-x-1"
                  >
                    <span>Read</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {recentPosts.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-parchment/70 text-lg">
                No articles published yet. Check back soon for philosophical insights.
              </p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/articles"
              className="inline-flex items-center px-8 py-3 border-2 border-parchment text-parchment rounded-lg hover:bg-parchment hover:text-navy-blue transition-all duration-300 font-medium"
            >
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Teaser with Doterra Story */}
      <section className="py-16 bg-paper-texture">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-parchment rounded-2xl shadow-lg border border-warm-brown/30 p-8 md:p-12">
            <h2 className="font-display text-3xl text-navy-blue font-semibold mb-6 text-center">
              The Interlocutor's Journey
            </h2>
            <div className="prose prose-lg max-w-none text-navy-blue/80">
              <p className="text-lg leading-relaxed mb-4">
                <strong>Hello. I'm Nwafor Princewill,</strong> and this blog is my space for the examined life. 
                I'll be turning 23 this month, and I hold a degree in Computer Science—a background that often 
                pulls me between the cold, ordered logic of code and the messy, unbounded freedom of human consciousness.
              </p>
              <p className="text-lg leading-relaxed mb-4">
                The fundamental question that drives this project is simple, yet profound: <em>"Who Am I?"</em>
              </p>
              <p className="text-lg leading-relaxed mb-4">
                For years, I accepted the identity given to me: the name Princewill and the role of "son" or "graduate." 
                But as I began reading philosophy, a vital truth became clear: <strong>I am not my name.</strong> My name is 
                an arbitrary label, an accident of my birth, given to me by others.
              </p>
              
              {/* Doterra Revelation Story */}
              <div className="bg-forest-green/5 border-l-4 border-forest-green p-6 my-6 rounded-r-lg">
                <h3 className="font-display text-xl text-forest-green font-semibold mb-3">
                  The Doterra Revelation
                </h3>
                <p className="text-navy-blue/80 leading-relaxed mb-3">
                  This realization—that my assigned name and roles did not constitute my essence—led to an unexpected revelation. 
                  While registering for something online, instead of writing "Nwafor Princewill," I instinctively typed <strong>"Doterra."</strong>
                </p>
                <p className="text-navy-blue/80 leading-relaxed">
                  This simple act of substitution was an existential move: I was rejecting the pre-defined label and substituting 
                  it with a commercial one—a poignant commentary on how much of modern identity is derived from brands and consumption, 
                  rather than genuine self-creation. <strong>Doterra</strong> became my symbolic rejection of inherited identity and 
                  my first step toward authentic being.
                </p>
              </div>

              <p className="text-lg font-semibold text-burgundy mb-6 text-center">
                My goal now is to move past the superficial labels and into Authentic Being.
              </p>
              
              <div className="text-center">
                <Link
                  to="/about"
                  className="inline-flex items-center px-6 py-3 bg-forest-green text-parchment rounded-lg hover:bg-forest-green/80 transition-colors font-medium"
                >
                  Continue My Story
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-navy-blue">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsletterSignup />
        </div>
      </section>
    </div>
  );
};

export default Home;
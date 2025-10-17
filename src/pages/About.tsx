import React from 'react';
import { BookOpen, GraduationCap, Target, Mail, MessageCircle, Calendar } from 'lucide-react';
import NewsletterSignup from '../components/Newsletter/NewsletterSignup';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-navy-blue py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-burgundy/20 to-forest-green/20 border-4 border-parchment/20 flex items-center justify-center">
            <span className="text-parchment/60 text-sm">Your Photo</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-parchment font-semibold mb-4">
            About The Interlocutor
          </h1>
          <div className="w-24 h-1 bg-burgundy mx-auto mb-6"></div>
          <p className="text-parchment/70 text-lg max-w-2xl mx-auto">
            Nwafor Princewill · Doterra · The Examined Life
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {/* Introduction */}
          <section className="bg-parchment rounded-2xl shadow-lg border border-warm-brown/30 p-8 md:p-12">
            <div className="flex items-start space-x-4 mb-6">
              <div className="bg-burgundy/20 p-3 rounded-full">
                <BookOpen className="h-6 w-6 text-burgundy" />
              </div>
              <div>
                <h2 className="font-display text-2xl text-navy-blue font-semibold mb-4">
                  The Fundamental Question
                </h2>
                <div className="prose prose-lg text-navy-blue/80 leading-relaxed">
                  <p className="text-lg mb-4">
                    <strong>Hello. I'm Nwafor Princewill,</strong> and this blog is my space for the examined life. 
                    I'll be turning 23 this month, and I hold a degree in Computer Science—a background that often 
                    pulls me between the cold, ordered logic of code and the messy, unbounded freedom of human consciousness.
                  </p>
                  <p className="text-lg mb-4">
                    The fundamental question that drives this project is simple, yet profound: <em>"Who Am I?"</em>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* The Existential Journey */}
          <section className="bg-parchment/5 border border-parchment/10 rounded-2xl p-8 md:p-12">
            <div className="flex items-start space-x-4 mb-6">
              <div className="bg-forest-green/20 p-3 rounded-full">
                <Target className="h-6 w-6 text-forest-green" />
              </div>
              <div>
                <h2 className="font-display text-2xl text-parchment font-semibold mb-4">
                  The Existential Journey
                </h2>
                <div className="prose prose-lg text-parchment/80 leading-relaxed">
                  <p className="text-lg mb-4">
                    For years, I accepted the identity given to me: the name Princewill and the role of "son" or "graduate." 
                    But as I began reading philosophy, a vital truth became clear: <strong>I am not my name.</strong> My name is 
                    an arbitrary label, an accident of my birth, given to me by others.
                  </p>
                  <p className="text-lg mb-4">
                    This realization—that my assigned name and roles did not constitute my essence—led to an unexpected revelation. 
                    While registering for something online, instead of writing "Nwafor Princewill," I typed "Doterra." This simple 
                    act of substitution was an instinctive, existential move: I was rejecting the pre-defined label and substituting 
                    it with a commercial one—a commentary on how much of modern identity is derived from brands and consumption, 
                    rather than genuine self-creation.
                  </p>
                  <p className="text-lg font-semibold text-burgundy">
                    My goal now is to move past the superficial labels and into Authentic Being.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* My Philosophical Awakening */}
          <section className="bg-parchment rounded-2xl shadow-lg border border-warm-brown/30 p-8 md:p-12">
            <div className="flex items-start space-x-4 mb-6">
              <div className="bg-warm-brown/20 p-3 rounded-full">
                <GraduationCap className="h-6 w-6 text-warm-brown" />
              </div>
              <div>
                <h2 className="font-display text-2xl text-navy-blue font-semibold mb-4">
                  My Philosophical Awakening
                </h2>
                <div className="prose prose-lg text-navy-blue/80 leading-relaxed">
                  <p className="text-lg mb-4">
                    My journey into philosophy began not in a classroom, but in the quiet moments between writing code. 
                    As a Computer Science graduate, I was trained to think in binaries and logic gates, but my soul yearned 
                    for something more—something that could explain the depth of human experience.
                  </p>
                  <p className="text-lg mb-4">
                    I discovered existentialism during a period of intense self-reflection. The works of Kierkegaard, 
                    Nietzsche, and Sartre resonated deeply with my own struggles with identity and purpose. They gave 
                    me the language to articulate what I had always felt: that we are not just products of our circumstances, 
                    but active creators of our own meaning.
                  </p>
                  <p className="text-lg mb-4">
                    Philosophy became my compass in navigating the complexities of modern existence—from the digital personas 
                    we cultivate online to the authentic selves we aspire to become offline.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Connect Section */}
          <section className="bg-parchment/5 border border-parchment/10 rounded-2xl p-8 md:p-12">
            <div className="flex items-start space-x-4 mb-6">
              <div className="bg-burgundy/20 p-3 rounded-full">
                <MessageCircle className="h-6 w-6 text-burgundy" />
              </div>
              <div>
                <h2 className="font-display text-2xl text-parchment font-semibold mb-4">
                  Let's Continue the Dialogue
                </h2>
                <div className="prose prose-lg text-parchment/80 leading-relaxed">
                  <p className="text-lg mb-6">
                    I believe philosophy is not meant to be studied in isolation, but to be lived and discussed. 
                    I welcome your thoughts, questions, and perspectives on this journey we call life.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <a
                      href="https://wa.me/2349032650856"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-3 px-6 py-4 bg-forest-green text-parchment rounded-lg hover:bg-forest-green/80 transition-all duration-300 font-medium"
                    >
                      <MessageCircle className="h-5 w-5" />
                      <span>Chat on WhatsApp</span>
                    </a>
                    
                    <a
                      href="mailto:thoughts@doterran.com"
                      className="flex items-center justify-center space-x-3 px-6 py-4 bg-burgundy text-parchment rounded-lg hover:bg-burgundy/80 transition-all duration-300 font-medium"
                    >
                      <Mail className="h-5 w-5" />
                      <span>Send an Email</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Newsletter */}
          <section className="text-center">
            <NewsletterSignup />
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
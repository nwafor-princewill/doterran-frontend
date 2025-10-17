import React, { useState } from 'react';
import { QuizQuestion, QuizResult } from '../../types';
import { Award, ArrowRight, RotateCcw } from 'lucide-react';

interface PhilosophyQuizProps {
  questions: QuizQuestion[];
}

const philosophyResults: Record<string, QuizResult> = {
  'Utilitarianism': {
    philosophy: 'Utilitarianism',
    description: 'You prioritize outcomes and consequences above all else. The greatest good for the greatest number guides your moral compass.',
    alignment: 85
  },
  'Deontology': {
    philosophy: 'Deontology',
    description: 'You believe in following moral rules and duties. Some actions are inherently right or wrong, regardless of their consequences.',
    alignment: 85
  },
  'Virtue Ethics': {
    philosophy: 'Virtue Ethics',
    description: 'You focus on character development and virtues. Becoming a good person through habitual excellence is your primary concern.',
    alignment: 85
  },
  'Existentialism': {
    philosophy: 'Existentialism',
    description: 'You value personal freedom, authenticity, and individual choice above predefined moral systems.',
    alignment: 85
  }
};

const PhilosophyQuiz: React.FC<PhilosophyQuizProps> = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);

  const handleAnswer = (questionId: string, philosophy: string) => {
    const newAnswers = { ...answers, [questionId]: philosophy };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (answerMap: Record<string, string>) => {
    const philosophyCount: Record<string, number> = {};
    
    Object.values(answerMap).forEach(philosophy => {
      philosophyCount[philosophy] = (philosophyCount[philosophy] || 0) + 1;
    });

    const dominantPhilosophy = Object.keys(philosophyCount).reduce((a, b) => 
      philosophyCount[a] > philosophyCount[b] ? a : b
    );

    setResult(philosophyResults[dominantPhilosophy]);
    setShowResult(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
    setResult(null);
  };

  if (showResult && result) {
    return (
      <div className="bg-parchment border border-warm-brown/30 rounded-xl p-8 text-center">
        <div className="flex justify-center mb-4">
          <Award className="h-12 w-12 text-burgundy" />
        </div>
        <h3 className="font-display text-2xl text-navy-blue font-semibold mb-4">
          Your Philosophical Alignment
        </h3>
        <div className="bg-burgundy/10 border border-burgundy/20 rounded-lg p-6 mb-6">
          <h4 className="font-display text-xl text-burgundy font-semibold mb-2">
            {result.philosophy}
          </h4>
          <p className="text-navy-blue/80 leading-relaxed mb-4">
            {result.description}
          </p>
          <div className="w-full bg-parchment/30 rounded-full h-2">
            <div 
              className="bg-burgundy h-2 rounded-full transition-all duration-1000"
              style={{ width: `${result.alignment}%` }}
            />
          </div>
          <p className="text-sm text-navy-blue/60 mt-2">
            {result.alignment}% alignment
          </p>
        </div>
        <button
          onClick={resetQuiz}
          className="inline-flex items-center px-6 py-3 bg-burgundy text-parchment rounded-lg hover:bg-burgundy/80 transition-colors font-medium"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Retake Quiz
        </button>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="bg-parchment border border-warm-brown/30 rounded-xl p-8">
      <h3 className="font-display text-2xl text-navy-blue font-semibold mb-2 text-center">
        Philosophical Alignment Quiz
      </h3>
      <p className="text-navy-blue/60 text-center mb-6">
        Question {currentQuestion + 1} of {questions.length}
      </p>

      <div className="mb-8">
        <h4 className="font-display text-xl text-navy-blue font-semibold mb-4 text-center">
          {question.question}
        </h4>
        
        <div className="space-y-3">
          {question.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleAnswer(question.id, option.philosophy)}
              className="w-full text-left p-4 bg-parchment/5 border border-warm-brown/20 rounded-lg hover:bg-burgundy/5 hover:border-burgundy/30 transition-all duration-200 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-navy-blue font-medium">{option.text}</span>
                <ArrowRight className="h-4 w-4 text-burgundy opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center text-sm text-navy-blue/60">
        <span>Your philosophical compass awaits...</span>
        <button
          onClick={resetQuiz}
          className="text-burgundy hover:text-burgundy/80 transition-colors"
        >
          Restart
        </button>
      </div>
    </div>
  );
};

export default PhilosophyQuiz;
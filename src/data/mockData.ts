import { BlogPost, ThoughtExperiment, QuizQuestion } from '../types';

export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Trolley Problem and Modern Ethics',
    excerpt: 'Exploring the implications of utilitarian thinking in contemporary moral dilemmas.',
    content: `# The Trolley Problem and Modern Ethics\n\n## Introduction\n\nThe trolley problem, first introduced by Philippa Foot in 1967, presents a moral dilemma that continues to challenge our understanding of ethics...`,
    featuredImage: '/api/placeholder/800/400',
    category: 'Ethics',
    tags: ['Trolley Problem', 'Utilitarianism', 'Moral Philosophy'],
    readTime: 8,
    publishedAt: '2024-01-15',
    author: 'Doterra',
    isPublished: true
  },
  // Add more posts as needed
];

export const thoughtExperiments: ThoughtExperiment[] = [
  {
    id: '1',
    question: 'You see a runaway trolley moving toward five tied-up people on the tracks. You are standing next to a lever that can switch the trolley to a different track, but there is one person tied up there. What do you do?',
    choices: [
      { id: 'pull', text: 'Pull the lever, sacrificing one to save five' },
      { id: 'dont-pull', text: 'Do nothing, letting the trolley kill five people' },
      { id: 'alternative', text: 'Try to find another way to stop the trolley' }
    ],
    analysis: {
      'pull': 'This choice aligns with utilitarian ethics...',
      'dont-pull': 'This reflects deontological thinking...',
      'alternative': 'This shows virtue ethics in action...'
    }
  }
];

export const philosophyQuiz: QuizQuestion[] = [
  {
    id: '1',
    question: 'When making moral decisions, what matters most?',
    options: [
      { id: 'a', text: 'The consequences and outcomes', philosophy: 'Utilitarianism' },
      { id: 'b', text: 'Following moral rules and duties', philosophy: 'Deontology' },
      { id: 'c', text: 'Developing virtuous character', philosophy: 'Virtue Ethics' },
      { id: 'd', text: 'Exercising personal freedom and choice', philosophy: 'Existentialism' }
    ]
  }
];

export {};
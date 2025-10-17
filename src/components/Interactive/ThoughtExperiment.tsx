import React, { useState } from 'react';
import { ThoughtExperiment as ThoughtExperimentType } from '../../types';
import { Lightbulb, Sparkles } from 'lucide-react';

interface ThoughtExperimentProps {
  experiment: ThoughtExperimentType;
}

const ThoughtExperiment: React.FC<ThoughtExperimentProps> = ({ experiment }) => {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const handleChoiceSelect = (choiceId: string) => {
    setSelectedChoice(choiceId);
    setShowAnalysis(true);
  };

  const resetExperiment = () => {
    setSelectedChoice(null);
    setShowAnalysis(false);
  };

  return (
    <div className="bg-forest-green/10 border border-forest-green/20 rounded-xl p-6 my-8">
      <div className="flex items-center space-x-2 mb-4">
        <Lightbulb className="h-5 w-5 text-forest-green" />
        <h3 className="font-display text-xl text-forest-green font-semibold">
          Philosophical Thought Experiment
        </h3>
      </div>

      <p className="text-navy-blue/80 text-lg leading-relaxed mb-6">
        {experiment.question}
      </p>

      {!showAnalysis ? (
        <div className="space-y-3">
          {experiment.choices.map((choice) => (
            <button
              key={choice.id}
              onClick={() => handleChoiceSelect(choice.id)}
              className="w-full text-left p-4 bg-parchment border border-warm-brown/30 rounded-lg hover:bg-parchment/80 hover:border-forest-green/30 transition-all duration-200 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-navy-blue font-medium">{choice.text}</span>
                <Sparkles className="h-4 w-4 text-forest-green opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="animate-fadeIn">
          <div className="bg-parchment border border-forest-green/30 rounded-lg p-6 mb-4">
            <h4 className="font-display text-lg text-forest-green font-semibold mb-3">
              Philosophical Analysis
            </h4>
            <p className="text-navy-blue/80 leading-relaxed">
              {selectedChoice && experiment.analysis[selectedChoice]}
            </p>
          </div>
          <button
            onClick={resetExperiment}
            className="px-4 py-2 bg-forest-green text-parchment rounded-lg hover:bg-forest-green/80 transition-colors text-sm font-medium"
          >
            Reconsider Choices
          </button>
        </div>
      )}
    </div>
  );
};

export default ThoughtExperiment;
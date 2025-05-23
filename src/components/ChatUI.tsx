'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useBlueprintState } from '@/hooks/useBlueprintState';
import { getGPTFeedback } from '@/utils/gptFeedback';
import { SummaryView } from './SummaryView';
import { blueprintSteps } from '@/data/blueprintSteps';

export function ChatUI() {
  const {
    chatLog,
    addChatMessage,
    addResponse,
    nextQuestion,
    nextStep,
    getCurrentStep,
    getCurrentQuestion,
    currentStepIndex,
    currentQuestionIndex,
    responses,
  } = useBlueprintState();

  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const isComplete = currentStepIndex >= blueprintSteps.length;

  // Add initial question to chat when component mounts or step/question changes
  useEffect(() => {
    if (isComplete) return;

    const currentStep = getCurrentStep();
    const currentQuestion = getCurrentQuestion();
    
    if (currentStep && currentQuestion) {
      addChatMessage({
        role: 'assistant',
        content: `${currentStep.title}: ${currentStep.info}\n\n${currentQuestion}`
      });
    }
  }, [currentStepIndex, currentQuestionIndex]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const currentStep = getCurrentStep();
    const currentQuestion = getCurrentQuestion();
    
    if (!currentStep || !currentQuestion) return;

    // Store response
    addResponse(currentStep.id, currentQuestion, userInput);
    
    // Add user message to chat
    addChatMessage({ role: 'user', content: userInput });
    setUserInput('');
    setIsLoading(true);

    try {
      // If this is the last question in the step, get feedback
      if (currentQuestionIndex === currentStep.questions.length - 1) {
        // Get feedback for the completed step
        const feedback = await getGPTFeedback(currentStep, responses[currentStep.id] || {});
        addChatMessage({ role: 'assistant', content: feedback });
        nextStep();
      } else {
        nextQuestion();
      }
    } catch (error) {
      console.error('Error:', error);
      addChatMessage({ 
        role: 'assistant', 
        content: 'Sorry, I encountered an error while getting feedback. Please try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isComplete) {
    return <SummaryView responses={responses} chatLog={chatLog} />;
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="flex flex-col space-y-4 mb-4">
        {chatLog.map((msg, i) => (
          <div 
            key={i} 
            className={`flex ${msg.role === "assistant" ? "justify-start" : "justify-end"}`}
          >
            <div 
              className={`max-w-[80%] px-4 py-2 rounded-lg ${
                msg.role === "assistant" 
                  ? "bg-gray-100 text-gray-800" 
                  : "bg-blue-500 text-white"
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
              <div className="flex space-x-2">
                <div className="animate-bounce">●</div>
                <div className="animate-bounce delay-100">●</div>
                <div className="animate-bounce delay-200">●</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your answer..."
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !userInput.trim()}
          className={`px-4 py-2 rounded-lg transition-colors ${
            userInput.trim() && !isLoading
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          Send
        </button>
      </form>
    </div>
  );
} 

// services/ai.ts
import { GoogleGenAI } from "@google/genai";

interface Question {
  question: string;
  selectedAnswer: string;
  correctAnswer: string;
  explanation?: string;
}

// The SDK automatically reads GEMINI_API_KEY from environment
// ✅ Correct way – read from your .env
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
// ---------------------------
//  Generate explanation for a single wrong question
// ---------------------------
export const generateQuestionExplanation = async (
  question: string,
  selectedAnswer: string,
  correctAnswer: string
): Promise<string> => {
  try {
    const prompt = `
You are a helpful tutor explaining why a student's answer was wrong.

Question: ${question}
Student's answer: ${selectedAnswer}
Correct answer: ${correctAnswer}

Provide a clear, encouraging explanation (2-3 sentences) that:
1. Briefly explains why the student's answer is incorrect
2. Explains the correct concept
3. Gives a tip to remember for next time

Keep it concise, friendly, and educational.
`;

    const response = await ai.interactions.create({
      model: "gemini-3.5-flash", // fast, cheap, and available on free tier
      input: prompt,
    });

    return response.output_text || `The correct answer is "${correctAnswer}". Review the material.`;
  } catch (error) {
    console.error("Gemini explanation error:", error);
    // Fallback if quota exceeded or network error
    return `The correct answer is "${correctAnswer}". Review the material.`;
  }
};

// ---------------------------
//  Generate overall feedback and recommendations
// ---------------------------
export const generateFeedback = async (
  score: number,
  total: number,
  wrongQuestions: Question[]
): Promise<{ feedback: string; recommendation: string }> => {
  // If no wrong answers, return a positive message without calling AI
  if (wrongQuestions.length === 0) {
    return {
      feedback: "🎉 Perfect score! You answered all questions correctly. Excellent work!",
      recommendation: "Continue to the next lesson to keep learning.",
    };
  }

  try {
    const prompt = `
You are an AI tutor analyzing a student's quiz performance.

Quiz Results:
- Score: ${score}/${total}
- Wrong questions: ${wrongQuestions.length}

Wrong Questions Summary:
${wrongQuestions.map((q, i) => `
${i + 1}. Topic: ${q.question.split('?')[0] || 'General'}
   Student answered: ${q.selectedAnswer}
   Correct answer: ${q.correctAnswer}
`).join('\n')}

Based on this performance, provide:
1. **Feedback**: Encouraging, personalized feedback (2-3 sentences) highlighting strengths and areas for improvement.
2. **Recommendation**: Specific lessons or topics the student should review next.

Format your response as:
FEEDBACK: [your feedback here]
RECOMMENDATION: [your recommendation here]
`;

    const response = await ai.interactions.create({
      model: "gemini-3.5-flash",
      input: prompt,
    });

    const text = response.output_text || "";
    const feedbackMatch = text.match(/FEEDBACK:(.*?)(RECOMMENDATION:|$)/s);
    const recMatch = text.match(/RECOMMENDATION:(.*)/s);

    const feedback = feedbackMatch ? feedbackMatch[1].trim() : `You scored ${score}/${total}. Keep practicing!`;
    const recommendation = recMatch ? recMatch[1].trim() : "Review the questions you answered incorrectly.";

    return { feedback, recommendation };
  } catch (error) {
    console.error("Gemini feedback error:", error);
    // Fallback: use static responses
    return getFallbackFeedback(score, total, wrongQuestions);
  }
};

// ---------------------------
//  Fallback feedback (no AI) – same as before
// ---------------------------
function getFallbackFeedback(
  score: number,
  total: number,
  wrongQuestions: Question[]
): { feedback: string; recommendation: string } {
  const percentage = (score / total) * 100;
  let feedback = "";
  let recommendation = "";

  if (percentage >= 90) {
    feedback = "🎉 Excellent performance! You have a strong understanding of this topic.";
    recommendation = "You're ready to move on to the next lesson.";
  } else if (percentage >= 70) {
    feedback = "👏 Good job! You have a solid understanding, but there's room for improvement.";
    recommendation = `Review these topics: ${wrongQuestions.map(q => q.question.split('?')[0]).join(', ')}.`;
  } else if (percentage >= 50) {
    feedback = "📚 You're on the right track. Focus on understanding the concepts you missed.";
    recommendation = `Take time to review: ${wrongQuestions.map(q => q.question.split('?')[0]).join(', ')}.`;
  } else {
    feedback = "💪 Don't give up! Learning takes time. Review the material and try again.";
    recommendation = "Start with the basics and work your way up. Practice makes perfect!";
  }

  return { feedback, recommendation };
}
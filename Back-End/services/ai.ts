// services/ai.ts
import OpenAI from 'openai';

// ✅ Use Groq's free endpoint
const openai = new OpenAI({
  // HIGHLIGHT: This makes the OpenAI SDK send requests to Groq.
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

interface Question {
  question: string;
  selectedAnswer: string;
  correctAnswer: string;
  explanation?: string;
}

// Generate explanation for a single wrong question
export const generateQuestionExplanation = async (
  question: string,
  selectedAnswer: string,
  correctAnswer: string
): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile", // Free, fast model on Groq
      messages: [
        { role: "system", content: "You are a helpful tutor explaining why a student's answer was wrong." },
        { role: "user", content: `
Question: ${question}
Student's answer: ${selectedAnswer}
Correct answer: ${correctAnswer}

Provide a clear, encouraging explanation (2-3 sentences) that:
1. Briefly explains why the student's answer is incorrect
2. Explains the correct concept
3. Gives a tip to remember for next time

Keep it concise, friendly, and educational.
        `}
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    return response.choices[0]?.message?.content || `The correct answer is "${correctAnswer}". Review the material.`;
  } catch (error) {
    console.error("AI explanation error:", error);
    return `The correct answer is "${correctAnswer}". Review the material.`;
  }
};

// Generate overall feedback and recommendations
export const generateFeedback = async (
  score: number,
  total: number,
  wrongQuestions: Question[]
): Promise<{ feedback: string; recommendation: string }> => {
  if (wrongQuestions.length === 0) {
    return {
      feedback: "🎉 Perfect score! You answered all questions correctly. Excellent work!",
      recommendation: "Continue to the next lesson to keep learning.",
    };
  }

  try {
    const response = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "You are an AI tutor analyzing a student's quiz performance." },
        { role: "user", content: `
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
        `}
      ],
      temperature: 0.7,
      max_tokens: 300,
    });

    const text = response.choices[0]?.message?.content || "";
    const feedbackMatch = text.match(/FEEDBACK:(.*?)(RECOMMENDATION:|$)/s);
    const recMatch = text.match(/RECOMMENDATION:(.*)/s);

    const feedback = feedbackMatch ? feedbackMatch[1].trim() : `You scored ${score}/${total}. Keep practicing!`;
    const recommendation = recMatch ? recMatch[1].trim() : "Review the questions you answered incorrectly.";

    return { feedback, recommendation };
  } catch (error) {
    console.error("AI feedback error:", error);
    return getFallbackFeedback(score, total, wrongQuestions);
  }
};

// Fallback feedback (no AI)
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

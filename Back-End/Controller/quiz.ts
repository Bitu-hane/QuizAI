// import { Request, Response } from 'express';
// import Quiz from '../models/Quiz';
// import Question from '../models/Question';
// import QuizResult from '../models/QuizResult';
// import { generateFeedback } from '../services/ai';
// import { AuthRequest } from '../middleware/auth';

// export const submitQuiz = async (req: AuthRequest, res: Response) => {
//   try {
//     const { quizId, answers, timeTaken } = req.body;
//     const studentId = req.user._id;

//     // Validate input
//     if (!quizId || !answers || !Array.isArray(answers)) {
//       return res.status(400).json({ message: 'Invalid request body' });
//     }

//     // Fetch the quiz and its questions
//     const quiz = await Quiz.findOne({ quizId: Number(quizId) });
//     if (!quiz) {
//       return res.status(404).json({ message: 'Quiz not found' });
//     }

//     const questions = await Question.find({ questionId: { $in: quiz.questions } });
//     if (questions.length === 0) {
//       return res.status(404).json({ message: 'No questions found for this quiz' });
//     }

//     // Build detailed answers with isCorrect flag
//     const detailedAnswers = answers.map((a: any) => {
//       const q = questions.find(q => q.questionId === a.questionId);
//       const isCorrect = q && q.correct === a.selectedAnswer;
//       return {
//         questionId: a.questionId,
//         selectedAnswer: a.selectedAnswer,
//         isCorrect: !!isCorrect, // ensure boolean
//       };
//     });

//     // Count correct answers
//     const correctCount = detailedAnswers.filter(a => a.isCorrect).length;
//     const totalQuestions = questions.length;
//     const score = correctCount;

//     // Prepare wrong questions for AI
//     const wrong = detailedAnswers
//       .filter(a => !a.isCorrect)
//       .map(a => {
//         const q = questions.find(q => q.questionId === a.questionId);
//         return {
//           question: q?.question || 'Unknown question',
//           selectedAnswer: a.selectedAnswer || 'N/A',
//           correctAnswer: q?.correct || 'N/A',
//           explanation: q?.explanation || 'No explanation provided',
//         };
//       });

//     // Generate AI feedback
//     const { feedback, recommendation } = await generateFeedback(score, totalQuestions, wrong);

//     // Create result
//     const result = await QuizResult.create({
//       resultId: Date.now(),
//       studentId,
//       quizId: quiz.quizId,
//       score,
//       aiFeedback: feedback,
//       recommendLesson: recommendation,
//       takeTime: new Date(timeTaken || Date.now()),
//       answers: detailedAnswers,
//       totalQuestions,
//     });

//     // Update student progress (if you have a progress model)
//     // ...

//     res.status(201).json({
//       resultId: result.resultId,
//       score,
//       feedback,
//       recommendation,
//     });

//   } catch (error) {
//     console.error('Submit quiz error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };



import { Request, Response } from 'express';
import Quiz from '../models/Quiz';
import Question from '../models/Question';
import QuizResult from '../models/QuizResult';
import { generateFeedback, generateQuestionExplanation } from '../services/ai';
import { AuthRequest } from '../middleware/auth';

export const getQuizzes = async (req: Request, res: Response) => {
  try {
    const quizzes = await Quiz.find({});
    res.json(quizzes);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getQuizByLesson = async (req: Request, res: Response) => {
  try {
    const { lessonId } = req.params;
    const quiz = await Quiz.findOne({ lessonId: Number(lessonId) });
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    const questions = await Question.find({ questionId: { $in: quiz.questions } });
    
    // ✅ Parse options from string to array and hide correct answers
    const sanitized = questions.map(q => ({
      questionId: q.questionId,
      question: q.question,
      options: JSON.parse(q.options || '[]'), // <-- Parse the string to array
      topic: q.topic || '',
    }));

    res.json({ 
      quiz: { ...quiz.toObject(), questions: sanitized }, 
      timelimit: quiz.timelimit 
    });
  } catch (error) {
    console.error('Error fetching quiz:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


interface AnswerInput {
  questionId: number;
  selectedAnswer: string;
}
export const submitQuiz = async (req: AuthRequest, res: Response) => {
  try {
    const { quizId, answers, timeTaken } = req.body;
    const studentId = req.user._id;

    // Validate
    if (!quizId || !answers || !Array.isArray(answers)) {
      return res.status(400).json({ message: 'Invalid request body' });
    }

    // Fetch quiz and questions
    const quiz = await Quiz.findOne({ quizId: Number(quizId) });
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    const questions = await Question.find({ questionId: { $in: quiz.questions } });
    if (questions.length === 0) {
      return res.status(404).json({ message: 'No questions found' });
    }

    // ✅ Build detailed answers with AI explanations for ALL wrong answers
    const detailedAnswers = await Promise.all(
      answers.map(async (a: any) => {
        const q = questions.find(q => q.questionId === a.questionId);
        const isCorrect = q && q.correct === a.selectedAnswer;

        let explanation = '';
        let aiGenerated = false;

        if (!isCorrect) {
          // ALWAYS generate AI explanation for wrong answers
          try {
            explanation = await generateQuestionExplanation(
              q?.question || 'Unknown question',
              a.selectedAnswer,
              q?.correct || 'N/A'
            );
            aiGenerated = true;
          } catch (err) {
            console.error('AI explanation error:', err);
            // Fallback: use manual explanation if available
            explanation = q?.explanation || `The correct answer is "${q?.correct || 'N/A'}". Review the material.`;
          }
        } else {
          explanation = '✅ Correct! Well done!';
        }

        return {
          questionId: a.questionId,
          selectedAnswer: a.selectedAnswer,
          correctAnswer: q?.correct || 'N/A',
          isCorrect: !!isCorrect,
          explanation,
          aiGenerated,
        };
      })
    );

    // Calculate score
    const correctCount = detailedAnswers.filter(a => a.isCorrect).length;
    const totalQuestions = questions.length;
    const score = correctCount;

    // Generate overall feedback
    const wrongQuestions = detailedAnswers
      .filter(a => !a.isCorrect)
      .map(a => ({
        question: questions.find(q => q.questionId === a.questionId)?.question || '',
        selectedAnswer: a.selectedAnswer,
        correctAnswer: questions.find(q => q.questionId === a.questionId)?.correct || '',
        explanation: a.explanation,
      }));

    const { feedback, recommendation } = await generateFeedback(score, totalQuestions, wrongQuestions);

    // Save result with explanations
    const result = await QuizResult.create({
      resultId: Date.now(),
      studentId,
      quizId: quiz.quizId,
      score,
      aiFeedback: feedback,
      recommendLesson: recommendation,
      takeTime: new Date(timeTaken || Date.now()),
      answers: detailedAnswers.map(a => ({
        questionId: a.questionId,
        selectedAnswer: a.selectedAnswer,
        isCorrect: a.isCorrect,
        explanation: a.explanation,
        aiGenerated: a.aiGenerated,
      })),
      totalQuestions,
    });

    // Return full result including explanations
    res.status(201).json({
      resultId: result.resultId,
      score,
      totalQuestions,
      percentage: Math.round((score / totalQuestions) * 100),
      feedback,
      recommendation,
      answers: detailedAnswers,
    });

  } catch (error) {
    console.error('Submit quiz error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getQuizById = async (req: Request, res: Response) => {
  try {
    const { quizId } = req.params;
    const quiz = await Quiz.findOne({ quizId: Number(quizId) });
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Fetch questions (include all fields for admin editing)
    const questions = await Question.find({ questionId: { $in: quiz.questions } });

    res.json({
      ...quiz.toObject(),
      questions: questions.map(q => ({
        questionId: q.questionId,
        question: q.question,
        options: JSON.parse(q.options || '[]'),
        correct: q.correct,        // ✅ Include correct answer for admin
        explanation: q.explanation,
        topic: q.topic,
      })),
    });
  } catch (error) {
    console.error('Error fetching quiz by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
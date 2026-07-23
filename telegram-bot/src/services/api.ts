// import axios from 'axios';
// import dotenv from 'dotenv';
// dotenv.config();

// const api = axios.create({
//   baseURL: process.env.API_BASE_URL || 'http://localhost:5001/api',
// });

// // --- Registration (kept but not used in the new flow) ---
// export const registerUser = async (telegramId: number, email: string, password: string) => {
//   return api.post('/auth/telegram-register', { telegramId, email, password });
// };

// // --- Get subjects by grade (no telegramId needed) ---
// export const getSubjects = async (grade: number) => {
//   return api.get(`/subjects?grade=${grade}`);
// };

// // --- Get lessons by subjectId (no telegramId) ---
// export const getLessons = async (subjectId: number) => {
//   return api.get(`/lessons?subjectId=${subjectId}`);
// };

// // --- Get quizzes by lessonId (no telegramId) ---
// export const getQuizzes = async (lessonId: number) => {
//   return api.get(`/quizzes/lesson/${lessonId}`);
// };

// // --- Start quiz (fetch quiz data) – still needs telegramId for tracking ---
// export const startQuiz = async (telegramId: number, quizId: number) => {
//   return api.get(`/quizzes/${quizId}?telegramId=${telegramId}`);
// };

// // --- Submit quiz – still needs telegramId for saving results ---
// export const submitQuiz = async (payload: any) => {
//   return api.post('/quizzes/submit', payload);
// };
// // --- Get user grade (maybe not needed, but kept for reference) ---
// export const getUserGrade = async (telegramId: number) => {
//   return api.get(`/users/grade?telegramId=${telegramId}`);
// };
// export const getResultById = async (resultId: string) => {
//   return api.get(`/results/${resultId}`);
// };


// export const getStudentSubjects = async (telegramId: number) => {
//   return api.get(`/reports/student/${telegramId}/subjects`);
// };

// export const getStudentLessons = async (telegramId: number, subjectId: number) => {
//   return api.get(`/reports/student/${telegramId}/subject/${subjectId}/lessons`);
// };

// export const getStudentQuizzes = async (telegramId: number, lessonId: number) => {
//   return api.get(`/reports/student/${telegramId}/lesson/${lessonId}/quizzes`);
// };


import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const api = axios.create({
  baseURL: process.env.API_BASE_URL || 'http://localhost:5001/api',
});

// --- Get subjects by grade ---
// --- Get subjects by grade ---
export const getSubjects = async (grade: number) => {
  console.log(`📤 Fetching subjects for grade: ${grade}`);
  try {
    const response = await api.get(`/subjects?grade=${grade}`);
    console.log(`✅ Subjects API response: ${response.data?.length || 0} subjects`);
    return response;
  } catch (error) {
    console.error('❌ Error in getSubjects API:', error);
    throw error;
  }
};
// --- Get lessons by subjectId ---
export const getLessons = async (telegramId: number, subjectId: number) => {
  return api.get(`/lessons?subjectId=${subjectId}&telegramId=${telegramId}`);
};

// --- Get quizzes by lessonId (✅ WITH telegramId) ---
// In telegram-bot/src/services/api.ts
export const getQuizzes = async (telegramId: number, lessonId: number) => {
  console.log(`📤 Fetching quizzes for lesson ${lessonId} with telegramId: ${telegramId}`);
  return api.get(`/quizzes/lesson/${lessonId}?telegramId=${telegramId}`);
};

// --- Start quiz (✅ WITH telegramId) ---
export const startQuiz = async (telegramId: number, quizId: number) => {
  return api.get(`/quizzes/${quizId}?telegramId=${telegramId}`);
};

// --- Submit quiz (✅ WITH telegramId in body) ---
export const submitQuiz = async (payload: any) => {
  console.log('📤 Submitting quiz with payload:', JSON.stringify(payload, null, 2));
  return api.post('/quizzes/submit', payload);
};

// --- Purchase difficulty (✅ WITH telegramId in body) ---
export const purchaseDifficulty = async (telegramId: number, difficulty: number) => {
  console.log(`📤 Purchasing difficulty ${difficulty} for user ${telegramId}`);
  return api.post('/payment/purchase-difficulty', {
    telegramId,
    difficulty,
  });
};

// --- Initialize Chapa payment for Telegram user ---
export const initializeChapaPayment = async (telegramId: number, difficulty: number, amount: number, lessonId?: number, quizId?: number) => {
  console.log(`📤 Initializing Chapa payment for telegramId ${telegramId}, diff ${difficulty}, amount ${amount}, quizId ${quizId}`);
  return api.post('/payment/initialize-chapa', {
    telegramId,
    difficulty,
    amount,
    lessonId,
    quizId,
  });
};

// --- Verify Chapa payment manually ---
export const verifyChapaPayment = async (txRef: string) => {
  console.log(`📤 Verifying Chapa payment for txRef: ${txRef}`);
  return api.post('/payment/verify-chapa', { tx_ref: txRef });
};
// --- Get user grade ---
export const getUserGrade = async (telegramId: number) => {
  return api.get(`/users/grade?telegramId=${telegramId}`);
};

// --- Get result by ID ---
export const getResultById = async (resultId: string) => {
  return api.get(`/results/${resultId}`);
};

// --- Get student subjects (for report) ---
export const getStudentSubjects = async (telegramId: number) => {
  return api.get(`/reports/student/${telegramId}/subjects`);
};

// --- Get student lessons (for report) ---
export const getStudentLessons = async (telegramId: number, subjectId: number) => {
  return api.get(`/reports/student/${telegramId}/subject/${subjectId}/lessons`);
};

// --- Get student quizzes (for report) ---
export const getStudentQuizzes = async (telegramId: number, lessonId: number) => {
  return api.get(`/reports/student/${telegramId}/lesson/${lessonId}/quizzes`);
};


// In telegram-bot/src/services/api.ts

// --- Get user profile by telegramId ---
export const getUserProfile = async (telegramId: number) => {
  console.log(`📤 Fetching user profile for telegramId: ${telegramId}`);
  return api.get(`/auth/telegram-profile/${telegramId}`);
};
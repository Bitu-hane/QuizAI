
// import { Telegraf, session, Context } from 'telegraf';
// import dotenv from 'dotenv';
// import { 
//   getSubjects, 
//   getLessons, 
//   getQuizzes, 
//   startQuiz, 
//   submitQuiz,
//   getStudentSubjects,
//   getStudentLessons,
//   getStudentQuizzes,
//   getResultById
// } from './services/api';
// import { SessionData } from './types/session';

// dotenv.config();

// interface BotContext extends Context {
//   session: SessionData;
// }

// const bot = new Telegraf<BotContext>(process.env.BOT_TOKEN!);
// bot.use(session({ defaultSession: () => ({}) }));

// bot.telegram.setMyCommands([
//   { command: 'start', description: 'Start / choose grade' },
//   { command: 'help', description: 'Show help' },
//   { command: 'report', description: 'View your learning report' },
//   { command: 'reset', description: 'Reset session' },
// ]);

// const ensureSession = (ctx: BotContext) => {
//   if (!ctx.session) ctx.session = {};
// };

// async function sendOrEdit(ctx: BotContext, text: string, extra?: any) {
//   if (ctx.callbackQuery && ctx.callbackQuery.message) {
//     try {
//       await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
//     } catch (e) {
//       console.log('deleteMessage failed', e);
//     }
//   }
//   await ctx.reply(text, extra);
// }

// // ================= START COMMAND (LEARNING FLOW) =================
// bot.command('start', async (ctx) => {
//   ensureSession(ctx);
//   const grades = [6, 7, 8, 9, 10, 11, 12];
//   const keyboard: { text: string; callback_data: string }[] = grades.map(g => ({
//     text: `Grade ${g}`,
//     callback_data: `learn_grade_${g}`, // <-- changed to learn_grade_
//   }));
//   await sendOrEdit(ctx,
//     '🎓 Welcome! Please select your grade to start:',
//     {
//       reply_markup: {
//         inline_keyboard: keyboard.map((k: { text: string; callback_data: string }) => [{ text: k.text, callback_data: k.callback_data }]),
//       },
//     }
//   );
// });

// // ================= LEARNING: GRADE SELECTED =================
// bot.action(/learn_grade_(\d+)/, async (ctx) => {
//   console.log('✅ learn_grade_ triggered for grade:', ctx.match[1]);
//   const grade = parseInt(ctx.match[1]);
//   ctx.session.grade = grade;
//   ctx.session.selectedSubject = undefined;
//   ctx.session.selectedLesson = undefined;
//   await ctx.answerCbQuery(`Grade ${grade} selected`);
//   await showSubjects(ctx, grade);
// });

// // ================= LEARNING: SUBJECTS =================
// async function showSubjects(ctx: BotContext, grade: number) {
//   console.log(`📚 Fetching subjects for grade ${grade}`);
//   try {
//     const res = await getSubjects(grade);
//     const subjects = res.data;
//     if (!subjects || subjects.length === 0) {
//       return ctx.reply('No subjects found for this grade. Try another grade with /start.');
//     }
//     const keyboard: { text: string; callback_data: string }[] = subjects.map((s: any) => ({
//       text: s.name,
//       callback_data: `learn_subject_${s.subjectId}`,
//     }));
//     await sendOrEdit(ctx,
//       `📚 Subjects for Grade ${grade}:\nChoose one:`,
//       {
//         reply_markup: {
//           inline_keyboard: keyboard.map((k: { text: string; callback_data: string }) => [{ text: k.text, callback_data: k.callback_data }]),
//         },
//       }
//     );
//   } catch (error) {
//     await ctx.reply('❌ Failed to fetch subjects.');
//   }
// }

// bot.action(/learn_subject_(\d+)/, async (ctx) => {
//   console.log('✅ learn_subject_ triggered');
//   const subjectId = parseInt(ctx.match[1]);
//   ctx.session.selectedSubject = subjectId;
//   ctx.session.selectedLesson = undefined;
//   await ctx.answerCbQuery('Subject selected');
//   await showLessons(ctx, subjectId);
// });

// // ================= LEARNING: LESSONS =================
// async function showLessons(ctx: BotContext, subjectId: number) {
//   console.log(`📖 Fetching lessons for subject ${subjectId}`);
//   try {
//     const res = await getLessons(subjectId);
//     const lessons = res.data;
//     if (!lessons || lessons.length === 0) {
//       return ctx.reply('No lessons found for this subject. Go back with /start.');
//     }
//     const keyboard: { text: string; callback_data: string }[] = lessons.map((l: any) => ({
//       text: l.title,
//       callback_data: `learn_lesson_${l.lessonId}`,
//     }));
//     await sendOrEdit(ctx,
//       `📖 Lessons:\nChoose one:`,
//       {
//         reply_markup: {
//           inline_keyboard: keyboard.map((k: { text: string; callback_data: string }) => [{ text: k.text, callback_data: k.callback_data }]),
//         },
//       }
//     );
//   } catch (error) {
//     await ctx.reply('❌ Failed to fetch lessons.');
//   }
// }

// bot.action(/learn_lesson_(\d+)/, async (ctx) => {
//   console.log('✅ learn_lesson_ triggered');
//   const lessonId = parseInt(ctx.match[1]);
//   ctx.session.selectedLesson = lessonId;
//   await ctx.answerCbQuery('Lesson selected');
//   await showQuizzes(ctx, lessonId);
// });

// // ================= LEARNING: QUIZZES =================
// async function showQuizzes(ctx: BotContext, lessonId: number) {
//   console.log(`📝 Fetching quizzes for lesson ${lessonId}`);
//   try {
//     const res = await getQuizzes(lessonId);
//     let quizzes: any[] = [];
//     if (res.data && res.data.quiz) {
//       quizzes = [res.data.quiz];
//     } else if (Array.isArray(res.data)) {
//       quizzes = res.data;
//     } else if (res.data && Array.isArray(res.data.quizzes)) {
//       quizzes = res.data.quizzes;
//     }
//     if (quizzes.length === 0) {
//       return ctx.reply('No quizzes available for this lesson.');
//     }
//     const keyboard: { text: string; callback_data: string }[] = quizzes.map((q: any) => ({
//       text: `${q.title} (${q.questions?.length || 0} questions)`,
//       callback_data: `learn_quiz_${q.quizId}`,
//     }));
//     await sendOrEdit(ctx,
//       `📝 Quizzes:\nChoose one to start:`,
//       {
//         reply_markup: {
//           inline_keyboard: keyboard.map((k: { text: string; callback_data: string }) => [{ text: k.text, callback_data: k.callback_data }]),
//         },
//       }
//     );
//   } catch (error) {
//     await ctx.reply('❌ Failed to fetch quizzes.');
//   }
// }

// bot.action(/learn_quiz_(\d+)/, async (ctx) => {
//   console.log('✅ learn_quiz_ triggered');
//   const quizId = parseInt(ctx.match[1]);
//   await ctx.answerCbQuery('Starting quiz...');
//   await startQuizById(ctx, quizId);
// });

// // ================= START QUIZ (LEARNING) =================
// async function startQuizById(ctx: BotContext, quizId: number) {
//   if (!ctx.from) return ctx.reply('Could not identify user.');
//   console.log(`🚀 Starting quiz ${quizId} for user ${ctx.from.id}`);
//   try {
//     const res = await startQuiz(ctx.from.id, quizId);
//     let quiz = res.data.quiz || res.data;
//     if (!quiz || !quiz.quizId) {
//       console.error('❌ Quiz data missing:', res.data);
//       return ctx.reply('❌ Failed to parse quiz data.');
//     }
//     ctx.session.currentQuiz = {
//       quizId: quiz.quizId,
//       questions: quiz.questions,
//       currentIndex: 0,
//       answers: {},
//     };
//     await sendQuestion(ctx, 0);
//   } catch (error) {
//     await ctx.reply('❌ Failed to start quiz.');
//   }
// }

// // ================= QUESTION FLOW =================
// async function sendQuestion(ctx: BotContext, index: number) {
//   const quiz = ctx.session.currentQuiz;
//   if (!quiz || index >= quiz.questions.length) {
//     await sendOrEdit(ctx, 'Quiz completed! Submitting...');
//     await submitQuizHandler(ctx);
//     return;
//   }
//   const q = quiz.questions[index];
//   let options: string[] = [];
//   if (typeof q.options === 'string') {
//     try { options = JSON.parse(q.options); } catch { options = []; }
//   } else if (Array.isArray(q.options)) {
//     options = q.options;
//   }

//   if (options.length > 0) {
//     const keyboard: { text: string; callback_data: string }[] = options.map((opt: string) => ({
//       text: opt,
//       callback_data: `ans_${index}_${opt}`,
//     }));
//     await sendOrEdit(ctx,
//       `Question ${index + 1}/${quiz.questions.length}: ${q.question}`,
//       {
//         reply_markup: {
//           inline_keyboard: keyboard.map((k: { text: string; callback_data: string }) => [{ text: k.text, callback_data: k.callback_data }]),
//         },
//       }
//     );
//   } else {
//     ctx.session.awaitingAnswer = true;
//     ctx.session.awaitingQuestionIndex = index;
//     await sendOrEdit(ctx,
//       `Question ${index + 1}/${quiz.questions.length}: ${q.question}\n\n(Please type your answer below)`
//     );
//   }
// }

// bot.action(/ans_(\d+)_(.+)/, async (ctx) => {
//   const match = ctx.match as RegExpExecArray;
//   const index = parseInt(match[1]);
//   const answer = match[2];
//   const quiz = ctx.session.currentQuiz;
//   if (!quiz) return ctx.reply('No active quiz.');
//   quiz.answers[quiz.questions[index].questionId] = answer;
//   quiz.currentIndex = index + 1;
//   ctx.session.awaitingAnswer = false;
//   ctx.session.awaitingQuestionIndex = undefined;
//   await ctx.answerCbQuery('Answer recorded!');
//   await sendQuestion(ctx, quiz.currentIndex);
// });

// // ================= SUBMIT QUIZ =================
// async function submitQuizHandler(ctx: BotContext) {
//   const quiz = ctx.session.currentQuiz;
//   if (!quiz) return ctx.reply('No active quiz.');

//   const payload = {
//     quizId: quiz.quizId,
//     answers: Object.entries(quiz.answers).map(([qId, ans]) => ({
//       questionId: parseInt(qId),
//       selectedAnswer: ans,
//     })),
//     telegramUser: {
//       id: ctx.from!.id,
//       username: ctx.from!.username,
//       firstName: ctx.from!.first_name,
//       lastName: ctx.from!.last_name,
//     },
//   };

//   try {
//     await ctx.sendChatAction('typing');
//     const res = await submitQuiz(payload);
//     const result = res.data;

//     let msg = `📊 **Quiz Results**\n`;
//     msg += `Score: ${result.score}/${result.totalQuestions} (${result.percentage}%)\n\n`;
//     msg += `📝 Feedback: ${result.feedback}\n`;
//     msg += `📘 Recommendation: ${result.recommendation}\n\n`;
//     msg += `📝 **Detailed Answers:**\n\n`;

//     result.answers.forEach((a: any, idx: number) => {
//       const status = a.isCorrect ? '✅' : '❌';
//       msg += `**Q${idx + 1}:** ${a.questionText || 'Question'}\n`;
//       msg += `   Your answer: ${a.selectedAnswer}\n`;
//       msg += `   Correct: ${a.correctAnswer}\n`;
//       msg += `   ${status} ${a.isCorrect ? 'Correct' : 'Incorrect'}\n`;
//       if (a.explanation) {
//         msg += `   💡 ${a.explanation}\n`;
//       }
//       msg += '\n';
//     });

//     if (msg.length > 4096) {
//       const parts = msg.match(/[\s\S]{1,4096}/g) || [];
//       for (const part of parts) {
//         await ctx.reply(part);
//       }
//     } else {
//       await ctx.reply(msg);
//     }

//     ctx.session.currentQuiz = undefined;
//     ctx.session.awaitingAnswer = false;
//     ctx.session.awaitingQuestionIndex = undefined;

//     await ctx.reply('You can /start again to choose another grade, or check your /report to see your history.');

//   } catch (error: any) {
//     console.error('❌ Error submitting quiz:', error.message);
//     await ctx.reply('❌ Failed to submit quiz. Please try again.');
//   }
// }

// // ================= REPORT FLOW =================
// bot.command('report', async (ctx) => {
//   console.log('🔥 /report command EXECUTED');
//   if (!ctx.from) return ctx.reply('Could not identify you.');

//   try {
//     await ctx.sendChatAction('typing');
//     const res = await getStudentSubjects(ctx.from.id);
//     const subjects = res.data;

//     if (!subjects || subjects.length === 0) {
//       return ctx.reply('📊 You haven\'t taken any quizzes yet. Start with /start to begin learning!');
//     }

//     let msg = `📈 **Your Learning Report**\n\nSelect a subject to see details:\n`;
//     const buttons = subjects.map((s: any) => ({
//       text: `${s.name} (${s.totalQuizzes} quizzes, ${s.averageScore}%)`,
//       callback_data: `report_subject_${s.subjectId}`,
//     }));

//     const keyboard = [];
//     for (let i = 0; i < buttons.length; i += 2) {
//       keyboard.push(buttons.slice(i, i + 2));
//     }

//     await ctx.reply(msg, {
//       reply_markup: { inline_keyboard: keyboard },
//     });
//   } catch (error: any) {
//     if (error.response && error.response.status === 404) {
//       return ctx.reply('📊 You haven\'t taken any quizzes yet. Start with /start to begin learning!');
//     }
//     console.error('Report error:', error);
//     await ctx.reply('❌ Failed to fetch your report.');
//   }
// });

// // ================= REPORT: GRADE SELECTED =================

// // ================= REPORT: SUBJECT SELECTED =================
// bot.action(/report_subject_(\d+)/, async (ctx) => {
//   console.log('✅ report_subject_ triggered');
//   const subjectId = parseInt(ctx.match[1]);
//   await ctx.answerCbQuery('Loading lessons...');

//   try {
//     await ctx.sendChatAction('typing');
//     const res = await getStudentLessons(ctx.from!.id, subjectId);
//     const lessons = res.data;

//     if (!lessons || lessons.length === 0) {
//       return ctx.reply('No lessons found for this subject.');
//     }

//     let msg = `📖 **Lessons**\nSelect a lesson:\n`;
//     const buttons = lessons.map((l: any) => ({
//       text: `${l.title} (${l.totalQuizzes} quizzes, ${l.averageScore}%)`,
//       callback_data: `report_lesson_${l.lessonId}`,
//     }));

//     const keyboard = [];
//     for (let i = 0; i < buttons.length; i += 2) {
//       keyboard.push(buttons.slice(i, i + 2));
//     }

//     await ctx.reply(msg, {
//       reply_markup: { inline_keyboard: keyboard },
//     });
//   } catch (error) {
//     console.error('Lessons error:', error);
//     await ctx.reply('❌ Failed to load lessons.');
//   }
// });

// // ================= REPORT: LESSON SELECTED =================
// bot.action(/report_lesson_(\d+)/, async (ctx) => {
//   console.log('✅ report_lesson_ triggered');
//   const lessonId = parseInt(ctx.match[1]);
//   await ctx.answerCbQuery('Loading quizzes...');

//   try {
//     await ctx.sendChatAction('typing');
//     const res = await getStudentQuizzes(ctx.from!.id, lessonId);
//     const quizzes = res.data;

//     if (!quizzes || quizzes.length === 0) {
//       return ctx.reply('No quizzes taken for this lesson.');
//     }

//     let msg = `📝 **Quizzes taken**\nTap a quiz to see details:\n`;
//     const buttons = quizzes.map((q: any) => ({
//       text: `${q.title} – ${q.percentage}% (${q.score}/${q.total})`,
//       callback_data: `report_detail_${q.resultId}`,
//     }));

//     const keyboard = [];
//     for (let i = 0; i < buttons.length; i += 2) {
//       keyboard.push(buttons.slice(i, i + 2));
//     }

//     await ctx.reply(msg, {
//       reply_markup: { inline_keyboard: keyboard },
//     });
//   } catch (error) {
//     console.error('Quizzes error:', error);
//     await ctx.reply('❌ Failed to load quizzes.');
//   }
// });

// // ================= REPORT: QUIZ DETAIL =================
// bot.action(/report_detail_(.+)/, async (ctx) => {
//   console.log('✅ report_detail_ triggered for resultId:', ctx.match[1]);
//   const resultId = ctx.match[1];
//   await ctx.answerCbQuery('Loading quiz details...');

//   try {
//     await ctx.sendChatAction('typing');
//     const res = await getResultById(resultId);
//     const data = res.data;

//     let msg = `📝 **Quiz Details**\n\n`;
//     msg += `📖 ${data.quizTitle}\n`;
//     msg += `📚 ${data.subject} – ${data.lesson}\n`;
//     msg += `📊 Score: ${data.score}/${data.totalQuestions} (${data.percentage}%)\n\n`;
//     msg += `**Answers:**\n`;

//     data.answers.forEach((a: any, idx: number) => {
//       const status = a.isCorrect ? '✅' : '❌';
//       msg += `${idx+1}. ${a.questionText}\n`;
//       msg += `   Your answer: ${a.selectedAnswer}\n`;
//       msg += `   Correct: ${a.correctAnswer}\n`;
//       msg += `   ${status} ${a.isCorrect ? 'Correct' : 'Incorrect'}\n`;
//       if (a.explanation) {
//         msg += `   💡 ${a.explanation}\n`;
//       }
//       msg += '\n';
//     });

//     if (msg.length > 4096) {
//       const parts = msg.match(/[\s\S]{1,4096}/g) || [];
//       for (const part of parts) {
//         await ctx.reply(part);
//       }
//     } else {
//       await ctx.reply(msg);
//     }

//   } catch (error) {
//     console.error('Detail error:', error);
//     await ctx.reply('❌ Failed to load quiz details.');
//   }
// });

// // ================= HELP, PROGRESS, RESET =================
// bot.command('help', async (ctx) => {
//   await ctx.reply(
//     `📚 **How to use**\n` +
//     `1. /start – choose a grade and start a quiz.\n` +
//     `2. /report – view your past quiz results (by grade/subject).\n` +
//     `3. /reset – clear your session.\n\n` +
//     `In the report, tap a grade → subject → lesson → quiz to see detailed answers.`
//   );
// });

// bot.command('progress', async (ctx) => {
//   ensureSession(ctx);
//   const history = ctx.session.progressHistory || [];
//   if (history.length === 0) {
//     return ctx.reply("📊 You haven't taken any quizzes yet. Use /start to begin learning!");
//   }
//   const totalQuizzes = history.length;
//   const avgScore = Math.round(history.reduce((acc, r) => acc + r.percentage, 0) / totalQuizzes);
//   let msg = `📈 **Your Learning Progress**\n\n`;
//   msg += `Total Quizzes Taken: ${totalQuizzes}\n`;
//   msg += `Average Score: ${avgScore}%\n\n`;
//   msg += `**Recent History:**\n`;
//   const recent = history.slice(-5).reverse();
//   recent.forEach((r, i) => {
//     msg += `${i + 1}. Quiz ID ${r.quizId}: ${r.score}/${r.total} (${r.percentage}%)\n`;
//   });
//   await ctx.reply(msg);
// });

// bot.command('reset', async (ctx) => {
//   ctx.session = {} as SessionData;
//   await ctx.reply('🔄 Session reset. Use /start to begin again.');
// });

// // ================= FREE-TEXT ANSWERS =================
// bot.on('text', async (ctx) => {
//   console.log('📥 Received text:', ctx.message.text);
//   console.log('🔍 awaitingAnswer:', ctx.session.awaitingAnswer);
//   console.log('🔍 awaitingQuestionIndex:', ctx.session.awaitingQuestionIndex);

//   if (!ctx.session.awaitingAnswer) {
//     console.log('⏭️ Not expecting an answer, ignoring.');
//     return;
//   }

//   const quiz = ctx.session.currentQuiz;
//   if (!quiz) {
//     ctx.session.awaitingAnswer = false;
//     return ctx.reply('No active quiz. Please start one with /start.');
//   }

//   const index = ctx.session.awaitingQuestionIndex;
//   if (index === undefined || index >= quiz.questions.length) {
//     ctx.session.awaitingAnswer = false;
//     return ctx.reply('Invalid question index. Please start over.');
//   }

//   const answer = ctx.message.text;
//   const question = quiz.questions[index];
//   quiz.answers[question.questionId] = answer;
//   quiz.currentIndex = index + 1;
//   ctx.session.awaitingAnswer = false;
//   ctx.session.awaitingQuestionIndex = undefined;

//   try {
//     await ctx.deleteMessage(ctx.message.message_id);
//   } catch (e) {
//     console.log('delete text message failed', e);
//   }

//   await sendQuestion(ctx, quiz.currentIndex);
// });

// // ================= LAUNCH =================
// bot.launch();
// console.log('🤖 QuizAI Bot is running with grade-selection flow.');




// import { Telegraf, session, Context } from 'telegraf';
// import dotenv from 'dotenv';
// import { 
//   getSubjects, 
//   getLessons, 
//   getQuizzes, 
//   startQuiz, 
//   submitQuiz,
//   getStudentSubjects,
//   getStudentLessons,
//   getStudentQuizzes,
//   getResultById,
//   purchaseDifficulty // ✅ ADD THIS IMPORT
// } from './services/api';
// import { SessionData } from './types/session';

// dotenv.config();

// interface BotContext extends Context {
//   session: SessionData;
// }

// // ✅ Unlock state tracking
// interface UnlockState {
//   difficulty: number;
//   price: number;
//   lessonId: number;
//   quizId: number;
//   title: string;
// }
// const unlockStates = new Map<number, UnlockState>();

// const bot = new Telegraf<BotContext>(process.env.BOT_TOKEN!);
// bot.use(session({ defaultSession: () => ({}) }));

// bot.telegram.setMyCommands([
//   { command: 'start', description: 'Start / choose grade' },
//   { command: 'help', description: 'Show help' },
//   { command: 'report', description: 'View your learning report' },
//   { command: 'reset', description: 'Reset session' },
// ]);

// const ensureSession = (ctx: BotContext) => {
//   if (!ctx.session) ctx.session = {};
// };

// async function sendOrEdit(ctx: BotContext, text: string, extra?: any) {
//   if (ctx.callbackQuery && ctx.callbackQuery.message) {
//     try {
//       await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
//     } catch (e) {
//       console.log('deleteMessage failed', e);
//     }
//   }
//   await ctx.reply(text, extra);
// }

// // ================= START COMMAND (LEARNING FLOW) =================
// // ================= START COMMAND (LEARNING FLOW) =================
// bot.command('start', async (ctx) => {
//   const args = ctx.message.text.split(' ');
//   const param = args[1];
  
//   // ✅ Check if it's a payment success callback
//   if (param && param.startsWith('payment_success')) {
//     const parts = param.split('_');
//     const difficulty = parts[2] ? parseInt(parts[2]) : null;
//     const lessonId = ctx.session.selectedLesson || null;
    
//     await ctx.reply(
//       `✅ **Payment Successful!** 🎉\n\n` +
//       `Difficulty Level ${difficulty || ''} has been unlocked.\n` +
//       `Starting your quiz now...`
//     );
    
//     // ✅ If we have a lessonId, fetch and start the quiz
//     if (lessonId) {
//       // Clear any existing session
//       ctx.session.currentQuiz = undefined;
//       ctx.session.awaitingAnswer = false;
//       ctx.session.awaitingQuestionIndex = undefined;
      
//       // Show quizzes and start the first quiz
//       await showQuizzes(ctx, lessonId);
//     } else {
//       // Fallback: show the quiz list
//       await ctx.reply('Please select a quiz from the list:');
//       // You can also show the grade selection here if needed
//       await showSubjects(ctx, ctx.session.grade || 6);
//     }
//     return;
//   }
  
//   // ✅ Normal start flow (existing code)
//   ensureSession(ctx);
//   const grades = [6, 7, 8, 9, 10, 11, 12];
//   const keyboard: { text: string; callback_data: string }[] = grades.map(g => ({
//     text: `Grade ${g}`,
//     callback_data: `learn_grade_${g}`,
//   }));
//   await sendOrEdit(ctx,
//     '🎓 Welcome! Please select your grade to start:',
//     {
//       reply_markup: {
//         inline_keyboard: keyboard.map((k: { text: string; callback_data: string }) => [{ text: k.text, callback_data: k.callback_data }]),
//       },
//     }
//   );
// });

// // ================= LEARNING: GRADE SELECTED =================
// bot.action(/learn_grade_(\d+)/, async (ctx) => {
//   console.log('✅ learn_grade_ triggered for grade:', ctx.match[1]);
//   const grade = parseInt(ctx.match[1]);
//   ctx.session.grade = grade;
//   ctx.session.selectedSubject = undefined;
//   ctx.session.selectedLesson = undefined;
//   await ctx.answerCbQuery(`Grade ${grade} selected`);
//   await showSubjects(ctx, grade);
// });

// // ================= LEARNING: SUBJECTS =================
// // ================= LEARNING: SUBJECTS =================
// async function showSubjects(ctx: BotContext, grade: number) {
//   console.log(`📚 Fetching subjects for grade ${grade}`);
  
//   try {
//     // ✅ Fetch subjects with a timeout to prevent hanging
//     const res = await Promise.race([
//       getSubjects(grade),
//       new Promise((_, reject) => 
//         setTimeout(() => reject(new Error('Request timeout')), 10000)
//       )
//     ]) as any;
    
//     const subjects = res.data;
//     console.log(`✅ Subjects received: ${subjects.length} subjects`);
    
//     if (!subjects || subjects.length === 0) {
//       console.log(`⚠️ No subjects found for grade ${grade}`);
//       return ctx.reply('No subjects found for this grade. Try another grade with /start.');
//     }
    
//     // ✅ Log subject names for debugging
//     console.log(`📋 Subjects: ${subjects.map((s: any) => s.name).join(', ')}`);
    
//     // ✅ Build keyboard with all subjects
//     const keyboard: { text: string; callback_data: string }[] = subjects.map((s: any) => ({
//       text: s.name,
//       callback_data: `learn_subject_${s.subjectId}`,
//     }));
    
//     // ✅ Send message with all subjects
//     await sendOrEdit(ctx,
//       `📚 Subjects for Grade ${grade}:\nChoose one:`,
//       {
//         reply_markup: {
//           inline_keyboard: keyboard.map((k: { text: string; callback_data: string }) => [{ text: k.text, callback_data: k.callback_data }]),
//         },
//       }
//     );
    
//   } catch (error: any) {
//     console.error('❌ Error fetching subjects:', error.message);
//     if (error.message === 'Request timeout') {
//       await ctx.reply('⏰ Request timed out. Please try again.');
//     } else {
//       await ctx.reply('❌ Failed to fetch subjects. Please try again.');
//     }
//   }
// }
// bot.action(/learn_subject_(\d+)/, async (ctx) => {
//   console.log('✅ learn_subject_ triggered');
//   const subjectId = parseInt(ctx.match[1]);
//   ctx.session.selectedSubject = subjectId;
//   ctx.session.selectedLesson = undefined;
//   await ctx.answerCbQuery('Subject selected');
//   await showLessons(ctx, subjectId);
// });

// // ================= LEARNING: LESSONS =================
// async function showLessons(ctx: BotContext, subjectId: number) {
//   console.log(`📖 Fetching lessons for subject ${subjectId}`);
//   try {
//     const res = await getLessons(subjectId);
//     const lessons = res.data;
//     if (!lessons || lessons.length === 0) {
//       return ctx.reply('No lessons found for this subject. Go back with /start.');
//     }
//     const keyboard: { text: string; callback_data: string }[] = lessons.map((l: any) => ({
//       text: l.title,
//       callback_data: `learn_lesson_${l.lessonId}`,
//     }));
//     await sendOrEdit(ctx,
//       `📖 Lessons:\nChoose one:`,
//       {
//         reply_markup: {
//           inline_keyboard: keyboard.map((k: { text: string; callback_data: string }) => [{ text: k.text, callback_data: k.callback_data }]),
//         },
//       }
//     );
//   } catch (error) {
//     await ctx.reply('❌ Failed to fetch lessons.');
//   }
// }

// bot.action(/learn_lesson_(\d+)/, async (ctx) => {
//   console.log('✅ learn_lesson_ triggered');
//   const lessonId = parseInt(ctx.match[1]);
//   ctx.session.selectedLesson = lessonId;
//   await ctx.answerCbQuery('Lesson selected');
//   await showQuizzes(ctx, lessonId);
// });

// // ================= LEARNING: QUIZZES (WITH LOCK SIGN) =================
// // ================= LEARNING: QUIZZES (WITH LOCK SIGN) =================
// async function showQuizzes(ctx: BotContext, lessonId: number) {
//   console.log(`📝 Fetching quizzes for lesson ${lessonId}`);
//   try {
//     const res = await getQuizzes(ctx.from!.id, lessonId);
//     let quizzes: any[] = [];
//     if (res.data && res.data.quiz) {
//       quizzes = [res.data.quiz];
//     } else if (Array.isArray(res.data)) {
//       quizzes = res.data;
//     } else if (res.data && Array.isArray(res.data.quizzes)) {
//       quizzes = res.data.quizzes;
//     }
//     if (quizzes.length === 0) {
//       return ctx.reply('No quizzes available for this lesson.');
//     }
    
//     // ✅ Check if any quiz is unlocked (payment success flow)
//     const hasUnlockedQuiz = quizzes.some((q: any) => q.isLocked === false);
//     if (hasUnlockedQuiz && ctx.session.paymentSuccess) {
//       // ✅ If payment was just successful, start the first unlocked quiz
//       ctx.session.paymentSuccess = false;
//       const unlockedQuiz = quizzes.find((q: any) => q.isLocked === false);
//       if (unlockedQuiz) {
//         console.log(`🚀 Auto-starting unlocked quiz: ${unlockedQuiz.title}`);
//         const startRes = await startQuiz(ctx.from!.id, unlockedQuiz.quizId);
//         let quizData = startRes.data.quiz || startRes.data;
//         if (quizData && quizData.quizId) {
//           ctx.session.currentQuiz = {
//             quizId: quizData.quizId,
//             questions: quizData.questions,
//             currentIndex: 0,
//             answers: {},
//           };
//           await sendQuestion(ctx, 0);
//           return;
//         }
//       }
//     }
    
//     // ✅ Show quiz list normally
//     const keyboard: { text: string; callback_data: string }[] = quizzes.map((q: any) => {
//       const difficulty = q.difficulty || 1;
//       const isLocked = q.isLocked !== undefined ? q.isLocked : difficulty >= 3;
//       const price = difficulty === 3 ? 500 : difficulty === 4 ? 700 : difficulty === 5 ? 1000 : 0;
      
//       const lockEmoji = isLocked ? '🔒 ' : '✅ ';
//       const label = `${lockEmoji}${q.title} (${q.questions?.length || 0} questions)${isLocked ? ` - ${price} ETB` : ''}`;
      
//       return {
//         text: label,
//         callback_data: isLocked ? `unlock_${q.quizId}_${difficulty}_${lessonId}` : `learn_quiz_${q.quizId}`,
//       };
//     });
//     await sendOrEdit(ctx,
//       `📝 Quizzes:\nChoose one to start:`,
//       {
//         reply_markup: {
//           inline_keyboard: keyboard.map((k: { text: string; callback_data: string }) => [{ text: k.text, callback_data: k.callback_data }]),
//         },
//       }
//     );
//   } catch (error: any) {
//     console.error('❌ Error fetching quizzes:', error);
//     await ctx.reply('❌ Failed to fetch quizzes.');
//   }
// }
// // ================= UNLOCK QUIZ =================
// // ================= UNLOCK QUIZ =================
// bot.action(/unlock_(\d+)_(\d+)_(\d+)/, async (ctx) => {
//   const quizId = parseInt(ctx.match[1]);
//   const difficulty = parseInt(ctx.match[2]);
//   const lessonId = parseInt(ctx.match[3]);
//   const price = difficulty === 3 ? 500 : difficulty === 4 ? 700 : difficulty === 5 ? 1000 : 0;

//   // ✅ Send payment link immediately
//   await ctx.answerCbQuery('🔓 Initiating payment...');
  
//   try {
//     // ✅ Call purchaseDifficulty without phone number
//     const response = await purchaseDifficulty(ctx.from.id, difficulty);
    
//     if (response.data.success) {
//       await ctx.reply(
//         `✅ **Payment link generated!**\n\n` +
//         `Click below to complete your payment:\n` +
//         `${response.data.checkout_url}\n\n` +
//         `After payment, your quiz will be unlocked.`
//       );
//     } else {
//       await ctx.reply('❌ Failed to generate payment link. Please try again.');
//     }
//   } catch (error: any) {
//     console.error('❌ Payment error:', error);
//     await ctx.reply('❌ Payment failed. Please try again later.');
//   }
// });

// // ================= HANDLE PHONE NUMBER INPUT (for unlock) =================
// // ================= HANDLE ALL TEXT MESSAGES =================
// bot.on('text', async (ctx) => {
//   const messageText = ctx.message.text;
  
//   // ✅ 1. ALWAYS skip commands (messages starting with /)
//   if (messageText.startsWith('/')) {
//     console.log('⏭️ Command detected, skipping text handler');
//     return;
//   }

//   // ✅ 2. Check if user is answering a free-text question FIRST
//   if (ctx.session.awaitingAnswer) {
//     console.log('📝 Processing free-text answer');
//     const quiz = ctx.session.currentQuiz;
//     if (!quiz) {
//       ctx.session.awaitingAnswer = false;
//       return ctx.reply('No active quiz. Please start one with /start.');
//     }

//     const index = ctx.session.awaitingQuestionIndex;
//     if (index === undefined || index >= quiz.questions.length) {
//       ctx.session.awaitingAnswer = false;
//       return ctx.reply('Invalid question index. Please start over.');
//     }

//     const answer = messageText;
//     const question = quiz.questions[index];
//     quiz.answers[question.questionId] = answer;
//     quiz.currentIndex = index + 1;
//     ctx.session.awaitingAnswer = false;
//     ctx.session.awaitingQuestionIndex = undefined;

//     try {
//       await ctx.deleteMessage(ctx.message.message_id);
//     } catch (e) {
//       console.log('delete text message failed', e);
//     }

//     await sendQuestion(ctx, quiz.currentIndex);
//     return;
//   }

//   // ✅ 3. Check if user is in unlock flow (payment)
//   const unlockState = unlockStates.get(ctx.from.id);
//   if (unlockState) {
//     const phone = messageText.trim();
    
//     // Validate phone number
//     if (!phone.match(/^09\d{8}$/)) {
//       return ctx.reply('❌ Invalid phone number. Please enter a valid Ethiopian phone number (e.g., 0912345678)');
//     }
    
//     try {
//       await ctx.sendChatAction('typing');
      
//       const response = await purchaseDifficulty(ctx.from.id, unlockState.difficulty, phone);
      
//       if (response.data.success) {
//         await ctx.reply(
//           `✅ **Payment initiated!**\n\n` +
//           `Please click the link below to complete your payment:\n` +
//           `${response.data.checkout_url}\n\n` +
//           `After payment, your quiz will be unlocked automatically.\n` +
//           `You can then start the quiz by clicking it again.`
//         );
//         unlockStates.delete(ctx.from.id);
//       } else {
//         await ctx.reply(`❌ ${response.data.message || 'Failed to initiate payment.'}`);
//       }
//     } catch (error: any) {
//       console.error('❌ Payment error:', error.response?.data || error.message);
//       await ctx.reply(`❌ ${error.response?.data?.message || 'Payment failed. Please try again later.'}`);
//     }
//     return;
//   }

//   // ✅ 4. If nothing matches, ignore the message
//   console.log('⏭️ Not expecting an answer, ignoring.');
// });
// // ================= LEARNING: START QUIZ =================
// bot.action(/learn_quiz_(\d+)/, async (ctx) => {
//   console.log('✅ learn_quiz_ triggered');
//   const quizId = parseInt(ctx.match[1]);
//   await ctx.answerCbQuery('Starting quiz...');
//   await startQuizById(ctx, quizId);
// });

// async function startQuizById(ctx: BotContext, quizId: number) {
//   if (!ctx.from) return ctx.reply('Could not identify user.');
//   console.log(`🚀 Starting quiz ${quizId} for user ${ctx.from.id}`);
//   try {
//     const res = await startQuiz(ctx.from.id, quizId);
//     let quiz = res.data.quiz || res.data;
//     if (!quiz || !quiz.quizId) {
//       console.error('❌ Quiz data missing:', res.data);
//       return ctx.reply('❌ Failed to parse quiz data.');
//     }
//     ctx.session.currentQuiz = {
//       quizId: quiz.quizId,
//       questions: quiz.questions,
//       currentIndex: 0,
//       answers: {},
//     };
//     await sendQuestion(ctx, 0);
//   } catch (error: any) {
//     if (error.response?.status === 403) {
//       await ctx.reply('🔒 This quiz is locked. Please unlock it first.');
//     } else {
//       console.error('❌ Error starting quiz:', error);
//       await ctx.reply('❌ Failed to start quiz.');
//     }
//   }
// }

// // ================= START QUIZ BY LESSON ID =================
// async function startQuizByLessonId(ctx: BotContext, lessonId: number) {
//   console.log(`🚀 Starting quiz for lesson ${lessonId}`);
//   try {
//     const res = await getQuizzes(ctx.from!.id, lessonId);
//     let quizzes: any[] = [];
//     if (res.data && res.data.quiz) {
//       quizzes = [res.data.quiz];
//     } else if (Array.isArray(res.data)) {
//       quizzes = res.data;
//     } else if (res.data && Array.isArray(res.data.quizzes)) {
//       quizzes = res.data.quizzes;
//     }
    
//     if (quizzes.length === 0) {
//       return ctx.reply('No quizzes available for this lesson.');
//     }
    
//     // ✅ Take the first quiz and start it
//     const quiz = quizzes[0];
//     console.log(`📝 Starting quiz: ${quiz.title} (ID: ${quiz.quizId})`);
    
//     // Start the quiz
//     const startRes = await startQuiz(ctx.from!.id, quiz.quizId);
//     let quizData = startRes.data.quiz || startRes.data;
//     if (!quizData || !quizData.quizId) {
//       console.error('❌ Quiz data missing:', startRes.data);
//       return ctx.reply('❌ Failed to parse quiz data.');
//     }
//     ctx.session.currentQuiz = {
//       quizId: quizData.quizId,
//       questions: quizData.questions,
//       currentIndex: 0,
//       answers: {},
//     };
//     await sendQuestion(ctx, 0);
    
//   } catch (error: any) {
//     console.error('❌ Error starting quiz by lesson:', error);
//     if (error.response?.status === 403) {
//       await ctx.reply('🔒 This quiz is locked. Please unlock it first.');
//     } else {
//       await ctx.reply('❌ Failed to start quiz. Please try again.');
//     }
//   }
// }
// // ================= QUESTION FLOW =================
// async function sendQuestion(ctx: BotContext, index: number) {
//   const quiz = ctx.session.currentQuiz;
//   if (!quiz || index >= quiz.questions.length) {
//     await sendOrEdit(ctx, 'Quiz completed! Submitting...');
//     await submitQuizHandler(ctx);
//     return;
//   }
//   const q = quiz.questions[index];
//   let options: string[] = [];
//   if (typeof q.options === 'string') {
//     try { options = JSON.parse(q.options); } catch { options = []; }
//   } else if (Array.isArray(q.options)) {
//     options = q.options;
//   }

//   if (options.length > 0) {
//     const keyboard: { text: string; callback_data: string }[] = options.map((opt: string) => ({
//       text: opt,
//       callback_data: `ans_${index}_${opt}`,
//     }));
//     await sendOrEdit(ctx,
//       `Question ${index + 1}/${quiz.questions.length}: ${q.question}`,
//       {
//         reply_markup: {
//           inline_keyboard: keyboard.map((k: { text: string; callback_data: string }) => [{ text: k.text, callback_data: k.callback_data }]),
//         },
//       }
//     );
//   } else {
//     ctx.session.awaitingAnswer = true;
//     ctx.session.awaitingQuestionIndex = index;
//     await sendOrEdit(ctx,
//       `Question ${index + 1}/${quiz.questions.length}: ${q.question}\n\n(Please type your answer below)`
//     );
//   }
// }

// bot.action(/ans_(\d+)_(.+)/, async (ctx) => {
//   const match = ctx.match as RegExpExecArray;
//   const index = parseInt(match[1]);
//   const answer = match[2];
//   const quiz = ctx.session.currentQuiz;
//   if (!quiz) return ctx.reply('No active quiz.');
//   quiz.answers[quiz.questions[index].questionId] = answer;
//   quiz.currentIndex = index + 1;
//   ctx.session.awaitingAnswer = false;
//   ctx.session.awaitingQuestionIndex = undefined;
//   await ctx.answerCbQuery('Answer recorded!');
//   await sendQuestion(ctx, quiz.currentIndex);
// });

// // ================= SUBMIT QUIZ =================
// async function submitQuizHandler(ctx: BotContext) {
//   const quiz = ctx.session.currentQuiz;
//   if (!quiz) {
//     console.log('❌ No active quiz found');
//     return ctx.reply('No active quiz.');
//   }

//   console.log('📤 Submitting quiz:', quiz.quizId);
//   console.log('📤 Answers:', quiz.answers);

//   const payload = {
//     quizId: quiz.quizId,
//     answers: Object.entries(quiz.answers).map(([qId, ans]) => ({
//       questionId: parseInt(qId),
//       selectedAnswer: ans,
//     })),
//     telegramUser: {
//       id: ctx.from!.id,
//       username: ctx.from!.username || '',
//       firstName: ctx.from!.first_name || '',
//       lastName: ctx.from!.last_name || '',
//     },
//     telegramId: ctx.from!.id, // ✅ SEND telegramId directly
//   };

//   console.log('📤 Full payload:', JSON.stringify(payload, null, 2));

//   try {
//     await ctx.sendChatAction('typing');
//     const res = await submitQuiz(payload);
//     console.log('✅ Quiz submitted successfully:', res.data);
    
//     const result = res.data;

//     let msg = `📊 **Quiz Results**\n`;
//     msg += `Score: ${result.score}/${result.totalQuestions} (${result.percentage}%)\n\n`;
//     msg += `📝 Feedback: ${result.feedback}\n`;
//     msg += `📘 Recommendation: ${result.recommendation}\n\n`;
//     msg += `📝 **Detailed Answers:**\n\n`;

//     result.answers.forEach((a: any, idx: number) => {
//       const status = a.isCorrect ? '✅' : '❌';
//       msg += `**Q${idx + 1}:** ${a.questionText || 'Question'}\n`;
//       msg += `   Your answer: ${a.selectedAnswer}\n`;
//       msg += `   Correct: ${a.correctAnswer}\n`;
//       msg += `   ${status} ${a.isCorrect ? 'Correct' : 'Incorrect'}\n`;
//       if (a.explanation) {
//         msg += `   💡 ${a.explanation}\n`;
//       }
//       msg += '\n';
//     });

//     // Split if too long
//     if (msg.length > 4096) {
//       const parts = msg.match(/[\s\S]{1,4096}/g) || [];
//       for (const part of parts) {
//         await ctx.reply(part);
//       }
//     } else {
//       await ctx.reply(msg);
//     }

//     ctx.session.currentQuiz = undefined;
//     ctx.session.awaitingAnswer = false;
//     ctx.session.awaitingQuestionIndex = undefined;

//     await ctx.reply('You can /start again to choose another grade, or check your /report to see your history.');

//   } catch (error: any) {
//     console.error('❌ Error submitting quiz:', error.message);
//     console.error('❌ Error response:', error.response?.data);
//     console.error('❌ Error status:', error.response?.status);
    
//     if (error.response?.status === 401) {
//       await ctx.reply('❌ Authentication failed. Please try /start again.');
//     } else if (error.response?.status === 403) {
//       await ctx.reply('🔒 This quiz is locked. Please unlock it first.');
//     } else {
//       await ctx.reply('❌ Failed to submit quiz. Please try again.');
//     }
//   }
// }
// // ================= REPORT FLOW =================
// bot.command('report', async (ctx) => {
//   console.log('🔥 /report command EXECUTED');
//   if (!ctx.from) return ctx.reply('Could not identify you.');

//   try {
//     await ctx.sendChatAction('typing');
//     const res = await getStudentSubjects(ctx.from.id);
//     const subjects = res.data;

//     if (!subjects || subjects.length === 0) {
//       return ctx.reply('📊 You haven\'t taken any quizzes yet. Start with /start to begin learning!');
//     }

//     let msg = `📈 **Your Learning Report**\n\nSelect a subject to see details:\n`;
//     const buttons = subjects.map((s: any) => ({
//       text: `${s.name} (${s.totalQuizzes} quizzes, ${s.averageScore}%)`,
//       callback_data: `report_subject_${s.subjectId}`,
//     }));

//     const keyboard = [];
//     for (let i = 0; i < buttons.length; i += 2) {
//       keyboard.push(buttons.slice(i, i + 2));
//     }

//     await ctx.reply(msg, {
//       reply_markup: { inline_keyboard: keyboard },
//     });
//   } catch (error: any) {
//     if (error.response && error.response.status === 404) {
//       return ctx.reply('📊 You haven\'t taken any quizzes yet. Start with /start to begin learning!');
//     }
//     console.error('Report error:', error);
//     await ctx.reply('❌ Failed to fetch your report.');
//   }
// });

// // ================= REPORT: SUBJECT SELECTED =================
// bot.action(/report_subject_(\d+)/, async (ctx) => {
//   console.log('✅ report_subject_ triggered');
//   const subjectId = parseInt(ctx.match[1]);
//   await ctx.answerCbQuery('Loading lessons...');

//   try {
//     await ctx.sendChatAction('typing');
//     const res = await getStudentLessons(ctx.from!.id, subjectId);
//     const lessons = res.data;

//     if (!lessons || lessons.length === 0) {
//       return ctx.reply('No lessons found for this subject.');
//     }

//     let msg = `📖 **Lessons**\nSelect a lesson:\n`;
//     const buttons = lessons.map((l: any) => ({
//       text: `${l.title} (${l.totalQuizzes} quizzes, ${l.averageScore}%)`,
//       callback_data: `report_lesson_${l.lessonId}`,
//     }));

//     const keyboard = [];
//     for (let i = 0; i < buttons.length; i += 2) {
//       keyboard.push(buttons.slice(i, i + 2));
//     }

//     await ctx.reply(msg, {
//       reply_markup: { inline_keyboard: keyboard },
//     });
//   } catch (error) {
//     console.error('Lessons error:', error);
//     await ctx.reply('❌ Failed to load lessons.');
//   }
// });

// // ================= REPORT: LESSON SELECTED =================
// bot.action(/report_lesson_(\d+)/, async (ctx) => {
//   console.log('✅ report_lesson_ triggered');
//   const lessonId = parseInt(ctx.match[1]);
//   await ctx.answerCbQuery('Loading quizzes...');

//   try {
//     await ctx.sendChatAction('typing');
//     const res = await getStudentQuizzes(ctx.from!.id, lessonId);
//     const quizzes = res.data;

//     if (!quizzes || quizzes.length === 0) {
//       return ctx.reply('No quizzes taken for this lesson.');
//     }

//     let msg = `📝 **Quizzes taken**\nTap a quiz to see details:\n`;
//     const buttons = quizzes.map((q: any) => ({
//       text: `${q.title} – ${q.percentage}% (${q.score}/${q.total})`,
//       callback_data: `report_detail_${q.resultId}`,
//     }));

//     const keyboard = [];
//     for (let i = 0; i < buttons.length; i += 2) {
//       keyboard.push(buttons.slice(i, i + 2));
//     }

//     await ctx.reply(msg, {
//       reply_markup: { inline_keyboard: keyboard },
//     });
//   } catch (error) {
//     console.error('Quizzes error:', error);
//     await ctx.reply('❌ Failed to load quizzes.');
//   }
// });

// // ================= REPORT: QUIZ DETAIL =================
// bot.action(/report_detail_(.+)/, async (ctx) => {
//   console.log('✅ report_detail_ triggered for resultId:', ctx.match[1]);
//   const resultId = ctx.match[1];
//   await ctx.answerCbQuery('Loading quiz details...');

//   try {
//     await ctx.sendChatAction('typing');
//     const res = await getResultById(resultId);
//     const data = res.data;

//     let msg = `📝 **Quiz Details**\n\n`;
//     msg += `📖 ${data.quizTitle}\n`;
//     msg += `📚 ${data.subject} – ${data.lesson}\n`;
//     msg += `📊 Score: ${data.score}/${data.totalQuestions} (${data.percentage}%)\n\n`;
//     msg += `**Answers:**\n`;

//     data.answers.forEach((a: any, idx: number) => {
//       const status = a.isCorrect ? '✅' : '❌';
//       msg += `${idx+1}. ${a.questionText}\n`;
//       msg += `   Your answer: ${a.selectedAnswer}\n`;
//       msg += `   Correct: ${a.correctAnswer}\n`;
//       msg += `   ${status} ${a.isCorrect ? 'Correct' : 'Incorrect'}\n`;
//       if (a.explanation) {
//         msg += `   💡 ${a.explanation}\n`;
//       }
//       msg += '\n';
//     });

//     if (msg.length > 4096) {
//       const parts = msg.match(/[\s\S]{1,4096}/g) || [];
//       for (const part of parts) {
//         await ctx.reply(part);
//       }
//     } else {
//       await ctx.reply(msg);
//     }

//   } catch (error) {
//     console.error('Detail error:', error);
//     await ctx.reply('❌ Failed to load quiz details.');
//   }
// });

// // ================= HELP, PROGRESS, RESET =================
// bot.command('help', async (ctx) => {
//   await ctx.reply(
//     `📚 **How to use**\n` +
//     `1. /start – choose a grade and start a quiz.\n` +
//     `2. /report – view your past quiz results (by grade/subject).\n` +
//     `3. /reset – clear your session.\n\n` +
//     `In the report, tap a grade → subject → lesson → quiz to see detailed answers.`
//   );
// });

// bot.command('progress', async (ctx) => {
//   ensureSession(ctx);
//   const history = ctx.session.progressHistory || [];
//   if (history.length === 0) {
//     return ctx.reply("📊 You haven't taken any quizzes yet. Use /start to begin learning!");
//   }
//   const totalQuizzes = history.length;
//   const avgScore = Math.round(history.reduce((acc, r) => acc + r.percentage, 0) / totalQuizzes);
//   let msg = `📈 **Your Learning Progress**\n\n`;
//   msg += `Total Quizzes Taken: ${totalQuizzes}\n`;
//   msg += `Average Score: ${avgScore}%\n\n`;
//   msg += `**Recent History:**\n`;
//   const recent = history.slice(-5).reverse();
//   recent.forEach((r, i) => {
//     msg += `${i + 1}. Quiz ID ${r.quizId}: ${r.score}/${r.total} (${r.percentage}%)\n`;
//   });
//   await ctx.reply(msg);
// });

// bot.command('reset', async (ctx) => {
//   ctx.session = {} as SessionData;
//   await ctx.reply('🔄 Session reset. Use /start to begin again.');
// });

// // ================= LAUNCH =================
// bot.launch();
// console.log('🤖 QuizAI Bot is running with grade-selection flow.');



import { Telegraf, session, Context } from 'telegraf';
import dotenv from 'dotenv';
import { 
  getSubjects, 
  getLessons, 
  getQuizzes, 
  startQuiz, 
  submitQuiz,
  getStudentSubjects,
  getStudentLessons,
  getStudentQuizzes,
  getResultById,
  purchaseDifficulty
} from './services/api';
import { SessionData } from './types/session';

dotenv.config();

interface BotContext extends Context {
  session: SessionData;
}

const bot = new Telegraf<BotContext>(process.env.BOT_TOKEN!);
bot.use(session({ defaultSession: () => ({}) }));

bot.telegram.setMyCommands([
  { command: 'start', description: 'Start / choose grade' },
  { command: 'help', description: 'Show help' },
  { command: 'report', description: 'View your learning report' },
  { command: 'reset', description: 'Reset session' },
]);

const ensureSession = (ctx: BotContext) => {
  if (!ctx.session) ctx.session = {};
};

async function sendOrEdit(ctx: BotContext, text: string, extra?: any) {
  if (ctx.callbackQuery && ctx.callbackQuery.message) {
    try {
      await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    } catch (e) {
      console.log('deleteMessage failed', e);
    }
  }
  await ctx.reply(text, extra);
}

// ================= START COMMAND =================
bot.command('start', async (ctx) => {
  ensureSession(ctx);
  const grades = [6, 7, 8, 9, 10, 11, 12];
  const keyboard: { text: string; callback_data: string }[] = grades.map(g => ({
    text: `Grade ${g}`,
    callback_data: `learn_grade_${g}`,
  }));
  await sendOrEdit(ctx,
    '🎓 Welcome! Please select your grade to start:',
    {
      reply_markup: {
        inline_keyboard: keyboard.map((k: { text: string; callback_data: string }) => [{ text: k.text, callback_data: k.callback_data }]),
      },
    }
  );
});

bot.command('help', async (ctx) => {
  await ctx.reply(
    `📚 **How to use**\n` +
    `1. /start – choose a grade and start a quiz.\n` +
    `2. /report – view your past quiz results.\n` +
    `3. /reset – clear your session.\n\n` +
    `🔒 Locked quizzes can be unlocked with a native Telegram payment.`
  );
});

bot.command('progress', async (ctx) => {
  ensureSession(ctx);
  const history = ctx.session.progressHistory || [];
  if (history.length === 0) {
    return ctx.reply("📊 You haven't taken any quizzes yet. Use /start to begin learning!");
  }
  const totalQuizzes = history.length;
  const avgScore = Math.round(history.reduce((acc, r) => acc + r.percentage, 0) / totalQuizzes);
  let msg = `📈 **Your Learning Progress**\n\n`;
  msg += `Total Quizzes Taken: ${totalQuizzes}\n`;
  msg += `Average Score: ${avgScore}%\n\n`;
  msg += `**Recent History:**\n`;
  const recent = history.slice(-5).reverse();
  recent.forEach((r, i) => {
    msg += `${i + 1}. Quiz ID ${r.quizId}: ${r.score}/${r.total} (${r.percentage}%)\n`;
  });
  await ctx.reply(msg);
});

bot.command('reset', async (ctx) => {
  ctx.session = {} as SessionData;
  await ctx.reply('🔄 Session reset. Use /start to begin again.');
});
bot.command('report', async (ctx) => {
  console.log('🔥 /report command EXECUTED');
  if (!ctx.from) return ctx.reply('Could not identify you.');

  try {
    await ctx.sendChatAction('typing');
    const res = await getStudentSubjects(ctx.from.id);
    const subjects = res.data;

    if (!subjects || subjects.length === 0) {
      return ctx.reply('📊 You haven\'t taken any quizzes yet. Start with /start to begin learning!');
    }

    let msg = `📈 **Your Learning Report**\n\nSelect a subject to see details:\n`;
    const buttons = subjects.map((s: any) => ({
      text: `${s.name} (${s.totalQuizzes} quizzes, ${s.averageScore}%)`,
      callback_data: `report_subject_${s.subjectId}`,
    }));

    const keyboard = [];
    for (let i = 0; i < buttons.length; i += 2) {
      keyboard.push(buttons.slice(i, i + 2));
    }

    await ctx.reply(msg, {
      reply_markup: { inline_keyboard: keyboard },
    });
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return ctx.reply('📊 You haven\'t taken any quizzes yet. Start with /start to begin learning!');
    }
    console.error('Report error:', error);
    await ctx.reply('❌ Failed to fetch your report.');
  }
});
// ================= LEARNING: GRADE SELECTED =================
bot.action(/learn_grade_(\d+)/, async (ctx) => {
  console.log('✅ learn_grade_ triggered for grade:', ctx.match[1]);
  const grade = parseInt(ctx.match[1]);
  ctx.session.grade = grade;
  ctx.session.selectedSubject = undefined;
  ctx.session.selectedLesson = undefined;
  await ctx.answerCbQuery(`Grade ${grade} selected`);
  await showSubjects(ctx, grade);
});

// ================= LEARNING: SUBJECTS =================
async function showSubjects(ctx: BotContext, grade: number) {
  console.log(`📚 Fetching subjects for grade ${grade}`);
  
  try {
    const res = await getSubjects(grade);
    const subjects = res.data;
    console.log(`✅ Subjects received: ${subjects.length} subjects`);
    
    if (!subjects || subjects.length === 0) {
      console.log(`⚠️ No subjects found for grade ${grade}`);
      return ctx.reply('No subjects found for this grade. Try another grade with /start.');
    }
    
    const keyboard: { text: string; callback_data: string }[] = subjects.map((s: any) => ({
      text: s.name,
      callback_data: `learn_subject_${s.subjectId}`,
    }));
    
    await sendOrEdit(ctx,
      `📚 Subjects for Grade ${grade}:\nChoose one:`,
      {
        reply_markup: {
          inline_keyboard: keyboard.map((k: { text: string; callback_data: string }) => [{ text: k.text, callback_data: k.callback_data }]),
        },
      }
    );
    
  } catch (error: any) {
    console.error('❌ Error fetching subjects:', error.message);
    await ctx.reply('❌ Failed to fetch subjects. Please try again.');
  }
}

bot.action(/learn_subject_(\d+)/, async (ctx) => {
  console.log('✅ learn_subject_ triggered');
  const subjectId = parseInt(ctx.match[1]);
  ctx.session.selectedSubject = subjectId;
  ctx.session.selectedLesson = undefined;
  await ctx.answerCbQuery('Subject selected');
  await showLessons(ctx, subjectId);
});

// ================= LEARNING: LESSONS =================
async function showLessons(ctx: BotContext, subjectId: number) {
  console.log(`📖 Fetching lessons for subject ${subjectId}`);
  try {
 const res = await getLessons(ctx.from!.id, subjectId);
     const lessons = res.data;
    if (!lessons || lessons.length === 0) {
      return ctx.reply('No lessons found for this subject. Go back with /start.');
    }
    const keyboard: { text: string; callback_data: string }[] = lessons.map((l: any) => ({
      text: l.title,
      callback_data: `learn_lesson_${l.lessonId}`,
    }));
    await sendOrEdit(ctx,
      `📖 Lessons:\nChoose one:`,
      {
        reply_markup: {
          inline_keyboard: keyboard.map((k: { text: string; callback_data: string }) => [{ text: k.text, callback_data: k.callback_data }]),
        },
      }
    );
  } catch (error) {
    await ctx.reply('❌ Failed to fetch lessons.');
  }
}

bot.action(/learn_lesson_(\d+)/, async (ctx) => {
  console.log('✅ learn_lesson_ triggered');
  const lessonId = parseInt(ctx.match[1]);
  ctx.session.selectedLesson = lessonId;
  await ctx.answerCbQuery('Lesson selected');
  await showQuizzes(ctx, lessonId);
});

// ================= LEARNING: QUIZZES (WITH NATIVE PAYMENT) =================
async function showQuizzes(ctx: BotContext, lessonId: number) {
  console.log(`📝 Fetching quizzes for lesson ${lessonId}`);
  try {
    const res = await getQuizzes(ctx.from!.id, lessonId);
    let quizzes: any[] = [];
    if (res.data && res.data.quiz) {
      quizzes = [res.data.quiz];
    } else if (Array.isArray(res.data)) {
      quizzes = res.data;
    } else if (res.data && Array.isArray(res.data.quizzes)) {
      quizzes = res.data.quizzes;
    }
    if (quizzes.length === 0) {
      return ctx.reply('No quizzes available for this lesson.');
    }
    
    // ✅ If payment was just successful, auto-start the first unlocked quiz
    if (ctx.session.paymentSuccess) {
      ctx.session.paymentSuccess = false;
      
      const unlockedQuiz = quizzes.find((q: any) => q.isLocked === false);
      if (unlockedQuiz) {
        console.log(`🚀 Auto-starting unlocked quiz: ${unlockedQuiz.title}`);
        const startRes = await startQuiz(ctx.from!.id, unlockedQuiz.quizId);
        let quizData = startRes.data.quiz || startRes.data;
        if (quizData && quizData.quizId) {
          ctx.session.currentQuiz = {
            quizId: quizData.quizId,
            questions: quizData.questions,
            currentIndex: 0,
            answers: {},
          };
          await sendQuestion(ctx, 0);
          return;
        }
      }
    }
    
    // ✅ Show quiz list with lock status
    const keyboard: { text: string; callback_data: string }[] = quizzes.map((q: any) => {
      const difficulty = q.difficulty || 1;
      const isLocked = q.isLocked !== undefined ? q.isLocked : difficulty >= 3;
      const price = difficulty === 3 ? 500 : difficulty === 4 ? 700 : difficulty === 5 ? 1000 : 0;
      
      const lockEmoji = isLocked ? '🔒 ' : '✅ ';
      const label = `${lockEmoji}${q.title} (${q.questions?.length || 0} questions)${isLocked ? ` - ${price} ETB` : ''}`;
      
      return {
        text: label,
        callback_data: isLocked ? `unlock_${q.quizId}_${difficulty}_${lessonId}` : `learn_quiz_${q.quizId}`,
      };
    });
    await sendOrEdit(ctx,
      `📝 Quizzes:\nChoose one to start:`,
      {
        reply_markup: {
          inline_keyboard: keyboard.map((k: { text: string; callback_data: string }) => [{ text: k.text, callback_data: k.callback_data }]),
        },
      }
    );
  } catch (error: any) {
    console.error('❌ Error fetching quizzes:', error);
    await ctx.reply('❌ Failed to fetch quizzes.');
  }
}

// ================= UNLOCK QUIZ (NATIVE TELEGRAM INVOICE) =================
bot.action(/unlock_(\d+)_(\d+)_(\d+)/, async (ctx) => {
  const quizId = parseInt(ctx.match[1]);
  const difficulty = parseInt(ctx.match[2]);
  const lessonId = parseInt(ctx.match[3]);
  
  // ✅ Store lessonId in session for post-payment
  ctx.session.selectedLesson = lessonId;
  
  // ✅ Get price based on difficulty
  const prices: { [key: number]: number } = { 3: 500, 4: 700, 5: 1000 };
  const amount = prices[difficulty] || 0;
  
  await ctx.answerCbQuery('🔓 Generating invoice...');
  
  // ✅ Check if provider token is set
  const providerToken = process.env.CHAPA_PROVIDER_TOKEN;
  if (!providerToken) {
    console.error('❌ CHAPA_PROVIDER_TOKEN is not set in .env');
    await ctx.reply('❌ Payment system is not configured. Please contact support.');
    return;
  }
  
  try {
    // ✅ Send a native Telegram invoice
    await ctx.replyWithInvoice({
      title: `Unlock Difficulty Level ${difficulty}`,
      description: `Access all quizzes at difficulty level ${difficulty}. One-time payment.`,
      payload: JSON.stringify({ 
        difficulty, 
        quizId, 
        lessonId,
        userId: ctx.from.id 
      }),
      provider_token: providerToken, // ✅ Now guaranteed to be a string
      currency: 'ETB',
      prices: [
        { label: `Difficulty Level ${difficulty} Unlock`, amount: amount * 100 }
      ],
      start_parameter: 'unlock_quiz',
    });
    
  } catch (error: any) {
    console.error('❌ Invoice error:', error);
    await ctx.reply('❌ Failed to generate invoice. Please try again.');
  }
});

// ================= HANDLE PRE-CHECKOUT =================
bot.on('pre_checkout_query', async (ctx) => {
  // ✅ Confirm the pre-checkout query
  await ctx.answerPreCheckoutQuery(true);
  console.log('✅ Pre-checkout query answered for user:', ctx.from.id);
});

// ================= HANDLE SUCCESSFUL PAYMENT =================
bot.on('successful_payment', async (ctx) => {
  const payment = ctx.message.successful_payment;
  console.log('✅ Payment received:', payment);
  
  // ✅ Parse the payload
  const payload = JSON.parse(payment.invoice_payload);
  const difficulty = payload.difficulty;
  const userId = payload.userId;
  const lessonId = payload.lessonId;
  
  // ✅ Update the user's purchased difficulties via backend
  try {
    const response = await purchaseDifficulty(userId, difficulty);
    if (response.data.success) {
      console.log(`✅ Difficulty ${difficulty} unlocked for user ${userId}`);
    }
  } catch (error: any) {
    console.error('❌ Error updating user in database:', error);
  }

  // ✅ Send confirmation to user
  await ctx.reply(
    `✅ **Payment Successful!** 🎉\n\n` +
    `Difficulty Level ${difficulty} has been unlocked.\n` +
    `Starting your quiz now...`
  );
  
  // ✅ Auto-start the quiz
  if (lessonId) {
    ctx.session.paymentSuccess = true;
    ctx.session.currentQuiz = undefined;
    ctx.session.awaitingAnswer = false;
    ctx.session.awaitingQuestionIndex = undefined;
    await showQuizzes(ctx, lessonId);
  }
});


// ================= LEARNING: START QUIZ =================
bot.action(/learn_quiz_(\d+)/, async (ctx) => {
  console.log('✅ learn_quiz_ triggered');
  const quizId = parseInt(ctx.match[1]);
  await ctx.answerCbQuery('Starting quiz...');
  await startQuizById(ctx, quizId);
});

async function startQuizById(ctx: BotContext, quizId: number) {
  if (!ctx.from) return ctx.reply('Could not identify user.');
  console.log(`🚀 Starting quiz ${quizId} for user ${ctx.from.id}`);
  try {
    const res = await startQuiz(ctx.from.id, quizId);
    let quiz = res.data.quiz || res.data;
    if (!quiz || !quiz.quizId) {
      console.error('❌ Quiz data missing:', res.data);
      return ctx.reply('❌ Failed to parse quiz data.');
    }
    ctx.session.currentQuiz = {
      quizId: quiz.quizId,
      questions: quiz.questions,
      currentIndex: 0,
      answers: {},
    };
    await sendQuestion(ctx, 0);
  } catch (error: any) {
    if (error.response?.status === 403) {
      await ctx.reply('🔒 This quiz is locked. Please unlock it first.');
    } else {
      console.error('❌ Error starting quiz:', error);
      await ctx.reply('❌ Failed to start quiz.');
    }
  }
}

// ================= QUESTION FLOW =================
async function sendQuestion(ctx: BotContext, index: number) {
  const quiz = ctx.session.currentQuiz;
  if (!quiz || index >= quiz.questions.length) {
    await sendOrEdit(ctx, 'Quiz completed! Submitting...');
    await submitQuizHandler(ctx);
    return;
  }
  const q = quiz.questions[index];
  let options: string[] = [];
  if (typeof q.options === 'string') {
    try { options = JSON.parse(q.options); } catch { options = []; }
  } else if (Array.isArray(q.options)) {
    options = q.options;
  }

  if (options.length > 0) {
    const keyboard: { text: string; callback_data: string }[] = options.map((opt: string) => ({
      text: opt,
      callback_data: `ans_${index}_${opt}`,
    }));
    await sendOrEdit(ctx,
      `Question ${index + 1}/${quiz.questions.length}: ${q.question}`,
      {
        reply_markup: {
          inline_keyboard: keyboard.map((k: { text: string; callback_data: string }) => [{ text: k.text, callback_data: k.callback_data }]),
        },
      }
    );
  } else {
    ctx.session.awaitingAnswer = true;
    ctx.session.awaitingQuestionIndex = index;
    await sendOrEdit(ctx,
      `Question ${index + 1}/${quiz.questions.length}: ${q.question}\n\n(Please type your answer below)`
    );
  }
}

bot.action(/ans_(\d+)_(.+)/, async (ctx) => {
  const match = ctx.match as RegExpExecArray;
  const index = parseInt(match[1]);
  const answer = match[2];
  const quiz = ctx.session.currentQuiz;
  if (!quiz) return ctx.reply('No active quiz.');
  quiz.answers[quiz.questions[index].questionId] = answer;
  quiz.currentIndex = index + 1;
  ctx.session.awaitingAnswer = false;
  ctx.session.awaitingQuestionIndex = undefined;
  await ctx.answerCbQuery('Answer recorded!');
  await sendQuestion(ctx, quiz.currentIndex);
});

// ================= SUBMIT QUIZ =================
async function submitQuizHandler(ctx: BotContext) {
  const quiz = ctx.session.currentQuiz;
  if (!quiz) {
    console.log('❌ No active quiz found');
    return ctx.reply('No active quiz.');
  }

  console.log('📤 Submitting quiz:', quiz.quizId);
  console.log('📤 Answers:', quiz.answers);

  const payload = {
    quizId: quiz.quizId,
    answers: Object.entries(quiz.answers).map(([qId, ans]) => ({
      questionId: parseInt(qId),
      selectedAnswer: ans,
    })),
    telegramUser: {
      id: ctx.from!.id,
      username: ctx.from!.username || '',
      firstName: ctx.from!.first_name || '',
      lastName: ctx.from!.last_name || '',
    },
    telegramId: ctx.from!.id,
  };

  try {
    await ctx.sendChatAction('typing');
    const res = await submitQuiz(payload);
    const result = res.data;

    let msg = `📊 **Quiz Results**\n`;
    msg += `Score: ${result.score}/${result.totalQuestions} (${result.percentage}%)\n\n`;
    msg += `📝 Feedback: ${result.feedback}\n`;
    msg += `📘 Recommendation: ${result.recommendation}\n\n`;
    msg += `📝 **Detailed Answers:**\n\n`;

    result.answers.forEach((a: any, idx: number) => {
      const status = a.isCorrect ? '✅' : '❌';
      msg += `**Q${idx + 1}:** ${a.questionText || 'Question'}\n`;
      msg += `   Your answer: ${a.selectedAnswer}\n`;
      msg += `   Correct: ${a.correctAnswer}\n`;
      msg += `   ${status} ${a.isCorrect ? 'Correct' : 'Incorrect'}\n`;
      if (a.explanation) {
        msg += `   💡 ${a.explanation}\n`;
      }
      msg += '\n';
    });

    if (msg.length > 4096) {
      const parts = msg.match(/[\s\S]{1,4096}/g) || [];
      for (const part of parts) {
        await ctx.reply(part);
      }
    } else {
      await ctx.reply(msg);
    }

    ctx.session.currentQuiz = undefined;
    ctx.session.awaitingAnswer = false;
    ctx.session.awaitingQuestionIndex = undefined;

    await ctx.reply('You can /start again to choose another grade, or check your /report to see your history.');

  } catch (error: any) {
    console.error('❌ Error submitting quiz:', error.message);
    console.error('❌ Error response:', error.response?.data);
    console.error('❌ Error status:', error.response?.status);
    
    if (error.response?.status === 401) {
      await ctx.reply('❌ Authentication failed. Please try /start again.');
    } else if (error.response?.status === 403) {
      await ctx.reply('🔒 This quiz is locked. Please unlock it first.');
    } else {
      await ctx.reply('❌ Failed to submit quiz. Please try again.');
    }
  }
}

// ================= REPORT FLOW =================


bot.action(/report_subject_(\d+)/, async (ctx) => {
  console.log('✅ report_subject_ triggered');
  const subjectId = parseInt(ctx.match[1]);
  await ctx.answerCbQuery('Loading lessons...');

  try {
    await ctx.sendChatAction('typing');
    const res = await getStudentLessons(ctx.from!.id, subjectId);
    const lessons = res.data;

    if (!lessons || lessons.length === 0) {
      return ctx.reply('No lessons found for this subject.');
    }

    let msg = `📖 **Lessons**\nSelect a lesson:\n`;
    const buttons = lessons.map((l: any) => ({
      text: `${l.title} (${l.totalQuizzes} quizzes, ${l.averageScore}%)`,
      callback_data: `report_lesson_${l.lessonId}`,
    }));

    const keyboard = [];
    for (let i = 0; i < buttons.length; i += 2) {
      keyboard.push(buttons.slice(i, i + 2));
    }

    await ctx.reply(msg, {
      reply_markup: { inline_keyboard: keyboard },
    });
  } catch (error) {
    console.error('Lessons error:', error);
    await ctx.reply('❌ Failed to load lessons.');
  }
});

bot.action(/report_lesson_(\d+)/, async (ctx) => {
  console.log('✅ report_lesson_ triggered');
  const lessonId = parseInt(ctx.match[1]);
  await ctx.answerCbQuery('Loading quizzes...');

  try {
    await ctx.sendChatAction('typing');
    const res = await getStudentQuizzes(ctx.from!.id, lessonId);
    const quizzes = res.data;

    if (!quizzes || quizzes.length === 0) {
      return ctx.reply('No quizzes taken for this lesson.');
    }

    let msg = `📝 **Quizzes taken**\nTap a quiz to see details:\n`;
    const buttons = quizzes.map((q: any) => ({
      text: `${q.title} – ${q.percentage}% (${q.score}/${q.total})`,
      callback_data: `report_detail_${q.resultId}`,
    }));

    const keyboard = [];
    for (let i = 0; i < buttons.length; i += 2) {
      keyboard.push(buttons.slice(i, i + 2));
    }

    await ctx.reply(msg, {
      reply_markup: { inline_keyboard: keyboard },
    });
  } catch (error) {
    console.error('Quizzes error:', error);
    await ctx.reply('❌ Failed to load quizzes.');
  }
});

bot.action(/report_detail_(.+)/, async (ctx) => {
  console.log('✅ report_detail_ triggered for resultId:', ctx.match[1]);
  const resultId = ctx.match[1];
  await ctx.answerCbQuery('Loading quiz details...');

  try {
    await ctx.sendChatAction('typing');
    const res = await getResultById(resultId);
    const data = res.data;

    let msg = `📝 **Quiz Details**\n\n`;
    msg += `📖 ${data.quizTitle}\n`;
    msg += `📚 ${data.subject} – ${data.lesson}\n`;
    msg += `📊 Score: ${data.score}/${data.totalQuestions} (${data.percentage}%)\n\n`;
    msg += `**Answers:**\n`;

    data.answers.forEach((a: any, idx: number) => {
      const status = a.isCorrect ? '✅' : '❌';
      msg += `${idx+1}. ${a.questionText}\n`;
      msg += `   Your answer: ${a.selectedAnswer}\n`;
      msg += `   Correct: ${a.correctAnswer}\n`;
      msg += `   ${status} ${a.isCorrect ? 'Correct' : 'Incorrect'}\n`;
      if (a.explanation) {
        msg += `   💡 ${a.explanation}\n`;
      }
      msg += '\n';
    });

    if (msg.length > 4096) {
      const parts = msg.match(/[\s\S]{1,4096}/g) || [];
      for (const part of parts) {
        await ctx.reply(part);
      }
    } else {
      await ctx.reply(msg);
    }

  } catch (error) {
    console.error('Detail error:', error);
    await ctx.reply('❌ Failed to load quiz details.');
  }
});



// ================= HANDLE ALL TEXT MESSAGES =================
bot.on('text', async (ctx) => {
  const messageText = ctx.message.text;
  
  // ✅ Skip commands
  if (messageText.startsWith('/')) {
    console.log('⏭️ Command detected, skipping text handler');
    return;
  }

  // ✅ Check if user is answering a free-text question
  if (ctx.session.awaitingAnswer) {
    console.log('📝 Processing free-text answer');
    const quiz = ctx.session.currentQuiz;
    if (!quiz) {
      ctx.session.awaitingAnswer = false;
      return ctx.reply('No active quiz. Please start one with /start.');
    }

    const index = ctx.session.awaitingQuestionIndex;
    if (index === undefined || index >= quiz.questions.length) {
      ctx.session.awaitingAnswer = false;
      return ctx.reply('Invalid question index. Please start over.');
    }

    const answer = messageText;
    const question = quiz.questions[index];
    quiz.answers[question.questionId] = answer;
    quiz.currentIndex = index + 1;
    ctx.session.awaitingAnswer = false;
    ctx.session.awaitingQuestionIndex = undefined;

    try {
      await ctx.deleteMessage(ctx.message.message_id);
    } catch (e) {
      console.log('delete text message failed', e);
    }

    await sendQuestion(ctx, quiz.currentIndex);
    return;
  }

  console.log('⏭️ Not expecting an answer, ignoring.');
});

// ================= LAUNCH =================
bot.launch();
console.log('🤖 QuizAI Bot is running with native Telegram payments!');
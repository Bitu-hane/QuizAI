// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';
// import Role, { IRole } from '../models/Role';
// import Permission, { IPermission } from '../models/Permission';
// import RolePermission from '../models/RolePermission';
// import User, { IUser } from '../models/User';
// import Credentials, { ICredentials } from '../models/Credentials';
// import UserRole from '../models/UserRole';
// import { connectDB } from './db';

// const seed = async () => {
//   await connectDB();

//   try {
//     // Clear collections (optional)
//     await Role.deleteMany({});
//     await Permission.deleteMany({});
//     await RolePermission.deleteMany({});
//     await User.deleteMany({});
//     await Credentials.deleteMany({});
//     await UserRole.deleteMany({});

//     // 1. Create permissions
//     const permissions = [
//       { name: 'manage_grades', resource: 'grade', action: 'create' },
//       { name: 'manage_subjects', resource: 'subject', action: 'create' },
//       { name: 'manage_lessons', resource: 'lesson', action: 'create' },
//       { name: 'manage_quizzes', resource: 'quiz', action: 'create' },
//       { name: 'manage_users', resource: 'user', action: 'read' },
//       { name: 'view_reports', resource: 'report', action: 'read' },
//     ] as const;

//     const createdPerms = await Permission.insertMany(permissions);

//     // 2. Create roles
//     const adminRole: IRole = await Role.create({ name: 'admin', description: 'Administrator' });
//     const teacherRole: IRole = await Role.create({ name: 'teacher', description: 'Teacher' });
//     const studentRole: IRole = await Role.create({ name: 'student', description: 'Student' });

//     // 3. Assign all permissions to admin
//     for (const perm of createdPerms) {
//       await RolePermission.create({
//         roleId: adminRole._id,
//         permitId: perm._id,
//       });
//     }

//     // 4. Create admin user – explicitly typed as IUser
//     const adminUser: IUser = await User.create({
//       FName: 'Bitanya',
//       MName: 'Moges',
//       LName: 'Seyoum',
//       gender: 'male',
//       dateOfBirth: new Date('2005-11-02'),
//       email: 'bitanya111@gmail.com',
//       status: 'active',
//       PImage: [],
//       gradeId: undefined,
//     });

//     // 5. Hash password and create credentials
//     const hashedPassword = await bcrypt.hash('admin123', 10);
//     await Credentials.create({
//       userId: adminUser._id,
//       type: 'password',
//       email: 'admin@bitanya111@gmail.com',
//       secret: hashedPassword,
//       loginAttempt: 0,
//     });

//     // 6. Assign admin role
//     await UserRole.create({
//       userId: adminUser._id,
//       roleId: adminRole._id,
//     });

//     console.log('✅ Seed completed successfully!');
//     console.log('👤 Admin user: admin@quizai.com / password: admin123');
//     console.log('📋 Roles created: admin, teacher, student');

//     process.exit(0);
//   } catch (error) {
//     console.error('❌ Seed failed:', error);
//     process.exit(1);
//   }
// };

// seed();

// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';
// import Role from './models/Role';
// import Permission from './models/Permission';
// import RolePermission from './models/RolePermission';
// import User from './models/User';
// import Credentials from './models/Credentials';
// import UserRole from './models/UserRole';
// import { connectDB } from './config/db';

// const seed = async () => {
//   await connectDB();

//   try {
//     // Clear collections (optional)
//     await Role.deleteMany({});
//     await Permission.deleteMany({});
//     await RolePermission.deleteMany({});
//     await User.deleteMany({});
//     await Credentials.deleteMany({});
//     await UserRole.deleteMany({});

//     // 1. Create permissions
//     const permissions = [
//       { name: 'manage_grades', resource: 'grade', action: 'create' },
//       { name: 'manage_subjects', resource: 'subject', action: 'create' },
//       { name: 'manage_lessons', resource: 'lesson', action: 'create' },
//       { name: 'manage_quizzes', resource: 'quiz', action: 'create' },
//       { name: 'manage_users', resource: 'user', action: 'read' },
//       { name: 'view_reports', resource: 'report', action: 'read' },
//     ];
//     const createdPerms = await Permission.insertMany(permissions);

//     // 2. Create roles
//     const adminRole = await Role.create({ name: 'admin', description: 'Administrator' });
//     const teacherRole = await Role.create({ name: 'teacher', description: 'Teacher' });
//     const studentRole = await Role.create({ name: 'student', description: 'Student' });

//     // 3. Assign all permissions to admin
//     for (const perm of createdPerms) {
//       await RolePermission.create({ roleId: adminRole._id, permitId: perm._id });
//     }

//     // 4. Create admin user
//     const adminUser = await User.create({
//       FName: 'Super',
//       MName: '',
//       LName: 'Admin',
//       gender: 'male',
//       dateOfBirth: new Date('1990-01-01'),
//       email: 'admin@quizai.com',
//       status: 'active',
//       PImage: [],
//       gradeId: undefined,
//     });

//     // 5. Hash password and create credentials
//     const hashedPassword = await bcrypt.hash('admin123', 10);
//     await Credentials.create({
//       userId: adminUser._id,
//       type: 'password',
//       email: 'admin@quizai.com',
//       secret: hashedPassword,
//       loginAttempt: 0,
//     });

//     // 6. Assign admin role
//     await UserRole.create({ userId: adminUser._id, roleId: adminRole._id });

//     console.log('✅ Seed completed successfully!');
//     console.log('👤 Admin user: admin@quizai.com / password: admin123');
//     console.log('📋 Roles created: admin, teacher, student');

//     process.exit(0);
//   } catch (error) {
//     console.error('❌ Seed failed:', error);
//     process.exit(1);
//   }
// };

// seed();

// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';
// import { connectDB } from './config/db';
// import Role from './models/Role';
// import Permission from './models/Permission';
// import RolePermission from './models/RolePermission';
// import User from './models/User';
// import Credentials from './models/Credentials';
// import UserRole from './models/UserRole';
// import Grade from './models/Grade';
// import Subject from './models/Subject';
// import Lesson from './models/Lesson';
// import Quiz from './models/Quiz';
// import Question from './models/Question';

// type SubjectLessonMap = {
//   [grade: number]: {
//     [subject: string]: string[]; // lesson titles
//   };
// };

// const curriculum: SubjectLessonMap = {
//   6: {
//     'Amharic': ['የአማርኛ ፊደል እና አነባበብ', 'ሰዋሰው – ግስ እና ስም', 'አጭር ጽሁፍ እና ግጥም'],
//     'English': ['Alphabet and Sounds', 'Basic Grammar – Nouns and Verbs', 'Reading Comprehension'],
//     'Mathematics': ['Whole Numbers', 'Operations – Addition & Subtraction', 'Fractions and Decimals'],
//     'Social Studies': ['Our Country – Ethiopia', 'Map Reading and Directions', 'Ethiopian Regions'],
//     'General Science': ['Living Things', 'Matter and Its Properties', 'Energy and Motion'],
//     'Moral Education': ['Values and Ethics', 'Respect and Responsibility', 'Community and Cooperation'],
//     'Information Technology': ['Computer Basics', 'Using a Keyboard', 'Introduction to the Internet'],
//     'Performing and Visual Arts': ['Drawing and Painting', 'Music and Rhythm', 'Dance and Expression'],
//     'Health and Physical Education': ['Personal Hygiene', 'Nutrition and Health', 'Exercise and Fitness'],
//   },
//   7: {
//     'Amharic': ['ሰዋሰው – ግስ እና ተውሳክ', 'አነባበብ እና መረዳት', 'ጽሁፍ እና ግጥም'],
//     'English': ['Parts of Speech', 'Sentence Structure', 'Reading and Writing Skills'],
//     'Mathematics': ['Integers', 'Rational Numbers', 'Equations and Inequalities'],
//     'Social Studies': ['Ethiopian History', 'Geography – Climate and Landforms', 'Civic Education'],
//     'General Science': ['Cell Biology', 'Simple Machines', 'Electricity and Magnetism'],
//     'Citizenship Education': ['Rights and Duties', 'Governance', 'Constitution'],
//     'Information Technology': ['Word Processing', 'Spreadsheets', 'Email and Communication'],
//     'Performing and Visual Arts': ['Art and Culture', 'Music and Instruments', 'Theatre'],
//     'Health and Physical Education': ['First Aid', 'Health Habits', 'Sports and Games'],
//   },
//   8: {
//     'Amharic': ['ሰዋሰው – ግስ እና ቅጽል', 'አነባበብ እና ጽሁፍ', 'ግጥም እና ትንታኔ'],
//     'English': ['Tenses', 'Active and Passive Voice', 'Essay Writing'],
//     'Mathematics': ['Geometry Basics', 'Area and Volume', 'Data Handling'],
//     'Social Studies': ['World History', 'Ethiopian Regions', 'Global Geography'],
//     'General Science': ['Human Body Systems', 'Chemical Reactions', 'Light and Sound'],
//     'Citizenship Education': ['Democracy and Human Rights', 'Federalism', 'Conflict Resolution'],
//     'Information Technology': ['Programming Basics', 'Database Concepts', 'Web Design'],
//     'Performing and Visual Arts': ['Visual Arts', 'Music Theory', 'Performance'],
//     'Health and Physical Education': ['Reproductive Health', 'Disease Prevention', 'Fitness Training'],
//   },
//   9: {
//     'Amharic': ['ሰዋሰው – ግስ እና ግሥ ቅጽል', 'አነባበብ እና ጽሁፍ', 'ግጥም እና ስነ-ጽሁፍ'],
//     'English': ['Advanced Grammar', 'Essay Writing', 'Literature Analysis'],
//     'Mathematics': ['Algebra', 'Linear Equations', 'Quadratic Functions'],
//     'Biology': ['Cell and Tissues', 'Genetics', 'Ecology'],
//     'Chemistry': ['Atomic Structure', 'Chemical Bonding', 'Acids and Bases'],
//     'Physics': ['Motion and Forces', 'Work and Energy', 'Waves and Sound'],
//     'Geography': ['Physical Geography', 'Climatic Zones', 'Map Reading'],
//     'History': ['Ancient Civilizations', 'Ethiopian Empire', 'World Wars'],
//     'Citizenship Education': ['Ethiopian Constitution', 'Human Rights', 'Peace and Development'],
//     'Information Technology': ['Programming Concepts', 'Networking', 'Cybersecurity'],
//     'Economics': ['Introduction to Economics', 'Supply and Demand', 'Market Structures'],
//     'Health and Physical Education': ['Public Health', 'Nutrition', 'Sports Science'],
//   },
//   10: {
//     'Amharic': ['ሰዋሰው – ግስ እና ግሥ ቅጽል', 'አነባበብ እና ጽሁፍ', 'ግጥም እና ስነ-ጽሁፍ'],
//     'English': ['Advanced Grammar', 'Essay Writing', 'Literature Analysis'],
//     'Mathematics': ['Algebra', 'Linear Equations', 'Quadratic Functions'],
//     'Biology': ['Cell and Tissues', 'Genetics', 'Ecology'],
//     'Chemistry': ['Atomic Structure', 'Chemical Bonding', 'Acids and Bases'],
//     'Physics': ['Motion and Forces', 'Work and Energy', 'Waves and Sound'],
//     'Geography': ['Physical Geography', 'Climatic Zones', 'Map Reading'],
//     'History': ['Ancient Civilizations', 'Ethiopian Empire', 'World Wars'],
//     'Citizenship Education': ['Ethiopian Constitution', 'Human Rights', 'Peace and Development'],
//     'Information Technology': ['Programming Concepts', 'Networking', 'Cybersecurity'],
//     'Economics': ['Introduction to Economics', 'Supply and Demand', 'Market Structures'],
//     'Health and Physical Education': ['Public Health', 'Nutrition', 'Sports Science'],
//   },
//   11: {
//     'Amharic': ['ሰዋሰው እና ጽሁፍ', 'አነባበብ እና ግጥም', 'ስነ-ጽሁፍ ትንታኔ'],
//     'English': ['Advanced Essay Writing', 'Literature Review', 'Debate and Discussion'],
//     'Mathematics': ['Calculus Basics', 'Probability', 'Statistics'],
//     'Citizenship Education': ['Constitutional Law', 'Ethiopian Politics', 'Global Governance'],
//     'Information Technology': ['Object-Oriented Programming', 'Database Management', 'Web Development'],
//     'Health and Physical Education': ['Health Policy', 'Sports Psychology', 'Nutrition Science'],
//     'Physics': ['Mechanics', 'Thermodynamics', 'Electromagnetism'],
//     'Chemistry': ['Chemical Kinetics', 'Thermochemistry', 'Electrochemistry'],
//     'Biology': ['Molecular Biology', 'Biochemistry', 'Evolution'],
//     'Technical Drawing': ['Engineering Drawing', 'CAD Basics', 'Blueprint Reading'],
//     'Geography': ['Geographic Information Systems', 'Climate Change', 'Urban Geography'],
//     'History': ['Modern World History', 'African History', 'Ethiopian History'],
//     'Economics': ['Microeconomics', 'Macroeconomics', 'Development Economics'],
//     'General Business': ['Business Management', 'Accounting', 'Marketing'],
//   },
//   12: {
//     'Amharic': ['ሰዋሰው እና ጽሁፍ', 'አነባበብ እና ግጥም', 'ስነ-ጽሁፍ ትንታኔ'],
//     'English': ['Advanced Essay Writing', 'Literature Review', 'Debate and Discussion'],
//     'Mathematics': ['Calculus Basics', 'Probability', 'Statistics'],
//     'Citizenship Education': ['Constitutional Law', 'Ethiopian Politics', 'Global Governance'],
//     'Information Technology': ['Object-Oriented Programming', 'Database Management', 'Web Development'],
//     'Health and Physical Education': ['Health Policy', 'Sports Psychology', 'Nutrition Science'],
//     'Physics': ['Mechanics', 'Thermodynamics', 'Electromagnetism'],
//     'Chemistry': ['Chemical Kinetics', 'Thermochemistry', 'Electrochemistry'],
//     'Biology': ['Molecular Biology', 'Biochemistry', 'Evolution'],
//     'Technical Drawing': ['Engineering Drawing', 'CAD Basics', 'Blueprint Reading'],
//     'Geography': ['Geographic Information Systems', 'Climate Change', 'Urban Geography'],
//     'History': ['Modern World History', 'African History', 'Ethiopian History'],
//     'Economics': ['Microeconomics', 'Macroeconomics', 'Development Economics'],
//     'General Business': ['Business Management', 'Accounting', 'Marketing'],
//   },
// };

// // Helper to generate 5 questions per lesson
// function generateQuestionsForLesson(subject: string, lessonTitle: string, index: number) {
//   const baseQuestions = [
//     {
//       q: `What is the main concept covered in "${lessonTitle}"?`,
//       options: ['Concept A', 'Concept B', 'Concept C', 'Concept D'],
//       correct: 'Concept A',
//       explanation: 'The main concept is Concept A, which is foundational.',
//     },
//     {
//       q: `Which statement best describes ${subject}?`,
//       options: ['Statement 1', 'Statement 2', 'Statement 3', 'Statement 4'],
//       correct: 'Statement 1',
//       explanation: 'Statement 1 accurately describes the core idea.',
//     },
//     {
//       q: `In ${subject}, what is the key principle?`,
//       options: ['Principle X', 'Principle Y', 'Principle Z', 'Principle W'],
//       correct: 'Principle X',
//       explanation: 'Principle X is the fundamental rule.',
//     },
//     {
//       q: `What is the significance of ${lessonTitle}?`,
//       options: ['Significance 1', 'Significance 2', 'Significance 3', 'Significance 4'],
//       correct: 'Significance 1',
//       explanation: 'Significance 1 is the most important aspect.',
//     },
//     {
//       q: `How does ${lessonTitle} relate to everyday life?`,
//       options: ['Application 1', 'Application 2', 'Application 3', 'Application 4'],
//       correct: 'Application 1',
//       explanation: 'Application 1 is the most common real-world use.',
//     },
//   ];
//   return baseQuestions.map((q, idx) => ({
//     ...q,
//     questionId: index + idx,
//     options: JSON.stringify(q.options),
//   }));
// }

// // ------------------------------------------------------------
// // SEED FUNCTION
// // ------------------------------------------------------------

// const seed = async () => {
//   await connectDB();

//   try {
//     console.log('🧹 Clearing existing data...');
//     await Grade.deleteMany({});
//     await Subject.deleteMany({});
//     await Lesson.deleteMany({});
//     await Quiz.deleteMany({});
//     await Question.deleteMany({});
//     await Role.deleteMany({});
//     await Permission.deleteMany({});
//     await RolePermission.deleteMany({});
//     await User.deleteMany({});
//     await Credentials.deleteMany({});
//     await UserRole.deleteMany({});

//     // ---- 2. Create permissions and roles ----
//     const permissions = [
//       { name: 'manage_grades', resource: 'grade', action: 'create' },
//       { name: 'manage_subjects', resource: 'subject', action: 'create' },
//       { name: 'manage_lessons', resource: 'lesson', action: 'create' },
//       { name: 'manage_quizzes', resource: 'quiz', action: 'create' },
//       { name: 'manage_users', resource: 'user', action: 'read' },
//       { name: 'view_reports', resource: 'report', action: 'read' },
//     ];
//     const createdPerms = await Permission.insertMany(permissions);

//     const adminRole = await Role.create({ name: 'admin', description: 'Administrator' });
//     const studentRole = await Role.create({ name: 'student', description: 'Student' });

//     for (const perm of createdPerms) {
//       await RolePermission.create({ roleId: adminRole._id, permitId: perm._id });
//     }

//     // ---- 3. Create admin user ----
//     const adminUser = await User.create({
//       FName: 'Super',
//       MName: 'Admin',
//       LName: 'Admin',
//       gender: 'male',
//       dateOfBirth: new Date('1990-01-01'),
//       email: 'admin@quizai.com',
//       status: 'active',
//       PImage: [],
//     });

//     const hashedPassword = await bcrypt.hash('admin123', 10);
//     await Credentials.create({
//       userId: adminUser._id,
//       type: 'password',
//       email: 'admin@quizai.com',
//       secret: hashedPassword,
//       loginAttempt: 0,
//     });
//     await UserRole.create({ userId: adminUser._id, roleId: adminRole._id });

//     // ---- 4. Seed Grades, Subjects, Lessons, Quizzes, Questions ----
//     console.log('📚 Seeding grades and content...');

//     let gradeIdCounter = 1;
//     let subjectIdCounter = 1;
//     let lessonIdCounter = 1;
//     let quizIdCounter = 1;
//     let questionIdCounter = 1;

//     for (const gradeLevel of Object.keys(curriculum).map(Number)) {
//       // Create Grade
//       const grade = await Grade.create({ gradeId: gradeIdCounter, level: gradeLevel });
//       const currentGradeId = gradeIdCounter;
//       gradeIdCounter++;

//       const subjects = curriculum[gradeLevel];
//       for (const [subjectName, lessonTitles] of Object.entries(subjects)) {
//         // Create Subject
//         const subject = await Subject.create({
//           subjectId: subjectIdCounter,
//           name: subjectName,
//           gradeId: currentGradeId,
//         });
//         const currentSubjectId = subjectIdCounter;
//         subjectIdCounter++;

//         // Create Lessons
//         for (const [idx, lessonTitle] of lessonTitles.entries()) {
//           const lesson = await Lesson.create({
//             lessonId: lessonIdCounter,
//             title: lessonTitle,
//             description: `Learn about ${lessonTitle} in ${subjectName}`,
//             subjectId: currentSubjectId,
//             gradeId: currentGradeId,
//           });
//           const currentLessonId = lessonIdCounter;
//           lessonIdCounter++;

//           // Generate 5 questions for this lesson
//           const questionsData = generateQuestionsForLesson(subjectName, lessonTitle, questionIdCounter);
//           const questionDocs = await Question.insertMany(
//             questionsData.map(q => ({
//               questionId: q.questionId,
//               question: q.q,
//               options: q.options,
//               correct: q.correct,
//               explanation: q.explanation,
//               topic: subjectName,
//             }))
//           );
//           const questionIds = questionDocs.map(q => q.questionId);
//           questionIdCounter += questionsData.length;

//           // Create a quiz for this lesson
//           await Quiz.create({
//             quizId: quizIdCounter,
//             title: `${subjectName} Quiz – ${lessonTitle}`,
//             lessonId: currentLessonId,
//             timelimit: 10,
//             difficulty: Math.floor(Math.random() * 3) + 1,
//             questions: questionIds,
//           });
//           quizIdCounter++;
//         }
//       }
//     }

//     console.log('✅ Seed completed successfully!');
//     console.log(`📊 Grades: ${gradeIdCounter - 1}`);
//     console.log(`📚 Subjects: ${subjectIdCounter - 1}`);
//     console.log(`📖 Lessons: ${lessonIdCounter - 1}`);
//     console.log(`📝 Quizzes: ${quizIdCounter - 1}`);
//     console.log(`❓ Questions: ${questionIdCounter - 1}`);
//     console.log('👤 Admin user: admin@quizai.com / password: admin123');
//     console.log('📋 Roles: admin, student');

//     process.exit(0);
//   } catch (error) {
//     console.error('❌ Seed failed:', error);
//     process.exit(1);
//   }
// };


// seed();


import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { connectDB } from './config/db';
import Role from './models/Role';
import Permission from './models/Permission';
import RolePermission from './models/RolePermission';
import User from './models/User';
import Credentials from './models/Credentials';
import UserRole from './models/UserRole';
import Grade from './models/Grade';
import Subject from './models/Subject';
import Lesson from './models/Lesson';
import Quiz from './models/Quiz';
import Question from './models/Question';

// ----- Real question bank for Grade 6 Mathematics (MC + short‑answer) -----
const mathQuestionBank: Record<string, { question: string; options: string[]; correct: string }[]> = {
  'Whole Numbers': [
    {
      question: 'What is the place value of 7 in the number 5,784?',
      options: ['Hundreds', 'Tens', 'Thousands'],
      correct: 'Hundreds',
    },
    {
      question: 'Which number is divisible by 3?',
      options: ['124', '135', '146', '157'],
      correct: '135',
    },
    {
      question: 'Round 4,567 to the nearest hundred.',
      options: ['4,500', '4,600', '4,570'],
      correct: '4,600',
    },
    {
      question: 'What is the sum of 2,348 and 1,652?',
      options: ['3,900', '4,000', '4,100'],
      correct: '4,000',
    },
    {
      question: 'Write the largest number formed by digits 5, 8, and 2.',
      options: [], // short‑answer
      correct: '852',
    },
  ],
  'Operations': [
    {
      question: 'What is 345 + 678?',
      options: ['1,013', '1,023', '1,123'],
      correct: '1,023',
    },
    {
      question: 'Multiply 25 by 13.',
      options: ['325', '335', '345'],
      correct: '325',
    },
    {
      question: 'Divide 144 by 12.',
      options: ['10', '12', '13'],
      correct: '12',
    },
    {
      question: 'What is the product of 8 and 7?',
      options: ['48', '56', '64'],
      correct: '56',
    },
    {
      question: 'Subtract 456 from 1,234.',
      options: [], // short‑answer
      correct: '778',
    },
  ],
  'Fractions': [
    {
      question: 'What is 1/2 + 1/4?',
      options: ['1/4', '2/4', '3/4'],
      correct: '3/4',
    },
    {
      question: 'Which fraction is equivalent to 3/4?',
      options: ['6/8', '9/12', '12/16'],
      correct: '6/8',
    },
    {
      question: 'What is 2/3 of 18?',
      options: ['6', '12', '15'],
      correct: '12',
    },
    {
      question: 'Which is greater: 2/5 or 3/7?',
      options: ['2/5', '3/7', 'Equal'],
      correct: '3/7',
    },
    {
      question: 'Simplify the fraction 8/12.',
      options: [], // short‑answer
      correct: '2/3',
    },
  ],
};

// ----- Grade 6 subjects and lessons (only these will be seeded) -----
const grade6Curriculum = {
  'Amharic': ['የአማርኛ ፊደል እና አነባበብ', 'ሰዋሰው – ግስ እና ስም', 'አጭር ጽሁፍ እና ግጥም'],
  'English': ['Alphabet and Sounds', 'Basic Grammar – Nouns and Verbs', 'Reading Comprehension'],
  'Mathematics': ['Whole Numbers', 'Operations – Addition & Subtraction', 'Fractions and Decimals'],
  'Social Studies': ['Our Country – Ethiopia', 'Map Reading and Directions', 'Ethiopian Regions'],
  'General Science': ['Living Things', 'Matter and Its Properties', 'Energy and Motion'],
  'Moral Education': ['Values and Ethics', 'Respect and Responsibility', 'Community and Cooperation'],
  'Information Technology': ['Computer Basics', 'Using a Keyboard', 'Introduction to the Internet'],
  'Performing and Visual Arts': ['Drawing and Painting', 'Music and Rhythm', 'Dance and Expression'],
  'Health and Physical Education': ['Personal Hygiene', 'Nutrition and Health', 'Exercise and Fitness'],
};

// ------------------------------------------------------------
// Helper to generate short‑answer questions (no options)
// ------------------------------------------------------------
function generateShortAnswerQuestions(subject: string, lessonTitle: string, count: number, startId: number) {
  // We generate specific correct answers based on the lesson
  const correctAnswers = [
    `The main idea of "${lessonTitle}" in ${subject} is to build foundational knowledge.`,
    `A key concept in "${lessonTitle}" is understanding the core principles.`,
    `This topic helps students grasp the essential elements of ${subject}.`,
    `The lesson highlights the importance of applying ${subject} in daily life.`,
    `By studying "${lessonTitle}", students develop critical thinking skills.`,
    `The practical applications of "${lessonTitle}" are numerous in real-world contexts.`,
  ];
  const questions = [];
  for (let i = 0; i < count; i++) {
    const num = i + 1;
    questions.push({
      questionId: startId + i,
      question: `Explain the main idea of "${lessonTitle}" in ${subject} – part ${num}.`,
      options: JSON.stringify([]), // empty → text input
      correct: correctAnswers[i % correctAnswers.length],
      explanation: '', // AI will generate
      topic: subject,
    });
  }
  return questions;
}

// ------------------------------------------------------------
// SEED FUNCTION
// ------------------------------------------------------------
const seed = async () => {
  await connectDB();

  try {
    console.log('🧹 Clearing existing data...');
    await Grade.deleteMany({});
    await Subject.deleteMany({});
    await Lesson.deleteMany({});
    await Quiz.deleteMany({});
    await Question.deleteMany({});
    await Role.deleteMany({});
    await Permission.deleteMany({});
    await RolePermission.deleteMany({});
    await User.deleteMany({});
    await Credentials.deleteMany({});
    await UserRole.deleteMany({});

    // ---- Roles & Permissions ----
    const permissions = [
      { name: 'manage_grades', resource: 'grade', action: 'create' },
      { name: 'manage_subjects', resource: 'subject', action: 'create' },
      { name: 'manage_lessons', resource: 'lesson', action: 'create' },
      { name: 'manage_quizzes', resource: 'quiz', action: 'create' },
      { name: 'manage_users', resource: 'user', action: 'read' },
      { name: 'view_reports', resource: 'report', action: 'read' },
    ];
    const createdPerms = await Permission.insertMany(permissions);

    const adminRole = await Role.create({ name: 'admin', description: 'Administrator' });
    const studentRole = await Role.create({ name: 'student', description: 'Student' });

    for (const perm of createdPerms) {
      await RolePermission.create({ roleId: adminRole._id, permitId: perm._id });
    }

    // ---- Admin User ----
    const adminUser = await User.create({
      FName: 'Super',
      MName: 'Admin',
      LName: 'Admin',
      gender: 'male',
      dateOfBirth: new Date('1990-01-01'),
      email: 'admin@quizai.com',
      status: 'active',
      PImage: [],
    });

    const hashedPassword = await bcrypt.hash('admin123', 10);
    await Credentials.create({
      userId: adminUser._id,
      type: 'password',
      email: 'admin@quizai.com',
      secret: hashedPassword,
      loginAttempt: 0,
    });
    await UserRole.create({ userId: adminUser._id, roleId: adminRole._id });

    // ---- Seed Grade 6 content ----
    console.log('📚 Seeding Grade 6 content...');

    // Create Grade 6
    const grade = await Grade.create({ gradeId: 1, level: 6 });
    const gradeId = grade.gradeId;

    let subjectIdCounter = 1;
    let lessonIdCounter = 1;
    let quizIdCounter = 1;
    let questionIdCounter = 1;

    for (const [subjectName, lessonTitles] of Object.entries(grade6Curriculum)) {
      const subject = await Subject.create({
        subjectId: subjectIdCounter,
        name: subjectName,
        gradeId,
      });
      const subjectId = subjectIdCounter;
      subjectIdCounter++;

      for (const lessonTitle of lessonTitles) {
        const lesson = await Lesson.create({
          lessonId: lessonIdCounter,
          title: lessonTitle,
          description: `Learn about ${lessonTitle} in ${subjectName}`,
          subjectId,
          gradeId,
        });
        const lessonId = lessonIdCounter;
        lessonIdCounter++;

        // --- Determine questions per lesson ---
        let questionDocs = [];

        if (subjectName === 'Mathematics' && mathQuestionBank[lessonTitle]) {
          // Use real multiple‑choice + short‑answer questions for Math
          const realQuestions = mathQuestionBank[lessonTitle];
          const qData = realQuestions.map((q, idx) => ({
            questionId: questionIdCounter + idx,
            question: q.question,
            options: JSON.stringify(q.options),
            correct: q.correct,
            explanation: '', // AI will generate
            topic: subjectName,
          }));
          questionDocs = await Question.insertMany(qData);
          questionIdCounter += qData.length;

          // Create one quiz with all 5 questions
          const questionIds = questionDocs.map(q => q.questionId);
          await Quiz.create({
            quizId: quizIdCounter,
            title: `${subjectName} – ${lessonTitle} Quiz`,
            lessonId,
            timelimit: 10,
            difficulty: 4,
            questions: questionIds,
          });
          quizIdCounter++;
        } else {
          // Other subjects: create 2 quizzes, each with 3 short‑answer questions
          // Total 6 questions per lesson
          const totalQuestions = 6;
          const questionsPerQuiz = 3;

          // Generate 6 unique questions with meaningful correct answers
          const allQuestions = generateShortAnswerQuestions(
            subjectName,
            lessonTitle,
            totalQuestions,
            questionIdCounter
          );
          const inserted = await Question.insertMany(allQuestions);
          questionIdCounter += totalQuestions;

          // Split into two quizzes
          const firstHalf = inserted.slice(0, questionsPerQuiz);
          const secondHalf = inserted.slice(questionsPerQuiz);

          // Quiz 1
          await Quiz.create({
            quizId: quizIdCounter,
            title: `${subjectName} – ${lessonTitle} Quiz 1`,
            lessonId,
            timelimit: 8,
            difficulty: 1,
            questions: firstHalf.map(q => q.questionId),
          });
          quizIdCounter++;

          // Quiz 2
          await Quiz.create({
            quizId: quizIdCounter,
            title: `${subjectName} – ${lessonTitle} Quiz 2`,
            lessonId,
            timelimit: 8,
            difficulty: 1,
            questions: secondHalf.map(q => q.questionId),
          });
          quizIdCounter++;
        }
      }
    }

    console.log('✅ Seed completed successfully!');
    console.log(`📊 Grade: 6`);
    console.log(`📚 Subjects: ${subjectIdCounter - 1}`);
    console.log(`📖 Lessons: ${lessonIdCounter - 1}`);
    console.log(`📝 Quizzes: ${quizIdCounter - 1}`);
    console.log(`❓ Questions: ${questionIdCounter - 1}`);
    console.log('👤 Admin user: admin@quizai.com / password: admin123');
    console.log('📋 Roles: admin, student');
    console.log('🤖 AI explanations: enabled (all explanations left empty)');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
};

seed();
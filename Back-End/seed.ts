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

type SubjectLessonMap = {
  [grade: number]: {
    [subject: string]: string[]; // lesson titles
  };
};

const curriculum: SubjectLessonMap = {
  6: {
    'Amharic': ['የአማርኛ ፊደል እና አነባበብ', 'ሰዋሰው – ግስ እና ስም', 'አጭር ጽሁፍ እና ግጥም'],
    'English': ['Alphabet and Sounds', 'Basic Grammar – Nouns and Verbs', 'Reading Comprehension'],
    'Mathematics': ['Whole Numbers', 'Operations – Addition & Subtraction', 'Fractions and Decimals'],
    'Social Studies': ['Our Country – Ethiopia', 'Map Reading and Directions', 'Ethiopian Regions'],
    'General Science': ['Living Things', 'Matter and Its Properties', 'Energy and Motion'],
    'Moral Education': ['Values and Ethics', 'Respect and Responsibility', 'Community and Cooperation'],
    'Information Technology': ['Computer Basics', 'Using a Keyboard', 'Introduction to the Internet'],
    'Performing and Visual Arts': ['Drawing and Painting', 'Music and Rhythm', 'Dance and Expression'],
    'Health and Physical Education': ['Personal Hygiene', 'Nutrition and Health', 'Exercise and Fitness'],
  },
  7: {
    'Amharic': ['ሰዋሰው – ግስ እና ተውሳክ', 'አነባበብ እና መረዳት', 'ጽሁፍ እና ግጥም'],
    'English': ['Parts of Speech', 'Sentence Structure', 'Reading and Writing Skills'],
    'Mathematics': ['Integers', 'Rational Numbers', 'Equations and Inequalities'],
    'Social Studies': ['Ethiopian History', 'Geography – Climate and Landforms', 'Civic Education'],
    'General Science': ['Cell Biology', 'Simple Machines', 'Electricity and Magnetism'],
    'Citizenship Education': ['Rights and Duties', 'Governance', 'Constitution'],
    'Information Technology': ['Word Processing', 'Spreadsheets', 'Email and Communication'],
    'Performing and Visual Arts': ['Art and Culture', 'Music and Instruments', 'Theatre'],
    'Health and Physical Education': ['First Aid', 'Health Habits', 'Sports and Games'],
  },
  8: {
    'Amharic': ['ሰዋሰው – ግስ እና ቅጽል', 'አነባበብ እና ጽሁፍ', 'ግጥም እና ትንታኔ'],
    'English': ['Tenses', 'Active and Passive Voice', 'Essay Writing'],
    'Mathematics': ['Geometry Basics', 'Area and Volume', 'Data Handling'],
    'Social Studies': ['World History', 'Ethiopian Regions', 'Global Geography'],
    'General Science': ['Human Body Systems', 'Chemical Reactions', 'Light and Sound'],
    'Citizenship Education': ['Democracy and Human Rights', 'Federalism', 'Conflict Resolution'],
    'Information Technology': ['Programming Basics', 'Database Concepts', 'Web Design'],
    'Performing and Visual Arts': ['Visual Arts', 'Music Theory', 'Performance'],
    'Health and Physical Education': ['Reproductive Health', 'Disease Prevention', 'Fitness Training'],
  },
  9: {
    'Amharic': ['ሰዋሰው – ግስ እና ግሥ ቅጽል', 'አነባበብ እና ጽሁፍ', 'ግጥም እና ስነ-ጽሁፍ'],
    'English': ['Advanced Grammar', 'Essay Writing', 'Literature Analysis'],
    'Mathematics': ['Algebra', 'Linear Equations', 'Quadratic Functions'],
    'Biology': ['Cell and Tissues', 'Genetics', 'Ecology'],
    'Chemistry': ['Atomic Structure', 'Chemical Bonding', 'Acids and Bases'],
    'Physics': ['Motion and Forces', 'Work and Energy', 'Waves and Sound'],
    'Geography': ['Physical Geography', 'Climatic Zones', 'Map Reading'],
    'History': ['Ancient Civilizations', 'Ethiopian Empire', 'World Wars'],
    'Citizenship Education': ['Ethiopian Constitution', 'Human Rights', 'Peace and Development'],
    'Information Technology': ['Programming Concepts', 'Networking', 'Cybersecurity'],
    'Economics': ['Introduction to Economics', 'Supply and Demand', 'Market Structures'],
    'Health and Physical Education': ['Public Health', 'Nutrition', 'Sports Science'],
  },
  10: {
    'Amharic': ['ሰዋሰው – ግስ እና ግሥ ቅጽል', 'አነባበብ እና ጽሁፍ', 'ግጥም እና ስነ-ጽሁፍ'],
    'English': ['Advanced Grammar', 'Essay Writing', 'Literature Analysis'],
    'Mathematics': ['Algebra', 'Linear Equations', 'Quadratic Functions'],
    'Biology': ['Cell and Tissues', 'Genetics', 'Ecology'],
    'Chemistry': ['Atomic Structure', 'Chemical Bonding', 'Acids and Bases'],
    'Physics': ['Motion and Forces', 'Work and Energy', 'Waves and Sound'],
    'Geography': ['Physical Geography', 'Climatic Zones', 'Map Reading'],
    'History': ['Ancient Civilizations', 'Ethiopian Empire', 'World Wars'],
    'Citizenship Education': ['Ethiopian Constitution', 'Human Rights', 'Peace and Development'],
    'Information Technology': ['Programming Concepts', 'Networking', 'Cybersecurity'],
    'Economics': ['Introduction to Economics', 'Supply and Demand', 'Market Structures'],
    'Health and Physical Education': ['Public Health', 'Nutrition', 'Sports Science'],
  },
  11: {
    'Amharic': ['ሰዋሰው እና ጽሁፍ', 'አነባበብ እና ግጥም', 'ስነ-ጽሁፍ ትንታኔ'],
    'English': ['Advanced Essay Writing', 'Literature Review', 'Debate and Discussion'],
    'Mathematics': ['Calculus Basics', 'Probability', 'Statistics'],
    'Citizenship Education': ['Constitutional Law', 'Ethiopian Politics', 'Global Governance'],
    'Information Technology': ['Object-Oriented Programming', 'Database Management', 'Web Development'],
    'Health and Physical Education': ['Health Policy', 'Sports Psychology', 'Nutrition Science'],
    'Physics': ['Mechanics', 'Thermodynamics', 'Electromagnetism'],
    'Chemistry': ['Chemical Kinetics', 'Thermochemistry', 'Electrochemistry'],
    'Biology': ['Molecular Biology', 'Biochemistry', 'Evolution'],
    'Technical Drawing': ['Engineering Drawing', 'CAD Basics', 'Blueprint Reading'],
    'Geography': ['Geographic Information Systems', 'Climate Change', 'Urban Geography'],
    'History': ['Modern World History', 'African History', 'Ethiopian History'],
    'Economics': ['Microeconomics', 'Macroeconomics', 'Development Economics'],
    'General Business': ['Business Management', 'Accounting', 'Marketing'],
  },
  12: {
    'Amharic': ['ሰዋሰው እና ጽሁፍ', 'አነባበብ እና ግጥም', 'ስነ-ጽሁፍ ትንታኔ'],
    'English': ['Advanced Essay Writing', 'Literature Review', 'Debate and Discussion'],
    'Mathematics': ['Calculus Basics', 'Probability', 'Statistics'],
    'Citizenship Education': ['Constitutional Law', 'Ethiopian Politics', 'Global Governance'],
    'Information Technology': ['Object-Oriented Programming', 'Database Management', 'Web Development'],
    'Health and Physical Education': ['Health Policy', 'Sports Psychology', 'Nutrition Science'],
    'Physics': ['Mechanics', 'Thermodynamics', 'Electromagnetism'],
    'Chemistry': ['Chemical Kinetics', 'Thermochemistry', 'Electrochemistry'],
    'Biology': ['Molecular Biology', 'Biochemistry', 'Evolution'],
    'Technical Drawing': ['Engineering Drawing', 'CAD Basics', 'Blueprint Reading'],
    'Geography': ['Geographic Information Systems', 'Climate Change', 'Urban Geography'],
    'History': ['Modern World History', 'African History', 'Ethiopian History'],
    'Economics': ['Microeconomics', 'Macroeconomics', 'Development Economics'],
    'General Business': ['Business Management', 'Accounting', 'Marketing'],
  },
};

// Helper to generate 5 questions per lesson
function generateQuestionsForLesson(subject: string, lessonTitle: string, index: number) {
  const baseQuestions = [
    {
      q: `What is the main concept covered in "${lessonTitle}"?`,
      options: ['Concept A', 'Concept B', 'Concept C', 'Concept D'],
      correct: 'Concept A',
      explanation: 'The main concept is Concept A, which is foundational.',
    },
    {
      q: `Which statement best describes ${subject}?`,
      options: ['Statement 1', 'Statement 2', 'Statement 3', 'Statement 4'],
      correct: 'Statement 1',
      explanation: 'Statement 1 accurately describes the core idea.',
    },
    {
      q: `In ${subject}, what is the key principle?`,
      options: ['Principle X', 'Principle Y', 'Principle Z', 'Principle W'],
      correct: 'Principle X',
      explanation: 'Principle X is the fundamental rule.',
    },
    {
      q: `What is the significance of ${lessonTitle}?`,
      options: ['Significance 1', 'Significance 2', 'Significance 3', 'Significance 4'],
      correct: 'Significance 1',
      explanation: 'Significance 1 is the most important aspect.',
    },
    {
      q: `How does ${lessonTitle} relate to everyday life?`,
      options: ['Application 1', 'Application 2', 'Application 3', 'Application 4'],
      correct: 'Application 1',
      explanation: 'Application 1 is the most common real-world use.',
    },
  ];
  return baseQuestions.map((q, idx) => ({
    ...q,
    questionId: index + idx,
    options: JSON.stringify(q.options),
  }));
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

    // ---- 2. Create permissions and roles ----
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

    // ---- 3. Create admin user ----
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

    // ---- 4. Seed Grades, Subjects, Lessons, Quizzes, Questions ----
    console.log('📚 Seeding grades and content...');

    let gradeIdCounter = 1;
    let subjectIdCounter = 1;
    let lessonIdCounter = 1;
    let quizIdCounter = 1;
    let questionIdCounter = 1;

    for (const gradeLevel of Object.keys(curriculum).map(Number)) {
      // Create Grade
      const grade = await Grade.create({ gradeId: gradeIdCounter, level: gradeLevel });
      const currentGradeId = gradeIdCounter;
      gradeIdCounter++;

      const subjects = curriculum[gradeLevel];
      for (const [subjectName, lessonTitles] of Object.entries(subjects)) {
        // Create Subject
        const subject = await Subject.create({
          subjectId: subjectIdCounter,
          name: subjectName,
          gradeId: currentGradeId,
        });
        const currentSubjectId = subjectIdCounter;
        subjectIdCounter++;

        // Create Lessons
        for (const [idx, lessonTitle] of lessonTitles.entries()) {
          const lesson = await Lesson.create({
            lessonId: lessonIdCounter,
            title: lessonTitle,
            description: `Learn about ${lessonTitle} in ${subjectName}`,
            subjectId: currentSubjectId,
            gradeId: currentGradeId,
          });
          const currentLessonId = lessonIdCounter;
          lessonIdCounter++;

          // Generate 5 questions for this lesson
          const questionsData = generateQuestionsForLesson(subjectName, lessonTitle, questionIdCounter);
          const questionDocs = await Question.insertMany(
            questionsData.map(q => ({
              questionId: q.questionId,
              question: q.q,
              options: q.options,
              correct: q.correct,
              explanation: q.explanation,
              topic: subjectName,
            }))
          );
          const questionIds = questionDocs.map(q => q.questionId);
          questionIdCounter += questionsData.length;

          // Create a quiz for this lesson
          await Quiz.create({
            quizId: quizIdCounter,
            title: `${subjectName} Quiz – ${lessonTitle}`,
            lessonId: currentLessonId,
            timelimit: 10,
            difficulty: Math.floor(Math.random() * 3) + 1,
            questions: questionIds,
          });
          quizIdCounter++;
        }
      }
    }

    console.log('✅ Seed completed successfully!');
    console.log(`📊 Grades: ${gradeIdCounter - 1}`);
    console.log(`📚 Subjects: ${subjectIdCounter - 1}`);
    console.log(`📖 Lessons: ${lessonIdCounter - 1}`);
    console.log(`📝 Quizzes: ${quizIdCounter - 1}`);
    console.log(`❓ Questions: ${questionIdCounter - 1}`);
    console.log('👤 Admin user: admin@quizai.com / password: admin123');
    console.log('📋 Roles: admin, student');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
};

seed();
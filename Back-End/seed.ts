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
import Role from './models/Role';
import Permission from './models/Permission';
import RolePermission from './models/RolePermission';
import User from './models/User';
import Credentials from './models/Credentials';
import UserRole from './models/UserRole';
import { connectDB } from './config/db';

const seed = async () => {
  await connectDB();

  try {
    // Clear collections (optional)
    await Role.deleteMany({});
    await Permission.deleteMany({});
    await RolePermission.deleteMany({});
    await User.deleteMany({});
    await Credentials.deleteMany({});
    await UserRole.deleteMany({});

    // 1. Create permissions
    const permissions = [
      { name: 'manage_grades', resource: 'grade', action: 'create' },
      { name: 'manage_subjects', resource: 'subject', action: 'create' },
      { name: 'manage_lessons', resource: 'lesson', action: 'create' },
      { name: 'manage_quizzes', resource: 'quiz', action: 'create' },
      { name: 'manage_users', resource: 'user', action: 'read' },
      { name: 'view_reports', resource: 'report', action: 'read' },
    ];
    const createdPerms = await Permission.insertMany(permissions);

    // 2. Create roles
    const adminRole = await Role.create({ name: 'admin', description: 'Administrator' });
   // const teacherRole = await Role.create({ name: 'teacher', description: 'Teacher' });
    const studentRole = await Role.create({ name: 'student', description: 'Student' });

    // 3. Assign all permissions to admin
    for (const perm of createdPerms) {
      await RolePermission.create({ roleId: adminRole._id, permitId: perm._id });
    }

    // 4. Create admin user – all required fields must have non‑empty values
    const adminUser = await User.create({
      FName: 'Super',
      MName: 'Admin',           // ✅ non‑empty
      LName: 'Admin',
      gender: 'male',
      dateOfBirth: new Date('1990-01-01'),
      email: 'admin@quizai.com',
      status: 'active',
      PImage: [],
      // gradeId is not required, so we can omit it
    });

    // 5. Hash password and create credentials
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await Credentials.create({
      userId: adminUser._id,
      type: 'password',
      email: 'admin@quizai.com',
      secret: hashedPassword,
      loginAttempt: 0,
    });

    // 6. Assign admin role
    await UserRole.create({ userId: adminUser._id, roleId: adminRole._id });

    console.log('✅ Seed completed successfully!');
    console.log('👤 Admin user: admin@quizai.com / password: admin123');
    console.log('📋 Roles created: admin, student');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
};

seed();
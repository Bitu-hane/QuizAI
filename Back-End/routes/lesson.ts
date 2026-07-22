
// import express from 'express';
// import { getLessons } from '../Controller/lesson';
// import { protect } from '../middleware/auth';

// const router = express.Router();
// router.get('/', protect, getLessons);
// export default router;

import express from 'express';
import { getLessonsByGradeAndSubject } from '../Controller/lesson';
import { protect } from '../middleware/auth';

const router = express.Router();

// ✅ This should be the route
router.get('/', getLessonsByGradeAndSubject);

export default router;
const express = require('express');
const {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getProjectById,
  getProjectBySlug
} = require('../controllers/project.controller');

const protect = require('../middlewares/auth.middleware');

const router = express.Router();

// All routes are protected and require authentication
router.use(protect);

// List + Create
router.route('/')
  .get(getProjects)
  .post(createProject);

// 🔥 Fetch by slug (preferred, SEO-friendly)
router.get('/slug/:slug', getProjectBySlug);

// ✅ Fallback: Fetch by ObjectId (legacy support)
router.route('/:id')
  .get(getProjectById)
  .put(updateProject)
  .delete(deleteProject);

module.exports = router;

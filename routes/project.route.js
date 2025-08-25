const express = require('express');
const {
    getProjects,
    createProject,
    updateProject,
    deleteProject,
    getProject
} = require('../controllers/project.controller');

const protect = require('../middlewares/auth.middleware');


const router = express.Router();

// All routes are protected and require authentication
router.use(protect);

router.route('/')
    .get(getProjects)
    .post(createProject);

router.route('/:id')
    .get(getProject)
    .put(updateProject)
    .delete(deleteProject);

module.exports = router;
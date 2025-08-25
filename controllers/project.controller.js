const Project = require('../models/project.model');

const getProjects = async (req, res) => {

    try {
        
        const projects = await Project.findOne({ user: req.user.id});

        res.status(200).json({
            success: true,
            count: projects.length,
            data: projects
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}

const getProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        
        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }
        
        // Make sure user owns the project
        if (project.user.toString() !== req.user.id) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to access this project'
            });
        }
        
        res.status(200).json({
            success: true,
            data: project
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid project ID'
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

const createProject = async (req, res) => {
    try {
        
        const { projectName, projectDesc } = req.body;

        const project = await Project.create({
            projectName,
            projectDesc,
            user: req.user.id
        });
        res.status(201).json({
            success: true,
            data: project
        })
    } catch (error) {
         res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
}

const updateProject = async (req, res) => {
    try {
        // First find the project to check ownership
        let project = await Project.findById(req.params.id);
        
        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }
        
        // Make sure user owns the project
        if (project.user.toString() !== req.user.id) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to update this project'
            });
        }
        
        // Use findByIdAndUpdate for simplicity
        project = await Project.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { 
                new: true,
                runValidators: true 
            }
        );
        
        res.status(200).json({
            success: true,
            data: project
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid project ID'
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

const deleteProject = async (req, res) => {

  try {
        const project = await Project.findById(req.params.id);
        
        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }
        
        // Make sure user owns the project
        if (project.user.toString() !== req.user.id) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to delete this project'
            });
        }
        
        await Project.findByIdAndDelete(req.params.id);
        
        res.status(200).json({
            success: true,
            message: 'Project deleted successfully',
            data: {}
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid project ID'
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
}


module.exports = { getProject, getProjects, createProject, updateProject, deleteProject};

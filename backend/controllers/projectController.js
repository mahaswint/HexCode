const User = require('../models/userModel'); 
const Project = require('../models/projectModel');
exports.addProject = async (req, res) => {
    try {
        const { pid } = req.params; // The parent ID (if applicable) from request params
        const { name, users, owner, visibility, messages } = req.body;

        // Validate required fields
        if (!name || !users || !owner) {
            return res.status(400).json({ error: 'Name, users, and owner are required fields' });
        }

        // Create a new project instance with the incoming data
        const project = new Project({
            name,
            users,
            owner,
            visibility,
            messages,
            // Add the parentId from the request params
        });

        // Save the new project to the database
        await project.save();
        res.status(201).json(project); // Return the created project in the response
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.editProject = async (req, res) => {
    try {
        const { pid } = req.params; // The project ID from request params
        const updates = req.body;

        // Find and update the project
        const project = await Project.findByIdAndUpdate(pid, updates, { new: true });

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        res.status(200).json(project); // Return the updated project
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteProject = async (req, res) => {
    try {
        const { pid } = req.params; // The project ID from request params

        // Find and delete the project
        const project = await Project.findByIdAndDelete(pid);

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAllProjects = async (req, res) => {
    try {
        console.log("hit aagaya ");
        const projects = await Project.find({ visibility: true });

        if (!projects || projects.length === 0) {
            return res.status(404).json({ error: 'No visible projects found' });
        }

        res.status(200).json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};





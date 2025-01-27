import React from "react";
import Projectlist from "./components/project";
const projects=[
    {
        title: "AI Chat Assistant",
        id: "#PRJ-001",
        description:
            "A sophisticated chatbot powered by machine learning, capable of natural conversations and task assistance.",
        tags: ["Python", "TensorFlow", "Flask"],
    },
    
    {
        title: "Weather Dashboard",
        id: "#PRJ-003",
        description:
            "Real-time weather tracking application with interactive maps and forecast predictions.",
        tags: ["JavaScript", "Weather API", "Chart.js"],
    },
    {
        title: "Social Media Analytics",
        id: "#PRJ-004",
        description:
            "Analytics dashboard for tracking social media engagement and audience insights.",
        tags: ["React", "Firebase", "D3.js"],
    },
    {
        title: "Task Management App",
        id: "#PRJ-005",
        description:
            "Collaborative task management tool with real-time updates and team features.",
        tags: ["Vue.js", "Express", "PostgreSQL"],
    },
    {
        title: "AI Chat Assistant",
        id: "#PRJ-001",
        description:
            "A sophisticated chatbot powered by machine learning, capable of natural conversations and task assistance.",
        tags: ["Python", "TensorFlow", "Flask"],
    },
    {
        title: "E-Commerce Platform",
        id: "#PRJ-002",
        description:
            "Full-stack e-commerce solution with real-time inventory management and payment processing.",
        tags: ["React", "Node.js", "MongoDB"],
    },
    {
        title: "E-Commerce Platform",
        id: "#PRJ-002",
        description:
            "Full-stack e-commerce solution with real-time inventory management and payment processing.",
        tags: ["React", "Node.js", "MongoDB"],
    },
    {
        title: "Weather Dashboard",
        id: "#PRJ-003",
        description:
            "Real-time weather tracking application with interactive maps and forecast predictions.",
        tags: ["JavaScript", "Weather API", "Chart.js"],
    },
    {
        title: "Social Media Analytics",
        id: "#PRJ-004",
        description:
            "Analytics dashboard for tracking social media engagement and audience insights.",
        tags: ["React", "Firebase", "D3.js"],
    },
    {
        title: "Task Management App",
        id: "#PRJ-005",
        description:
            "Collaborative task management tool with real-time updates and team features.",
        tags: ["Vue.js", "Express", "PostgreSQL"],
    },
    {
        title: "AI Chat Assistant",
        id: "#PRJ-001",
        description:
            "A sophisticated chatbot powered by machine learning, capable of natural conversations and task assistance.",
        tags: ["Python", "TensorFlow", "Flask"],
    },
    {
        title: "E-Commerce Platform",
        id: "#PRJ-002",
        description:
            "Full-stack e-commerce solution with real-time inventory management and payment processing.",
        tags: ["React", "Node.js", "MongoDB"],
    },
    {
        title: "Weather Dashboard",
        id: "#PRJ-003",
        description:
            "Real-time weather tracking application with interactive maps and forecast predictions.",
        tags: ["JavaScript", "Weather API", "Chart.js"],
    },
    {
        title: "Social Media Analytics",
        id: "#PRJ-004",
        description:
            "Analytics dashboard for tracking social media engagement and audience insights.",
        tags: ["React", "Firebase", "D3.js"],
    },
    {
        title: "Task Management App",
        id: "#PRJ-005",
        description:
            "Collaborative task management tool with real-time updates and team features.",
        tags: ["Vue.js", "Express", "PostgreSQL"],
    },
    {
        title: "AI Chat Assistant",
        id: "#PRJ-001",
        description:
            "A sophisticated chatbot powered by machine learning, capable of natural conversations and task assistance.",
        tags: ["Python", "TensorFlow", "Flask"],
    },
    {
        title: "E-Commerce Platform",
        id: "#PRJ-002",
        description:
            "Full-stack e-commerce solution with real-time inventory management and payment processing.",
        tags: ["React", "Node.js", "MongoDB"],
    },
    {
        title: "Weather Dashboard",
        id: "#PRJ-003",
        description:
            "Real-time weather tracking application with interactive maps and forecast predictions.",
        tags: ["JavaScript", "Weather API", "Chart.js"],
    },
    {
        title: "Social Media Analytics",
        id: "#PRJ-004",
        description:
            "Analytics dashboard for tracking social media engagement and audience insights.",
        tags: ["React", "Firebase", "D3.js"],
    },
    {
        title: "Task Management App",
        id: "#PRJ-005",
        description:
            "Collaborative task management tool with real-time updates and team features.",
        tags: ["Vue.js", "Express", "PostgreSQL"],
    },
]
const Profile = () => {
    return (
        <div className="text-white  p-8 h-full w-full">
            <div className="max-w-7xl mx-auto">
                {/* Profile Section */}
                <div className="flex gap-8">
                    {/* Profile Info */}
                    <div className="bg-[#1e293b] p-6 rounded-lg fixed h-[75vh] shadow-md w-1/4 ">
                        <div className="bg-gray-700 w-[20vw] h-[40vh] mx-auto rounded-lg shadow-lg flex items-center justify-center">
                            
                        </div>
                        <h2 className="text-xl text-center mt-4 font-bold">Rohan Shaw</h2>
                        <p className="text-center text-[#94a3b8]">@rohan_codes</p>
                        <h3 className="text-lg font-semibold mt-6">Skills</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {["Python", "Java", "MongoDB", "React", "Node.js"].map((skill, index) => (
                                <span
                                    key={index}
                                    className="bg-blue-500 text-sm px-3 py-1 rounded-full text-white"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                        {/* <h3 className="text-lg font-semibold mt-6">Projects</h3>
                        <p className="text-4xl text-center font-bold mt-2">47</p> */}
                    </div>

                    {/* Projects Section */}
                    <Projectlist projects={projects} />
                </div>
            </div>
        </div>
    );
};

export default Profile;

import React, { useEffect, useState } from "react";
import axios from "axios"; // Ensure axios is imported
import Projectlist from "./components/project";

const Profile = () => {
    const [user, setUser] = useState(null); // State to hold authenticated user data
    const [projects, setProjects] = useState([]); // State to hold projects data
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [error, setError] = useState(null); // State to capture errors
  
    // Function to fetch user data
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5000/user/my", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include credentials for session management
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
  
        const data = await response.json();
        setUser(data); // Set the fetched user data
      } catch (err) {
        setError(err.message); // Capture and set the error
      } finally {
        setLoading(false); // Set loading to false
      }
    };
  
    // console.log("baby");
    // console.log(user);
    const getAllProjects = async (userId) => {
      try {
        const response = await fetch(`http://localhost:5000/user/my/project`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include credentials for session management
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
  
        const data = await response.json();
        setProjects(data); // Set the fetched projects
      } catch (err) {
        setError(err.message); // Capture and set the error
      }
    };
  
    // Fetch user data on component mount
    useEffect(() => {
      fetchUserData();
    }, []);
  
    // Fetch projects when user data is available
    useEffect(() => {
      if (user) {
        getAllProjects(user._id); // Pass user ID to fetch projects
      }
    }, [user]);
  return (
    <div className="bg-[#0f172a] text-white p-8 h-full w-full">
      <div className="max-w-7xl mx-auto">
        {/* Profile Section */}
        <div className="flex gap-8">
          {/* Profile Info */}
          <div className="bg-[#1e293b] p-6 rounded-lg fixed h-[75vh] shadow-md w-1/4">
            <div className="bg-gray-700 w-[20vw] h-[40vh] mx-auto rounded-lg shadow-lg flex items-center justify-center"></div>
            <h2 className="text-xl text-center mt-4 font-bold">
              {user ? user.name : "Loading..."}
            </h2>
            <p className="text-center text-[#94a3b8]">
              {user ? `@${user.username}` : ""}
            </p>
            <h3 className="text-lg font-semibold mt-6">Skills</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {["Python", "Java", "MongoDB", "React", "Node.js"].map(
                (skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-500 text-sm px-3 py-1 rounded-full text-white"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Projects Section */}
          <div className="ml-[26vw] w-full">
            {loading ? (
              <p className="text-center">Loading projects...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : (
              <Projectlist projects={projects} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

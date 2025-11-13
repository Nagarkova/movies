import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import type { Route } from "./+types/main";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Main - React Movie Hooks" },
    { name: "description", content: "Main page" },
  ];
}

export default function Main() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState({ firstName: "", lastName: "" });

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');
    
    if (!authToken || !userData) {
      navigate('/signup');
      return;
    }

    try {
      const user = JSON.parse(userData);
      setUserName({
        firstName: user.firstName,
        lastName: user.lastName,
      });
      console.log("User loaded:", user);
    } catch (error) {
      console.error("Error loading user data:", error);
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      navigate('/signup');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">
          Welcome, {userName.firstName} {userName.lastName}!
        </h1>
      </div>
    </div>
  );
}


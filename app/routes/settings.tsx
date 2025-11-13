import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import type { Route } from "./+types/settings";

const API_URL = "http://localhost:5001/api";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Settings - React Movie Hooks" },
    { name: "description", content: "User settings and profile" },
  ];
}

interface UserData {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export default function Settings() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const userDataStr = localStorage.getItem('user');
    
    if (!authToken || !userDataStr) {
      navigate('/signup');
      return;
    }

    try {
      const user = JSON.parse(userDataStr);
      setUserData(user);
    } catch (error) {
      console.error("Error loading user data:", error);
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      navigate('/signup');
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/signup');
  };

  const handleBackToMain = () => {
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!userData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <button
              onClick={handleBackToMain}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Back to Movies
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
                <span className="text-3xl font-bold text-blue-600">
                  {userData.firstName[0]}{userData.lastName[0]}
                </span>
              </div>
              <div className="text-white">
                <h2 className="text-2xl font-bold">
                  {userData.firstName} {userData.lastName}
                </h2>
                <p className="text-blue-100">{userData.email}</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Profile Information
            </h3>

            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  User ID
                </label>
                <p className="text-gray-900 font-mono text-sm">{userData._id}</p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  First Name
                </label>
                <p className="text-gray-900 text-lg">{userData.firstName}</p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Last Name
                </label>
                <p className="text-gray-900 text-lg">{userData.lastName}</p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Email Address
                </label>
                <p className="text-gray-900 text-lg">{userData.email}</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Account Actions
              </h3>
              <div className="flex gap-4">
                <button
                  onClick={handleLogout}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-200 font-medium"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="text-sm font-semibold text-blue-900 mb-1">
                Profile Information
              </h4>
              <p className="text-sm text-blue-800">
                Your profile information is stored securely. To update your details, please contact support.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


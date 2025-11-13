import { useState } from "react";
import { useNavigate } from "react-router";
import type { Route } from "./+types/login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login - React Movie Hooks" },
    { name: "description", content: "Login to your account" },
  ];
}

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log('handleChange', name, value);
    const updatedFormData = {
      ...formData,
      [name]: value,
    };
    
    setFormData(updatedFormData);
    localStorage.setItem('loginData', JSON.stringify(updatedFormData));
    console.log('Login Data Updated:', updatedFormData);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    validateField(name);
  };

  const validateField = (fieldName: string) => {
    const newErrors: Record<string, string> = { ...errors };

    switch (fieldName) {
      case "email":
        if (!formData.email.trim()) {
          newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = "Email is not valid";
        } else {
          delete newErrors.email;
        }
        break;

      case "password":
        if (!formData.password) {
          newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
          newErrors.password = "Password must be at least 8 characters";
        } else {
          delete newErrors.password;
        }
        break;
    }

    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email is not valid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log("=== LOGIN SUBMITTED ===");
      console.log("Login Data:", formData);
      console.log("Email:", formData.email);
      console.log("Password:", formData.password);
      
      const storedCredentials = localStorage.getItem('userCredentials');
      
      if (!storedCredentials) {
        alert("No account found. Please sign up first.");
        console.log("No user credentials found in localStorage");
        return;
      }
      
      try {
        const credentials = JSON.parse(storedCredentials);
        console.log("Stored credentials:", credentials);
        
        if (credentials.email === formData.email && credentials.password === formData.password) {
          console.log("=== LOGIN SUCCESSFUL ===");
          alert(`Welcome back, ${credentials.firstName}!`);
          localStorage.removeItem('loginData');
          navigate('/');
        } else {
          console.log("=== LOGIN FAILED ===");
          alert("Invalid email or password. Please try again.");
          setErrors({
            email: "Invalid credentials",
            password: "Invalid credentials",
          });
        }
      } catch (error) {
        console.error("Error parsing stored credentials:", error);
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">Login to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 rounded-lg border text-gray-900 ${
                  touched.email && errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-purple-500"
                } focus:ring-2 focus:border-transparent transition duration-200 outline-none`}
                placeholder="john.doe@example.com"
              />
              {touched.email && errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 rounded-lg border text-gray-900 ${
                  touched.password && errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-purple-500"
                } focus:ring-2 focus:border-transparent transition duration-200 outline-none`}
                placeholder="••••••••"
              />
              {touched.password && errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>
              <a
                href="#"
                className="text-sm text-purple-600 hover:text-purple-700 font-medium"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transform transition duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>

        <p className="text-center text-white text-sm mt-6 opacity-90">
          Protected by industry-standard encryption
        </p>
      </div>
    </div>
  );
}


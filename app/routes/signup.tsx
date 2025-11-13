import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import type { Route } from "./+types/signup";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sign Up - React Movie Hooks" },
    { name: "description", content: "Create your account" },
  ];
}

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    localStorage.setItem('formData', JSON.stringify(updatedFormData));
    console.log('Form Data Updated:', updatedFormData);
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
      case "firstName":
        if (!formData.firstName.trim()) {
          newErrors.firstName = "First name is required";
        } else if (!/^[a-zA-Z]+$/.test(formData.firstName.trim())) {
          newErrors.firstName = "First name must contain only letters";
        } else if (formData.firstName.trim().length < 1) {
          newErrors.firstName = "First name must contain at least one character";
        } else {
          delete newErrors.firstName;
        }
        break;

      case "lastName":
        if (!formData.lastName.trim()) {
          newErrors.lastName = "Last name is required";
        } else if (!/^[a-zA-Z]+$/.test(formData.lastName.trim())) {
          newErrors.lastName = "Last name must contain only letters";
        } else if (formData.lastName.trim().length < 1) {
          newErrors.lastName = "Last name must contain at least one character";
        } else {
          delete newErrors.lastName;
        }
        break;

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
        if (touched.confirmPassword && formData.confirmPassword) {
          if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Password is not the same that you have in the previous field";
          } else {
            delete newErrors.confirmPassword;
          }
        }
        break;

      case "confirmPassword":
        if (!formData.confirmPassword) {
          newErrors.confirmPassword = "Please confirm your password";
        } else if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = "Password is not the same that you have in the previous field";
        } else {
          delete newErrors.confirmPassword;
        }
        break;
    }

    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.trim().length < 1) {
      newErrors.firstName = "First name must contain at least one character";
    } else if (!/^[a-zA-Z]+$/.test(formData.firstName.trim())) {
      newErrors.firstName = "First name must contain only letters";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (formData.lastName.trim().length < 1) {
      newErrors.lastName = "Last name must contain at least one character";
    } else if (!/^[a-zA-Z]+$/.test(formData.lastName.trim())) {
      newErrors.lastName = "Last name must contain only letters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log("=== FORM SUBMITTED SUCCESSFULLY ===");
      console.log("Form Data:", formData);
      console.log("First Name:", formData.firstName);
      console.log("Last Name:", formData.lastName);
      console.log("Email:", formData.email);
      console.log("Password:", formData.password);
      console.log("Confirm Password:", formData.confirmPassword);
      console.log("===================================");
      
      const userCredentials = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      };
      localStorage.setItem('userCredentials', JSON.stringify(userCredentials));
      localStorage.removeItem('formData');
      alert("Registration successful! Please login with your credentials.");
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create Account
            </h1>
            <p className="text-gray-600">Join today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 rounded-lg border text-gray-900 ${
                  touched.firstName && errors.firstName
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                } focus:ring-2 focus:border-transparent transition duration-200 outline-none`}
                placeholder="John"
              />
              {touched.firstName && errors.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 rounded-lg border text-gray-900 ${
                  touched.lastName && errors.lastName
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                } focus:ring-2 focus:border-transparent transition duration-200 outline-none`}
                placeholder="Doe"
              />
              {touched.lastName && errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
              )}
            </div>

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
                    : "border-gray-300 focus:ring-blue-500"
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
                    : "border-gray-300 focus:ring-blue-500"
                } focus:ring-2 focus:border-transparent transition duration-200 outline-none`}
                placeholder="••••••••"
              />
              {touched.password && errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 rounded-lg border text-gray-900 ${
                  touched.confirmPassword && errors.confirmPassword
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                } focus:ring-2 focus:border-transparent transition duration-200 outline-none`}
                placeholder="••••••••"
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>

        <p className="text-center text-white text-sm mt-6 opacity-90">
          By creating an account, you agree to our Terms of Service and Privacy
          Policy
        </p>
      </div>
    </div>
  );
}


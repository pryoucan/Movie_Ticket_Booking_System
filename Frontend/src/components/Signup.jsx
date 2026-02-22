import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export function Signup({ API_BASE_URL }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/register`, {
                username,
                email,
                password
            });
            console.log(response.data);
            navigate("/login");
        }
        catch (error) {
            console.log(error.response);
            setError(error.response?.data?.message || "Something went wrong");
        }
    }

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full p-8 rounded-md">
                <div className="mb-8 text-center">
                    <h2 className="text-2xl font-semibold text-slate-900 tracking-tight">Create an account</h2>
                    <p className="mt-2 text-sm text-slate-500">Sign up to get started.</p>
                </div>
                
                <form className="space-y-5" onSubmit={handleRegister}>
                    <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-slate-900" htmlFor="username">Username</label>
                        <input 
                            id="username"
                            type="text" 
                            placeholder="Enter your username"
                            required
                            className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm placeholder-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 shadow-sm transition-colors"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-slate-900" htmlFor="email">Email</label>
                        <input 
                            id="email"
                            type="email" 
                            placeholder="Enter your email address"
                            required
                            className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm placeholder-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 shadow-sm transition-colors"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    
                    <div className="space-y-1.5 relative">
                        <label className="block text-sm font-medium text-slate-900" htmlFor="password">Password</label>
                        <div className="relative">
                            <input 
                                id="password"
                                type={showPassword ? "text" : "password"} 
                                placeholder="Create a password"
                                required
                                className="block w-full rounded-md border border-slate-300 px-3 py-2 pr-10 text-sm placeholder-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 shadow-sm transition-colors"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 focus:outline-none"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4" aria-hidden="true" />
                                ) : (
                                    <Eye className="h-4 w-4" aria-hidden="true" />
                                )}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="rounded-md">
                            <p className="text-sm font-medium text-red-800">{error}</p>
                        </div>
                    )}
                    
                    <div className="flex justify-center">
                        <button 
                            type="submit" 
                            className="inline-flex justify-center items-center rounded-md bg-emerald-600 px-6 py-2 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 shadow-sm transition-colors"
                        >
                            Register
                        </button>
                    </div>
                    
                    <div className="text-center mt-4">
                        <a href="/login" className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors">
                            Already have an account? Login
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}
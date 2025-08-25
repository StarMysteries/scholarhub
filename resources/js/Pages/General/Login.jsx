import { Link } from 'react-router-dom';

// Hooks
import useLogin from '../../hooks/useLogin';
import { useCheckLogin } from '../../hooks/useCheckLogin';

function Login() {
    useCheckLogin();
    const { email, setEmail, password, setPassword, error, handleSubmit } = useLogin();

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full border-t-4 border-green-600">
                <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

                {/* Error Message */}
                {error &&
                    <div className="bg-red-500 text-white p-4 rounded-lg text-center mb-4">
                        {error}
                    </div>
                }

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>

                    <div className="text-right">
                        {/* Updated link for forgot password */}
                        <Link to="/forgot_password" className="text-green-900 hover:underline text-sm">
                            Forgot password?
                        </Link>
                    </div>

                    <div>
                        <button type="submit" className="w-full bg-green-900 text-white py-2 rounded-lg hover:bg-teal-700">
                            Login
                        </button>
                    </div>
                </form>

                <div className="text-center mt-4">
                    <p className="text-gray-600 text-sm">
                        Don't have an account?
                        <Link to="/signup" className="ml-1 text-green-900 hover:underline">Signup</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
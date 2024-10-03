import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    
    const handleAdminClick = () => {
        navigate('/adminHome');
    };

    const handleSalesRepClick = () => {
        navigate('/salesHome');
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-teal-500">
            <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full text-center">
                <h2 className="text-2xl font-bold mb-8">Welcome! Choose Your Role</h2>
                <div className="flex flex-col space-y-4">
                    <button
                        onClick={handleAdminClick}
                        className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Continue as Admin
                    </button>
                    <button
                        onClick={handleSalesRepClick}
                        className="bg-teal-600 text-white py-3 px-6 rounded-lg hover:bg-teal-700 transition duration-300"
                    >
                        Continue as Sales Representative
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;

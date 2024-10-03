import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from './routes';

const queryClient = new QueryClient();

function App() {
    return (
        <div>
            <QueryClientProvider client={queryClient}>
                <div className="min-h-screen bg-gray-100">
                    <AppRoutes />
                </div>
            </QueryClientProvider>
        </div>
    );
}

export default App;
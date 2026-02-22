export function Header() {
    return (
        <header className="bg-white border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <a href="/" className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 rounded-sm transition-shadow">
                            <div className="h-8 w-8 rounded-md bg-emerald-600 flex items-center justify-center shadow-sm">
                                <span className="text-white font-bold text-sm leading-none">EB</span>
                            </div>
                            <span className="text-xl font-semibold text-slate-900 tracking-tight">
                                Easy Booking
                            </span>
                        </a>
                    </div>
                    <nav className="flex items-center space-x-2">
                        <a 
                            href="/login" 
                            className="text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600"
                        >
                            Log in
                        </a>
                        <a 
                            href="/register" 
                            className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
                        >
                            Sign up
                        </a>
                    </nav>
                </div>
            </div>
        </header>
    );
}
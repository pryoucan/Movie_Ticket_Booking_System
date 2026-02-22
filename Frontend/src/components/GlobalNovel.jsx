import { useState, useEffect } from "react";
import axios from "axios";

export default function GlobalMovie({ API_BASE_URL }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/movies`);
                console.log(response.data);
                setData(response.data.data);
            }
            catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        handleData();
    }, [API_BASE_URL]);

    if (loading) {
        return (
            <div className="flex h-[calc(100vh-4rem)] items-center justify-center bg-slate-50">
                <div className="text-slate-500 text-sm font-medium">Loading movies...</div>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-[1440px] mx-auto">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Movies</h1>
                        <p className="mt-1 text-sm text-slate-500">Browse the latest releases and catalog.</p>
                    </div>
                </div>

                {data.length === 0 ? (
                    <div className="rounded-md border border-slate-200 bg-white p-12 text-center shadow-sm">
                        <h3 className="text-sm font-medium text-slate-900">No movies found</h3>
                        <p className="mt-1 text-sm text-slate-500">Get started by creating a new movie entry.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 lg:gap-6">
                        {data.map((movie) => (
                            <div 
                                key={movie._id || movie.title} 
                                className="group flex flex-col overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:border-slate-300"
                            >
                                <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-100 border-b border-slate-100">
                                    {movie.coverImage ? (
                                        <img 
                                            src={movie.coverImage} 
                                            alt={movie.title}
                                            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                                            <span className="text-[10px] font-medium uppercase tracking-widest">No Cover</span>
                                        </div>
                                    )}
                                    {movie.pgRating && (
                                        <div className="absolute top-2 right-2 rounded-sm bg-slate-900/80 px-1.5 py-0.5 backdrop-blur-sm">
                                            <span className="text-[9px] font-bold text-white leading-none">{movie.pgRating}</span>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="flex flex-1 flex-col p-4">
                                    <div className="mb-2 flex items-start justify-between gap-2">
                                        <h3 className="text-sm font-semibold text-slate-900 leading-tight line-clamp-2">
                                            {movie.title}
                                        </h3>
                                    </div>
                                    
                                    <div className="mb-3 flex flex-wrap gap-1.5">
                                        {movie.genre?.slice(0, 2).map((g) => (
                                            <span key={g} className="inline-flex items-center rounded-sm bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600">
                                                {g}
                                            </span>
                                        ))}
                                    </div>
                                    
                                    <p className="mt-auto text-xs text-slate-500 line-clamp-3">
                                        {movie.synopsis || "No description available."}
                                    </p>
                                    
                                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                                        <span className="text-[10px] font-medium text-slate-500">
                                            {movie.duration || "--"}
                                        </span>
                                        {movie.releaseDate && (
                                            <span className="text-[10px] text-slate-500 group-hover:text-emerald-600 transition-colors">
                                                {new Date(movie.releaseDate).getFullYear()}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
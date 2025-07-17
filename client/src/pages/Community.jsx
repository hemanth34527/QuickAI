import { useAuth, useUser } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Community = () => {
    const [creations, setCreations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [visibleText, setVisibleText] = useState({});

    const { user } = useUser();
    const { getToken } = useAuth();

    const fetchCreations = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('/api/user/get-published-creations', {
                headers: { Authorization: `Bearer ${await getToken()}` }
            });
            if (data.success) {
                setCreations(data.creations);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
        setLoading(false);
    };

    const handleLike = async (id, index) => {
        const userIdStr = user.id.toString();
        const updatedCreations = [...creations];
        const currentLikes = updatedCreations[index].likes || [];

        const alreadyLiked = currentLikes.includes(userIdStr);
        updatedCreations[index].likes = alreadyLiked
            ? currentLikes.filter((uid) => uid !== userIdStr)
            : [...currentLikes, userIdStr];

        setCreations(updatedCreations); // Optimistic update

        try {
            await axios.post(
                '/api/user/get-like-creations',
                { id },
                {
                    headers: {
                        Authorization: `Bearer ${await getToken()}`,
                    },
                }
            );
        } catch (error) {
            toast.error("Failed to update like");
            fetchCreations();
        }
    };

    const togglePrompt = (index) => {
        setVisibleText((prev) => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    useEffect(() => {
        if (user) {
            fetchCreations();
        }
    }, [user]);

    return (
        <div className="flex-1 h-full flex flex-col gap-4 p-6">
            <h1 className="text-xl font-semibold text-slate-800">Creations</h1>

            <div className="bg-white h-full w-full rounded-xl overflow-y-scroll p-4">
                {loading ? (
                    <div className="text-center text-gray-500">Loading...</div>
                ) : creations.length === 0 ? (
                    <div className="text-center text-gray-500">No creations published yet.</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {creations.map((creation, index) => (
                            <div
                                key={index}
                                className="relative rounded-lg overflow-hidden border shadow-sm cursor-pointer"
                                onClick={() => togglePrompt(index)}
                            >
                                {/* Image */}
                                <img
                                    src={creation.content || '/fallback.png'}
                                    alt="creation"
                                    className="w-full h-64 object-cover"
                                    onError={(e) => (e.target.style.display = 'none')}
                                />

                                {/* Like Button (always visible) */}
                                <div className="absolute top-3 right-3 bg-black/60 text-white px-2 py-1 rounded-md flex items-center gap-1 z-10">
                                    <p className="text-sm">{creation.likes?.length || 0}</p>
                                    <Heart
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleLike(creation.id, index);
                                        }}
                                        className={`w-5 h-5 cursor-pointer transition-all ${
                                            user && Array.isArray(creation.likes) && creation.likes.includes(user.id)
                                                ? 'fill-red-500 text-red-500'
                                                : 'text-white hover:text-red-500'
                                        }`}
                                    />
                                </div>

                                {/* Prompt (bottom of image, inside) */}
                                {visibleText[index] && (
                                    <div className="absolute bottom-0 left-0 w-full bg-black/70 text-white text-sm p-2">
                                        {creation.prompt}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Community;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPlaylist, setError } from '../../utils/playlistSlice';
import { MdClose } from 'react-icons/md';

function CreatePlaylistModal({ isOpen, onClose }) {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(state => state.auth);
    
    const [formData, setFormData] = useState({
        playlistName: "",
        description: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setErrorMsg] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrorMsg("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.playlistName.trim()) {
            setErrorMsg("Playlist name is required");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("http://localhost:8000/api/v1/playlists/create", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    playlistName: formData.playlistName.trim(),
                    description: formData.description.trim()
                })
            });

            const data = await response.json();

            if (response.ok && data.data) {
                dispatch(addPlaylist(data.data));
                setFormData({ playlistName: "", description: "" });
                onClose();
            } else {
                throw new Error(data.message || "Failed to create playlist");
            }
        } catch (error) {
            const errorMsg = error.message || "Error creating playlist";
            setErrorMsg(errorMsg);
            dispatch(setError(errorMsg));
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
            <div className='bg-slate-800 rounded-lg shadow-lg max-w-md w-full p-6 relative'>
                <button
                    onClick={onClose}
                    className='absolute top-4 right-4 text-gray-400 hover:text-white'
                >
                    <MdClose size={24} />
                </button>

                <h2 className='text-2xl font-bold text-white mb-4'>Create New Playlist</h2>

                {error && (
                    <div className='mb-4 p-3 bg-red-500 text-white rounded'>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div>
                        <label className='block text-white text-sm font-bold mb-2'>
                            Playlist Name
                        </label>
                        <input
                            type="text"
                            name="playlistName"
                            value={formData.playlistName}
                            onChange={handleChange}
                            placeholder="Enter playlist name"
                            className='w-full px-3 py-2 text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>

                    <div>
                        <label className='block text-white text-sm font-bold mb-2'>
                            Description (Optional)
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe your playlist"
                            rows="3"
                            className='w-full px-3 py-2 text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>

                    <div className='flex gap-3 pt-4'>
                        <button
                            type="button"
                            onClick={onClose}
                            className='flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded font-semibold transition'
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className='flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 text-white rounded font-semibold transition'
                        >
                            {loading ? "Creating..." : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreatePlaylistModal;

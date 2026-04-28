import React, { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';

function AddToPlaylistModal({ isOpen, onClose, songId, songName }) {
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [addingTo, setAddingTo] = useState(null);

    useEffect(() => {
        if (isOpen) {
            fetchUserPlaylists();
        }
    }, [isOpen]);

    const fetchUserPlaylists = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:8000/api/v1/playlists/my-playlists", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();

            if (response.ok && data.data) {
                setPlaylists(data.data);
            } else {
                throw new Error(data.message || "Failed to fetch playlists");
            }
        } catch (error) {
            console.log("Error fetching playlists:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToPlaylist = async (playlistId) => {
        setAddingTo(playlistId);
        try {
            const response = await fetch("http://localhost:8000/api/v1/playlists/add-song", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    playlistId: playlistId,
                    musicId: songId
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert(`Added "${songName}" to playlist!`);
                onClose();
            } else {
                throw new Error(data.message || "Failed to add song to playlist");
            }
        } catch (error) {
            alert(error.message || "Error adding song to playlist");
        } finally {
            setAddingTo(null);
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

                <h2 className='text-2xl font-bold text-white mb-4'>Add to Playlist</h2>
                <p className='text-gray-400 text-sm mb-4'>Adding: <span className='text-spotify-green font-semibold'>{songName}</span></p>

                {error && (
                    <div className='mb-4 p-3 bg-red-500 text-white rounded text-sm'>
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className='flex items-center justify-center py-8'>
                        <p className='text-gray-400'>Loading your playlists...</p>
                    </div>
                ) : playlists.length === 0 ? (
                    <div className='flex flex-col items-center justify-center py-8'>
                        <p className='text-gray-400 mb-4'>No playlists found</p>
                        <p className='text-gray-500 text-sm'>Create a playlist first to add songs</p>
                    </div>
                ) : (
                    <div className='space-y-2 max-h-64 overflow-y-auto'>
                        {playlists.map((playlist) => (
                            <button
                                key={playlist._id}
                                onClick={() => handleAddToPlaylist(playlist._id)}
                                disabled={addingTo === playlist._id}
                                className='w-full p-3 bg-slate-700 hover:bg-slate-600 disabled:bg-gray-500 rounded transition text-left'
                            >
                                <div className='flex justify-between items-center'>
                                    <div>
                                        <p className='text-white font-semibold text-sm'>{playlist.playlistName}</p>
                                        <p className='text-gray-400 text-xs'>{playlist.songs?.length || 0} songs</p>
                                    </div>
                                    {addingTo === playlist._id && (
                                        <span className='text-spotify-green text-xs font-semibold'>Adding...</span>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                )}

                <div className='mt-6'>
                    <button
                        onClick={onClose}
                        className='w-full px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded font-semibold transition'
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddToPlaylistModal;

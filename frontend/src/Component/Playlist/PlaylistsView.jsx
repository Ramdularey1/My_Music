import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPlaylists, setCurrentPlaylist, removePlaylist, setLoading, setError } from '../../utils/playlistSlice';
import { MdDelete, MdEdit } from 'react-icons/md';
import CreatePlaylistModal from './CreatePlaylistModal';
import PlaylistDetail from './PlaylistDetail';

function PlaylistsView() {
    const dispatch = useDispatch();
    const { playlists, loading } = useSelector(state => state.playlist);
    const { isAuthenticated } = useSelector(state => state.auth);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);

    useEffect(() => {
        if (isAuthenticated) {
            fetchUserPlaylists();
        }
    }, [isAuthenticated]);

    const fetchUserPlaylists = async () => {
        dispatch(setLoading(true));
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
                dispatch(setPlaylists(data.data));
            } else {
                throw new Error(data.message || "Failed to fetch playlists");
            }
        } catch (error) {
            console.log("Error fetching playlists:", error);
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleDeletePlaylist = async (playlistId) => {
        if (window.confirm("Are you sure you want to delete this playlist?")) {
            try {
                const response = await fetch(`http://localhost:8000/api/v1/playlists/${playlistId}`, {
                    method: "DELETE",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (response.ok) {
                    dispatch(removePlaylist(playlistId));
                    if (selectedPlaylist?._id === playlistId) {
                        setSelectedPlaylist(null);
                    }
                }
            } catch (error) {
                console.log("Error deleting playlist:", error);
            }
        }
    };

    if (selectedPlaylist) {
        return (
            <PlaylistDetail
                playlist={selectedPlaylist}
                onBack={() => setSelectedPlaylist(null)}
                onRefresh={fetchUserPlaylists}
            />
        );
    }

    return (
        <div className='min-h-screen bg-black p-6'>
            <div className='max-w-6xl mx-auto'>
                <div className='flex justify-between items-center mb-8'>
                    <h1 className='text-4xl font-bold text-white'>My Playlists</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className='px-6 py-2 bg-spotify-green hover:bg-green-500 text-black font-bold rounded-full transition'
                    >
                        + Create Playlist
                    </button>
                </div>

                <CreatePlaylistModal 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)}
                />

                {loading ? (
                    <div className='flex items-center justify-center h-64'>
                        <p className='text-gray-400 text-lg'>Loading playlists...</p>
                    </div>
                ) : playlists.length === 0 ? (
                    <div className='flex flex-col items-center justify-center h-64'>
                        <p className='text-gray-400 text-lg mb-4'>No playlists yet</p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className='px-6 py-2 bg-spotify-green hover:bg-green-500 text-black font-bold rounded-full transition'
                        >
                            Create Your First Playlist
                        </button>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {playlists.map((playlist) => (
                            <div
                                key={playlist._id}
                                className='bg-slate-800 rounded-lg overflow-hidden hover:bg-slate-700 transition cursor-pointer group'
                                onClick={() => setSelectedPlaylist(playlist)}
                            >
                                <div className='relative h-48 bg-gradient-to-br from-spotify-green to-spotify-darker'>
                                    {playlist.image && (
                                        <img
                                            src={playlist.image}
                                            alt={playlist.playlistName}
                                            className='w-full h-full object-cover'
                                        />
                                    )}
                                    <div className='absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition'></div>
                                </div>
                                <div className='p-4'>
                                    <h3 className='text-lg font-bold text-white truncate mb-2'>
                                        {playlist.playlistName}
                                    </h3>
                                    {playlist.description && (
                                        <p className='text-sm text-gray-400 line-clamp-2 mb-3'>
                                            {playlist.description}
                                        </p>
                                    )}
                                    <div className='flex justify-between items-center text-sm text-gray-400'>
                                        <span>{playlist.songs?.length || 0} songs</span>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeletePlaylist(playlist._id);
                                            }}
                                            className='text-red-500 hover:text-red-600 transition'
                                        >
                                            <MdDelete size={20} />
                                        </button>
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

export default PlaylistsView;

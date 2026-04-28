import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePlaylistInList } from '../../utils/playlistSlice';
import { updateCurrentSong } from '../../utils/currentMusicSlice';
import { MdArrowBack, MdDelete, MdAdd, MdPlayArrow } from 'react-icons/md';

function PlaylistDetail({ playlist, onBack, onRefresh }) {
    const dispatch = useDispatch();
    const allSongs = useSelector(store => store.allSongs.allSongs);
    const [currentPlaylist, setCurrentPlaylist] = useState(playlist);
    const [isAddingSong, setIsAddingSong] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleAddSong = async (musicId) => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:8000/api/v1/playlists/add-song", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    playlistId: currentPlaylist._id,
                    musicId: musicId
                })
            });

            const data = await response.json();

            if (response.ok && data.data) {
                // Update local state immediately for instant UI update
                setCurrentPlaylist(data.data);
                // Also update Redux state
                dispatch(updatePlaylistInList(data.data));
            } else {
                alert(data.message || "Failed to add song");
            }
        } catch (error) {
            console.log("Error adding song:", error);
            alert("Error adding song to playlist");
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveSong = async (musicId) => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:8000/api/v1/playlists/remove-song", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    playlistId: currentPlaylist._id,
                    musicId: musicId
                })
            });

            const data = await response.json();

            if (response.ok && data.data) {
                // Update local state immediately for instant UI update
                setCurrentPlaylist(data.data);
                // Also update Redux state
                dispatch(updatePlaylistInList(data.data));
            } else {
                alert(data.message || "Failed to remove song");
            }
        } catch (error) {
            console.log("Error removing song:", error);
            alert("Error removing song from playlist");
        } finally {
            setLoading(false);
        }
    };

    const handlePlaySong = (song) => {
        dispatch(updateCurrentSong(song));
    };

    const playlistSongIds = currentPlaylist.songs?.map(s => s._id || s) || [];
    const availableSongs = allSongs?.filter(song => !playlistSongIds.includes(song._id)) || [];

    return (
        <div className='min-h-screen bg-black p-6'>
            <div className='max-w-6xl mx-auto'>
                {/* Header */}
                <button
                    onClick={onBack}
                    className='flex items-center gap-2 text-spotify-green hover:text-green-400 font-semibold mb-6 transition'
                >
                    <MdArrowBack size={24} />
                    Back to Playlists
                </button>

                {/* Playlist Info */}
                <div className='bg-gradient-to-r from-spotify-green to-green-700 rounded-lg p-8 mb-8 text-black'>
                    <h1 className='text-4xl font-bold mb-2'>{currentPlaylist.playlistName}</h1>
                    {currentPlaylist.description && (
                        <p className='text-lg opacity-90'>{currentPlaylist.description}</p>
                    )}
                    <p className='text-sm mt-4 opacity-75'>{currentPlaylist.songs?.length || 0} songs</p>
                </div>

                {/* Two Column Layout */}
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                    {/* Playlist Songs */}
                    <div className='lg:col-span-2'>
                        <h2 className='text-2xl font-bold text-white mb-4'>Playlist Songs</h2>

                        {!currentPlaylist.songs || currentPlaylist.songs.length === 0 ? (
                            <div className='bg-slate-800 rounded-lg p-8 text-center'>
                                <p className='text-gray-400'>No songs in this playlist yet</p>
                            </div>
                        ) : (
                            <div className='space-y-2 h-[300px] overflow-y-auto'>
                                {currentPlaylist.songs.map((song) => (
                                    <div
                                        key={song._id}
                                        className='bg-slate-800 p-4 rounded-lg flex items-center justify-between hover:bg-slate-700 transition group'
                                    >
                                        <div
                                            className='flex-1 cursor-pointer'
                                            onClick={() => handlePlaySong(song)}
                                        >
                                            <div className='flex items-center gap-3'>
                                                <div className='opacity-0 group-hover:opacity-100 transition'>
                                                    <MdPlayArrow size={24} className='text-spotify-green' />
                                                </div>
                                                <div>
                                                    <h3 className='text-white font-semibold'>{song.musicName}</h3>
                                                    <p className='text-sm text-gray-400'>{song.singerName}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleRemoveSong(song._id)}
                                            disabled={loading}
                                            className='text-red-500 hover:text-red-600 transition ml-4'
                                        >
                                            <MdDelete size={20} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Add Songs */}
                    <div className='bg-slate-800 rounded-lg p-6 h-fit sticky top-6'>
                        <h2 className='text-xl font-bold text-white mb-4'>Add Songs</h2>

                        {availableSongs.length === 0 ? (
                            <p className='text-gray-400 text-sm'>All songs are already added</p>
                        ) : (
                            <div className='space-y-2 max-h-96 overflow-y-auto'>
                                {availableSongs.map((song) => (
                                    <button
                                        key={song._id}
                                        onClick={() => handleAddSong(song._id)}
                                        disabled={loading}
                                        className='w-full p-3 bg-slate-700 hover:bg-slate-600 disabled:bg-gray-500 rounded text-left transition'
                                    >
                                        <div className='flex items-center gap-2'>
                                            <MdAdd size={18} />
                                            <div className='flex-1 truncate'>
                                                <p className='text-white text-sm font-semibold truncate'>{song.musicName}</p>
                                                <p className='text-gray-400 text-xs truncate'>{song.singerName}</p>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlaylistDetail;

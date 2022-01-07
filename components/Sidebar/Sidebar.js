import Link from 'next/link';
import { useSession } from 'next-auth/react';
import styles from './Sidebar.module.css';
import { useEffect, useState } from 'react';
import useSpotify from '../../hooks/useSpotify';
import { useRecoilState } from 'recoil';
import { playlistIdState } from '../../atoms/playlistAtom';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

const Sidebar = () => {
    const { data: session, status } = useSession();
    const [playlists, setPlaylists] = useState([]);
    const [playlistID, setPlaylistID] = useRecoilState(playlistIdState);
    const spotifyApi = useSpotify();

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data) => {
                setPlaylists(data.body.items);
            });
        }
    }, [session, spotifyApi]);

    const selectPlaylistHandler = (playlistID) => {
        setPlaylistID(playlistID);
    };

    return (
        <nav className={styles.Sidebar}>
            <div className='flex flex-col flex-1 w-full pt-6'>
                <div className='logo mb-4 h-12 flex items-center'>
                    <h1 className='text-white text-2xl font-bold tracking-wider'>
                        <Link href='/'>
                            <a className='px-6'>Spotify</a>
                        </Link>
                    </h1>
                </div>
                <ul className='list-none'>
                    <li className='px-2'>
                        <a
                            href='#'
                            className='flex items-center gap-4 h-10 px-4 cursor-pointer hover:text-white transition-colors duration-200 ease-linear'>
                            <svg role='img' height='24' width='24' className='fill-[#b3b3b3]' viewBox='0 0 24 24'>
                                <path d='M9 14h6v7h5V7.8l-8-4.6-8 4.6V21h5v-7zm1 8H3V7.2L12 2l9 5.2V22h-7v-7h-4v7z'></path>
                            </svg>
                            <span className='text-[13px] leading-[15px] font-bold truncate whitespace-nowrap mt-1 tracking-wide'>
                                Home
                            </span>
                        </a>
                    </li>
                    <li className='px-2'>
                        <a
                            href='#'
                            className='flex items-center gap-4 h-10 px-4 cursor-pointer hover:text-white transition-colors duration-200 ease-linear'>
                            <svg role='img' height='24' width='24' className='fill-[#b3b3b3]' viewBox='0 0 24 24'>
                                <path d='M16.387 16.623A8.47 8.47 0 0019 10.5a8.5 8.5 0 10-8.5 8.5 8.454 8.454 0 005.125-1.73l4.401 5.153.76-.649-4.399-5.151zM10.5 18C6.364 18 3 14.636 3 10.5S6.364 3 10.5 3 18 6.364 18 10.5 14.636 18 10.5 18z'></path>
                            </svg>
                            <span className='text-[13px] leading-[15px] font-bold truncate whitespace-nowrap mt-1 tracking-wide'>
                                Search
                            </span>
                        </a>
                    </li>
                    <li className='px-2'>
                        <a
                            href='#'
                            className='flex items-center gap-4 h-10 px-4 cursor-pointer hover:text-white transition-colors duration-200 ease-linear'>
                            <svg role='img' height='24' width='24' className='fill-[#b3b3b3]' viewBox='0 0 24 24'>
                                <path d='M13.66 4.097l-.913.406 7.797 17.513.914-.406L13.66 4.097zM3 22h1V4H3v18zm6 0h1V4H9v18z'></path>
                            </svg>
                            <span className='text-[13px] leading-[15px] font-bold truncate whitespace-nowrap mt-1 tracking-wide'>
                                Your Library
                            </span>
                        </a>
                    </li>
                </ul>
                <div className='flex flex-col h-full min-h-0 flex-1 flex-grow flex-shrink-0 mt-6 relative'>
                    <div className='flex flex-col min-h-0 flex-1 h-full'>
                        <div className='px-2'>
                            <button className='flex items-center gap-4 h-10 px-4 cursor-pointer hover:text-white transition-colors duration-200 ease-linear'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='#b3b3b3'
                                    aria-hidden='true'
                                    className='w-6 h-6'>
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='1'
                                        d='M12 4v16m8-8H4'></path>
                                </svg>
                                <span className='text-[13px] leading-[15px] font-bold truncate whitespace-nowrap mt-1 tracking-wide'>
                                    Create Playlist
                                </span>
                            </button>
                        </div>
                        <div className='px-2'>
                            <button className='flex items-center gap-4 h-10 px-4 cursor-pointer hover:text-white transition-colors duration-200 ease-linear'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='#b3b3b3'
                                    aria-hidden='true'
                                    className='w-6 h-6'>
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='1'
                                        d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'></path>
                                </svg>
                                <span className='text-[13px] leading-[15px] font-bold truncate whitespace-nowrap mt-1 tracking-wide'>
                                    Liked Songs
                                </span>
                            </button>
                        </div>
                        <div className='relative'>
                            <hr className='border-none bg-[#282828] mx-6 mt-2 h-[1px] min-h-[1px]' />
                            <div className='absolute left-0 right-0 bottom-[-16px] h-4 pointer-events-none bg-gradient-to-b from-[rgba(0,0,0,0.7)] to-transparent z-[1]'></div>
                        </div>
                        <OverlayScrollbarsComponent
                            options={{
                                resize: 'none',
                                className: 'h-full overscroll-y-contain os-theme-spotify-clone',
                            }}>
                            <ul className='list-none pt-2'>
                                <div
                                    style={{
                                        contain: 'layout size',
                                        position: 'relative',
                                        height: playlists.length * 32 * 2,
                                    }}>
                                    <div>
                                        {playlists.map((playlist) => (
                                            <li key={playlist.id}>
                                                <div className='px-6'>
                                                    <button
                                                        className={`h-8 w-full text-left hover:text-white transition-colors duration-200 ease-in-out ${
                                                            playlist.id === playlistID ? 'text-white' : ''
                                                        }`}
                                                        onClick={() => selectPlaylistHandler(playlist.id)}>
                                                        <span className='block text-[13px] leading-[15px] truncate whitespace-nowrap tracking-wide'>
                                                            {playlist.name}
                                                        </span>
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                        {playlists.map((playlist) => (
                                            <li key={playlist.id}>
                                                <div className='px-6'>
                                                    <button
                                                        className={`h-8 w-full text-left hover:text-white transition-colors duration-200 ease-in-out ${
                                                            playlist.id === playlistID ? 'text-white' : ''
                                                        }`}
                                                        onClick={() => selectPlaylistHandler(playlist.id)}>
                                                        <span className='block text-[13px] leading-[15px] truncate whitespace-nowrap tracking-wide'>
                                                            {playlist.name}
                                                        </span>
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </div>
                                </div>
                            </ul>
                        </OverlayScrollbarsComponent>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Sidebar;

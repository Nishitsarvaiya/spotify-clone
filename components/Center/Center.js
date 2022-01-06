import { useEffect, useRef, useState } from 'react';
import styles from './Center.module.css';
import { shuffle } from 'lodash';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistIdState, playlistState } from '../../atoms/playlistAtom';
import useSpotify from '../../hooks/useSpotify';
import { useSession } from 'next-auth/react';
import { Songs, UserMenu, UserPopup } from '..';
import OverlayScrollbars from 'overlayscrollbars';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

const colors = [
    'bg-indigo-500',
    'bg-red-500',
    'bg-green-500',
    'bg-gray-500',
    'bg-blue-500',
    'bg-yellow-500',
    'bg-pink-500',
    'bg-purple-500',
];

const Center = () => {
    const { data: session } = useSession();
    const [headerColor, setHeaderColor] = useState(null);
    const spotifyApi = useSpotify();
    const playlistID = useRecoilValue(playlistIdState);
    const [playlist, setPlaylist] = useRecoilState(playlistState);
    const playlistName = useRef();

    const getPlaylistDuration = () => {
        let duration = 0;
        playlist?.tracks.items.forEach((track) => {
            duration += track.track.duration_ms;
        });

        return formatDuration(duration);
    };

    const formatDuration = (duration_ms) => {
        const portions = [];

        const msInHour = 1000 * 60 * 60;
        const hours = Math.trunc(duration_ms / msInHour);
        if (hours > 0) {
            portions.push(hours + ' hr');
            duration_ms = duration_ms - hours * msInHour;
        }

        const msInMinute = 1000 * 60;
        const minutes = Math.trunc(duration_ms / msInMinute);
        if (minutes > 0) {
            portions.push(minutes + ' min');
            duration_ms = duration_ms - minutes * msInMinute;
        }

        return portions.join(' ');
    };

    const calculatePlaylistFontSize = () => {
        if (playlist?.name.length >= 30 && playlist?.name.length <= 40) {
            playlistName.current.style = `
				padding: 0.08em 0;
				visibility: visible;
				width: 100%;
				font-size: clamp(48px, 3.5vw, 96px);
				line-height: clamp(48px, 3.5vw, 96px);
			`;
        } else if (playlist?.name.length > 40) {
            playlistName.current.style = `
				padding: 0.08em 0;
				visibility: visible;
				width: 100%;
				font-size: clamp(48px, 2vw, 96px);
				line-height: clamp(48px, 2vw, 96px);
			`;
        } else {
            playlistName.current.style = '';
        }
    };

    useEffect(() => {
        setHeaderColor(shuffle(colors).pop());
    }, [playlistID]);

    useEffect(() => {
        spotifyApi
            .getPlaylist(playlistID)
            .then((data) => {
                setPlaylist(data.body);
            })
            .catch((err) => console.log('SOMETHING WENT WRONG >>>', err));
    }, [spotifyApi, playlistID]);

    useEffect(() => {
        calculatePlaylistFontSize();
    }, [playlist]);

    return (
        <div className={`${styles.CenterView} w-full min-h-0 flex flex-col`}>
            <main className='flex-1 relative min-h-0'>
                <div className='h-full overflow-hidden relative'>
                    <div className='absolute top-0 left-0 bottom-0 right-0'>
                        <div className='absolute top-0 left-0 bottom-0 right-0'>
                            <OverlayScrollbarsComponent options={{}}>
                                <div className={styles.PlaylistHeader}>
                                    <div className={`absolute h-full w-full top-0 left-0 ${headerColor}`}></div>
                                    <div className='absolute h-full w-full top-0 left-0 bg-gradient-to-b from-transparent to-[#00000080]'></div>
                                    <div className={styles.PlaylistImageContainer}>
                                        <img
                                            className={`h-full w-full object-cover object-center ${styles.PlaylistImage}`}
                                            src={playlist?.images[0]?.url}
                                            alt=''
                                        />
                                    </div>
                                    <div className='relative flex flex-col justify-end'>
                                        <h2 className='uppercase text-xs font-bold text-white'>Playlist</h2>
                                        <span className={styles.PlaylistTitle}>
                                            <h1 ref={playlistName} className={`text-white tracking-tight mt-2 mb-2`}>
                                                {playlist?.name}
                                            </h1>
                                        </span>
                                        <p
                                            className={`text-sm text-white text-opacity-70 tracking-wider mb-1 ${styles.PlaylistDesc}`}>
                                            {playlist?.description}
                                        </p>
                                        <div className='flex'>
                                            <span className='text-[13px] leading-[15px] text-white tracking-wider hover:underline'>
                                                <a href='#'>{playlist?.owner.display_name}</a>
                                            </span>
                                            {playlist?.followers.total > 0 ? (
                                                <span className='text-[13px] leading-[15px] text-white text-opacity-70 tracking-wider before:content-["•"] before:mx-1'>
                                                    {playlist?.followers.total === 1
                                                        ? playlist?.followers.total + ' Like'
                                                        : playlist?.followers.total + ' Likes'}
                                                </span>
                                            ) : (
                                                ''
                                            )}
                                            <span className='text-[13px] leading-[15px] text-white text-opacity-70 tracking-wider before:content-["•"] before:mx-1'>
                                                {playlist?.tracks.total} Songs, {getPlaylistDuration()}
                                            </span>
                                        </div>
                                    </div>
                                    <UserMenu />
                                    <UserPopup />
                                </div>
                                <div className='bg-[#121212] relative pb-8'>
                                    <div className={`absolute h-60 w-full ${headerColor}`}></div>
                                    <div className='absolute h-60 w-full bg-gradient-to-b from-[rgba(0,0,0,0.6)] to-[#121212]'></div>
                                    <div className='relative px-8 py-6'>
                                        <div className='flex items-center'>
                                            <button className='bg-[#1db954] mr-8 rounded-full flex items-center justify-center min-w-[56px] h-14 w-14 hover:scale-105'>
                                                <svg
                                                    height='28'
                                                    role='img'
                                                    width='28'
                                                    viewBox='0 0 24 24'
                                                    aria-hidden='true'>
                                                    <polygon
                                                        points='21.57 12 5.98 3 5.98 21 21.57 12'
                                                        fill='#ffffff'></polygon>
                                                </svg>
                                            </button>
                                            <button className='text-[#1db954] mr-6 rounded-full flex items-center justify-center'>
                                                <svg
                                                    role='img'
                                                    height='32'
                                                    width='32'
                                                    viewBox='0 0 32 32'
                                                    className='Svg-sc-1bi12j5-0 hDgDGI'
                                                    fill='#1db954'>
                                                    <path d='M27.319 5.927a7.445 7.445 0 00-10.02-.462s-.545.469-1.299.469c-.775 0-1.299-.469-1.299-.469a7.445 7.445 0 00-10.02 10.993l9.266 10.848a2.7 2.7 0 004.106 0l9.266-10.848a7.447 7.447 0 000-10.531z'></path>
                                                </svg>
                                            </button>
                                            <button>
                                                <svg
                                                    role='img'
                                                    height='32'
                                                    width='32'
                                                    viewBox='0 0 32 32'
                                                    className='Svg-sc-1bi12j5-0 hDgDGI'
                                                    fill='#ffffff99'>
                                                    <path d='M5.998 13.999A2 2 0 105.999 18a2 2 0 00-.001-4zm10.001 0A2 2 0 1016 18a2 2 0 000-4zm10.001 0A2 2 0 1026.001 18 2 2 0 0026 14z'></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <Songs />
                                </div>
                            </OverlayScrollbarsComponent>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Center;

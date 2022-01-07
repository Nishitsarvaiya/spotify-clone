import { useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import { currentTrackIdState, isPlayingState } from '../../atoms/songAtom';
import useSongInfo from '../../hooks/useSongInfo';
import useSpotify from '../../hooks/useSpotify';
import styles from './Player.module.css';
import { formatArtists } from '../../lib/utility';
import { useEffect, useState } from 'react';
import { formatDuration } from '../../lib/time';

const Player = () => {
    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const [volume, setVolume] = useState(50);
    const songInfo = useSongInfo();

    console.log(songInfo);

    const fetchCurrentSong = () => {
        if (!songInfo) {
            spotifyApi.getMyCurrentPlayingTrack().then((data) => {
                console.log('>>> NOW PLAYING: ', data.body?.item);
                setCurrentTrackId(data.body?.item?.id);

                spotifyApi.getMyCurrentPlaybackState().then((data) => {
                    setIsPlaying(data.body?.is_playing);
                });
            });
        }
    };

    useEffect(() => {
        if (spotifyApi.getAccessToken() && !currentTrackId) {
            fetchCurrentSong();
            setVolume(50);
        }
    }, [currentTrackId, spotifyApi, session]);

    return (
        <div className={styles.Player}>
            <footer className='flex flex-col min-w-[620px] select-none bg-[#181818] border-t border-[#282828]'>
                <div className='h-[90px] flex items-center justify-between px-4'>
                    <div className='min-w-[180px] w-[30%]'>
                        <div className='flex relative items-center'>
                            <div className='isolate relative'>
                                <div className='w-14 h-14 shadow-small'>
                                    <img src={songInfo?.album.images?.[0].url} alt='' />
                                </div>
                            </div>
                            <div className='flex flex-col mx-[14px]'>
                                <div className='text-[13px] leading-[15px] text-white line-clamp-1 truncate'>
                                    {songInfo?.name}
                                </div>
                                <div className='text-[11px] leading-[15px] text-[#b3b3b3]  line-clamp-1 truncate'>
                                    {songInfo?.artists && formatArtists(songInfo?.artists)}
                                </div>
                            </div>
                            <button className='text-[#b3b3b3] w-8 h-8 min-w-[32px] flex items-center justify-center'>
                                <svg role='img' height='16' width='16' viewBox='0 0 16 16' className='fill-[#b3b3b3]'>
                                    <path d='M13.764 2.727a4.057 4.057 0 00-5.488-.253.558.558 0 01-.31.112.531.531 0 01-.311-.112 4.054 4.054 0 00-5.487.253A4.05 4.05 0 00.974 5.61c0 1.089.424 2.113 1.168 2.855l4.462 5.223a1.791 1.791 0 002.726 0l4.435-5.195A4.052 4.052 0 0014.96 5.61a4.057 4.057 0 00-1.196-2.883zm-.722 5.098L8.58 13.048c-.307.36-.921.36-1.228 0L2.864 7.797a3.072 3.072 0 01-.905-2.187c0-.826.321-1.603.905-2.187a3.091 3.091 0 012.191-.913 3.05 3.05 0 011.957.709c.041.036.408.351.954.351.531 0 .906-.31.94-.34a3.075 3.075 0 014.161.192 3.1 3.1 0 01-.025 4.403z'></path>
                                </svg>
                            </button>
                            <button className='text-[#b3b3b3] w-8 h-8 min-w-[32px] flex items-center justify-center'>
                                <svg width='16' height='16' xmlns='http://www.w3.org/2000/svg'>
                                    <g fill='#b3b3b3' fillRule='evenodd'>
                                        <path
                                            d='M1 3v9h14V3H1zm0-1h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z'
                                            fillRule='nonzero'></path>
                                        <path d='M10 8h4v3h-4z'></path>
                                    </g>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className='max-w-[722px] w-[40%]'>
                        <div className='flex flex-col items-center justify-center'>
                            <div className='flex flex-nowrap gap-2 mb-3 w-full'>
                                <div className='flex flex-1 gap-2 justify-end'>
                                    <button className='w-8 h-8 min-w-[32px] flex items-center justify-center'>
                                        <svg
                                            role='img'
                                            height='16'
                                            width='16'
                                            viewBox='0 0 16 16'
                                            className='fill-[#b3b3b3]'>
                                            <path d='M4.5 6.8l.7-.8C4.1 4.7 2.5 4 .9 4v1c1.3 0 2.6.6 3.5 1.6l.1.2zm7.5 4.7c-1.2 0-2.3-.5-3.2-1.3l-.6.8c1 1 2.4 1.5 3.8 1.5V14l3.5-2-3.5-2v1.5zm0-6V7l3.5-2L12 3v1.5c-1.6 0-3.2.7-4.2 2l-3.4 3.9c-.9 1-2.2 1.6-3.5 1.6v1c1.6 0 3.2-.7 4.2-2l3.4-3.9c.9-1 2.2-1.6 3.5-1.6z'></path>
                                        </svg>
                                    </button>
                                    <button className='w-8 h-8 min-w-[32px] flex items-center justify-center'>
                                        <svg
                                            role='img'
                                            height='16'
                                            width='16'
                                            viewBox='0 0 16 16'
                                            className='fill-[#b3b3b3]'>
                                            <path d='M13 2.5L5 7.119V3H3v10h2V8.881l8 4.619z'></path>
                                        </svg>
                                    </button>
                                </div>
                                <button className='w-8 h-8 min-w-[32px] flex items-center justify-center bg-white rounded-full hover:scale-105'>
                                    <svg
                                        role='img'
                                        height='16'
                                        width='16'
                                        viewBox='0 0 16 16'
                                        className='fill-[#181818]'>
                                        <path fill='none' d='M0 0h16v16H0z'></path>
                                        <path d='M3 2h3v12H3zm7 0h3v12h-3z'></path>
                                    </svg>
                                </button>
                                <div className='flex flex-1 gap-2'>
                                    <button className='w-8 h-8 min-w-[32px] flex items-center justify-center'>
                                        <svg
                                            role='img'
                                            height='16'
                                            width='16'
                                            viewBox='0 0 16 16'
                                            className='fill-[#b3b3b3]'>
                                            <path d='M11 3v4.119L3 2.5v11l8-4.619V13h2V3z'></path>
                                        </svg>
                                    </button>
                                    <button className='w-8 h-8 min-w-[32px] flex items-center justify-center'>
                                        <svg
                                            role='img'
                                            height='16'
                                            width='16'
                                            viewBox='0 0 16 16'
                                            className='fill-[#b3b3b3]'>
                                            <path d='M5.5 5H10v1.5l3.5-2-3.5-2V4H5.5C3 4 1 6 1 8.5c0 .6.1 1.2.4 1.8l.9-.5C2.1 9.4 2 9 2 8.5 2 6.6 3.6 5 5.5 5zm9.1 1.7l-.9.5c.2.4.3.8.3 1.3 0 1.9-1.6 3.5-3.5 3.5H6v-1.5l-3.5 2 3.5 2V13h4.5C13 13 15 11 15 8.5c0-.6-.1-1.2-.4-1.8z'></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className='flex items-center justify-between w-full gap-2'>
                                <div className='min-w-[40px] text-right text-[#b3b3b3] text-[11px] leading-[15px] tracking-wider'>
                                    0:00
                                </div>
                                <div className='h-3 w-full relative'>
                                    <div className='h-full w-full overflow-hidden'>
                                        <div className='h-1 w-full rounded-sm bg-[#535353] flex absolute top-1/2 transform translate-y-[-50%]'></div>
                                    </div>
                                </div>
                                <div className='min-w-[40px] text-left text-[#b3b3b3] text-[11px] leading-[15px] tracking-wider'>
                                    {formatDuration(songInfo?.duration_ms)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='min-w-[180px] w-[30%] flex justify-end'>
                        <div className='flex flex-grow justify-end items-center'>
                            <button className='w-8 h-8 min-w-[32px] text-[#b3b3b3] pt-1 pl-[2px]'>
                                <div className='flex items-center justify-center'>
                                    <svg
                                        role='img'
                                        height='16'
                                        width='16'
                                        viewBox='0 0 16 16'
                                        className='fill-[#b3b3b3]'>
                                        <path d='M8.5 1A4.505 4.505 0 004 5.5c0 .731.191 1.411.502 2.022L1.99 13.163a1.307 1.307 0 00.541 1.666l.605.349a1.307 1.307 0 001.649-.283L9.009 9.95C11.248 9.692 13 7.807 13 5.5 13 3.019 10.981 1 8.5 1zM4.023 14.245a.307.307 0 01-.388.066l-.605-.349a.309.309 0 01-.128-.393l2.26-5.078A4.476 4.476 0 007.715 9.92l-3.692 4.325zM8.5 9C6.57 9 5 7.43 5 5.5S6.57 2 8.5 2 12 3.57 12 5.5 10.429 9 8.5 9z'></path>
                                    </svg>
                                </div>
                            </button>
                            <button className='w-8 h-8 min-w-[32px] text-[#b3b3b3]'>
                                <div className='flex items-center justify-center'>
                                    <svg
                                        role='img'
                                        height='16'
                                        width='16'
                                        viewBox='0 0 16 16'
                                        className='fill-[#b3b3b3]'>
                                        <path d='M2 2v5l4.33-2.5L2 2zm0 12h14v-1H2v1zm0-4h14V9H2v1zm7-5v1h7V5H9z'></path>
                                    </svg>
                                </div>
                            </button>
                            <button className='w-8 h-8 min-w-[32px] text-[#b3b3b3]'>
                                <div className='flex items-center justify-center'>
                                    <svg
                                        role='img'
                                        height='16'
                                        width='16'
                                        aria-label='Connect to a device'
                                        viewBox='0 0 16 16'
                                        className='fill-[#b3b3b3]'>
                                        <path d='M0 3v8c0 .55.45 1 1 1h5v-1H1V3h5V2H1c-.55 0-1 .45-1 1zm3 11.5c0 .275.225.5.5.5H6v-1H3.5c-.275 0-.5.225-.5.5zM15 2H9c-.55 0-1 .45-1 1v11c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm0 12H9V3h6v11zm-3-8a.75.75 0 100-1.5.75.75 0 000 1.5zm0 6a2 2 0 100-4 2 2 0 000 4zm0-3c.551 0 1 .449 1 1s-.449 1-1 1-1-.449-1-1 .449-1 1-1z'></path>
                                    </svg>
                                </div>
                            </button>
                            <div className='flex flex-grow-0 flex-shrink items-center' style={{ flexBasis: '125px' }}>
                                <button className='w-8 h-8 min-w-[32px] text-[#b3b3b3] flex items-center justify-center'>
                                    <svg
                                        role='presentation'
                                        height='16'
                                        width='16'
                                        aria-label='Volume medium'
                                        id='volume-icon'
                                        viewBox='0 0 16 16'
                                        className='fill-[#b3b3b3]'>
                                        <path d='M0 11.032v-6h2.802l5.198-3v12l-5.198-3H0zm7 1.27v-8.54l-3.929 2.27H1v4h2.071L7 12.302zm4.464-2.314q.401-.925.401-1.956 0-1.032-.4-1.957-.402-.924-1.124-1.623L11 3.69q.873.834 1.369 1.957.496 1.123.496 2.385 0 1.262-.496 2.385-.496 1.123-1.369 1.956l-.659-.762q.722-.698 1.123-1.623z'></path>
                                    </svg>
                                </button>
                                <div className='h-3 w-full relative'>
                                    <div className='h-full w-full overflow-hidden'>
                                        <div className='h-1 w-full rounded-sm bg-[#535353] flex absolute top-1/2 transform translate-y-[-50%]'></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Player;

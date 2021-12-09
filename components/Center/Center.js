import { useEffect, useState } from 'react';
import styles from './Center.module.css';
import { shuffle } from 'lodash';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistIdState, playlistState } from '../../atoms/playlistAtom';
import useSpotify from '../../hooks/useSpotify';
import { useSession } from 'next-auth/react';

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

	useEffect(() => {
		setHeaderColor(shuffle(colors).pop());
	}, [playlistID]);

	useEffect(() => {
		if (spotifyApi.getAccessToken()) {
			spotifyApi
				.getPlaylist(playlistID)
				.then((data) => {
					setPlaylist(data.body);
				})
				.catch((err) => console.log('SOMETHING WENT WRONG >>>', err));
		}
	}, [spotifyApi, playlistID]);

	return (
		<main className={styles.CenterView}>
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
					<h1
						className={`2xl:text-8xl xl:text-7xl text-5xl text-white tracking-tight ${styles.PlaylistTitle}`}>
						{playlist?.name}
					</h1>
				</div>
			</div>
		</main>
	);
};

export default Center;

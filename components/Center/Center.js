import { useEffect, useRef, useState } from 'react';
import styles from './Center.module.css';
import { shuffle } from 'lodash';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistIdState, playlistState } from '../../atoms/playlistAtom';
import useSpotify from '../../hooks/useSpotify';
import { useSession } from 'next-auth/react';
import { UserMenu, UserPopup } from '..';

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
					<span className={styles.PlaylistTitle}>
						<h1 ref={playlistName} className={`text-white tracking-tight mt-2 mb-2`}>
							{playlist?.name}
						</h1>
					</span>
					<p
						className={`text-sm text-white text-opacity-70 font-normal tracking-wider mb-1 ${styles.PlaylistDesc}`}>
						{playlist?.description}
					</p>
					<div className='flex'>
						<span className='text-sm text-white font-normal tracking-wider hover:underline'>
							<a href='#'>{playlist?.owner.display_name}</a>
						</span>
						{playlist?.followers.total > 0 ? (
							<span className='text-sm text-white text-opacity-70 tracking-wider before:content-["•"] before:mx-1'>
								{playlist?.followers.total === 1
									? playlist?.followers.total + ' Like'
									: playlist?.followers.total + ' Likes'}
							</span>
						) : (
							''
						)}
						<span className='text-sm text-white text-opacity-70 tracking-wider before:content-["•"] before:mx-1'>
							{playlist?.tracks.total} Songs, {getPlaylistDuration()}
						</span>
					</div>
				</div>
				<UserMenu />
				<UserPopup />
			</div>
		</main>
	);
};

export default Center;

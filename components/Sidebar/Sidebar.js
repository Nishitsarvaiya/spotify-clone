import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { HomeIcon, SearchIcon, LibraryIcon, PlusIcon, HeartIcon } from '@heroicons/react/outline';
import styles from './Sidebar.module.css';
import { useEffect, useState } from 'react';
import useSpotify from '../../hooks/useSpotify';
import { useRecoilState } from 'recoil';
import { playlistIdState } from '../../atoms/playlistAtom';

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
			<div className='flex flex-col w-full pt-6'>
				<div className='logo mb-4 h-12 flex items-center'>
					<h1 className='text-white text-2xl font-bold tracking-wider'>
						<Link href='/'>
							<a className='px-6'>Spotify</a>
						</Link>
					</h1>
				</div>
				<ul className='list-none'>
					<li className='px-2'>
						<button
							className='flex items-center gap-4 h-10 px-4 cursor-pointer hover:text-white transition-colors duration-200 ease-linear'
							onClick={() => signOut()}>
							<span className='text-sm font-bold overflow-hidden overflow-ellipsis whitespace-nowrap mt-1 tracking-wide'>
								Log Out
							</span>
						</button>
					</li>
					<li className='px-2'>
						<a
							href='#'
							className='flex items-center gap-4 h-10 px-4 cursor-pointer hover:text-white transition-colors duration-200 ease-linear'>
							<HomeIcon className='w-6 h-6' />
							<span className='text-sm font-bold overflow-hidden overflow-ellipsis whitespace-nowrap mt-1 tracking-wide'>
								Home
							</span>
						</a>
					</li>
					<li className='px-2'>
						<a
							href='#'
							className='flex items-center gap-4 h-10 px-4 cursor-pointer hover:text-white transition-colors duration-200 ease-linear'>
							<SearchIcon className='w-6 h-6' />
							<span className='text-sm font-bold overflow-hidden overflow-ellipsis whitespace-nowrap mt-1 tracking-wide'>
								Search
							</span>
						</a>
					</li>
					<li className='px-2'>
						<a
							href='#'
							className='flex items-center gap-4 h-10 px-4 cursor-pointer hover:text-white transition-colors duration-200 ease-linear'>
							<LibraryIcon className='w-6 h-6' />
							<span className='text-sm font-bold overflow-hidden overflow-ellipsis whitespace-nowrap mt-1 tracking-wide'>
								Your Library
							</span>
						</a>
					</li>
					<li className='px-2 mt-8'>
						<a
							href='#'
							className='flex items-center gap-4 h-10 px-4 cursor-pointer hover:text-white transition-colors duration-200 ease-linear'>
							<PlusIcon className='w-6 h-6' />
							<span className='text-sm font-bold overflow-hidden overflow-ellipsis whitespace-nowrap mt-1 tracking-wide'>
								Create Playlist
							</span>
						</a>
					</li>
					<li className='px-2 mb-4'>
						<a
							href='#'
							className='flex items-center gap-4 h-10 px-4 cursor-pointer hover:text-white transition-colors duration-200 ease-linear'>
							<HeartIcon className='w-6 h-6' />
							<span className='text-sm font-bold overflow-hidden overflow-ellipsis whitespace-nowrap mt-1 tracking-wide'>
								Liked Songs
							</span>
						</a>
					</li>
				</ul>
				<hr className='border-b border-[#282828] border-t-0 mx-6' />
				<ul className='list-none pt-2'>
					{playlists.map((playlist) => (
						<li key={playlist.id}>
							<div className='px-6'>
								<button
									className='h-8 w-full text-left hover:text-white transition-colors duration-200 ease-in-out'
									onClick={() => selectPlaylistHandler(playlist.id)}>
									<span className='block text-sm overflow-hidden overflow-ellipsis whitespace-nowrap tracking-wide'>
										{playlist.name}
									</span>
								</button>
							</div>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
};

export default Sidebar;

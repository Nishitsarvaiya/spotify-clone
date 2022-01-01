import { ClockIcon } from '@heroicons/react/outline';
import { useRecoilValue } from 'recoil';
import { playlistState } from '../../atoms/playlistAtom';
import { Song } from '..';

const Songs = () => {
	const playlist = useRecoilValue(playlistState);

	return (
		<div className='px-4 lg:px-8'>
			<div>
				<div className='mx-4 lg:mx-[-32px] mb-4 px-8 box-content h-9 sticky top-16 z-[2]'>
					<div
						aria-colcount='5'
						className='h-full grid gap-4 px-4 border-b border-opacity-10'>
						<div className='flex items-center justify-self-end'>#</div>
						<div className='flex items-center justify-self-start'>
							<div className='flex items-center justify-center'>
								<span className='overflow-hidden overflow-ellipsis text-xs uppercase tracking-wider'>
									title
								</span>
							</div>
						</div>
						<div className='flex items-center justify-self-start'>
							<div className='flex items-center justify-center'>
								<span className='overflow-hidden overflow-ellipsis text-xs uppercase tracking-wider'>
									album
								</span>
							</div>
						</div>
						<div className='flex items-center justify-self-start'>
							<div className='flex items-center justify-center'>
								<span className='overflow-hidden overflow-ellipsis text-xs uppercase tracking-wider'>
									date added
								</span>
							</div>
						</div>
						<div className='col-[last] flex items-center  justify-self-end'>
							<div className='flex items-center justify-center'>
								<ClockIcon className='w-5 h-5 mr-8' />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='relative'>
				<div className='songs'>
					{playlist?.tracks.items.map((track, idx) => (
						<Song song={track} key={track.track.id} idx={idx} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Songs;

import { formatDate, formatDuration } from '../../lib/time';
import { SongRow } from '..';

const Song = ({ song, idx }) => {
    const artists = song.track.artists.map((artist, idx) => (
        <a href={artist.external_urls.spotify} className='hover:text-white hover:underline' key={artist.name}>
            {(idx ? ', ' : '') + artist.name}
        </a>
    ));

    return (
        <div className='song'>
            <div className='grid-row h-14 relative rounded-[4px] grid gap-4 px-4 hover:bg-white hover:bg-opacity-10'>
                <div className='flex items-center justify-self-end'>
                    <div className='inline-block w-4 h-4 min-h-[16px] min-w-[16px] relative text-[#b3b3b3]'>
                        <span className='text-base absolute top-[-3px] right-[6px]'>{idx + 1}</span>
                    </div>
                </div>
                <div className='flex items-center justify-self-start'>
                    <img src={song.track.album.images[0].url} alt='' className='w-10 h-10 mr-4' />
                    <div className='flex flex-col'>
                        <div className='text-[15px] leading-[22px] text-white line-clamp-1 truncate tracking-wider'>
                            {song.track.name}
                        </div>
                        <div className='text-[13px] leading-[15px] text-[#b3b3b3]  line-clamp-1 truncate tracking-wider'>
                            {artists}
                        </div>
                    </div>
                </div>
                <div className='items-center hidden md:flex justify-self-start'>
                    <a
                        href={song.track.album.external_urls.spotify}
                        target='_blank'
                        className='text-[#b3b3b3] line-clamp-1 text-[13px] leading-[15px] tracking-wider truncate hover:text-white hover:underline'>
                        {song.track.album.name}
                    </a>
                </div>
                <div className='items-center hidden lg:flex justify-self-start'>
                    <span className='text-[#b3b3b3] text-[13px] leading-[15px] tracking-wider select-none'>
                        {formatDate(song.added_at)}
                    </span>
                </div>
                <div className='flex items-center justify-self-end col-[last]'>
                    <span className='text-[#b3b3b3] text-[13px] leading-[15px] tracking-wider select-none mr-8'>
                        {formatDuration(song.track.duration_ms)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Song;

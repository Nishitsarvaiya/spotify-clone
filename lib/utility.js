export const formatArtists = (artists) => {
    if (artists.length > 1) {
        return artists.map((artist, idx) => (
            <a href={artist.external_urls.spotify} className='hover:text-white hover:underline' key={artist.name}>
                {(idx ? ', ' : '') + artist.name}
            </a>
        ));
    } else {
        return artists[0].name;
    }
};

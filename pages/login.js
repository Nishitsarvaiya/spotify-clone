import { getProviders, signIn } from 'next-auth/react';

export default function Login({ providers }) {
    return (
        <main className='w-full h-screen flex flex-col items-center justify-center bg-[#121212]'>
            <h1 className='text-center text-6xl text-white uppercase font-bold tracking-wide mb-2'>
                welcome to fake spotify
            </h1>
            <h4 className='text-center text-base tracking-widest font-light text-gray-300 mb-12'>
                This build is absolutely for educational purposes
            </h4>
            {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                    <button
                        className='bg-[#18d860] text-sm font-bold tracking-wider text-white py-4 px-6'
                        onClick={() => signIn(provider.id, { callbackUrl: '/' })}>
                        Login With {provider.name}
                    </button>
                </div>
            ))}
            <div className='bg-[#b3b3b3] bg-opacity-10 rounded-sm shadow-small mt-16 p-4 w-1/2 md:p-8'>
                <div className='w-full h-full flex flex-col gap-8'>
                    <div>
                        <h3 className='text-lg text-white tracking-wider'>Instructions:</h3>
                        <ul className='list-inside list-disc mt-2'>
                            <li>
                                <span className='text-sm text-[#b3b3b3] tracking-wider'>
                                    You need to be logged in on official SPOTIFY platform on any device for this build
                                    to work.
                                </span>
                            </li>
                            <li>
                                <span className='text-sm text-[#b3b3b3] tracking-wider'>
                                    It will fetch your playlists and user info as well as currently playing song.
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className='text-lg text-white tracking-wider'>Info & Upcoming features:</h3>
                        <ul className='list-inside list-disc mt-2'>
                            <li>
                                <span className='text-sm text-[#b3b3b3] tracking-wider'>
                                    This build is still under development.
                                </span>
                            </li>
                            <li>
                                <span className='text-sm text-[#b3b3b3] tracking-wider'>
                                    PLAY & PAUSE functionalities for SPOTIFY PREMIUM Users.
                                </span>
                            </li>
                            <li>
                                <span className='text-sm text-[#b3b3b3] tracking-wider'>VOLUME controls.</span>
                            </li>
                            <li>
                                <span className='text-sm text-[#b3b3b3] tracking-wider'>User Home Page.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );
}

export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers,
        },
    };
}

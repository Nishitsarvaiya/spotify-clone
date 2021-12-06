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

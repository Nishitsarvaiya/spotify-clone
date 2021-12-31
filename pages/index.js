import { getSession } from 'next-auth/react';
import { Layout } from '../components';

export default function Home() {
	return (
		<div>
			<Layout />
		</div>
	);
}

export async function getServerSideProps(context) {
	const session = await getSession(context);

	return {
		props: {
			session: session,
		},
	};
}

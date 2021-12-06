import { Sidebar, Center } from '../../components';
import styles from './Layout.module.css';

const Layout = () => {
	return (
		<div className={styles.LayoutContainer}>
			<Sidebar />
			<Center />
			{/* PLAYER */}
		</div>
	);
};

export default Layout;

import { Sidebar, Center, Player } from '../../components';
import styles from './Layout.module.css';

const Layout = () => {
    return (
        <div className={styles.LayoutContainer}>
            <Sidebar />
            <Center />
            <Player />
        </div>
    );
};

export default Layout;

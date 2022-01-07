import { ExternalLinkIcon } from '@heroicons/react/outline';
import { useRecoilValue } from 'recoil';
import { userPopupState } from '../../atoms/userPopupAtom';
import { signOut } from 'next-auth/react';
import styles from './UserPopup.module.css';

const UserPopup = () => {
    const userPopupStatus = useRecoilValue(userPopupState);

    return (
        <div className={`${userPopupStatus ? 'block' : 'hidden'} fixed top-14 right-8 z-50`}>
            <div className='min-w-[196px]'>
                <ul className={styles.UserPopupList}>
                    <li>
                        <button className='w-full flex justify-between items-center p-[10px] gap-2 text-left rounded-sm cursor-default hover:bg-white hover:bg-opacity-10'>
                            <span className='text-[13px] leading-4 text-white tracking-wider overflow-hidden overflow-ellipsis whitespace-nowrap mt-[4px] flex-1'>
                                Account
                            </span>
                            <ExternalLinkIcon color='#ffffff' className='w-4 h-4' />
                        </button>
                    </li>
                    <li>
                        <button className='w-full flex justify-between items-center p-[10px] gap-2 text-left rounded-sm cursor-default hover:bg-white hover:bg-opacity-10'>
                            <span className='text-[13px] leading-4 text-white tracking-wider overflow-hidden overflow-ellipsis whitespace-nowrap mt-[4px] flex-1'>
                                Profile
                            </span>
                        </button>
                    </li>
                    <li>
                        <button className='w-full flex justify-between items-center p-[10px] gap-2 text-left rounded-sm cursor-default hover:bg-white hover:bg-opacity-10'>
                            <span className='text-[13px] leading-4 text-white tracking-wider overflow-hidden overflow-ellipsis whitespace-nowrap mt-[4px] flex-1'>
                                Upgrade to Premium
                            </span>
                            <ExternalLinkIcon color='#ffffff' className='w-4 h-4' />
                        </button>
                    </li>
                    <li>
                        <button
                            className='w-full flex justify-between items-center p-[10px] gap-2 text-left rounded-sm cursor-default hover:bg-white hover:bg-opacity-10'
                            onClick={() => signOut()}>
                            <span className='text-[13px] leading-4 text-white tracking-wider overflow-hidden overflow-ellipsis whitespace-nowrap mt-[4px] flex-1'>
                                Log out
                            </span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default UserPopup;

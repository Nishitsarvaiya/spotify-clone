import { useSession } from 'next-auth/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import { useRecoilState } from 'recoil';
import { userPopupState } from '../../atoms/userPopupAtom';

const UserMenu = () => {
    const { data: session } = useSession();
    const [userPopupStatus, setUserPopupStatus] = useRecoilState(userPopupState);

    const toggleUserMenu = () => setUserPopupStatus(!userPopupStatus);

    return (
        <div className='fixed top-4 right-8 z-50'>
            <button
                className='block bg-black bg-opacity-70 rounded-3xl border-0 cursor-pointer hover:bg-[#282828]'
                onClick={toggleUserMenu}>
                <div className='flex items-center gap-2 p-[2px]'>
                    <div className='min-w-[28px] min-h-[28px] w-7 h-7 rounded-3xl overflow-hidden'>
                        <img src={session?.user.image} alt='' />
                    </div>
                    <span className='text-xs text-white font-bold tracking-widest hidden lg:block max-w-[110px] overflow-ellipsis whitespace-nowrap pointer-events-none leading-7'>
                        {session?.user.name}
                    </span>
                    {userPopupStatus ? (
                        <ChevronUpIcon color='#ffffff' className='w-4 h-4 mr-[6px]' />
                    ) : (
                        <ChevronDownIcon color='#ffffff' className='w-4 h-4 mr-[6px]' />
                    )}
                </div>
            </button>
        </div>
    );
};

export default UserMenu;

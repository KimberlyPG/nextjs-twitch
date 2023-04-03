import { useState, MouseEvent } from 'react';
import { useSession, signOut } from "next-auth/react";
import { useRouter } from 'next/router';
import Image from 'next/image';

import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { createTheme, makeStyles, styled } from '@mui/material';

const CssMenu = styled(Menu)({
	'& account-menu': {
	  backgroundColor: '#060C0C',
	},

});

export default function TopbarMenu() {
    const { data: session, status } = useSession();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const router = useRouter();

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigateToProfile = () => {
        handleClose();
        router.push({
            pathname: `/profile/${session?.user.id}`,
            query: {state:(false)}, 
        })
    }

    const logout = () => {
        handleClose();
        signOut({callbackUrl: "/login" })
    }
    
    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }} className="flex justify-end sm:w-1/3">
                <Tooltip title="Your account">
                    <div className="flex items-center hover:opacity-80 cursor-pointer" onClick={handleClick}>
                        <h4 className="text-xs pr-2 hover:text-purple-500 xs:hidden lg:flex">{session?.user.name}</h4>
                        {session && 
                            <Image 
                                className="rounded-full md:w-8 md:h-8 xs:h-6 xs:w-6" 
                                src={session.user.image} 
                                alt={`${session.user.name} image`}
                                width={100}
                                height={100}
                                priority={true}
                            />
                        }
                    </div>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                    },
                    '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'white',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                    },
                },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={navigateToProfile}>
                    {session && 
                        <div className='px-2'>
                            <Image 
                                className="rounded-full md:w-10 md:h-10 xs:h-6 xs:w-6" 
                                src={session.user.image} 
                                alt={`${session.user.name} image`}
                                width={100}
                                height={100}
                                priority={true}
                            />
                        </div>
                    }
                    <p className='xs:hidden lg:flex'>Profile</p>
                    <p className='xs:flex lg:hidden'>{session?.user.name}</p>
                </MenuItem>
                <Divider />
                <MenuItem onClick={logout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
}

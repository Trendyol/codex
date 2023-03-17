import { BsFillGridFill } from 'react-icons/bs';
import { FaUserAlt } from 'react-icons/fa';
import { IoSettingsSharp } from 'react-icons/io5';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { AiFillGithub } from 'react-icons/ai';
import { FaFeatherAlt } from 'react-icons/fa';
import { IoRocketSharp } from 'react-icons/io5';
import { AiFillCodeSandboxCircle } from 'react-icons/ai';

export const MENU_ITEMS = [
  {
    title: 'Dashboard',
    Icon: BsFillGridFill,
    path: '/',
  },
  {
    title: 'Practice',
    Icon: IoRocketSharp,
    path: '/practice',
  },
  {
    title: 'Articles',
    Icon: FaFeatherAlt,
    path: '/articles',
    disabled: true,
  },
  {
    title: 'Learn',
    Icon: AiFillCodeSandboxCircle,
    path: '/learn',
    disabled: true,
  },
  {
    title: 'Login',
    Icon: FaUserAlt,
    path: '/login',
  },
];

export const USER_MENU_ITEMS = [
  {
    title: 'Dashboard',
    Icon: BsFillGridFill,
    path: '/',
  },
  {
    title: 'Practice',
    Icon: IoRocketSharp,
    path: '/practice',
  },
  {
    title: 'Articles',
    Icon: FaFeatherAlt,
    path: '/articles',
    disabled: true,
  },
  {
    title: 'Learn',
    Icon: AiFillCodeSandboxCircle,
    path: '/learn',
    disabled: true,
  },
  {
    title: 'Settings',
    Icon: IoSettingsSharp,
    path: '/settings',
    disabled: true,
  },
];

export const BOTTOM_MENU_ITEMS = [
  {
    title: 'Docs',
    Icon: HiOutlineDocumentText,
    path: '/docs',
    disabled: true,
  },
  {
    title: 'Github',
    Icon: AiFillGithub,
    path: 'https://github.com/Trendyol/codex',
  },
];

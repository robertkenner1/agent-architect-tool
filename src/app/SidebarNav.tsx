"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  BookmarkIcon,
  Squares2X2Icon,
  CheckCircleIcon,
  BoltIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const navItems = [
  {
    href: '/',
    label: 'Home',
    icon: <HomeIcon className="w-7 h-7 text-[#22372e]" />,
  },
  {
    href: '/chapters',
    label: 'Chapters',
    icon: <BookmarkIcon className="w-7 h-7 text-[#22372e]" />,
  },
  {
    href: '/use-cases',
    label: 'Use Cases',
    icon: <CheckCircleIcon className="w-7 h-7 text-[#22372e]" />,
  },
  {
    href: '/prioritization-framework',
    label: 'Prioritization Framework',
    icon: <Squares2X2Icon className="w-7 h-7 text-[#22372e]" />,
  },
  {
    href: '/ai-success-blueprint',
    label: 'AI Success Blueprint',
    icon: <BoltIcon className="w-7 h-7 text-[#22372e]" />,
  },
];

export default function SidebarNav() {
  const pathname = usePathname();
  return (
    <aside className="hidden md:flex flex-col items-center bg-[#f7f8f3] w-56 min-h-screen py-8 px-2 border-r border-[#e0e6e0] fixed left-0 top-0 z-30">
      {/* Logo */}
      <div className="mb-10 mt-2">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 24C14 17.3726 19.3726 12 26 12V16C21.5817 16 18 19.5817 18 24H14Z" fill="#4B9B6E"/>
          <path d="M34 24C34 30.6274 28.6274 36 22 36V32C26.4183 32 30 28.4183 30 24H34Z" fill="#2B6B57"/>
        </svg>
      </div>
      <nav className="flex flex-col gap-2 w-full">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-nav-item${isActive ? ' active' : ''}`}
            >
              <span className="flex flex-row items-center gap-x-2">
                {item.icon}
                <span>{item.label}</span>
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
} 
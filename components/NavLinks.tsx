'use client';

import { IoHome } from "react-icons/io5";
import { MdEditDocument } from "react-icons/md";
import { PiHeartbeatFill } from "react-icons/pi";
import { FaBook } from "react-icons/fa";
import Link from "next/link"
import { Button } from "./ui/button"
import { usePathname } from "next/navigation"

export function NavLinks() {
    const pathname = usePathname();
    const navLinks = [
        {
            name: 'Dashboard',
            href: '/dashboard',
            icon: <IoHome className="size-5 text-blue-950 font-semibold" />
        },
        {
            name: 'New Journal Entry',
            href: ['/journal/new', '/journal/new/create'],
            icon: <MdEditDocument className="size-5 text-blue-950 font-semibold" />
        },
        {
            name: 'Journal Entries',
            href: '/journal/entries',
            icon: <FaBook className="size-5 text-blue-950 font-semibold" />
        },
        {
            name: 'Mood Tracker',
            href: '/mood-tracker',
            icon: <PiHeartbeatFill className="size-5 text-blue-950 font-semibold" />
        }
    ]
    return (
        <nav>
            {navLinks.map((link) => {
                const isActive = Array.isArray(link.href) ? link.href.some(path => pathname.startsWith(path)) : pathname.startsWith(link.href);
                const href = Array.isArray(link.href) ? link.href[0] : link.href;
                return (
                    <div className="mb-4" key={Array.isArray(link.href) ? link.href.join(',') : link.href}>
                        <Link href={href}>
                            <Button variant={isActive ? 'secondary' : 'ghost'}
                            className="w-full justify-start text-md font-semibold rounded-full text-blue-950">
                                {link.icon}
                                <span className="ml-3">{link.name}</span>
                            </Button>
                        </Link>
                    </div>
                )
            })}
        </nav>
    )
}
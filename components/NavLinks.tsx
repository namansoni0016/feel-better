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
            href: '/journal/new',
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
            {navLinks.map((link) => (
                <div className="mb-4" key={link.href}>
                    <Link href={link.href}>
                        <Button variant={pathname === link.href ? 'secondary' : 'ghost'}
                        className="w-full justify-start text-md font-semibold rounded-full text-blue-950">
                            {link.icon}
                            <span className="ml-3">{link.name}</span>
                        </Button>
                    </Link>
                </div>
            ))}
        </nav>
    )
}
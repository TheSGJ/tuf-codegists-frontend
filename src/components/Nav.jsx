import Link from 'next/link'
import React from 'react'

function Nav() {
    return (
        <header><ul className="flex m-3">
            <li className="mr-6">
                <Link href="/">
                    <span className="text-blue-500 hover:text-blue-800">
                        Home
                    </span>
                </Link>
            </li>
            <li className="mr-6">
                <Link href="/list">
                    <span className="text-blue-500 hover:text-blue-800">
                        View Codes
                    </span>
                </Link>
            </li>
        </ul>
        </header>
    )
}

export default Nav
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"

const Navbar = () => {
    return (
        <nav className="bg-[#0B0F19]/80 border-b border-white/5 backdrop-blur-md shadow-md w-full flex items-center justify-between px-16 py-5">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
                <Image src="/Images/Logo.png" alt="Logo" width={32} height={32} />
                <span className="text-xl font-bold text-white">SubTrack</span>
            </Link>

            {/* Nav Links */}
            <ul className="flex items-center gap-10">
                <li>
                    <Link href="#features" className="text-white">Features</Link>
                </li>
                <li>
                    <Link href="#how-it-works" className="text-white">How it Works</Link>
                </li>
                <li>
                    <Link href="#about" className="text-white">About</Link>
                </li>
            </ul>

            {/* Auth Buttons */}
            <div className="flex items-center gap-4">
                <Link href="/login">
                    <Button className="text-white" variant="ghost">
                        Login
                    </Button>
                </Link>
                <Link href="/register" className="text-[#6366F1]">
                    <Button className="bg-[#6366F1] hover:bg-[#6366F1]/80">
                        Register
                    </Button>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar
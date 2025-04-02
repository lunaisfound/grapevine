import Image from "next/image";

export default function Logo() {
    return (
        <div className="logo flex items-center">
            <Image
                src="/logo-navbar.png"
                alt="Grapevine Logo"
                width={215}
                height={215}
                priority
            />
        </div>
    );
}
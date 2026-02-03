import Image from "next/image";
import Link from "next/link";

export default function Logo() {
	return (
		<Link
			className="sm:-translate-x-1/2 sm:-translate-y-1/2 transition-transform duration-200 hover:scale-105 sm:absolute sm:top-1/2 sm:left-1/2"
			href="/"
		>
			<Image
				alt="Robin Logo"
				height={61}
				priority={true}
				src="/images/png/logo.png"
				width={53}
			/>
		</Link>
	);
}

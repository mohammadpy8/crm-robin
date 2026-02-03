import Link from "next/link";
import { navItems } from "@/features/shared/ui/header/constants/navItems";

export default function Navigation() {
	return (
		<nav className="flex flex-row-reverse items-center gap-3">
			{navItems.map(({ href, icon: Icon, label }) => (
				<Link
					aria-label={label}
					className="group flex h-10 w-10 items-center justify-center rounded-full bg-primary transition-all duration-200 hover:scale-105 hover:bg-primary/90"
					href={href}
					key={label}
				>
					<Icon className="h-6 w-6 fill-white text-transparent" />
				</Link>
			))}
		</nav>
	);
}

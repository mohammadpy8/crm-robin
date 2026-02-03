import Link from "next/link";
import { User } from "@/icons";

export default function UserProfile() {
	return (
		<Link aria-label="پروفایل" className="group relative" href="/#profile">
			<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary transition-all duration-200 hover:bg-primary/90 group-hover:scale-105">
				<User className="h-6 w-6 fill-white text-transparent" />
			</div>

			<span
				aria-hidden="true"
				className="-left-0.5 -top-0.5 absolute h-2 w-2 rounded-[50%] bg-secondary"
			/>
		</Link>
	);
}

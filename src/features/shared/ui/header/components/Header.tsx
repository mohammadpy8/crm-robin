"use client";

import Logo from "@/features/shared/ui/header/components/Logo";
import MenuButton from "@/features/shared/ui/header/components/MenuButton";
import Navigation from "@/features/shared/ui/header/components/Navigation";
import UserProfile from "@/features/shared/ui/header/components/UserProfile";

interface HeaderProps {
	onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
	return (
		<header className="h-21 w-full bg-white">
			<div className="relative mx-auto h-full w-full max-w-360 px-9">
				<div className="flex h-full items-center justify-between">
					<div className="flex flex-row-reverse items-center gap-3">
						<MenuButton onClick={onMenuClick} />
						<UserProfile />
					</div>

					<Logo />

					<div className="hidden sm:block">
						<Navigation />
					</div>
				</div>
			</div>
		</header>
	);
}

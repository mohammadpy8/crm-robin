export interface MenuItem {
	href: string;
	icon: React.ComponentType<{ className?: string }>;
	label: string;
}

export interface UserProfile {
	avatar: string;
	name: string;
	phone: string;
}

export interface SidebarProps {
	isOpen: boolean;
	onClose: () => void;
	userProfile?: UserProfile;
}

export interface SidebarBackdropProps {
	isOpen: boolean;
	onClick: () => void;
}

export interface SidebarHeaderProps {
	onClose: () => void;
	userProfile: UserProfile;
}

export interface SidebarNavigationProps {
	items: MenuItem[];
	onClose: () => void;
}

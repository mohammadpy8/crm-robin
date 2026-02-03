export interface MenuButtonProps {
	onClick: () => void;
}

export interface NavItems {
	href: string;
	icon: React.ComponentType<{ className?: string }>;
	label: string;
}

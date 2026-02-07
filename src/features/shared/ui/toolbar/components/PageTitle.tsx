"use client";

interface PageTitleProps {
	title: string;
	icon?: React.ReactNode;
}

export const PageTitle: React.FC<PageTitleProps> = ({ title, icon }) => {
	return (
		<div className="flex items-center gap-3">
			{icon && (
				<div className="flex h-7 w-7 items-center justify-center text-primary">
					{icon}
				</div>
			)}
			<h1 className="text-primary text-xl leading-none">{title}</h1>
		</div>
	);
};

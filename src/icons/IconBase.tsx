/** biome-ignore-all lint/a11y/noSvgWithoutTitle: < use svg custom> */

import type { SvgIcon } from "./types";

export default function IconBase({
	color = "currentColor",
	width = 24,
	height = 24,
	strokeWidth = "1.5",
	viewBox = "0 0 24 24",
	children,
	className,
	...rest
}: SvgIcon) {
	return (
		<svg
			className={className}
			fill="none"
			height={height}
			stroke={color}
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={strokeWidth}
			viewBox={viewBox}
			width={width}
			xmlns="http://www.w3.org/2000/svg"
			{...rest}
		>
			{children}
		</svg>
	);
}

import IconBase from "../IconBase";
import type { SvgIcon } from "../types";

export default function Delete(props: SvgIcon) {
	return (
		<IconBase {...props}>
			<path d="M17.25 3H13.5v-.75A2.25 2.25 0 0 0 11.25 0h-4.5A2.25 2.25 0 0 0 4.5 2.25V3H.75a.75.75 0 0 0 0 1.5h.75V18A1.5 1.5 0 0 0 3 19.5h12a1.5 1.5 0 0 0 1.5-1.5V4.5h.75a.75.75 0 1 0 0-1.5M6 2.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75V3H6zM15 18H3V4.5h12zM7.5 8.25v6a.75.75 0 1 1-1.5 0v-6a.75.75 0 0 1 1.5 0m4.5 0v6a.75.75 0 1 1-1.5 0v-6a.75.75 0 1 1 1.5 0"></path>
		</IconBase>
	);
}

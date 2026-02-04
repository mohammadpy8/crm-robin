export interface AccountFormData {
	[key: string]: string | undefined;
	id?: string;
	organName: string; // نام سازمان *
	mobile: string; // موبایل *
	email?: string; // ایمیل
	status?: string; // وضعیت
	serviceLevel?: string; // سطح مجموعه
	nationalId?: string; // شناسه ملی
	referredBy?: string; // ارجاع به
	address?: string; // آدرس
	note?: string; // یادداشت
}

export interface AccountFormContainerProps {
	isOpen: boolean;
	onClose: () => void;
	initialValues?: AccountFormData;
	onSubmit: (data: AccountFormData) => void | Promise<void>;
}

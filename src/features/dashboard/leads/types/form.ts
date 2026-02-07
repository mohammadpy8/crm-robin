export interface LeadFormData {
	[key: string]: string | undefined;
	id?: string;
	firstName?: string; // نام
	lastName: string; // نام خانوادگی *
	mobile?: string; // موبایل
	status?: string; // وضعیت
	leadSource?: string; // منبع سر نخ
	priority?: string; // اولویت
	referredBy?: string; // ارجاع به
	address?: string; // آدرس
	companyName?: string; // نام شرکت
	email?: string; // ایمیل
	note?: string; // یادداشت
}

export interface LeadFormContainerProps {
	isOpen: boolean;
	onClose: () => void;
	initialValues?: LeadFormData;
	onSubmit: (data: LeadFormData) => void | Promise<void>;
}

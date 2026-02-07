export interface ContactFormData {
	[key: string]: string | undefined;
	id?: string;
	firstName?: string;
	lastName: string;
	mobile: string;
	status?: string;
	priority?: string;
	leadSource?: string;
	referredBy?: string;
	address?: string;
	email?: string;
	companyName?: string;
	note?: string;
}

export interface ContactFormContainerProps {
	isOpen: boolean;
	onClose: () => void;
	initialValues?: ContactFormData;
	onSubmit: (data: ContactFormData) => void | Promise<void>;
}

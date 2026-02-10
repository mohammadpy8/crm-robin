export interface UserFormData {
	[key: string]: string | undefined;
	id?: string;
	fullName?: string;
	mobile?: string;
	password?: string;
	email?: string;
	role?: string;
}

export interface UserFormContainerProps {
	isOpen: boolean;
	onClose: () => void;
	initialValues?: UserFormData;
	onSubmit: (data: UserFormData) => void | Promise<void>;
}

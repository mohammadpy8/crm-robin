export interface UserFormData {
	[key: string]: string | undefined;
	id?: string;
	fullName: string; // نام کامل *
	mobile: string; // موبایل *
	password: string; // رمز ورود *
	email: string; // ایمیل *
	role?: string; // نقش کاربری
}

export interface UserFormContainerProps {
	isOpen: boolean;
	onClose: () => void;
	initialValues?: UserFormData;
	onSubmit: (data: UserFormData) => void | Promise<void>;
}

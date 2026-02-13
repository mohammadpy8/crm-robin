import toast from "react-hot-toast";

export const showToast = {
	error: (message: string) =>
		toast.error(message, {
			duration: 4000,
			icon: "❌",
			position: "top-center",
			style: {
				background: "#ef4444",
				color: "#fff",
				fontFamily: "IRANYekan",
			},
		}),

	loading: (message: string) =>
		toast.loading(message, {
			position: "top-center",
			style: {
				fontFamily: "IRANYekan",
			},
		}),

	promise: <T>(
		promise: Promise<T>,
		messages: {
			loading: string;
			success: string;
			error: string;
		},
	) =>
		toast.promise(promise, messages, {
			position: "top-center",
			style: {
				fontFamily: "IRANYekan",
			},
		}),
	success: (message: string) =>
		toast.success(message, {
			duration: 3000,
			icon: "✅",
			position: "top-center",
			style: {
				background: "#10b981",
				color: "#fff",
				fontFamily: "IRANYekan",
			},
		}),
};

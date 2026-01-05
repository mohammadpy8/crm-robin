import { forwardRef } from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
	id: string;
	type: string;
	placeholder: string;
	error?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
	({ id, type, placeholder, error, ...rest }, ref) => {
		return (
			<div className="flex max-h-25 min-h-25 flex-col gap-1.5">
				<input
					className={`w-full rounded-lg border ${
						error ? "border-red-500" : "border-gray-300"
					} px-4 py-3 transition focus:border-transparent focus:outline-none focus:ring-2 ${
						error ? "focus:ring-red-500" : "focus:ring-primary"
					}`}
					id={id}
					placeholder={placeholder}
					ref={ref}
					type={type}
					{...rest}
				/>
				{error && <p className="mt-1 text-red-500 text-sm">{error}</p>}
			</div>
		);
	},
);

InputField.displayName = "InputField";

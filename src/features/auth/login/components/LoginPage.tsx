import { LoginForm } from "./LoginForm";
import { LoginImage } from "./LoginImage";

export default function LoginPage() {
	return (
		<div className="flex min-h-screen items-center justify-center p-4">
			<div className="p flex w-full max-w-5xl overflow-hidden rounded-2xl border border-gray-200 bg-white p-7">
				<LoginForm />
				<LoginImage />
			</div>
		</div>
	);
}

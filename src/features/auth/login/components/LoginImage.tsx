import Image from "next/image";

export function LoginImage() {
	return (
		<div className="relative hidden md:flex md:w-1/2">
			<div className="relative min-h-0 w-full flex-1 overflow-hidden rounded-large p-2">
				<Image
					alt="Login Background"
					className="object-cover"
					fill={true}
					priority={true}
					quality={100}
					sizes="(max-width: 768px ) 0vw, 50vw"
					src="/images/png/bg-login.png"
				/>
			</div>
		</div>
	);
}

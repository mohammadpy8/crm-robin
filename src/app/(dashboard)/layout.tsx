import { Header } from "@/features/shared/ui/header";
import ContactsPage from "@/features/shared/ui/toolbar/Contact";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen">
			<Header />
			<ContactsPage />
			<main className="flex-1 p-6">{children}</main>
		</div>
	);
}

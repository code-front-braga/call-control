import { redirect } from 'next/navigation';
import { auth } from '../../../auth';
import { DashboardHeader } from './components/dashboard-header';

export default async function DashboardLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const session = await auth();

	if (!session) redirect('/');

	return (
		<>
			<DashboardHeader />
			{children}
		</>
	);
}

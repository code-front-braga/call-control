import { Container } from '@/components/container';
import Link from 'next/link';

export function DashboardHeader() {
	return (
		<Container>
			<header className="my-4 flex w-full items-center gap-4 rounded bg-gray-900 p-3">
				<Link
					href="/dashboard"
					className="text-white duration-300 hover:font-bold"
				>
					Chamados
				</Link>
				<Link
					href="/dashboard/customer"
					className="text-white duration-300 hover:font-bold"
				>
					Clientes
				</Link>
			</header>
		</Container>
	);
}

import { Container } from '@/components/container';
import { DashboardRefreshPageButton } from './components/dashboard-refresh-page-button';
import Link from 'next/link';
import { auth } from '../../../auth';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db/prisma';
import { TicketItem } from './components/ticket';

export default async function DashboardHome() {
	const session = await auth();

	if (!session || !session?.user) {
		redirect('/');
	}

	const tickets = await db.ticket.findMany({
		where: {
			status: 'ABERTO',
			customer: {
				userId: session.user.id,
			},
		},
		include: {
			customer: true,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});
	return (
		<Container>
			<main className="mb-2 mt-9">
				<div className="flex items-center justify-between">
					<h1 className="text-3xl font-bold">Chamados</h1>
					<div className="flex items-center gap-3">
						<DashboardRefreshPageButton />
						<Link
							href="/dashboard/new"
							className="rounded bg-blue-500 px-4 py-1 text-white"
						>
							Abrir chamado
						</Link>
					</div>
				</div>

				<table className="my-2 min-w-full">
					<thead>
						<tr>
							<th className="pl-1 text-left font-medium">Cliente</th>
							<th className="hidden text-left font-medium sm:block">
								Data cadastro
							</th>
							<th className="text-left font-medium">Status</th>
							<th className="text-left font-medium">#</th>
						</tr>
					</thead>

					<tbody>
						{tickets.map(ticket => (
							<TicketItem key={ticket.id} ticket={ticket} />
						))}
					</tbody>
				</table>
				{tickets.length === 0 && (
					<h1 className="px-2 text-gray-600">
						Nenhum ticket aberto foi encontrado
					</h1>
				)}
			</main>
		</Container>
	);
}

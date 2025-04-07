import { Container } from '@/components/container';
import Link from 'next/link';
import { CustomerCard } from './components/customer-card';
import { auth } from '../../../../auth';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db/prisma';

export default async function CustomerPage() {
	const session = await auth();
	const userId = session?.user?.id;

	if (!session || !session.user || !userId) {
		redirect('/');
	}

	const customers = await db.customer.findMany({
		where: { userId: userId },
		include: { tickets: true },
	});

	return (
		<Container>
			<main className="mb-2 mt-9">
				<div className="flex items-center justify-between">
					<h1 className="text-3xl font-bold">Meus clientes</h1>
					<Link
						href="/dashboard/customer/new"
						className="bg-blue-500 px-4 py-1 text-white"
					>
						Novo cliente
					</Link>
				</div>
				<section className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
					{customers.map(customer => (
						<CustomerCard key={customer.id} customer={customer} />
					))}
				</section>
				{customers.length === 0 && (
					<h2 className="text-gray-600">
						Você ainda não possui nenhum cliente cadastrado
					</h2>
				)}
			</main>
		</Container>
	);
}

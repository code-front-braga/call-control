import { redirect } from 'next/navigation';
import { auth } from '../../../../../auth';
import { Container } from '@/components/container';
import Link from 'next/link';
import { NewCustomerForm } from '../components/new-customer-form';

export default async function NewCustomerPage() {
	const session = await auth();

	if (!session || !session.user) {
		redirect('/');
	}

	return (
		<Container>
			<main className="mb-2 mt-9 flex flex-col">
				<div className="flex items-center gap-3">
					<Link
						href="/dashboard/customer"
						className="rounded bg-gray-900 px-4 py-1 text-white"
					>
						Voltar
					</Link>
					<h1 className="text-3xl font-bold">Novo cliente</h1>
				</div>
				<NewCustomerForm userId={session.user.id as string} />
			</main>
		</Container>
	);
}

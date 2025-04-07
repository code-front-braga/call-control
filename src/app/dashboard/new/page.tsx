import { Container } from '@/components/container';

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '../../../../auth';
import { db } from '@/lib/db/prisma';

export default async function NewTicket() {
	const session = await auth();

	if (!session || !session.user) {
		redirect('/');
	}

	const customers = await db.customer.findMany({
		where: { userId: session.user.id },
	});

	async function handleRegisterTicket(formData: FormData) {
		'use server';

		const name = formData.get('name');
		const description = formData.get('description');
		const customerId = formData.get('customer');

		if (!name || !description || !customerId) {
			return;
		}

		await db.ticket.create({
			data: {
				name: name as string,
				description: description as string,
				customerId: customerId as string,
				status: 'ABERTO',
				userId: session?.user?.id,
			},
		});
		redirect('/dashboard');
	}

	return (
		<Container>
			<main className="mb-2 mt-9">
				<div className="flex items-center gap-3">
					<Link
						href="/dashboard"
						className="rounded bg-gray-900 px-4 py-1 text-white"
					>
						Voltar
					</Link>
					<h1 className="text-3xl font-bold">Novo chamado</h1>
				</div>

				<form action={handleRegisterTicket} className="mt-6 flex flex-col">
					<label className="mb-1 text-lg font-medium">Nome do chamado</label>
					<input
						type="text"
						name="name"
						placeholder="Digite o nome do chamado..."
						required
						className="mb-2 h-11 w-full rounded-md border-2 px-2"
					/>
					<label className="mb-1 text-lg font-medium">
						Descreva o problema:
					</label>
					<textarea
						name="description"
						placeholder="Descreva o problema..."
						required
						className="mb-2 h-24 w-full resize-none rounded-md border-2 px-2"
					/>

					{customers.length !== 0 && (
						<>
							<label className="mb-1 text-lg font-medium">
								Selecione o cliente
							</label>
							<select
								name="customer"
								className="mb-2 h-11 w-full resize-none rounded-md border-2 bg-white px-2"
							>
								{customers.map(customer => (
									<option key={customer.id} value={customer.id}>
										{customer.name}
									</option>
								))}
							</select>
						</>
					)}

					{customers.length === 0 && (
						<Link href="/dashboard/customer/new">
							Você ainda não tem nenhum cliente,{' '}
							<span className="font-medium text-blue-500">
								Cadastrar cliente
							</span>
						</Link>
					)}

					<button
						type="submit"
						className="my-4 h-11 rounded-md bg-blue-500 px-2 font-bold text-white disabled:cursor-not-allowed disabled:bg-gray-400"
						disabled={customers.length === 0}
					>
						Cadastrar
					</button>
				</form>
			</main>
		</Container>
	);
}

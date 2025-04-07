'use client';

import { instance } from '@/lib/axios/api';
import { Prisma } from '@prisma/client';
import { useRouter } from 'next/navigation';

interface CustomerCardProps {
	customer: Prisma.CustomerGetPayload<{
		select: { id: true; name: true; email: true; phone: true };
	}>;
}

export function CustomerCard({ customer }: CustomerCardProps) {
	const router = useRouter();

	async function handleDeleteCustomer() {
		try {
			await instance.delete('/api/customer', {
				params: { id: customer.id },
			});

			router.refresh();
		} catch (error) {
			console.error('Error ao deletar o cliente:', error);
		}
	}

	return (
		<article className="flex flex-col gap-2 rounded-lg border-2 bg-gray-100 p-2 duration-300 hover:scale-105">
			<h2>
				<a className="font-bold">Nome:</a> {customer.name}
			</h2>
			<p>
				<a className="font-bold">Email:</a> {customer.email}
			</p>
			<p>
				<a className="font-bold">Telefone:</a> {customer.phone}
			</p>

			<button
				onClick={handleDeleteCustomer}
				className="mt-2 self-start rounded bg-red-500 px-4 text-white"
			>
				Deletar
			</button>
		</article>
	);
}

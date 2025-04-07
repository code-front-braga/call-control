'use client';

import { Input } from '@/components/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Prisma } from '@prisma/client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiSearch, FiX } from 'react-icons/fi';
import { TicketForm } from './components/ticket-form';
import { CustomerEmailData, customerEmailSchema } from '@/lib/zod/customer';
import { instance } from '@/lib/axios/api';

export interface CustomerDataInfo {
	customer: Prisma.CustomerGetPayload<{ select: { id: true; name: true } }>;
}

export default function OpenTicket() {
	const [customer, setCustomer] = useState<CustomerDataInfo | null>(null);

	const {
		handleSubmit,
		register,
		setValue,
		setError,
		formState: { errors },
	} = useForm<CustomerEmailData>({
		resolver: zodResolver(customerEmailSchema),
		defaultValues: { email: '' },
	});

	function handleClearCustomer() {
		setCustomer(null);
		setValue('email', '');
	}

	async function handleSearchCustomer(data: CustomerEmailData) {
		const response = await instance.get('/api/customer', {
			params: { email: data.email },
		});

		if (response.data === null) {
			setError('email', {
				type: 'custom',
				message: 'Ops, cliente não encontrado',
			});
			return;
		}

		setCustomer({
			customer: {
				id: response.data.id,
				name: response.data.name,
			},
		});
	}

	return (
		<div className="mx-auto w-full max-w-2xl px-2">
			<h1 className="mt-24 text-center text-3xl font-bold">Abrir chamado</h1>

			<main className="mb-2 mt-4 flex flex-col">
				{customer ? (
					<div className="flex items-center justify-between rounded border-2 bg-slate-200 px-4 py-6">
						<p className="text-lg">
							<strong>Cliente selecionado:</strong> {customer.customer.name}
						</p>
						<button
							onClick={handleClearCustomer}
							className="flex h-11 items-center justify-center rounded px-2"
						>
							<FiX size={30} color="#ff2929" />
						</button>
					</div>
				) : (
					<form
						onSubmit={handleSubmit(handleSearchCustomer)}
						className="rounded border-2 bg-slate-200 px-2 py-6"
					>
						<div className="flex flex-col gap-3">
							<Input
								register={register}
								type="text"
								name="email"
								error={errors.email?.message}
								placeholder="Digite o email do cliente..."
							/>
							<button
								type="submit"
								className="flex h-11 flex-row items-center justify-center gap-3 rounded bg-blue-500 px-2 font-bold text-white"
							>
								Procurar cliente
								<FiSearch size={24} color="#fff" />
							</button>
						</div>
					</form>
				)}
				{customer !== null && <TicketForm customer={customer} />}
			</main>
		</div>
	);
}

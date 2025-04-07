'use client';

import { Input } from '@/components/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CustomerDataInfo } from '../page';
import { instance } from '@/lib/axios/api';
import { TicketData, ticketSchema } from '@/lib/zod/ticket';

interface FormTicketProps {
	customer: CustomerDataInfo;
}
export function TicketForm({ customer }: FormTicketProps) {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<TicketData>({
		resolver: zodResolver(ticketSchema),
	});

	async function handleRegisterTicket(data: TicketData) {
		await instance.post('api/ticket', {
			name: data.name,
			description: data.description,
			customerId: customer.customer.id,
		});

		setValue('name', '');
		setValue('description', '');
	}

	return (
		<form
			onSubmit={handleSubmit(handleRegisterTicket)}
			className="mt-6 rounded border-2 bg-slate-200 px-4 py-6"
		>
			<label className="mb-1 text-lg font-medium">Nome do chamado</label>
			<Input
				register={register}
				name="name"
				type="text"
				placeholder="Digite o nome do chamado..."
				error={errors.name?.message}
			/>

			<label className="mb-1 text-lg font-medium">Nome do chamado</label>
			<textarea
				id="description"
				{...register('description')}
				className="h-24 w-full resize-none rounded-md border-2 px-2"
				placeholder="Descreva o seu problema"
			/>
			{errors.description && (
				<p className="mb-4 mt-1 text-red-500">{errors.description.message}</p>
			)}
			<button
				type="submit"
				className="h-11 w-full rounded-md bg-blue-500 px-2 font-bold text-white"
			>
				Cadastrar
			</button>
		</form>
	);
}

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/input';
import { CustomerFormData, customerFormSchema } from '@/lib/zod/customer';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { instance } from '@/lib/axios/api';
import { AxiosError } from 'axios';

export function NewCustomerForm({ userId }: { userId: string }) {
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors },
	} = useForm<CustomerFormData>({
		resolver: zodResolver(customerFormSchema),
		defaultValues: { name: '', email: '', phone: '', address: '' },
	});
	const router = useRouter();

	async function handleRegister(data: CustomerFormData) {
		try {
			const res = await instance.post('/api/customer', {
				userId: userId,
				name: data.name,
				email: data.email,
				phone: data.phone,
				address: data.address,
			});

			console.log('Resposta da API:', res);
			console.log('Status da Resposta:', res.status);

			if (res.status === 201) {
				alert('Cliente cadastrado com sucesso!');
			}

			router.refresh();
			router.replace('/dashboard/customer');
		} catch (error: unknown) {
			if (error instanceof AxiosError && error.response?.status === 409) {
				alert('Já existe um cliente cadastrado com esse e-mail.');
			} else {
				alert('Falha ao cadastrar cliente. Tente novamente.'); // Trate outros erros aqui
			}
		} finally {
			reset();
		}
	}

	return (
		<form
			onSubmit={handleSubmit(handleRegister)}
			className="mt-6 flex flex-col"
		>
			<label className="mb-1 text-lg font-medium">Nome completo</label>
			<Input
				register={register}
				type="text"
				name="name"
				placeholder="Digite o nome completo..."
				error={errors.name?.message}
			/>

			<section className="my-2 mt-2 flex flex-col gap-2 sm:flex-row">
				<div className="flex-1">
					<label className="mb-1 text-lg font-medium">Telefone</label>
					<Input
						register={register}
						type="text"
						name="phone"
						placeholder="Ex.: (DD) 999220485"
						error={errors.phone?.message}
					/>
				</div>
				<div className="flex-1">
					<label className="mb-1 text-lg font-medium">Email</label>
					<Input
						register={register}
						type="email"
						name="email"
						placeholder="Digite o email..."
						error={errors.email?.message}
					/>
				</div>
			</section>
			<label className="mb-1 text-lg font-medium">Endereço completo</label>
			<Input
				register={register}
				type="text"
				name="address"
				placeholder="Digite o endereço do cliente..."
				error={errors.address?.message}
			/>

			<button
				type="submit"
				className="my-4 h-11 rounded bg-blue-500 px-2 font-bold text-white"
			>
				Cadastrar
			</button>
		</form>
	);
}

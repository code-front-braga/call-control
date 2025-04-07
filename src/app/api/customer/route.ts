import { db } from '@/lib/db/prisma';
import { NextResponse } from 'next/server';
import { auth } from '../../../../auth';

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const customerEMail = searchParams.get('email');

	if (!customerEMail || customerEMail === '') {
		return NextResponse.json(
			{ error: 'Cliente não encontrado.' },
			{ status: 400 },
		);
	}

	try {
		const customer = await db.customer.findFirst({
			where: { email: customerEMail },
		});

		return NextResponse.json(customer);
	} catch (error) {
		return NextResponse.json(
			{ error: 'Cliente não encontrado.' },
			{ status: 400 },
		);
	}
}

export async function POST(request: Request) {
	const session = await auth();

	if (!session || !session.user) {
		return NextResponse.json(
			{ error: 'Você não está logado.' },
			{ status: 401 },
		);
	}

	try {
		const { name, phone, email, address, userId } = await request.json();

		const existingCustomer = await db.customer.findFirst({ where: { email } });

		if (existingCustomer) {
			return NextResponse.json(
				{ error: 'Já existe um cliente cadastrado com esse e-mail.' },
				{ status: 409 },
			);
		}

		await db.customer.create({
			data: {
				name,
				phone,
				email,
				address: address ? address : '',
				userId: userId,
			},
		});

		return NextResponse.json(
			{ message: 'Cliente cadastrado com sucesso!' },
			{ status: 201 },
		);
	} catch (error) {
		return NextResponse.json(
			{ error: 'Falha ao criar novo cliente.' },
			{ status: 400 },
		);
	}
}

export async function DELETE(request: Request) {
	const session = await auth();

	if (!session || !session.user) {
		return NextResponse.json(
			{ success: false, error: 'Você não está logado.' },
			{ status: 401 },
		);
	}

	const { searchParams } = new URL(request.url);
	const userId = searchParams.get('id');

	if (!userId) {
		return NextResponse.json(
			{ success: false, error: 'ID do cliente não fornecido.' },
			{ status: 400 },
		);
	}

	try {
		const findTickets = await db.ticket.findFirst({
			where: { customerId: userId },
		});

		if (findTickets) {
			return NextResponse.json(
				{
					success: false,
					error:
						'Não é possível excluir o cliente, pois existem tickets associados.',
				},
				{ status: 400 },
			);
		}

		const deletedCustomer = await db.customer.delete({
			where: { id: userId },
		});

		if (!deletedCustomer) {
			return NextResponse.json(
				{ success: false, error: 'Cliente não encontrado.' },
				{ status: 404 },
			);
		}

		return NextResponse.json(
			{ success: true, message: 'Cliente deletado com sucesso!' },
			{ status: 200 },
		);
	} catch (error) {
		return NextResponse.json(
			{ success: false, error: `Falha ao deletar cliente: ${error}` },
			{ status: 500 },
		);
	}
}

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

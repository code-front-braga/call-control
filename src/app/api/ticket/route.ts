import { NextResponse } from 'next/server';
import { auth } from '../../../../auth';
import { db } from '@/lib/db/prisma';

export async function PATCH(request: Request) {
	const session = await auth();

	if (!session || !session.user) {
		return NextResponse.json(
			{ error: 'Usuário não autorizado.' },
			{ status: 401 },
		);
	}

	const { id } = await request.json();

	const findTicket = await db.ticket.findMany({
		where: { id: id as string },
	});

	if (!findTicket) {
		return NextResponse.json(
			{ error: 'Falha ao atualizar chamado.' },
			{ status: 400 },
		);
	}

	try {
		await db.ticket.update({
			where: { id: id as string },
			data: {
				status: 'FECHADO',
			},
		});
		console.log(findTicket);

		return NextResponse.json({ message: 'Chamado atualizado com sucesso!' });
	} catch (error) {
		return NextResponse.json(
			{ error: `Falha ao atualizar chamado: ${error}` },
			{ status: 400 },
		);
	}
}

export async function POST(request: Request) {
	const { customerId, name, description } = await request.json();

	if (!customerId || !name || !description) {
		return NextResponse.json(
			{ error: 'Faltando dados para criação do chamado.' },
			{ status: 400 },
		);
	}

	try {
		await db.ticket.create({
			data: {
				name: name,
				description: description,
				status: 'ABERTO',
				customerId: customerId,
			},
		});

		return NextResponse.json({ message: 'Chamado registrado com sucesso!' });
	} catch (error) {
		return NextResponse.json(
			{ error: 'Falha ao criar chamado.' },
			{ status: 400 },
		);
	}
}

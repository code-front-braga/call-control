'use client';

import { ModalContext } from '@/providers/modal-provider';
import { MouseEvent, useContext, useRef } from 'react';

export function ModalTicket() {
	const { handleModalVisible, ticket } = useContext(ModalContext);
	const modalRef = useRef<HTMLDivElement | null>(null);

	const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
		if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
			handleModalVisible();
		}
	};

	return (
		<div
			onClick={handleModalClick}
			className="absolute z-50 min-h-screen w-full bg-gray-900/80"
		>
			<div className="absolute inset-0 flex items-center justify-center">
				<div
					ref={modalRef}
					className="w-4/5 max-w-2xl rounded bg-white p-3 shadow-lg md:w-1/2"
				>
					<div className="mb-4 flex items-center justify-between">
						<h1 className="text-lg font-bold md:text-2xl">
							Detalhes do chamado
						</h1>
						<button
							onClick={handleModalVisible}
							className="rounded bg-red-500 p-1 px-2 text-white"
						>
							Fechar
						</button>
					</div>
					<div className="mb-2 flex flex-wrap gap-1">
						<h2 className="font-bold">Nome:</h2>
						<p>{ticket?.ticket.name}</p>
					</div>
					<div className="mb-2 flex flex-col flex-wrap gap-1">
						<h2 className="font-bold">Descrição:</h2>
						<p>{ticket?.ticket.description}</p>
					</div>

					<div className="my-4 w-full border-b-[1.5px]"></div>

					<h1 className="mb-4 text-lg font-bold">Detalhes do cliente</h1>

					<div className="mb-2 flex flex-wrap gap-1">
						<h2 className="font-bold">Nome:</h2>
						<p>{ticket?.ticket.customer?.name}</p>
					</div>
					<div className="mb-2 flex flex-wrap gap-1">
						<h2 className="font-bold">Telefone:</h2>
						<p>{ticket?.ticket.customer?.phone}</p>
					</div>
					<div className="mb-2 flex flex-wrap gap-1">
						<h2 className="font-bold">Email:</h2>
						<p>{ticket?.ticket.customer?.email}</p>
					</div>
					{ticket?.ticket.customer?.address && (
						<div className="mb-2 flex flex-wrap gap-1">
							<h2 className="font-bold">Endereço:</h2>
							<p>{ticket?.ticket.customer?.address}</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

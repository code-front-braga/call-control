'use client';

import { instance } from '@/lib/axios/api';
import { ModalContext } from '@/providers/modal-provider';
import { TicketProps } from '@/utils/ticket.type';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { FiCheckSquare, FiFile } from 'react-icons/fi';

export function TicketItem({ ticket }: TicketProps) {
	const router = useRouter();
	const { handleModalVisible, setDetailTicket } = useContext(ModalContext);

	async function handleChangeStatus() {
		try {
			await instance.patch('/api/ticket', {
				id: ticket.id,
			});

			router.refresh();
		} catch (error) {
			console.log(error);
		}
	}

	function handleOpenModal() {
		handleModalVisible();
		setDetailTicket({
			ticket,
		});
	}

	return (
		<>
			<tr className="h-16 border-b-2 border-slate-200 bg-slate-100 duration-200 last:border-b-0 hover:bg-gray-300">
				<td className="pl-1 text-left">{ticket.customer?.name}</td>
				<td className="hidden text-left sm:table-cell">
					{ticket.createdAt?.toLocaleDateString('pt-br')}
				</td>
				<td className="text-left">
					<span className="rounded bg-green-500 px-2 py-1">
						{ticket.status}
					</span>
				</td>
				<td className="text-left">
					<button onClick={handleChangeStatus} className="mr-3">
						<FiCheckSquare size={24} color="#131313" />
					</button>
					<button onClick={handleOpenModal}>
						<FiFile size={24} color="#3b82f6" />
					</button>
				</td>
			</tr>
		</>
	);
}

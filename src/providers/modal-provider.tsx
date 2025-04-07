'use client';

import { ModalTicket } from '@/components/modal';
import { TicketProps } from '@/utils/ticket.type';
import { createContext, useState } from 'react';

interface ModalContextData {
	visible: boolean;
	handleModalVisible: () => void;
	ticket: TicketProps | undefined;
	setDetailTicket: (detail: TicketProps) => void;
}

export const ModalContext = createContext({} as ModalContextData);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
	const [visible, setVisible] = useState<boolean>(false);
	const [ticket, setTicket] = useState<TicketProps>();

	function handleModalVisible() {
		setVisible(prev => !prev);
	}

	function setDetailTicket(detail: TicketProps) {
		setTicket(detail);
	}

	return (
		<ModalContext.Provider
			value={{ visible, handleModalVisible, ticket, setDetailTicket }}
		>
			{visible && <ModalTicket />}
			{children}
		</ModalContext.Provider>
	);
};

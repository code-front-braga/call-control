import { Prisma } from '@prisma/client';

export interface TicketProps {
	ticket: Prisma.TicketGetPayload<{
		include: {
			customer?: true;
		};
	}>;
}

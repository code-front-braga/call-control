import { z } from 'zod';

const ticketSchema = z.object({
	name: z.string().min(1, { message: 'O nome do chamado é obrigatório' }),
	description: z
		.string()
		.min(1, { message: 'Descreva um pouco sobre o seu problema' }),
});

type TicketData = z.infer<typeof ticketSchema>;

export { ticketSchema, type TicketData };

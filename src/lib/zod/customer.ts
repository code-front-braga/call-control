import { z } from 'zod';

const customerFormSchema = z.object({
	name: z.string().min(1, { message: 'O campo nome é obrigatório' }),
	email: z
		.string()
		.email({ message: 'Digite um email válido' })
		.min(1, { message: 'O email é obrigatório' }),
	phone: z.string().refine(
		value => {
			return (
				/^(?:\(\d{2}\)\s?)?\d{9}$/.test(value) ||
				/^\d{2}\s\d{9}$/.test(value) ||
				/^\d{11}$/.test(value)
			);
		},
		{ message: 'O número de telefone deve estar (DD) 99999999999' },
	),
	address: z.string(),
});

type CustomerFormData = z.infer<typeof customerFormSchema>;

export { customerFormSchema, type CustomerFormData };

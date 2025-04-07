'use client';

import { RegisterOptions, UseFormRegister } from 'react-hook-form';

interface InputProps {
	type: string;
	placeholder: string;
	name: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	register: UseFormRegister<any>;
	error?: string;
	rules?: RegisterOptions;
}

export function Input({
	name,
	placeholder,
	register,
	type,
	error,
	rules,
}: InputProps) {
	return (
		<>
			<input
				{...register(name, rules)}
				id={name}
				type={type}
				placeholder={placeholder}
				className="h-11 w-full rounded-md border-2 px-2"
			/>
			{error && <p className="my-1 text-red-500">{error}</p>}
		</>
	);
}

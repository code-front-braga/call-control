'use client';

import { googleAuthenticate } from '@/actions/google-login';
import Form from 'next/form';
import { useActionState } from 'react';
import { FcGoogle } from 'react-icons/fc';

export function GoogleLoginForm() {
	const [status, formAction] = useActionState(googleAuthenticate, undefined);

	return (
		<Form action={formAction}>
			<button type="submit" className="flex items-end gap-2">
				<span>Login pelo Google</span>
				<FcGoogle size={24} />
			</button>
			{status?.error && (
				<p className="text-cabaret mt-2 font-semibold">{status?.error}</p>
			)}
		</Form>
	);
}

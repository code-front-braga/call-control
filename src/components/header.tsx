'use client';

import Link from 'next/link';
import { FiLoader, FiLogOut, FiUser } from 'react-icons/fi';
import { GoogleLoginForm } from './google-login-form';
import { signOut, useSession } from 'next-auth/react';

export function Header() {
	const { status } = useSession();

	const handleLogout = async () => {
		await signOut();
	};

	return (
		<header className="flex h-20 w-full items-center bg-white px-2 py-4 shadow-sm">
			<div className="mx-auto flex w-full max-w-7xl items-center justify-between">
				<Link href="/">
					<h1 className="pl-1 text-2xl font-bold duration-300 hover:tracking-widest">
						<span className="text-blue-500">DEV</span>CONTROLE
					</h1>
				</Link>

				{status === 'loading' && (
					<button>
						<FiLoader size={26} color="#4b5563" className="animate-spin" />
					</button>
				)}

				{status === 'unauthenticated' && <GoogleLoginForm />}

				{status === 'authenticated' && (
					<div className="flex items-baseline gap-4">
						<Link href="/dashboard">
							<FiUser size={26} color="#4b5563" />
						</Link>
						<button onClick={handleLogout}>
							<FiLogOut size={26} color="#ff2323" />
						</button>
					</div>
				)}
			</div>
		</header>
	);
}

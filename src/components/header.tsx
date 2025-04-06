import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { FiLoader, FiLock, FiLogOut, FiUser } from 'react-icons/fi';
import { signIn, signOut } from '../../auth';

export function Header() {
	const { status } = useSession();

	async function handleLogin() {
		await signIn();
	}

	async function handleLogout() {
		await signOut();
	}

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

				{status === 'unauthenticated' && (
					<button onClick={handleLogin}>
						<FiLock size={26} color="#4b5563" />
					</button>
				)}

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

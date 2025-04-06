import { Metadata } from 'next';
import { inter } from '@/utils/fonts';
import './globals.css';
import { AuthProvider } from '@/components/auth-provider';
import { auth } from '../../auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
	title: 'Controle de Chamados | Seu sistema de gerenciamento',
	description: 'Gerencie seus clientes e atendimento de forma fácil.',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();

	if (session) redirect('/dashboard');

	return (
		<html lang="pt-br">
			<body className={`${inter.className} antialiased`}>
				<AuthProvider>{children}</AuthProvider>
			</body>
		</html>
	);
}

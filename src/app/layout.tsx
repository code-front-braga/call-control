import { Metadata } from 'next';
import { inter } from '@/utils/fonts';
import { AuthProvider } from '@/components/auth-provider';
import { Header } from '@/components/header';
import './globals.css';

export const metadata: Metadata = {
	title: 'Controle de Chamados | Seu sistema de gerenciamento',
	description: 'Gerencie seus clientes e atendimento de forma fácil.',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-br">
			<body className={`${inter.className} antialiased`}>
				<AuthProvider>
					<Header />
					{children}
				</AuthProvider>
			</body>
		</html>
	);
}

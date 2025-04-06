import { Metadata } from 'next';
import { inter } from '@/utils/fonts';
import './globals.css';

export const metadata: Metadata = {
	title: 'Controle de Chamados | Seu sistema de gerenciamento',
	description: 'Gerencie seus clientes e atendimento de forma fácil.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-br">
			<body className={`${inter.className} antialiased`}>{children}</body>
		</html>
	);
}

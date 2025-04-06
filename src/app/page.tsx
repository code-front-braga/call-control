import Image from 'next/image';

export default function Home() {
	return (
		<main className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center">
			<h2 className="mb-2 text-2xl font-medium">Gerencie sua empresa</h2>
			<h1 className="mb-8 text-3xl font-bold text-blue-600 md:text-4xl">
				Atendimentos, clientes
			</h1>
			<Image
				src="/bg-home.svg"
				alt="Imagem gero do dev control"
				width={600}
				height={600}
				className="max-w-sm md:max-w-xl"
			/>
		</main>
	);
}

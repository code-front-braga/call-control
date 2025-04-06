'use client';

import { useRouter } from 'next/navigation';
import { FiRefreshCcw } from 'react-icons/fi';

export function DashboardRefreshPageButton() {
	const router = useRouter();

	function handleRefresh() {
		router.refresh();
	}

	return (
		<button onClick={handleRefresh} className="rounded bg-gray-800 px-4 py-1">
			<FiRefreshCcw size={24} color="#fff" />
		</button>
	);
}

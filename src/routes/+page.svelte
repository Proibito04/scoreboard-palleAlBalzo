<script lang="ts">
	import EventCalendar from '$lib/scoreboard/EventCalendar.svelte';
	import Scoreboard from '$lib/scoreboard/Scoreboard.svelte';
	import type { matchDay } from '../types';

	let { data }: { data: { records: matchDay[] } } = $props();
</script>

<div class="max-w-full">
	<!-- Header -->
	<div class="mb-6 text-center">
		<h1 class="text-2xl font-bold text-gray-200 sm:text-3xl">Coppa Palle Al Balzo</h1>
	</div>

	<!-- Standings Section - Show First on Mobile -->
	<section class="mb-8">
		<div class="m-3 rounded-lg bg-white p-3 shadow-sm sm:p-4">
			<h2 class="mb-4 flex items-center text-xl font-bold text-gray-800">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="mr-2 h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
					/>
				</svg>
				Classifica
			</h2>
			<div class="-mx-3 overflow-x-auto sm:mx-0">
				<div class="p-3">
					<Scoreboard matches={data.records} />
				</div>
			</div>
		</div>
	</section>

	<!-- Calendar Section -->
	<section>
		<div class="m-3 rounded-lg bg-white p-3 shadow-sm sm:p-4">
			<h2 class="mb-4 flex items-center text-xl font-bold text-gray-800">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="mr-2 h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
					/>
				</svg>
				Calendario
			</h2>
			<div class="-mx-3 overflow-x-auto sm:mx-0">
				<div class="p-3">
					<EventCalendar eventCalendar={data.records} />
				</div>
			</div>
		</div>
	</section>
</div>

<style>
	/* Stili per gestire lo scrolling orizzontale su mobile */
	.overflow-x-auto {
		-webkit-overflow-scrolling: touch;
		scrollbar-width: thin;
	}

	/* Stili scrollbar personalizzati */
	.overflow-x-auto::-webkit-scrollbar {
		height: 6px;
	}

	.overflow-x-auto::-webkit-scrollbar-track {
		background: #f1f1f1;
		border-radius: 3px;
	}

	.overflow-x-auto::-webkit-scrollbar-thumb {
		background: #888;
		border-radius: 3px;
	}

	.overflow-x-auto::-webkit-scrollbar-thumb:hover {
		background: #666;
	}
</style>

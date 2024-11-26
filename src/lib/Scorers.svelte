<script lang="ts">
	import type { ScoreCard } from '../types';

	let { scorers }: { scorers: ScoreCard[] } = $props();

	// Function to calculate total goals for a player
	const calculateTotalGoals = (scoreCard: ScoreCard): number => {
		return Object.entries(scoreCard)
			.filter(([key]) => key.match(/^\d+$/)) // Only numeric keys
			.reduce((total, [, value]) => total + (value || 0), 0);
	};

	// Create sorted scorers list with total goals
	let recalculatedScorers = scorers
		.map((scorer) => ({
			name: scorer.MARCATORI,
			team: scorer.squadra,
			totalGoals: calculateTotalGoals(scorer)
		}))
		.sort((a, b) => b.totalGoals - a.totalGoals);
</script>

<div class="mx-auto max-w-2xl p-4">
	<h2 class="mb-4 text-center text-2xl font-bold">Marcatori</h2>

	<div class="flex flex-col gap-3">
		{#each recalculatedScorers as scorer, index}
			<div
				class="grid grid-cols-[50px_1fr_auto] items-center rounded-lg bg-gray-50 p-3 transition-transform duration-200 hover:translate-x-1"
			>
				<span class="font-bold text-gray-600">#{index + 1}</span>
				<div class="flex flex-col">
					<span class="font-semibold">{scorer.name}</span>
					<span class="text-sm text-gray-600">{scorer.team}</span>
				</div>
				<span class="font-semibold text-blue-600">{scorer.totalGoals} goals</span>
			</div>
		{/each}
	</div>
</div>

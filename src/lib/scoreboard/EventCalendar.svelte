<script lang="ts">
	import type { matchDay } from '../../types';

	interface Props {
		eventCalendar: matchDay[];
	}

	let { eventCalendar }: Props = $props();
</script>

<div class="grid grid-flow-row-dense grid-cols-2 gap-3">
	{#each eventCalendar as match, idx}
		{#if idx == 0 || eventCalendar[idx].giornata != eventCalendar[idx - 1].giornata}
			<div class="col-span-2 mt-2">
				<span class="text-md text-slate-600">
					Giornata: {match.giornata}
				</span>
			</div>
		{/if}
		<div class="col-span-2 rounded-xl border border-slate-300 bg-slate-50 p-3 md:col-span-1">
			<span class="text-xs text-gray-600">{match.data}</span>
			<div class="flex">
				<span>{match.squadra_1}</span>
				<span class="ml-auto">{match.gol_squadra_1}</span>
			</div>
			<div class="flex">
				<span>{match.squadra_2}</span>
				<span class="ml-auto">{match.gol_squadra_2}</span>
			</div>
		</div>
	{/each}
</div>

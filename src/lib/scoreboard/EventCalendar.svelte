<script lang="ts">
	import type { matchDay } from '../../types';

	interface Props {
		eventCalendar: matchDay[];
	}

	let { eventCalendar }: Props = $props();

	function getTeamStyle(gol1: number | string, gol2: number | string) {
		let defaultStyle = 'font-bold ';
		if (gol1 === null || gol2 === null) return defaultStyle;
		if (gol1 > gol2) defaultStyle = defaultStyle.concat('text-blue-600 font-semibold');
		if (gol1 < gol2) defaultStyle = defaultStyle.concat('text-slate-600');
		return defaultStyle;
	}
</script>

<div class="grid grid-flow-row-dense grid-cols-2 gap-4 p-4">
	{#each eventCalendar as match, idx}
		{#if idx == 0 || eventCalendar[idx].giornata != eventCalendar[idx - 1].giornata}
			<div class="col-span-2 mb-4 mt-6">
				<div class="flex items-center gap-3">
					<span class="rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold text-white">
						Giornata {match.giornata}
					</span>
					<div class="h-[1px] flex-1 bg-slate-200"></div>
				</div>
			</div>
		{/if}
		<div
			class="col-span-2 transform rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md md:col-span-1"
		>
			<div class="mb-3 text-xs font-medium text-gray-500">
				{match.data}
			</div>

			<div class="space-y-3">
				<!-- Prima squadra -->
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-2">
						<!-- Puoi aggiungere qui un logo della squadra se disponibile -->
						<span class={getTeamStyle(match.gol_squadra_1, match.gol_squadra_2)}>
							{match.squadra_1}
						</span>
					</div>
					<span
						class="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 font-semibold"
					>
						{match.gol_squadra_1 ?? '-'}
					</span>
				</div>

				<!-- Seconda squadra -->
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-2">
						<span class={getTeamStyle(match.gol_squadra_2, match.gol_squadra_1)}>
							{match.squadra_2}
						</span>
					</div>
					<span
						class="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 font-semibold"
					>
						{match.gol_squadra_2 ?? '-'}
					</span>
				</div>
			</div>
		</div>
	{/each}
</div>

<script lang="ts">
	import type { matchDay } from '../../types';

	interface Props {
		matches: matchDay[];
	}

	let { matches }: Props = $props();

	interface Standing {
		team: string;
		points: number;
		played: number;
		won: number;
		drawn: number;
		lost: number;
		goalsFor: number;
		goalsAgainst: number;
		goalDifference: number;
	}

	function calculateStandings(matches: matchDay[]): Standing[] {
		const standings = new Map<string, Standing>();

		matches.forEach((match) => {
			if (match.gol_squadra_1 == '-' || match.gol_squadra_2 == '-') return;

			[match.squadra_1, match.squadra_2].forEach((team) => {
				if (typeof match.gol_squadra_1 == 'string')
					match.gol_squadra_1 = parseInt(match.gol_squadra_1);

				if (typeof match.gol_squadra_2 == 'string')
					match.gol_squadra_2 = parseInt(match.gol_squadra_2);

				if (!standings.has(team)) {
					standings.set(team, {
						team,
						points: 0,
						played: 0,
						won: 0,
						drawn: 0,
						lost: 0,
						goalsFor: 0,
						goalsAgainst: 0,
						goalDifference: 0
					});
				}
			});

			const team1 = standings.get(match.squadra_1)!;
			const team2 = standings.get(match.squadra_2)!;

			team1.played++;
			team2.played++;

			team1.goalsFor += match.gol_squadra_1 as number;
			team1.goalsAgainst += match.gol_squadra_2 as number;
			team2.goalsFor += match.gol_squadra_2 as number;
			team2.goalsAgainst += match.gol_squadra_1 as number;

			if (match.gol_squadra_1 > match.gol_squadra_2) {
				team1.points += 3;
				team1.won++;
				team2.lost++;
			} else if (match.gol_squadra_1 < match.gol_squadra_2) {
				team2.points += 3;
				team2.won++;
				team1.lost++;
			} else {
				team1.points++;
				team2.points++;
				team1.drawn++;
				team2.drawn++;
			}

			team1.goalDifference = team1.goalsFor - team1.goalsAgainst;
			team2.goalDifference = team2.goalsFor - team2.goalsAgainst;
		});

		return Array.from(standings.values()).sort(
			(a, b) =>
				b.points - a.points || b.goalDifference - a.goalDifference || b.goalsFor - a.goalsFor
		);
	}

	const standings = $state(calculateStandings(matches));

	// Funzione per determinare lo stile della riga in base alla posizione
	function getRowStyle(position: number): string {
		if (position <= 4) return 'border-l-4 border-l-blue-600';
		if (position >= standings.length - 3) return 'border-l-4 border-l-red-500';
		return '';
	}
</script>

<div class="borde w-full overflow-x-auto rounded-xl p-4">
	<table class="min-w-full table-auto">
		<thead>
			<tr class="border-b border-slate-200 text-sm text-slate-600">
				<th class="px-4 py-3">Pos</th>
				<th class="px-4 py-3 text-left">Squadra</th>
				<th class="px-4 py-3">PT</th>
				<th class="hidden px-4 py-3 sm:table-cell">G</th>
				<th class="hidden px-4 py-3 sm:table-cell">V</th>
				<th class="hidden px-4 py-3 sm:table-cell">N</th>
				<th class="hidden px-4 py-3 sm:table-cell">P</th>
				<th class="hidden px-4 py-3 lg:table-cell">GF</th>
				<th class="hidden px-4 py-3 lg:table-cell">GS</th>
				<th class="px-4 py-3">DR</th>
			</tr>
		</thead>
		<tbody>
			{#each standings as team, i}
				<tr class={`border-b border-slate-100 text-sm hover:bg-slate-50 ${getRowStyle(i + 1)}`}>
					<td class="px-4 py-3 text-center font-semibold">
						{i + 1}
					</td>
					<td class="px-4 py-3 font-medium">{team.team}</td>
					<td class="px-4 py-3 text-center font-bold text-blue-600">{team.points}</td>
					<td class="hidden px-4 py-3 text-center text-slate-600 sm:table-cell">{team.played}</td>
					<td class="hidden px-4 py-3 text-center text-slate-600 sm:table-cell">{team.won}</td>
					<td class="hidden px-4 py-3 text-center text-slate-600 sm:table-cell">{team.drawn}</td>
					<td class="hidden px-4 py-3 text-center text-slate-600 sm:table-cell">{team.lost}</td>
					<td class="hidden px-4 py-3 text-center text-slate-600 lg:table-cell">{team.goalsFor}</td>
					<td class="hidden px-4 py-3 text-center text-slate-600 lg:table-cell"
						>{team.goalsAgainst}</td
					>
					<td class="px-4 py-3 text-center font-medium">
						<span
							class={team.goalDifference > 0
								? 'text-blue-600'
								: team.goalDifference < 0
									? 'text-red-500'
									: 'text-slate-600'}
						>
							{team.goalDifference > 0 ? '+' : ''}{team.goalDifference}
						</span>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

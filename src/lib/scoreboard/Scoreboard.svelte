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

		// Process each match to build standings
		matches.forEach((match) => {
			if (match.gol_squadra_1 == '-' || match.gol_squadra_2 == '-') return;
			// Initialize teams if not already in standings
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

			// Update match statistics
			const team1 = standings.get(match.squadra_1)!;
			const team2 = standings.get(match.squadra_2)!;

			// Update games played
			team1.played++;
			team2.played++;

			// Update goals
			team1.goalsFor += match.gol_squadra_1 as number;
			team1.goalsAgainst += match.gol_squadra_2 as number;
			team2.goalsFor += match.gol_squadra_2 as number;
			team2.goalsAgainst += match.gol_squadra_1 as number;

			// Update points and results
			if (match.gol_squadra_1 > match.gol_squadra_2) {
				// Team 1 wins
				team1.points += 3;
				team1.won++;
				team2.lost++;
			} else if (match.gol_squadra_1 < match.gol_squadra_2) {
				// Team 2 wins
				team2.points += 3;
				team2.won++;
				team1.lost++;
			} else {
				// Draw
				team1.points++;
				team2.points++;
				team1.drawn++;
				team2.drawn++;
			}

			// Update goal differences
			team1.goalDifference = team1.goalsFor - team1.goalsAgainst;
			team2.goalDifference = team2.goalsFor - team2.goalsAgainst;
		});

		// Convert to array and sort
		return Array.from(standings.values()).sort(
			(a, b) =>
				// Sort by points first, then goal difference, then goals scored
				b.points - a.points || b.goalDifference - a.goalDifference || b.goalsFor - a.goalsFor
		);
	}

	// Reactive statement to recalculate standings when matches change
	const standings = $state(calculateStandings(matches));
</script>

<div class="w-full overflow-x-auto">
	<table class="min-w-full table-auto">
		<thead class="bg-gray-100">
			<tr>
				<th class="px-4 py-2">Pos</th>
				<th class="px-4 py-2 text-left">Squadra</th>
				<th class="px-4 py-2">Punti</th>
				<th class="px-4 py-2">G</th>
				<th class="px-4 py-2">V</th>
				<th class="px-4 py-2">PG</th>
				<th class="px-4 py-2">S</th>
				<th class="px-4 py-2">GF</th>
				<th class="px-4 py-2">GS</th>
				<th class="px-4 py-2">DR</th>
			</tr>
		</thead>
		<tbody>
			{#each standings as team, i}
				<tr class="border-b hover:bg-gray-50">
					<td class="px-4 py-2 text-center">{i + 1}</td>
					<td class="px-4 py-2">{team.team}</td>
					<td class="px-4 py-2 text-center font-bold">{team.points}</td>
					<td class="px-4 py-2 text-center">{team.played}</td>
					<td class="px-4 py-2 text-center">{team.won}</td>
					<td class="px-4 py-2 text-center">{team.drawn}</td>
					<td class="px-4 py-2 text-center">{team.lost}</td>
					<td class="px-4 py-2 text-center">{team.goalsFor}</td>
					<td class="px-4 py-2 text-center">{team.goalsAgainst}</td>
					<td class="px-4 py-2 text-center">{team.goalDifference}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

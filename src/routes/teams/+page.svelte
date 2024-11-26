<script lang="ts">
	import Box from '$lib/graphics/box.svelte';

	const { data } = $props();


	console.log(data.records);

	async function getTeams() {
		const matches = await data.records;
		const teams: Set<string> = new Set();
		console.log(matches);

		for (let match of matches) teams.add(match.squadra_1);
		return teams;
	}
</script>

<Box>
	{#snippet title()}Le squadre{/snippet}

	{#await getTeams()}
		<span>ciao</span>
	{:then teams}
		<div class="flex flex-col">
			{#each teams as team}
				<a href={`teams/${team}`}>{team}</a>
			{/each}
		</div>
	{/await}
</Box>

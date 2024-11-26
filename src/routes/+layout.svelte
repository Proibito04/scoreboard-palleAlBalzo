<script lang="ts">
	import '../app.css';
	let { children } = $props();

	interface MenuItem {
		name: string;
		root: string;
	}

	const MENU: MenuItem[] = [
		{ name: 'Home', root: '/' },
		{ name: 'Marcatori', root: '/scorers' },
		{ name: 'Le squadre', root: '/teams' }
	];
</script>

<div class="-my-10 bg-green-800 py-10">
	<div class="max-w-full">
		<!-- Header -->
		<div class="py-10 text-center">
			<h1 class="text-2xl font-bold text-gray-200 sm:text-3xl">Coppa Palle Al Balzo</h1>

			<!-- Menu -->
			<!-- <div class="flex items-center justify-center gap-3 align-middle text-white underline">
				{#each MENU as menuItem}
					<a href={menuItem.root}>{menuItem.name}</a>
				{/each}
			</div> -->
		</div>
		{@render children()}

		<span class="text-xs text-white">Fatto con il ❤️ da Edoardo Balzano</span>
	</div>
</div>

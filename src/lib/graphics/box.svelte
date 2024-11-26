<script lang="ts">
	interface Props {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		title?: any;
		children: any;
	}

	let { children, title }: Props = $props();
</script>

<div class="m-3 rounded-lg bg-white p-3 shadow-sm sm:p-4">
	{#if title}
		<span class="mb-4 flex items-center text-xl font-bold text-gray-800">{@render title()}</span>
	{/if}
	{@render children()}
</div>

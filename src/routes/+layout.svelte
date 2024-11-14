<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="bg-green-800 py-10">
	{@render children()}

	<span class="text-xs text-white">Fatto con il ❤️ da Edoardo Balzano</span>
</div>

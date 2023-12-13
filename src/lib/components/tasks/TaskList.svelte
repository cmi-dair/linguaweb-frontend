<script lang="ts">
	import { taskNames, type TaskName } from '$lib/api';
	import { Checkbox, P } from 'flowbite-svelte';

	export let tasks: [...TaskName[]];

	function capitalizeFirstLetter(str: string): string {
		if (str.length === 0) return str;

		return str.charAt(0).toUpperCase() + str.slice(1);
	}
</script>

<P>Tasks</P>
<ul
	class="w-48 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-600 divide-y divide-gray-200 dark:divide-gray-600"
>
	{#each taskNames as taskName}
		<li>
			<Checkbox checked class="p-3" bind:group={tasks} value={taskName}
				>{capitalizeFirstLetter(taskName)}</Checkbox
			>
		</li>
	{/each}
</ul>

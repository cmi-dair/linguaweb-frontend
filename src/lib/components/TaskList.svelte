<script lang="ts">
	import { taskNames, type TaskName } from '$lib/utils';
	import { Checkbox } from 'flowbite-svelte';

	export let tasks: [...TaskName[]];

	function capitalizeFirstLetter(str: string): string {
		if (str.length === 0) return str; // Return the original string if it's empty

		return str.charAt(0).toUpperCase() + str.slice(1);
	}
</script>

<p class="mb-4 font-semibold text-gray-900 dark:text-white">Tasks</p>
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

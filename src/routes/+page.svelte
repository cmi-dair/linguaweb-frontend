<script lang="ts">
	import Score from '$lib/components/Score.svelte';
	import TaskList from '$lib/components/TaskList.svelte';
	import WordTask from '$lib/components/WordTask.svelte';
	import type { TaskName } from '$lib/utils';

	let score = 0;
	let maxScore = 0;

	let tasks: [...TaskName[]] = [];

	function onCheck(event: CustomEvent) {
		const isCorrect = event.detail;
		score += +isCorrect;
		maxScore++;
	}
</script>

<TaskList bind:tasks />

{#key tasks}
	{#key score}
		<WordTask on:check={onCheck} {tasks} />
	{/key}
{/key}

<Score bind:score bind:maxScore />

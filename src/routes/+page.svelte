<script lang="ts">
	import Score from '$lib/components/Score.svelte';
	import TaskList from '$lib/components/tasks/TaskList.svelte';
	import { getWordIds, postCheckWord, type TaskName } from '$lib/api';
	import { onMount } from 'svelte';
	import TaskHandler from '$lib/components/tasks/TaskHandler.svelte';

	let score = 0;
	let maxScore = 0;
	let currentWordId: number;
	let currentTask: TaskName;

	let ids: number[] = [];
	let tasks: [...TaskName[]] = ['synonyms'];
	let distractorIds: number[] = [];

	const nDistractors = 3;

	async function setNextTask() {
		if (tasks.length === 0 || ids.length === 0) {
			return;
		}
		currentTask = tasks[Math.floor(Math.random() * tasks.length)];
		currentWordId = ids[Math.floor(Math.random() * ids.length)];
		distractorIds = ids.filter((id) => id !== currentWordId);
		distractorIds = distractorIds.sort(() => Math.random() - 0.5).slice(0, nDistractors);
	}

	async function onCheck(event: CustomEvent) {
		const guessedWord = event.detail;
		const isCorrect = await postCheckWord(currentWordId, guessedWord);
		score += +isCorrect;
		maxScore++;
		if (isCorrect) {
			setNextTask();
		}
	}

	onMount(async () => {
		ids = await getWordIds();
		setNextTask();
	});

	$: if (!tasks.includes(currentTask)) setNextTask();
	$: console.log(tasks, ids, currentWordId);
</script>

<TaskList bind:tasks />
{#if tasks.length > 0 && currentWordId}
	{#key currentTask}
		{#key currentWordId}
			<TaskHandler
				bind:task={currentTask}
				bind:wordId={currentWordId}
				bind:distractorIds
				on:check={onCheck}
			/>
		{/key}
	{/key}
{:else}
	<p>Please select a task.</p>
{/if}

<Score bind:score bind:maxScore />

<script lang="ts">
	import Score from '$lib/components/Score.svelte';
	import TaskList from '$lib/components/TaskList.svelte';
	import WritingTask from '$lib/components/WritingTask.svelte';
	import { getWordIds, type TaskName } from '$lib/api';
	import { onMount } from 'svelte';
	import ListeningTask from '$lib/components/ListeningTask.svelte';
	import SpeechTask from '$lib/components/SpeechTask.svelte';

	let score = 0;
	let maxScore = 0;
	let currentWordId: number;
	let currentTask: TaskName;

	let ids: number[] = [];
	let tasks: [...TaskName[]] = [];

	async function setNextTask() {
		if (tasks.length === 0 || ids.length === 0) {
			return;
		}
		currentTask = tasks[Math.floor(Math.random() * tasks.length)];
		currentWordId = ids[Math.floor(Math.random() * ids.length)];
	}

	function onCheck(event: CustomEvent) {
		const isCorrect = event.detail;
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
</script>

<TaskList bind:tasks />

<!--It ain't pretty, could probaby be refactored.-->
{#if tasks.length > 0 && currentWordId}
	{#key currentTask}
		{#key currentWordId}
			{#if currentTask === 'listening'}
				<ListeningTask on:check={onCheck} wordId={currentWordId} />
			{:else if currentTask === 'speech'}
				<SpeechTask on:check={onCheck} wordId={currentWordId} />
			{:else}
				<WritingTask on:check={onCheck} task={currentTask} wordId={currentWordId} />
			{/if}
		{/key}
	{/key}
{:else}
	<p>Please select a task.</p>
{/if}

<Score bind:score bind:maxScore />

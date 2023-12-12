<script lang="ts">
	import type { TaskName } from '$lib/api';
	import ListeningTask from '$lib/components/tasks/ListeningTask.svelte';
	import SpeechTask from '$lib/components/tasks/SpeechTask.svelte';
	import WritingTask from '$lib/components/tasks/WritingTask.svelte';
	import { createEventDispatcher } from 'svelte';

	export let wordId: number;
	export let task: TaskName;

	const dispatch = createEventDispatcher();

	function onCheck(event: CustomEvent) {
		dispatch('check', event.detail);
	}
</script>

{#if task === 'listening'}
	<ListeningTask on:check={onCheck} {wordId} />
{:else if task === 'speech'}
	<SpeechTask on:check={onCheck} {wordId} />
{:else}
	<WritingTask on:check={onCheck} {task} {wordId} />
{/if}

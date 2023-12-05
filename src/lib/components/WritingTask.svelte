<script lang="ts">
	import { type Word, getWord, type WritingTaskName } from '$lib/api';
	import { P, Spinner } from 'flowbite-svelte';
	import TaskBase from '$lib/components/TaskBase.svelte';
	import { createEventDispatcher } from 'svelte';

	export let task: WritingTaskName;
	export let wordId: number;

	const taskDescription: Record<WritingTaskName, string> = {
		synonyms: 'Find the synonym for these words.',
		antonyms: 'Find the antonym for the words',
		description: 'What word is described?',
		jeopardy: 'Guess the word.'
	};

	let targetWord: Promise<Word> = getWord(wordId);

	let dispatch = createEventDispatcher();
	function onCheck(event: CustomEvent) {
		dispatch('check', event.detail);
	}
</script>

{#await targetWord}
	<Spinner />
{:then word}
	<TaskBase description={taskDescription[task]} {wordId} on:check={onCheck}>
		<P slot="task">{word[task]}</P>
	</TaskBase>
{:catch error}
	<P>{error.message}</P>
{/await}

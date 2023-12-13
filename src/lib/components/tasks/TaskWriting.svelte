<script lang="ts">
	import { type Word, getWord, type WritingTaskName } from '$lib/api';
	import { P, Spinner } from 'flowbite-svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import ResponseMultipleChoice from '$lib/components/tasks/ResponseMultipleChoice.svelte';

	export let task: WritingTaskName;
	export let wordId: number;
	export let distractorIds: number[];

	const taskDescription: Record<WritingTaskName, string> = {
		synonyms: 'Find the synonym for these words.',
		antonyms: 'Find the antonym for the words',
		description: 'What word is described?',
		jeopardy: 'Guess the word.'
	};

	let targetWord: Word;
	let distractors: Word[];
	let allPromises: Promise<Word>[] = [];

	let dispatch = createEventDispatcher();
	function onCheck(event: CustomEvent) {
		dispatch('check', event.detail);
	}

	onMount(async () => {
		const targetWordPromise = getWord(wordId);
		const distractorsPromise = distractorIds.map((id) => getWord(id));
		allPromises = [targetWordPromise, ...distractorsPromise];
		targetWord = await targetWordPromise;
		distractors = await Promise.all(distractorsPromise);
	});
</script>

{#if !targetWord || !distractors}
	<Spinner />
{:else}
	<P><b>{taskDescription[task]}</b></P>
	<P>{targetWord[task]}</P>
	<ResponseMultipleChoice correct={targetWord} {distractors} on:click={onCheck} />
{/if}

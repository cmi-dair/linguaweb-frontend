<script lang="ts">
	import { type Word, getWord, getSpeechTranscript } from '$lib/api';
	import { P, Spinner } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	import SpeechRecorder from '$lib/components/SpeechRecorder.svelte';

	export let wordId: number;

	const targetWord: Promise<Word> = getWord(wordId);
	let lastWord: string = '';

	let dispatch = createEventDispatcher();
	async function onStopRecording(event: CustomEvent) {
		event.preventDefault();
		const blob = event.detail;

		lastWord = await getSpeechTranscript(blob);
		dispatch('check', lastWord);
	}
</script>

{#if lastWord}
	<P>
		The word we heard was '<b>{lastWord}</b>'.
	</P>
{/if}

{#await targetWord}
	<Spinner />
{:then word}
	Please say the following word:
	<b>{word.word}</b>
	<SpeechRecorder on:stop={onStopRecording} />
{:catch error}
	<P>{error.message}</P>
{/await}

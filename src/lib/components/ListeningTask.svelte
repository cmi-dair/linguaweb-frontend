<script lang="ts">
	import { type Word, getWord, getWordAudio } from '$lib/api';
	import { P, Spinner } from 'flowbite-svelte';
	import TaskBase from '$lib/components/TaskBase.svelte';
	import { createEventDispatcher } from 'svelte';
	import AudioPlayer from './AudioPlayer.svelte';

	export let wordId: number;

	const taskDescription = 'What word do you hear?';

	let targetWord: Promise<Word> = getWord(wordId);
	let wordAudio = getWordAudio(wordId);

	let dispatch = createEventDispatcher();
	function onCheck(event: CustomEvent) {
		dispatch('check', event.detail);
	}
</script>

{#await wordAudio}
	<Spinner />
{:then audioBlob}
	<TaskBase description={taskDescription} {wordId} on:check={onCheck}>
		<AudioPlayer slot="task" {audioBlob} />
	</TaskBase>
{:catch error}
	<P>{error.message}</P>
{/await}

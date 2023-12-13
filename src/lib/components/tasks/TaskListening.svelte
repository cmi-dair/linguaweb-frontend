<script lang="ts">
	import { getWordAudio } from '$lib/api';
	import { P, Spinner } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	import AudioPlayer from '../AudioPlayer.svelte';
	import ResponseInput from './ResponseInput.svelte';

	export let wordId: number;

	let wordAudio = getWordAudio(wordId);

	let dispatch = createEventDispatcher();
	function onCheck(event: CustomEvent) {
		dispatch('check', event.detail);
	}
</script>

{#await wordAudio}
	<Spinner />
{:then audioBlob}
	<P><b>'What word do you hear?'</b></P>
	<AudioPlayer {audioBlob} />
	<ResponseInput on:keyup={onCheck} />
{:catch error}
	<P>{error.message}</P>
{/await}

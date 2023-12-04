<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { onDestroy, onMount } from 'svelte';

	export let audioBlob: Blob;

	const audioUrl = URL.createObjectURL(audioBlob);
	let audioRef: HTMLAudioElement;

	function playAudio() {
		audioRef.play();
	}

	onDestroy(() => {
		URL.revokeObjectURL(audioUrl);
	});

	onMount(() => {
		playAudio();
	});
</script>

<audio bind:this={audioRef} src={audioUrl} />

<Button on:click={playAudio}>Play</Button>

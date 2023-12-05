<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';

	const dispatch = createEventDispatcher();

	let mediaRecorder: MediaRecorder;
	let media: Blob[] = [];
	let recordText: string = 'Record';

	function toggleRecording(event: Event) {
		event.preventDefault();
		if (mediaRecorder.state === 'recording') {
			mediaRecorder.stop();
			recordText = 'Record';
			return;
		}
		mediaRecorder.start();
		recordText = 'Stop';
	}

	onMount(async () => {
		const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
		mediaRecorder = new MediaRecorder(stream);
		mediaRecorder.ondataavailable = (e) => media.push(e.data);
		mediaRecorder.onstop = async function () {
			const audio = document.querySelector('audio');
			if (!audio) {
				return;
			}
			const fileName = 'audio.wav';
			const blob = new Blob(media, { type: 'audio/wav' });
			const file = new File([blob], fileName);
			media = [];
			dispatch('stop', file);
		};
	});

	onDestroy(() => {
		mediaRecorder.stream.getTracks().forEach((track) => track.stop());
		mediaRecorder.stop();
	});
</script>

<audio />
<Button on:click={toggleRecording}>{recordText}</Button>

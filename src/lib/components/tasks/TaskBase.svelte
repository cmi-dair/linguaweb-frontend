<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { postCheckWord } from '$lib/api';
	import { P } from 'flowbite-svelte';

	export let wordId: number;
	export let description: string;

	let inputElement: HTMLInputElement;
	let lastGuess: string = '';

	let dispatch = createEventDispatcher();

	async function checkResponse(e: KeyboardEvent) {
		e.preventDefault();
		if (e.key !== 'Enter' || !inputElement || inputElement.value === '') {
			return;
		}

		const isCorrect = await postCheckWord(wordId, inputElement.value);
		dispatch('check', isCorrect);
		if (!isCorrect) {
			lastGuess = inputElement.value.toLowerCase();
		}
	}

	onMount(() => {
		inputElement.focus();
	});
</script>

{#if lastGuess}
	<P>
		The answer '<b>{lastGuess}</b>' was incorrect.
	</P>
{/if}

<P>{description}</P>
<slot name="task" />

<input
	class="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
	type="text"
	bind:this={inputElement}
	on:keyup={checkResponse}
/>

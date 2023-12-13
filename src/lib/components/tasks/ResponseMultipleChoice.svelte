<script lang="ts">
	import type { Word } from '$lib/api';
	import { Button } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';

	export let correct: Word;
	export let distractors: Word[];

	const choices = [correct, ...distractors]
		.map((word) => word.word)
		.sort(() => Math.random() - 0.5);
	const dispatch = createEventDispatcher();

	let colors = Array(choices.length).fill('blue');

	function checkResponse(event: Event, choice: string) {
		event.preventDefault();
		dispatch('click', choice);
		const index = choices.indexOf(choice);
		if (choice === correct.word) {
			colors[index] = 'green';
		} else {
			colors[index] = 'red';
		}
	}
</script>

{#each choices as choice, index}
	<span>
		<Button color={colors[index]} on:click={(e) => checkResponse(e, choice)}>{choice}</Button>
	</span>
{/each}

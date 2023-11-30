<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { getTaskDescription, getNextTask, WordTask, type TaskName } from '../utils';
	import { postCheckWord } from '$lib/api';
	import { Spinner, P, Hr } from 'flowbite-svelte';

	export let tasks: [...TaskName[]];

	let isCorrect: boolean | null = null;

	let taskDescription: string;
	let task: Promise<WordTask>;
	let inputElement: HTMLInputElement;
	let lastGuess: string = '';
	const hasTasks = tasks.length > 0;

	let dispatch = createEventDispatcher();

	onMount(() => {
		if (!hasTasks) {
			return;
		}
		const taskName = tasks[Math.floor(Math.random() * tasks.length)];
		taskDescription = getTaskDescription(taskName);
		task = getNextTask(taskName);
	});

	async function checkResponse(e: KeyboardEvent, taskContent: WordTask) {
		e.preventDefault();
		if (e.key !== 'Enter' || !inputElement || inputElement.value === '') {
			return;
		}

		isCorrect = await postCheckWord(taskContent.id, inputElement.value);
		dispatch('check', isCorrect);
		if (!isCorrect) {
			lastGuess = inputElement.value;
		}
	}

	$: if (task) {
		task.then(() => {
			if (inputElement) {
				inputElement.focus();
			}
		});
	}
</script>

<Hr />
{#if !hasTasks}
	<P class="text-center">No tasks selected</P>
{:else}
	{#if lastGuess}
		<P>
			The answer '<b>{lastGuess}</b>' was incorrect.
		</P>
	{/if}

	{#if task}
		{#await task}
			<Spinner />
		{:then taskContent}
			<P><b>{taskDescription}</b></P>
			<P>{taskContent.task}</P>
			<input
				class="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
				type="text"
				bind:this={inputElement}
				on:keyup={(e) => checkResponse(e, taskContent)}
			/>
		{/await}
	{/if}
{/if}

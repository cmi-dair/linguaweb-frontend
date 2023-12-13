<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	let inputElement: HTMLInputElement;

	const dispatch = createEventDispatcher();

	function checkResponse(event: KeyboardEvent) {
		event.preventDefault();
		dispatch('keyup', inputElement.value);
	}

	onMount(() => {
		inputElement.focus();
	});
</script>

<input
	class="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
	type="text"
	bind:this={inputElement}
	on:keyup={checkResponse}
/>

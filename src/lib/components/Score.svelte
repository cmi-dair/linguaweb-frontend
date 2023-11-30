<script lang="ts">
	import { P } from 'flowbite-svelte';

	export let score: number;
	export let maxScore: number;

	let color: string;
	$: {
		if (score < 0.5 * maxScore) {
			color = 'red';
		} else if (score < 0.75 * maxScore) {
			color = 'orange';
		} else {
			color = 'green';
		}
	}
</script>

<div class="flex flex-col items-center justify-right w-full h-full">
	<P>
		Score: <span style="color: {color}">{score} / {maxScore} </span>
	</P>
</div>

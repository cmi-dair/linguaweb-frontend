import { getWordSynonyms, getWordAntonyms, getWordDescription, getWordJeopardy } from '$lib/api';

export type TaskName = 'synonyms' | 'antonyms' | 'description' | 'jeopardy';
export const taskNames: TaskName[] = ['synonyms', 'antonyms', 'description', 'jeopardy'];

export class WordTask {
	readonly id: number;
	readonly task: string;

	constructor(id: number, task: string) {
		this.id = id;
		this.task = task;
	}
}

const taskDescription: Record<TaskName, string> = {
	synonyms: 'Find the synonym for these words.',
	antonyms: 'Find the antonym for the words',
	description: 'What word is described?',
	jeopardy: 'Guess the word.'
};

export function getTaskDescription(name: TaskName) {
	return taskDescription[name];
}

export async function getNextTask(name: TaskName) {
	if (name === 'synonyms') {
		const synonym = await getWordSynonyms();
		return new WordTask(synonym.id, synonym.synonyms.join(', '));
	}
	if (name === 'antonyms') {
		const antonym = await getWordAntonyms();
		return new WordTask(antonym.id, antonym.antonyms.join(', '));
	}
	if (name === 'description') {
		const description = await getWordDescription();
		return new WordTask(description.id, description.description);
	}
	const jeopardy = await getWordJeopardy();
	return new WordTask(jeopardy.id, jeopardy.jeopardy);
}

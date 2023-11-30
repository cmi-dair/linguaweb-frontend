const API_ROUTE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export interface WordDescription {
	id: number;
	description: string;
}

export interface WordSynonyms {
	id: number;
	synonyms: string[];
}

export interface WordAntonyms {
	id: number;
	antonyms: string[];
}

export interface WordJeopardy {
	id: number;
	jeopardy: string;
}

export interface WordCheckRequest {
	word: string;
}

export const getWordDescription = async (): Promise<WordDescription> => {
	const response = await fetch(`${API_ROUTE}/text/description`);
	return response.json();
};

export const getWordSynonyms = async (): Promise<WordSynonyms> => {
	const response = await fetch(`${API_ROUTE}/text/synonyms`);
	return response.json();
};

export const getWordAntonyms = async (): Promise<WordAntonyms> => {
	const response = await fetch(`${API_ROUTE}/text/antonyms`);
	return response.json();
};

export const getWordJeopardy = async (): Promise<WordJeopardy> => {
	const response = await fetch(`${API_ROUTE}/text/jeopardy`);
	return response.json();
};

export const postCheckWord = async (wordId: number, word: string): Promise<boolean> => {
	const response = await fetch(`${API_ROUTE}/text/check/${wordId}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ word })
	});
	return response.json();
};

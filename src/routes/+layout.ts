import type { matchDay, ScoreCard } from '../types.js';
import Papa from 'papaparse';

async function loadData<T>(
	fetchFun: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>,
	url: string
) {
	const response = await fetchFun(url);
	const csvText = await response.text();

	const result = Papa.parse<T>(csvText, {
		header: true,
		skipEmptyLines: true,
		dynamicTyping: true
	});

	return result.data;
}

export async function load({ fetch }) {
	const urlScoreboard =
		'https://docs.google.com/spreadsheets/d/e/2PACX-1vQci2-VG02dwtBkEWJvXgR9nUS9MPLoiW50o492fY5aZFrfeKSggnRvokynTt9ZsNGCW7hzNh2OoF1d/pub?gid=0&single=true&output=csv';

	const urlScorer =
		'https://docs.google.com/spreadsheets/d/e/2PACX-1vQci2-VG02dwtBkEWJvXgR9nUS9MPLoiW50o492fY5aZFrfeKSggnRvokynTt9ZsNGCW7hzNh2OoF1d/pub?gid=1011596014&single=true&output=csv';

	return {
		scoreboard: loadData<matchDay>(fetch, urlScoreboard),
		scorers: loadData<ScoreCard>(fetch, urlScorer)
	};
}

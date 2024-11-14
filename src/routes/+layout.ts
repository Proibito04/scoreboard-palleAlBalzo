import { parse } from 'csv-parse/sync';

// +page.js
export async function load({ fetch }) {
	const url =
		'https://docs.google.com/spreadsheets/d/e/2PACX-1vQci2-VG02dwtBkEWJvXgR9nUS9MPLoiW50o492fY5aZFrfeKSggnRvokynTt9ZsNGCW7hzNh2OoF1d/pub?output=csv';
	const response = await fetch(url);
	const csvText = await response.text();

	const records = parse(csvText, {
		columns: true,
		skip_empty_lines: true,
		trim: true
	});

	return { records };
}

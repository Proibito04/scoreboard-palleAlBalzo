export interface matchDay {
	id: number;
	squadra_1: string;
	squadra_2: string;
	gol_squadra_1: string | number;
	gol_squadra_2: string | number;
	data: string;
	giornata: string;
}

export interface ScoreCard {
	[key: `${number}`]: number | null;
	squadra: string;
	MARCATORI: string;
}

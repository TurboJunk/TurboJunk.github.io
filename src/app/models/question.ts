export class Question {
	id: number;
	answer: string;
	question: string;
	value: number;
	category_id: number;
}

export class GifAnswer {
	answer: string;
	forced: boolean;
	image: string;
}

import { Question } from "./../../models/question";
import { Component, Input, OnInit } from "@angular/core";
import { QuizService } from "src/app/services/quiz.service";

@Component({
	selector: "app-question",
	templateUrl: "./question.component.html",
	styleUrls: ["./question.component.scss"],
})
export class QuestionComponent implements OnInit {
	@Input() question: Question;
  answer = "";
  correct: boolean;
  answerGif: string;
  loadingGif: boolean;

	constructor(private _quizService:QuizService) {}

	ngOnInit(): void {}

	processAnswer(): void {
    this.correct = this.answer.toLowerCase() === this.question.answer.toLowerCase();
    this.loadingGif = true;
    this._quizService.getGif(this.correct).subscribe(x => {
      this.answerGif = x;
      this.loadingGif = false;
    });
  }
}

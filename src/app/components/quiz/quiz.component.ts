import { Observable } from 'rxjs';
import { Question } from './../../models/question';
import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  questions$: Observable<Question[]>;

  constructor(private _quizService: QuizService) { }

  ngOnInit(): void {
    this.questions$ = this._quizService.questions()
  }

}

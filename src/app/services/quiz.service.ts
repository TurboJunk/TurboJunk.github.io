import { map } from "rxjs/operators";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { GifAnswer, Question } from "../models/question";

@Injectable({
	providedIn: "root",
})
export class QuizService {
	private readonly quizUrl = "http://jservice.io/api/random";
	private readonly gifUrl = "https://yesno.wtf/api";

	private _questions = new Subject<Question[]>();
	public questions$ = this._questions.asObservable();

	constructor(private _http: HttpClient) {}

	get<T>(url: string, params?: HttpParams): Observable<T> {
		return this._http.get<T>(url, { params: params });
	}

	post<TReq, TRes>(url: string, entity: TReq): Observable<TRes> {
		return this._http.post<TRes>(url, entity);
	}

	questions(): Observable<Question[]> {
		this.getQuestions().subscribe(x => this._questions.next(x));
		return this.questions$;
	}

	getQuestions(): Observable<Question[]> {
		let params = new HttpParams();
		params = params.set("count", 9);
		return this.get<Question[]>(this.quizUrl, params);
	}

	getGif(correct: boolean): Observable<string> {let params = new HttpParams();
		params = params.append("force", correct ? "yes" : "no");
		return this.get<GifAnswer>(this.gifUrl, params).pipe(map(x => x.image));
	}
}

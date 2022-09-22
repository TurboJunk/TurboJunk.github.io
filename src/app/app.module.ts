import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { LayoutModule } from "@angular/cdk/layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { MenuComponent } from "./components/menu/menu.component";
import { AdressFormComponent } from "./components/adress-form/adress-form.component";
import { TableComponent } from "./components/table/table.component";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { TreeComponent } from "./components/tree/tree.component";
import { MatTreeModule } from "@angular/material/tree";
import { MatStepperModule } from "@angular/material/stepper";
import { MatChipsModule } from "@angular/material/chips";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { StepperFormComponent } from "./components/stepper-form/stepper-form.component";
import { OtherComponent } from "./components/other/other.component";
import { QuizComponent } from "./components/quiz/quiz.component";
import { QuestionComponent } from "./components/question/question.component";
import { HttpClientModule } from "@angular/common/http";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { provideMessaging, getMessaging } from "@angular/fire/messaging";

@NgModule({
	declarations: [
		AppComponent,
		MenuComponent,
		DashboardComponent,
		AdressFormComponent,
		TableComponent,
		TreeComponent,
		StepperFormComponent,
		OtherComponent,
		QuizComponent,
		QuestionComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,
		ServiceWorkerModule.register("ngsw-worker.js", {
			enabled: environment.production,
			// Register the ServiceWorker as soon as the application is stable
			// or after 30 seconds (whichever comes first).
			registrationStrategy: "registerWhenStable:30000",
		}),
		LayoutModule,
		MatToolbarModule,
		MatButtonModule,
		MatSidenavModule,
		MatIconModule,
		MatListModule,
		MatGridListModule,
		MatCardModule,
		MatMenuModule,
		MatInputModule,
		MatSelectModule,
		MatRadioModule,
		ReactiveFormsModule,
		MatTableModule,
		MatPaginatorModule,
		MatSortModule,
		MatTreeModule,
		MatStepperModule,
		MatChipsModule,
		FormsModule,
		MatProgressBarModule,
		MatProgressSpinnerModule,
		MatTooltipModule,
    MatSnackBarModule,
		provideFirebaseApp(() => initializeApp(environment.firebase)),
		provideMessaging(() => getMessaging()),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}

import { QuizComponent } from './components/quiz/quiz.component';
import { TableComponent } from './components/table/table.component';
import { MenuComponent } from "./components/menu/menu.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { AdressFormComponent } from "./components/adress-form/adress-form.component";
import { TreeComponent } from './components/tree/tree.component';
import { StepperFormComponent } from './components/stepper-form/stepper-form.component';
import { OtherComponent } from './components/other/other.component';

const routes: Routes = [
	{
		title: "Menu",
		path: "",
		component: MenuComponent,
		children: [
			{ title: "quiz", path: "", component: QuizComponent },
			{ title: "dashboard", path: "dashboard", component: DashboardComponent },
			{ title: "adressform", path: "adressform", component: AdressFormComponent },
			{ title: "table", path: "table", component: TableComponent },
			{ title: "tree", path: "tree", component: TreeComponent },
			{ title: "stepperform", path: "stepperform", component: StepperFormComponent },
			{ title: "other", path: "other", component: OtherComponent },
		],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}

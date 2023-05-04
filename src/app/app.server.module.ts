import { NgModule } from "@angular/core";
import { ServerModule } from "@angular/platform-server";

import { AppModule } from "./app.module";
import { AppComponent } from "./app.component";
import { Routes, RouterModule } from "@angular/router";
import { AppShellComponent } from "./app-shell/app-shell.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { LayoutModule } from "@angular/cdk/layout";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatRadioModule } from "@angular/material/radio";
import { MatMenuModule } from "@angular/material/menu";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";

const routes: Routes = [{ path: "shell", component: AppShellComponent }];

@NgModule({
	imports: [
		AppModule,
		ServerModule,
		RouterModule.forRoot(routes),
		MatToolbarModule,
		MatSidenavModule,
		MatIconModule,
		MatListModule,
	],
	bootstrap: [AppComponent],
	declarations: [AppShellComponent],
})
export class AppServerModule {}

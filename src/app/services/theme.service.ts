import { BreakpointObserver } from "@angular/cdk/layout";
import { Injectable } from "@angular/core";
import { Meta } from "@angular/platform-browser";

@Injectable({
	providedIn: "root",
})
export class ThemeService {
	themes: Theme[] = [
		{ name: "Deep Purple & Amber", class: "deeppurple-amber", mainColor: "#673ab7", backgroundColor: "#fafafa" },
		{ name: "Indigo & Pink", class: "indigo-pink", mainColor: "#3f51b5", backgroundColor: "#fafafa" },
		{ name: "Pink & Blue-grey", class: "pink-bluegrey", mainColor: "#c2185b", backgroundColor: "#303030" },
		{ name: "Purple & Green", class: "purple-green", mainColor: "#7b1fa2", backgroundColor: "#303030" }
	];
	currentTheme: Theme;

	constructor(private breakpointObserver: BreakpointObserver, private _meta: Meta) {
		if (this.breakpointObserver.isMatched("(prefers-color-scheme: dark)")) {
			this.change(this.themes[3]);
		} else {
			this.change(this.themes[1]);
		}
	}

	change(theme: Theme): void {
		if (this.currentTheme)
			document.body.classList.replace(this.currentTheme.class, theme.class);
		else
			document.body.classList.add(theme.class);
		this.currentTheme = theme;
		this._meta.updateTag({ name: "theme-color", content: theme.mainColor });
		this._meta.updateTag({ name: "background_color", content: theme.backgroundColor });
	}
}

export class Theme {
	name: string;
	class: string;
	mainColor: string;
	backgroundColor: string;
}

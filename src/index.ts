import {
	MainToolbar,
	EditorToolbar,
	Note,
	FilterMenu,
	SortMenu,
} from "./components";
import "./style.css";
import Muuri from "muuri";

document.getElementById("main-toolbar-root").replaceWith(MainToolbar);
document.getElementById("editor-toolbar-root").replaceWith(EditorToolbar);
// document.getElementById("filter-menu-root").replaceWith(FilterMenu());
// document.getElementById("sort-menu-root").replaceWith(SortMenu());

const canvas = document.getElementById("canvas");

interface NoteData {
	position: number;
	color: string;
	autoHeight: boolean;
	content: string;
}

export { NoteData };

const noteData: NoteData[] = [
	{
		position: 0,
		color: "c1",
		autoHeight: true,
		content: `Utorak, 25.08.2020.</br>- 09:25 - Buđenje</br>- 09:50 - Popisati problematične stvari za vježbati u autoškoli, kava</br>- 09:55 - Spremiti se</br>- 10:05 - Do autoškole</br>- 10:15 - Vožnja</br>- 11:45 - Idem doma</br>- 11:55 - Doma, predahnuti, reddit</br>- 12:11 - CS:GO</br>- 12:35 - Jesti</br>- 12:50 - Odnijeti smeće, oprati suđe</br>- 13:22 - Git changes, cleanup</br>- 13:36 - Noteri note changes</br>- 13:35 - Kreirati filter, sort menije u htmlu`,
	},
	{
		position: 1,
		color: "c1",
		autoHeight: false,
		content: `BAUHAUS</br>- Zemlja, tegle</br>- Kistovi, lak / lazura, brus papir</br>- Ljepilo za drvo</br>- Listovi za pile</br>- Žica</br>- Kliješta za žicu</br>- Pila s više nastavaka</br>- Libela</br>- Kutomjer, kutnik</br>- Nosači za police</br>- Lijepljena ploča</br>- profil za montažu</br></br>PEVEC</br>- Stege</br>- Svrdla</br>- Metalna ploča`,
	},
	{
		position: 2,
		color: "c1",
		autoHeight: false,
		content: `KNJIGE</br>Front-End Web Development - 257 / 469 - 212</br>Sprint #1 - Ch 13, 14 - 36 str</br>Sprint #2 - Part 3 - 72 str`,
	},
	{
		position: 3,
		color: "c1",
		autoHeight: true,
		content: `Alternate terminal - Bash, Git Bash, Powershell? - OR CMDER OR MINGW</br>Sass</br>CSS frameworks - Bootstrap, Tailwind CSS, Materialize, Bulma</br>Git & Github</br>NPM, Yarn</br>Axios</br>Webpack, Parcel</br></br>- Deployment</br>- Domain registration - Namecheap, Google Domains</br>- Managed hosting - InMotion, Hostgator, Bluehost</br>- Static Hosting - Netlify, Github Pages</br>- SSL</br>- SSH</br>- CLI, Git</br></br>JS Framework</br>React, pa Vue, pa možda Angular</br>Svelte - crash course</br>State Management - Redux, Context API - Vuex</br></br>GraphQL - Apollo Client</br>Server Side Rendering - NEXT (React), NUXT (Vue)`,
	},
];

noteData.forEach((data) => {
	canvas.appendChild(Note(data));
});

var grid = new Muuri(".grid", { dragEnabled: true });

// import { markupToNodeList, nodeListToMarkup, nodeListToDOM } from "./parser";

// const markupString: string = "This [b]i[f4]s [#b]some [i]te[#f4]xt.";
// let nodeList = markupToNodeList(markupString);
// let DOMString = nodeListToDOM(nodeList);

// const container: HTMLElement = document.getElementById("container");

// DOMString =
// 	"</br>This is the generated line with non-nested spans.</br>" + DOMString;
// container.innerHTML += DOMString;

// let weapons = {
// 	weapons: [
// 		{
// 			name: "AK-47",
// 			caliber: "7.62mm",
// 			type: "assault rifle",
// 		},
// 		{
// 			name: "Glock 17",
// 			caliber: "9mm",
// 			type: "personal handgun",
// 		},
// 		{
// 			name: "Colt M1911",
// 			caliber: ".45 ACP",
// 			type: "service handgun",
// 		},
// 	],
// };

// const Handlebars = require("handlebars");
// const App = require("./HBSComponents/App.hbs")();
// Handlebars.registerPartial("Toolbar", require("./HBSComponents/Toolbar.hbs")());
// Handlebars.registerPartial(
// 	"EditorToolbar",
// 	require("./HBSComponents/EditorToolbar.hbs")()
// );

// const entry: HTMLElement = document.getElementById("entry");
// entry.innerHTML = App;

// const editorBox: HTMLElement = document.getElementById("editor-box");
// const buttonB: HTMLElement = document.getElementById("bold");
// const buttonI: HTMLElement = document.getElementById("italic");
// const buttonF2: HTMLElement = document.getElementById("f2");
// const buttonF3: HTMLElement = document.getElementById("f3");
// const buttonF4: HTMLElement = document.getElementById("f4");

// editorBox.addEventListener("click", (e: Event) => {
// 	changeCursorPosition(e);
// });

// buttonB.addEventListener("click", (e: Event) => {
// 	let selection: Selection = window.getSelection();
// 	let anchorNode: Node = selection.anchorNode;
// 	let [startIndex, endIndex] = getTextSelection();
// 	changeEditorState(e, "bold");
// 	editorBox.focus();
// 	setTextSelection(anchorNode, startIndex, endIndex);
// });

// buttonI.addEventListener("click", (e: Event) => {
// 	changeEditorState(e, "italic");
// });

// enum FontSize {
// 	F2,
// 	F3,
// 	F4,
// }

// var editorState: {
// 	bold: boolean;
// 	italic: boolean;
// 	fontSize: FontSize;
// } = {
// 	bold: false,
// 	italic: false,
// 	fontSize: FontSize.F3,
// };

// // selection.anchorOffset - startIndex; focusOffset - endIndex

// function insertTextStyling(indexes: number[]) {
// 	let [startIndex, endIndex] = indexes;

// 	let attributes: string[] = [];
// 	if (editorState.bold) {
// 		attributes.push("b");
// 	}

// 	let attributesString: string = attributes.join(" ");
// 	let spanStringStart: string = `<span class=${attributesString}>`;
// 	let spanStringEnd: string = "</span>";

// 	let iHTML: string = editorBox.innerHTML;
// 	let newHTML: string =
// 		iHTML.slice(0, startIndex) +
// 		spanStringStart +
// 		iHTML.slice(startIndex, endIndex) +
// 		spanStringEnd +
// 		iHTML.slice(endIndex);

// 	editorBox.innerHTML = newHTML;
// }

// function getTextSelection() {
// 	let selection: Selection = window.getSelection();
// 	let startIndex: number = selection.anchorOffset;
// 	let endIndex: number = selection.focusOffset;

// 	return [startIndex, endIndex];
// }

// function setTextSelection(
// 	anchorNode: Node,
// 	startIndex: number,
// 	endIndex: number
// ) {
// 	let selection: Selection = window.getSelection();
// 	selection.setBaseAndExtent(anchorNode, startIndex, anchorNode, endIndex);
// }

// function changeCursorPosition(e: Event) {
// 	let selection: Selection = window.getSelection();
// 	console.log(selection);
// }

// function changeEditorState(e: Event, identifier: string) {
// 	switch (identifier) {
// 		case "bold":
// 			editorState.bold = !editorState.bold;
// 			changeButtonDecoration(buttonB, editorState.bold);
// 			let indexes: number[] = getTextSelection();
// 			insertTextStyling(indexes);
// 			break;

// 		case "italic":
// 			editorState.italic = !editorState.italic;
// 			changeButtonDecoration(buttonI, editorState.italic);
// 			break;
// 	}
// }

// function changeButtonDecoration(button: Element, display: boolean) {
// 	if (display) {
// 		button.classList.add("toggled");
// 	} else {
// 		button.classList.remove("toggled");
// 	}
// }

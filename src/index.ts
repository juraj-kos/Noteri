import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "./style.css";
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

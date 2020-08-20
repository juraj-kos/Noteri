import { buttonClick } from "./editor";

class Toolbar {
	buildElement(
		buttonData: string[][],
		containerName: string,
		prefix: string
	) {
		const rootContainer: HTMLElement = this.createRootElement(
			containerName
		);
		this.appendButtons(rootContainer, buttonData, containerName, prefix);

		return rootContainer;
	}

	createRootElement(containerName: string) {
		const rootContainer: HTMLElement = document.createElement("div");
		rootContainer.setAttribute("class", containerName);
		rootContainer.setAttribute("id", containerName);

		return rootContainer;
	}

	appendButtons(
		parentElement: HTMLElement,
		buttonData: string[][],
		containerName: string,
		prefix: string
	) {
		buttonData.forEach((buttonData) => {
			let [buttonName, buttonLabel] = buttonData;

			let buttonDiv: HTMLElement = this.createButtonElement(
				`${containerName}-button`,
				prefix,
				buttonName
			);

			let buttonLabelDiv: HTMLElement = document.createElement("div");
			buttonLabelDiv.setAttribute("class", "button-label");
			buttonLabelDiv.textContent = buttonLabel;
			buttonDiv.appendChild(buttonLabelDiv);

			parentElement.appendChild(buttonDiv);
		});
	}

	createButtonElement(className: string, prefix: string, buttonName: string) {
		let buttonDiv: HTMLElement = document.createElement("div");
		buttonDiv.setAttribute("class", className);
		buttonDiv.setAttribute("id", `${prefix}-${buttonName}`);

		this.appendSVG(buttonDiv, prefix, buttonName);

		return buttonDiv;
	}

	appendSVG(parentElement: HTMLElement, prefix: string, buttonName: string) {
		let { iconString, dimensions } = this.loadSVGString(prefix, buttonName);
		let updatedIconString = this.updateSVGString(
			iconString,
			dimensions,
			prefix
		);

		parentElement.innerHTML += updatedIconString;
	}

	loadSVGString(prefix: string, buttonName: string) {
		let iconString: string = require(`./Media/Icons/icon-${prefix}-${buttonName}.svg`);

		var viewBoxIndex: number = iconString.indexOf("viewBox");
		var viewBoxString: string = iconString.slice(
			viewBoxIndex + 13,
			viewBoxIndex + 18
		);
		var dimensions: string[] = viewBoxString.split(" ");

		return { iconString, dimensions };
	}

	updateSVGString(iconString: string, dimensions: string[], prefix: string) {
		iconString =
			iconString.slice(0, 4) +
			` width="${dimensions[0]}" height="${dimensions[1]}"` +
			iconString.slice(4);

		iconString =
			iconString.slice(0, 4) +
			` class="${prefix}-icon"` +
			iconString.slice(4);

		return iconString;
	}
}

const MainToolbarInstance: Toolbar = new Toolbar();
const MainToolbar: HTMLElement = MainToolbarInstance.buildElement(
	[
		["user", "User"],
		["create", "Create Note"],
		["filter", "Filter Notes"],
		["sort", "Sort Notes"],
		["select", "Select Multiple Notes"],
		["settings", "Settings"],
	],
	"main-toolbar",
	"mtb"
);

class EditorToolbarClass extends Toolbar {
	createButtonElement(className: string, prefix: string, buttonName: string) {
		let buttonDiv: HTMLElement = document.createElement("div");
		buttonDiv.setAttribute("id", `${prefix}-${buttonName}`);

		if (buttonName === "text-size") {
			buttonDiv.setAttribute(
				"class",
				`${className} button-${buttonName}`
			);
			this.appendTextSizeSVG(buttonDiv, prefix, buttonName);
		} else if (buttonName === "text-align") {
			buttonDiv.setAttribute(
				"class",
				`${className} button-${buttonName}`
			);
			let alignNames: string[] = [
				"align-left",
				"align-center",
				"align-right",
			];

			alignNames.forEach((iconName) => {
				this.appendSVG(buttonDiv, prefix, iconName);
			});
		} else {
			buttonDiv.setAttribute("class", className);
			this.appendSVG(buttonDiv, prefix, buttonName);
		}

		console.log("Adding event listener to: " + buttonName);
		buttonDiv.addEventListener("click", (e: Event) => {
			buttonClick(buttonName);
		});

		return buttonDiv;
	}

	appendTextSizeSVG(
		parentElement: HTMLElement,
		prefix: string,
		buttonName: string
	) {
		let { iconString, dimensions } = this.loadSVGString(prefix, buttonName);

		for (let index = 0; index < 5; index++) {
			let [width, height] = dimensions;
			let newWidth = parseInt(width) * (0.4 + 0.15 * index);
			let newHeight = parseInt(height) * (0.4 + 0.15 * index);
			let newDimension = [newWidth.toString(), newHeight.toString()];

			let updatedIconString = this.updateSVGString(
				iconString,
				newDimension,
				prefix
			);

			parentElement.innerHTML += updatedIconString;
		}
	}
}
const EditorToolbarInstance: Toolbar = new EditorToolbarClass();
const EditorToolbar: HTMLElement = EditorToolbarInstance.buildElement(
	[
		["text-size", "Text Size"],
		["bold", "Bold"],
		["italic", "Italic"],
		["color", "Color"],
		["bullet-list", "Insert Bullet List"],
		["number-list", "Insert Number List"],
		["underline", "Underline"],
		["strikethrough", "Strikethrough"],
		["text-align", "Text Align"],
		["alert", "Insert Alert"],
		["checkbox", "Insert Checkbox"],
	],
	"editor-toolbar",
	"etb"
);

const NoteToolbarInstance: Toolbar = new Toolbar();
const NoteToolbar: HTMLElement = NoteToolbarInstance.buildElement(
	[
		["tag", "Tag"],
		["color", "Color"],
		["scale", "Scale"],
		["duplicate", "Duplicate"],
		["archive", "Archive"],
		["trash", "Trash"],
		["maximize", "Maximize"],
		["pin", "Pin"],
	],
	"note-toolbar",
	"ntb"
);

const Note = () => {
	const rootContainer: HTMLElement = document.createElement("div");
	rootContainer.setAttribute("class", "note");

	const editorContainer: HTMLElement = document.createElement("div");
	editorContainer.setAttribute("class", "note-content");
	editorContainer.setAttribute("role", "textbox");
	editorContainer.setAttribute("contenteditable", "true");

	let spanString: string = `<span
	>Let’s add just a tiny bit of text to test out the
	formatting on different sizes of notes. This is one
	line.<br />This is a new line.<br /><br />This is a line
	after a newline.</span>`;

	editorContainer.innerHTML = spanString;
	rootContainer.appendChild(editorContainer);
	rootContainer.appendChild(NoteToolbar.cloneNode(true));

	let otherButtons: Toolbar = new Toolbar();
	let expandTags: HTMLElement = otherButtons.createButtonElement(
		"expand-tags",
		"ntb",
		"expand-tags"
	);
	let resizeNote: HTMLElement = otherButtons.createButtonElement(
		"resize-note",
		"ntb",
		"resize"
	);

	rootContainer.appendChild(expandTags);
	rootContainer.appendChild(resizeNote);

	return rootContainer;
};

export { MainToolbar, EditorToolbar, Note };

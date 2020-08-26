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
		["scale", "Auto-Height"],
		["duplicate", "Duplicate"],
		["archive", "Archive"],
		["trash", "Trash"],
		["maximize", "Maximize"],
		["pin", "Pin"],
	],
	"note-toolbar",
	"ntb"
);

const Note = (autoHeight: boolean = false) => {
	const itemContainer: HTMLElement = document.createElement("div");
	itemContainer.setAttribute("class", "item");

	const noteContainer: HTMLElement = document.createElement("div");
	noteContainer.setAttribute("class", "note");

	const editorContainer: HTMLElement = document.createElement("div");
	editorContainer.setAttribute(
		"class",
		`note-content ${autoHeight ? "auto-height" : ""}`
	);
	editorContainer.setAttribute("role", "textbox");
	editorContainer.setAttribute("contenteditable", "true");

	let spanString: string = `<span
	>Let’s add just a tiny bit of text to test out the
	formatting on different sizes of notes. This is one
	line.<br />This is a new line.<br /><br />This is a line
	after a newline.<br /><br />This is a line
	after a newline.<br /><br />This is a line
	after a newline.<br /><br />This is a line
	after a newline.<br /><br />This is a line
	after a newline.<br /><br />This is a line
	after a newline.<br /><br />This is a line
	after a newline.<br /><br />This is a line
	after a newline.</span>`;

	editorContainer.innerHTML = spanString;
	noteContainer.appendChild(editorContainer);
	let NoteToolbarBase: Node = NoteToolbar.cloneNode(true);
	let dummyBlock: HTMLElement = document.createElement("div");
	dummyBlock.setAttribute("class", "note-toolbar-dummy");
	NoteToolbarBase.appendChild(dummyBlock);
	noteContainer.appendChild(NoteToolbarBase);

	let otherButtons: Toolbar = new Toolbar();
	let resizerBottom: HTMLElement = otherButtons.createButtonElement(
		"resizer-bottom",
		"note",
		"resizer-bottom"
	);
	let resizerRight: HTMLElement = otherButtons.createButtonElement(
		"resizer-right",
		"note",
		"resizer-right"
	);

	noteContainer.appendChild(resizerBottom);
	noteContainer.appendChild(resizerRight);

	itemContainer.appendChild(noteContainer);

	return itemContainer;
};

const FilterMenu = () => {
	const filterMenuContainer: HTMLElement = document.createElement("div");
	filterMenuContainer.setAttribute("class", "sort-filter-menu");

	const buttonList: [string, boolean, boolean][] = [
		["By Date", false, false],
		["Active", false, true],
		["Archived", false, false],
		["Trashed", false, false],
		["Vacation", true, true],
		["Lyrics", true, true],
		["Groceries", true, false],
	];

	buttonList.forEach((buttonValue) => {
		const button: HTMLElement = document.createElement("div");
		button.setAttribute(
			"class",
			`sort-filter-menu-button ${
				buttonValue[2] ? "sort-filter-menu-button-inactive" : ""
			}`
		);

		if (buttonValue[0] === "By Date") {
			const subContainer: HTMLElement = document.createElement("div");
			subContainer.setAttribute("class", `sort-filter-by-date-container`);
			button.appendChild(subContainer);
		}

		if (buttonValue[1]) {
			const icon: HTMLElement = document.createElement("div");
			icon.setAttribute("class", `sort-filter-menu-icon`);
			const iconString: string = require(`./Media/Icons/icon-ntb-tag.svg`);
			icon.innerHTML = iconString;
			button.appendChild(icon);
		}

		const buttonText: HTMLElement = document.createElement("span");
		buttonText.innerText = buttonValue[0];
		button.appendChild(buttonText);

		filterMenuContainer.appendChild(button);
	});

	const filterButton: HTMLElement = document.createElement("div");
	filterButton.setAttribute(
		"class",
		"sort-filter-menu-button sort-filter-submit-button"
	);
	const buttonText: HTMLElement = document.createElement("span");
	buttonText.innerText = "Filter";
	filterButton.appendChild(buttonText);
	filterMenuContainer.appendChild(filterButton);

	return filterMenuContainer;
};

const SortMenu = () => {
	const sortMenuContainer: HTMLElement = document.createElement("div");
	sortMenuContainer.setAttribute("class", "sort-filter-menu");

	const buttonList: [string, boolean][] = [
		["Date Created (Newest First)", true],
		["Date Created (Oldest First)", true],
		["Content", false],
	];

	buttonList.forEach((buttonValue) => {
		const button: HTMLElement = document.createElement("div");
		button.setAttribute(
			"class",
			`sort-filter-menu-button ${
				buttonValue[1] ? "sort-filter-menu-button-inactive" : ""
			}`
		);

		const buttonText: HTMLElement = document.createElement("span");
		buttonText.innerText = buttonValue[0];
		button.appendChild(buttonText);

		sortMenuContainer.appendChild(button);
	});

	const sortButton: HTMLElement = document.createElement("div");
	sortButton.setAttribute(
		"class",
		"sort-filter-menu-button sort-filter-submit-button"
	);
	const buttonText: HTMLElement = document.createElement("span");
	buttonText.innerText = "Sort";
	sortButton.appendChild(buttonText);
	sortMenuContainer.appendChild(sortButton);

	return sortMenuContainer;
};

export { MainToolbar, EditorToolbar, Note, FilterMenu, SortMenu };

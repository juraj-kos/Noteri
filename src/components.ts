const Toolbar = (
	buttonData: string[],
	containerName: string,
	prefix: string
) => {
	function createElement() {
		const rootContainer: HTMLElement = document.createElement("div");
		rootContainer.setAttribute("class", containerName);
		rootContainer.setAttribute("id", containerName);

		buttonData.forEach((buttonName) => {
			let buttonDiv: HTMLElement = createButton(
				`${containerName}-button`,
				prefix,
				buttonName
			);
			rootContainer.appendChild(buttonDiv);
		});

		return rootContainer;
	}

	function createButton(
		className: string,
		prefix: string,
		buttonName: string
	) {
		let buttonDiv: HTMLElement = document.createElement("div");
		buttonDiv.setAttribute("class", className);
		buttonDiv.setAttribute("id", `${prefix}-${buttonName}`);

		let iconString: string = require(`./Media/Icons/icon-${prefix}-${buttonName}.svg`);

		var viewBoxIndex: number = iconString.indexOf("viewBox");
		var viewBoxString: string = iconString.slice(
			viewBoxIndex + 13,
			viewBoxIndex + 18
		);
		var dimensions: string[] = viewBoxString.split(" ");

		iconString =
			iconString.slice(0, 4) +
			` width="${dimensions[0]}" height="${dimensions[1]}"` +
			iconString.slice(4);

		iconString =
			iconString.slice(0, 4) +
			` class="${prefix}-icon"` +
			iconString.slice(4);

		buttonDiv.innerHTML = iconString;

		return buttonDiv;
	}

	return createElement();
};

const MainToolbar: HTMLElement = Toolbar(
	["user", "create", "filter", "sort", "select", "settings"],
	"main-toolbar",
	"mtb"
);

const EditorToolbar: HTMLElement = Toolbar(
	[
		"text-size",
		"bold",
		"italic",
		"color",
		"bullet-list",
		"number-list",
		"underline",
		"strikethrough",
		"align-left",
		"alert",
		"checkbox",
	],
	"editor-toolbar",
	"etb"
);

const NoteToolbar: HTMLElement = Toolbar(
	[
		"tag",
		"color",
		"scale",
		"duplicate",
		"archive",
		"trash",
		"maximize",
		"pin",
	],
	"note-toolbar",
	"ntb"
);

export { MainToolbar, EditorToolbar, NoteToolbar };

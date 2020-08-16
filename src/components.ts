const MainToolbar = () => {
	const buttonData: string[] = [
		"user",
		"create",
		"filter",
		"sort",
		"select",
		"settings",
	];

	const rootContainer: HTMLElement = document.createElement("div");
	rootContainer.setAttribute("class", "main-toolbar");
	rootContainer.setAttribute("id", "main-toolbar");

	buttonData.forEach((button) => {
		let buttonDiv: HTMLElement = document.createElement("div");
		buttonDiv.setAttribute("class", "main-toolbar-button");
		buttonDiv.setAttribute("id", `mtb-${button}`);

		let iconString: string = require(`./Media/Icons/icon-mtb-${button}.svg`);

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
			iconString.slice(0, 4) + ' class="mtb-icon"' + iconString.slice(4);

		buttonDiv.innerHTML = iconString;

		rootContainer.appendChild(buttonDiv);
	});

	return rootContainer;
};

const EditorToolbar = () => {
	const buttonData: string[] = [
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
	];

	const rootContainer: HTMLElement = document.createElement("div");
	rootContainer.setAttribute("class", "editor-toolbar");
	rootContainer.setAttribute("id", "editor-toolbar");

	buttonData.forEach((button) => {
		let buttonDiv: HTMLElement = document.createElement("div");
		buttonDiv.setAttribute("class", "editor-toolbar-button");
		buttonDiv.setAttribute("id", `etb-${button}`);

		let iconString: string = require(`./Media/Icons/icon-etb-${button}.svg`);

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
			iconString.slice(0, 4) + ' class="etb-icon"' + iconString.slice(4);

		buttonDiv.innerHTML = iconString;

		rootContainer.appendChild(buttonDiv);
	});

	return rootContainer;
};

export { MainToolbar, EditorToolbar };

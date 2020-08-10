interface ParserNode {
	text: string;
	attributes: string[];
}

interface ParserNodeList extends Array<ParserNode> {}

function markupToNodeList(markupString: string) {
	let charAcc: string = "";
	let nodeList: ParserNodeList = [];
	let attList: string[] = [];

	for (let index = 0; index < markupString.length + 1; index++) {
		const char: string = markupString.slice(index, index + 1);

		if (char === "[" || index === markupString.length) {
			let newNode: ParserNode = {
				text: charAcc,
				attributes: [...attList],
			};
			nodeList.push(newNode);
			charAcc = "";
			charAcc = charAcc + char;
		} else if (char === "]") {
			let atts = charAcc.slice(1).split("-");
			atts.forEach((att) => {
				if (att.slice(0, 1) === "#") {
					attList = attList.filter((attL) => attL != att.slice(1));
				} else {
					attList.push(att);
				}
			});
			charAcc = "";
		} else {
			charAcc = charAcc + char;
		}
	}

	return nodeList;
}

function nodeListToMarkup(nodeList: ParserNodeList) {
	let markupString: string = "";
	let attsActive: string[] = [];

	nodeList.forEach((node) => {
		let nodeAtts: string[] = [];

		attsActive = attsActive.filter((attA) => {
			var keepAtt: boolean = true;
			if (!node.attributes.includes(attA)) {
				nodeAtts.push(`#${attA}`);
				keepAtt = false;
			}
			return keepAtt;
		});

		node.attributes
			.filter((attA) => !attsActive.includes(attA))
			.forEach((attA) => {
				attsActive.push(attA);
				nodeAtts.push(attA);
			});

		let attString: string =
			nodeAtts.length !== 0 ? `[${nodeAtts.join("-")}]` : "";
		markupString = markupString + attString + node.text;
	});

	return markupString;
}

function nodeListToDOM(nodeList: ParserNodeList) {
	let DOMString: string = "";

	nodeList.forEach((node) => {
		let classString: string = node.attributes.join(" ");
		let spanString: string = `<span class="${classString}">${node.text}</span>`;
		DOMString = DOMString + spanString;
	});

	return DOMString;
}

export { markupToNodeList, nodeListToMarkup, nodeListToDOM, ParserNodeList };

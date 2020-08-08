import "./style.css";

const container: Element = document.getElementById("container");
const markupString: string = "T[b]h[f4]i[#b]s [#f4-b]i[f4]s.";

let htmlString: string = parseMarkupString(markupString);
htmlString =
	"</br>This is the generated line with non-nested spans.</br>" + htmlString;
container.innerHTML += htmlString;

function parseMarkupString(markupString: string) {
	var state: {
		htmlString: string;
		attributeStack: string[];
		atStart: number;
		atEnd: number;
	} = {
		htmlString: "",
		attributeStack: [],
		atStart: 0,
		atEnd: 0,
	};

	for (let index = 0; index < markupString.length; index++) {
		const char: string = markupString[index];

		if (char === "[") {
			state.atStart = index + 1;
		} else if (char === "]") {
			state.atEnd = index;
			let atts = getAttributes(markupString, state.atStart, state.atEnd);

			let spanStringResults = generateSpanString(
				state.attributeStack,
				atts
			);
			state.attributeStack = spanStringResults.attributeStack;
			let spanString: string = spanStringResults.spanString;

			state.htmlString = state.htmlString + spanString;

			resetAttIndexes(state);
		} else if (state.atStart === 0) {
			state.htmlString = state.htmlString + char;
		}
	}

	return state.htmlString;
}

function getAttributes(markupString: string, atStart: number, atEnd: number) {
	let subString = markupString.substring(atStart, atEnd);
	let atts = subString.split("-");

	return atts;
}

function generateSpanString(attributeStack: string[], atts: string[]) {
	let spanString: string = attributeStack.length !== 0 ? "</span>" : "";

	atts.forEach((att) => {
		if (att.substring(0, 1) === "#") {
			let attClean = att.substring(1);
			attributeStack = attributeStack.filter((attS) => attS !== attClean);
		} else {
			attributeStack.push(att);
		}
	});

	let attributesString = attributeStack.join(" ");
	spanString = spanString + `<span class="${attributesString}">`;

	return { attributeStack, spanString };
}

function resetAttIndexes(state: { atStart: number; atEnd: number }) {
	state.atStart = 0;
	state.atEnd = 0;

	return state;
}

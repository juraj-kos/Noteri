import "./style.css";

const container = document.getElementById("container");
const markupString = "T[b]h[f4]i[#b]s [#f4-b]i[f4]s.";

var htmlString = parseMarkupString(markupString);
htmlString =
	"</br>This is the generated line with non-nested spans.</br>" + htmlString;
container.innerHTML += htmlString;

function parseMarkupString(markupString) {
	var state = {
		htmlString: "",
		attributeStack: [],
		atStart: 0,
		atEnd: 0,
	};

	for (let index = 0; index < markupString.length; index++) {
		const char = markupString[index];

		if (char === "[") {
			state.atStart = index + 1;
		} else if (char === "]") {
			state.atEnd = index;
			var atts = getAttributes(markupString, state.atStart, state.atEnd);
			var spanString = "";
			[state.attributeStack, spanString] = generateSpanString(
				state.attributeStack,
				atts
			);
			state.htmlString = state.htmlString + spanString;

			resetAttIndexes(state);
		} else if (state.atStart === 0) {
			state.htmlString = state.htmlString + char;
		}
	}

	return state.htmlString;
}

function getAttributes(markupString, atStart, atEnd) {
	var subString = markupString.substring(atStart, atEnd);
	var atts = subString.split("-");

	return atts;
}

function generateSpanString(attributeStack, atts) {
	var spanString = attributeStack.length !== 0 ? "</span>" : "";

	atts.forEach((att) => {
		if (att.substring(0, 1) === "#") {
			var attClean = att.substring(1);
			attributeStack = attributeStack.filter((attS) => attS !== attClean);
		} else {
			attributeStack.push(att);
		}
	});

	var attributesString = attributeStack.join(" ");
	spanString = spanString + `<span class="${attributesString}">`;

	return [attributeStack, spanString];
}

function resetAttIndexes(state) {
	state.atStart = 0;
	state.atEnd = 0;

	return state;
}

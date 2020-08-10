import {
	markupToNodeList,
	nodeListToMarkup,
	nodeListToDOM,
	ParserNodeList,
} from "./parser";

interface ParserTestValues {
	identifier: string;
	markupString: string;
	nodeListValues: string[][];
	DOMString: string;
}

const parserValueSet: ParserTestValues[] = [
	{
		identifier: "#1",
		markupString: "T[b]h[f4]i[#b]s [#f4-b]i[f4]s.",
		nodeListValues: [
			["T"],
			["h", "b"],
			["i", "b", "f4"],
			["s ", "f4"],
			["i", "b"],
			["s.", "b", "f4"],
		],
		DOMString:
			'<span class="">T</span><span class="b">h</span><span class="b f4">i</span><span class="f4">s </span><span class="b">i</span><span class="b f4">s.</span>',
	},
	{
		identifier: "#2",
		markupString: "This [b]i[f4]s [#b]some [i]te[#f4]xt.",
		nodeListValues: [
			["This "],
			["i", "b"],
			["s ", "b", "f4"],
			["some ", "f4"],
			["te", "f4", "i"],
			["xt.", "i"],
		],
		DOMString:
			'<span class="">This </span><span class="b">i</span><span class="b f4">s </span><span class="f4">some </span><span class="f4 i">te</span><span class="i">xt.</span>',
	},
];

function testParsing(values: ParserTestValues) {
	const { identifier, markupString, nodeListValues, DOMString } = values;
	const nodeList: ParserNodeList = nodeListValues.map((nValues) => {
		return { text: nValues[0], attributes: nValues.slice(1) };
	});

	test(`${identifier} - markup to nodeList`, () => {
		const nodeListGen: ParserNodeList = markupToNodeList(markupString);
		expect(nodeListGen).toStrictEqual(nodeList);
	});

	test(`${identifier} - nodeList to markup`, () => {
		const markupGen: string = nodeListToMarkup(nodeList);
		expect(markupGen).toStrictEqual(markupString);
	});

	test(`${identifier} - nodeList to DOM`, () => {
		const DOMStringGen: string = nodeListToDOM(nodeList);
		expect(DOMStringGen).toStrictEqual(DOMString);
	});
}

parserValueSet.forEach((valueSet) => testParsing(valueSet));

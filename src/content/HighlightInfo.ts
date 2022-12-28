interface HighlightInfo {
  color: string;
  selectionString: string;
  anchor: Node | null;
  anchorOffset: number;
  focus: Node | null;
  focusOffset: number;
  key: number;
}

export default HighlightInfo;

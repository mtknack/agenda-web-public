import { QuillConfig } from "ngx-quill"
import Quill from "quill"

export class QuillEditorConfig {
  quillConfig!: QuillConfig
  editor!: any
  image: boolean = false
  constructor(imageOption: boolean = false) {
    this.image = imageOption
    this._initIcons()
    this._initOptionsEditor()
  }

  private _initIcons() {
    const icons: any = Quill.import("ui/icons")
    icons[
      "undo"
    ] = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
     fill="none">
 <path d="M12.5 6.25H4.88438L7.12625 4.00875L6.25 3.125L2.5 6.875L6.25 10.625L7.12625
  9.74062L4.88625 7.5H12.5C13.4946 7.5 14.4484 7.89509 15.1517 8.59835C15.8549 9.30161
   16.25 10.2554 16.25 11.25C16.25 12.2446 15.8549 13.1984 15.1517 13.9017C14.4484 14.6049
   13.4946 15 12.5 15H7.5V16.25H12.5C13.8261 16.25 15.0979 15.7232 16.0355 14.7855C16.9732
    13.8479 17.5 12.5761 17.5 11.25C17.5 9.92392 16.9732 8.65215 16.0355 7.71447C15.0979
     6.77678 13.8261 6.25 12.5 6.25Z" fill="#212529"/>
 </svg>`
    icons[
      "redo"
    ] = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
     fill="none">
 <path d="M7.5 6.25H15.1156L12.8737 4.00875L13.75 3.125L17.5 6.875L13.75 10.625L12.8737
  9.74062L15.1137 7.5H7.5C6.50544 7.5 5.55161 7.89509 4.84835 8.59835C4.14509 9.30161 3.75
   10.2554 3.75 11.25C3.75 12.2446 4.14509 13.1984 4.84835 13.9017C5.55161 14.6049 6.50544
   15 7.5 15H12.5V16.25H7.5C6.17392 16.25 4.90215 15.7232 3.96447 14.7855C3.02678 13.8479
   2.5 12.5761 2.5 11.25C2.5 9.92392 3.02678 8.65215 3.96447 7.71447C4.90215 6.77678 6.17392
    6.25 7.5 6.25Z" fill="#212529"/>
</svg>`
    icons[
      "hr"
    ] = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
    fill="none">
<rect x="2.5" y="9.375" width="15" height="1.25" fill="#212529"/>
</svg>`
    icons[
      "textHighlight"
    ] = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
    fill="none">
<path d="M18.3988 10.3575L13.4081 5.36625C13.1736 5.13187 12.8556 5.00021 12.5241 5.00021C12.1925
5.00021 11.8745 5.13187 11.64 5.36625L8.29125 8.715L5.625 1.25H4.375L1.25 10H2.5L3.12438
8.125H6.87437L7.37625 9.63L2.86625 14.14C2.75012 14.2561 2.658 14.3939 2.59515 14.5456C2.5323
14.6973 2.49995 14.8599 2.49995 15.0241C2.49995 15.1883 2.5323 15.3508 2.59515 15.5025C2.658
15.6542 2.75012 15.792 2.86625 15.9081L5.7075 18.75H11.7013L18.3988 12.0519C18.5101 11.9406
18.5984 11.8085 18.6587 11.6631C18.719 11.5177 18.75 11.3618 18.75 11.2044C18.75 11.047 18.719
10.8911 18.6587 10.7457C18.5984 10.6003 18.5101 10.4681 18.3988 10.3569V10.3575ZM3.54063
6.875L4.9975 2.5L6.4575 6.875H3.54063ZM11.1844 17.5H6.225L3.75 15.0238L7.695 11.0794L12.65
16.0337L11.1844 17.5ZM13.5344 15.15L8.57938 10.1956L12.5244 6.25L17.4788 11.2044L13.5344
 15.15Z" fill="#212529"/>
</svg>`
  }

  private configContainer() {
    return this.image
      ? [
          [
            "undo",
            "redo",
            { header: [1, 2, 3, 4, 5, 6, false] },
            { align: [] },
            { color: [] },
            "bold",
            "italic",
            "underline",
            "strike",
            "textHighlight",
            { list: "ordered" },
            { list: "bullet" },
            "link",
            "image",
            "code-block",
            "blockquote",
            "hr",
          ],
        ]
      : [
          [
            "undo",
            "redo",
            { header: [1, 2, 3, 4, 5, 6, false] },
            { align: [] },
            { color: [] },
            "bold",
            "italic",
            "underline",
            "strike",
            "textHighlight",
            { list: "ordered" },
            { list: "bullet" },
            "link",
            "code-block",
            "blockquote",
            "hr",
          ],
        ]
  }

  private configFormats() {
    return this.image
      ? [
          "background",
          "bold",
          "color",
          "font",
          "code",
          "italic",
          "link",
          "size",
          "strike",
          "script",
          "underline",
          "blockquote",
          "header",
          "indent",
          "list",
          "align",
          "direction",
          "code-block",
          "formula",
          "image",
        ]
      : [
          "background",
          "bold",
          "color",
          "font",
          "code",
          "italic",
          "link",
          "size",
          "strike",
          "script",
          "underline",
          "blockquote",
          "header",
          "indent",
          "list",
          "align",
          "direction",
          "code-block",
          "formula",
        ]
  }

  private _initOptionsEditor() {
    this.quillConfig = {
      modules: {
        toolbar: {
          container: this.configContainer(),

          handlers: {
            undo: () => this.editor.history.undo(),
            redo: () => this.editor.history.redo(),
            hr: () => this.insertHr(),
            textHighlight: () => this.toggleTextHighlight(),
          },
        },
        history: {
          userOnly: true,
        },
      },
      formats: this.configFormats(),
    }
  }
  private insertHr() {
    const cursorPosition = this.editor.getSelection(true).index
    const dashesLine = Array(90).fill("-").join("")
    this.editor.insertText(cursorPosition, `\n${dashesLine}\n`, "user")
    this.editor.setSelection(cursorPosition + dashesLine.length + 2, "user")
  }

  private toggleTextHighlight() {
    const cursorPosition = this.editor.getSelection(true).index
    const selectedText = this.editor.getSelection()
    const isHighlighted = this.isTextHighlighted(
      cursorPosition,
      selectedText.length
    )

    if (isHighlighted) {
      this.editor.format("background", false, "user")
    } else {
      this.editor.format("background", "yellow", "user")
    }
  }

  private isTextHighlighted(start: number, length: number): boolean {
    const formats = this.editor.getFormat(start, length)
    return formats.background === "yellow"
  }

  setEditor(editor: any) {
    this.editor = editor
  }
}

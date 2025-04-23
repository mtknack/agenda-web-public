import { Injectable } from "@angular/core"
import { QuillModules } from "ngx-quill"
import Quill from "quill"
import { QuillEditorConfig } from "../config/quill-editor.config"

@Injectable({
  providedIn: "root",
})
export class QuillService {
  createConfigs(
    names: string[],
    imageOption: boolean | boolean[] = false
  ): Map<string, QuillEditorConfig> {
    const quillEditorMap: Map<string, QuillEditorConfig> = new Map<
      string,
      QuillEditorConfig
    >()
    if (typeof imageOption == "boolean") {
      names.forEach((name: string) =>
        quillEditorMap.set(name, new QuillEditorConfig(imageOption))
      )
    } else {
      names.forEach((name: string, index: number) =>
        quillEditorMap.set(name, new QuillEditorConfig(imageOption[index]))
      )
    }
    return quillEditorMap
  }

  getFormats(map: Map<string, QuillEditorConfig>, name: string): string[] {
    let formats = map.get(name)?.quillConfig.formats
    if (!formats) {
      return [""]
    }
    return formats
  }

  getModules(map: Map<string, QuillEditorConfig>, name: string): QuillModules {
    let modules = map.get(name)?.quillConfig.modules
    if (!modules) {
      return [""]
    }
    return modules
  }

  setEditor(map: Map<string, QuillEditorConfig>, name: string, editor: Quill) {
    map.get(name)!.setEditor(editor)
  }
}

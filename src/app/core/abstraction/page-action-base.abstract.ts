import { PageAction } from "../shared/model/enum/page-action.enum"

export abstract class PageActionBaseAbstract {
  action: PageAction = PageAction.CREATE

  get isCreate(): boolean {
    return this.action === PageAction.CREATE
  }

  get isEdit(): boolean {
    return this.action === PageAction.EDIT
  }

  get isView(): boolean {
    return this.action === PageAction.VIEW
  }
}

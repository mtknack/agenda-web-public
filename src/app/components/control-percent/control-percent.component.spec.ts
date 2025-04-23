import { ComponentFixture, TestBed } from "@angular/core/testing"
import { ControlPercentComponent } from "./control-percent.component"

describe("ControlPercentComponent", () => {
  let component: ControlPercentComponent
  let fixture: ComponentFixture<ControlPercentComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControlPercentComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(ControlPercentComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})

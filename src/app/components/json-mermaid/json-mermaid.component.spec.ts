import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonMermaidComponent } from './json-mermaid.component';

describe('JsonMermaidComponent', () => {
  let component: JsonMermaidComponent;
  let fixture: ComponentFixture<JsonMermaidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JsonMermaidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JsonMermaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

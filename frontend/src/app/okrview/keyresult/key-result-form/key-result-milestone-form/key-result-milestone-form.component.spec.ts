import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyResultMilestoneFormComponent } from './key-result-milestone-form.component';
import { MaterialTestingModule } from '../../../../testing/material-testing.module';
import { FormErrorComponent } from '../../../../shared/components/form-error/form-error.component';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewKeyResult } from '../../../../shared/model/ui/view-key-result';
import { Unit } from '../../../../shared/model/api/unit.enum';
import { ViewKeyResultMilestone } from '../../../../shared/model/ui/view-key-result-milestone';

let keyResult: ViewKeyResult;
let milestone1: ViewKeyResultMilestone;
let milestone2: ViewKeyResultMilestone;

describe('KeyResultMilestoneFormComponent', () => {
  let component: KeyResultMilestoneFormComponent;
  let fixture: ComponentFixture<KeyResultMilestoneFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyResultMilestoneFormComponent, FormErrorComponent ],
      imports: [ MaterialTestingModule, ReactiveFormsModule, FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    milestone1 = new ViewKeyResultMilestone(2, 'test', 1, 5);
    milestone2 = new ViewKeyResultMilestone(3, 'test2', 1, 7);

    keyResult = new ViewKeyResult(
      1,
      0,
      5,
      10,
      Unit.NUMBER,
      'Title',
      'Desc',
      5,
      [],
      []
      );
  });

  it('should create', () => {
    fixture = TestBed.createComponent(KeyResultMilestoneFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component)
      .toBeTruthy();
  });

  it('ngOnInit should add no milestones to form when no keyresult given', () => {
    fixture = TestBed.createComponent(KeyResultMilestoneFormComponent);
    component = fixture.componentInstance;

    component.formArray = new FormArray([]);

    fixture.detectChanges();

    expect(component.formArray.length)
      .toBe(0);
  });

  it('ngOnInit should add no milestones to form on empty list', () => {
    fixture = TestBed.createComponent(KeyResultMilestoneFormComponent);
    component = fixture.componentInstance;

    component.formArray = new FormArray([]);
    component.keyResult = keyResult;

    fixture.detectChanges();

    expect(component.formArray.length)
      .toBe(0);
  });

  it('ngOnInit should add no milestones to form, one milestone', () => {
    keyResult.viewKeyResultMilestones = [milestone1];

    fixture = TestBed.createComponent(KeyResultMilestoneFormComponent);
    component = fixture.componentInstance;

    component.formArray = new FormArray([]);
    component.keyResult = keyResult;

    fixture.detectChanges();

    expect(component.formArray.length)
      .toBe(1);
    expect(component.formArray.controls[0].get('id').value)
      .toBe(milestone1.id);
    expect(component.formArray.controls[0].get('name').value)
      .toBe(milestone1.name);
    expect(component.formArray.controls[0].get('value').value)
      .toBe(milestone1.value);
  });

  it('ngOnInit should add no milestones to form, two milestones', () => {
    keyResult.viewKeyResultMilestones = [milestone1, milestone2];

    fixture = TestBed.createComponent(KeyResultMilestoneFormComponent);
    component = fixture.componentInstance;

    component.formArray = new FormArray([]);
    component.keyResult = keyResult;

    fixture.detectChanges();

    expect(component.formArray.length)
      .toBe(2);
    expect(component.formArray.controls[0].get('id').value)
      .toBe(milestone1.id);
    expect(component.formArray.controls[0].get('name').value)
      .toBe(milestone1.name);
    expect(component.formArray.controls[0].get('value').value)
      .toBe(milestone1.value);
    expect(component.formArray.controls[1].get('id').value)
      .toBe(milestone2.id);
    expect(component.formArray.controls[1].get('name').value)
      .toBe(milestone2.name);
    expect(component.formArray.controls[1].get('value').value)
      .toBe(milestone2.value);
  });

  it('addMilestone should add a milestone, no default values given', () => {
    fixture = TestBed.createComponent(KeyResultMilestoneFormComponent);
    component = fixture.componentInstance;

    component.formArray = new FormArray([]);

    fixture.detectChanges();

    component.addMilestone(undefined, undefined, undefined);

    expect(component.formArray.length)
      .toBe(1);
    expect(component.formArray.controls[0].get('id').value)
      .toBeNull();
    expect(component.formArray.controls[0].get('name').value)
      .toBeNull();
    expect(component.formArray.controls[0].get('value').value)
      .toBeNull();
  });

  it('addMilestone should add a milestone, default values are null', () => {
    fixture = TestBed.createComponent(KeyResultMilestoneFormComponent);
    component = fixture.componentInstance;

    component.formArray = new FormArray([]);

    fixture.detectChanges();

    component.addMilestone(null, null, null);

    expect(component.formArray.length)
      .toBe(1);
    expect(component.formArray.controls[0].get('id').value)
      .toBeNull();
    expect(component.formArray.controls[0].get('name').value)
      .toBeNull();
    expect(component.formArray.controls[0].get('value').value)
      .toBeNull();
  });

  it('addMilestone should add a milestone, default values are givem', () => {
    fixture = TestBed.createComponent(KeyResultMilestoneFormComponent);
    component = fixture.componentInstance;

    component.formArray = new FormArray([]);

    fixture.detectChanges();

    component.addMilestone(5, 'test', 10);

    expect(component.formArray.length)
      .toBe(1);
    expect(component.formArray.controls[0].get('id').value)
      .toBe(5);
    expect(component.formArray.controls[0].get('name').value)
      .toBe('test');
    expect(component.formArray.controls[0].get('value').value)
      .toBe(10);
  });

  it('addMilestone adds multiple milestones', () => {
    fixture = TestBed.createComponent(KeyResultMilestoneFormComponent);
    component = fixture.componentInstance;

    component.formArray = new FormArray([]);

    fixture.detectChanges();

    component.addMilestone(5, 'test', 10);
    component.addMilestone(5, 'test', 10);
    component.addMilestone(5, 'test', 10);
    component.addMilestone(5, 'test', 10);

    expect(component.formArray.length)
      .toBe(4);
  });

  it('deleteMilestone, empty formArray does nothing', () => {
    fixture = TestBed.createComponent(KeyResultMilestoneFormComponent);
    component = fixture.componentInstance;

    component.formArray = new FormArray([]);

    fixture.detectChanges();

    component.deleteMilestone(new FormControl());

    expect(component.formArray.length)
      .toBe(0);
  });

  it('deleteMilestone, null given, does nothing', () => {
    fixture = TestBed.createComponent(KeyResultMilestoneFormComponent);
    component = fixture.componentInstance;

    component.formArray = new FormArray([new FormGroup({})]);

    fixture.detectChanges();

    component.deleteMilestone(null);

    expect(component.formArray.length)
      .toBe(1);
  });

  it('deleteMilestone deletes Milestone', () => {
    const formControl: FormControl = new FormControl();

    fixture = TestBed.createComponent(KeyResultMilestoneFormComponent);
    component = fixture.componentInstance;

    component.formArray = new FormArray([formControl]);

    fixture.detectChanges();

    component.deleteMilestone(formControl);

    expect(component.formArray.length)
      .toBe(0);
  });

  it('deleteMilestone deletes correct Milestone', () => {
    const formControl: FormControl = new FormControl('5');
    const formControlToBeDeleted: FormControl = new FormControl('test');

    fixture = TestBed.createComponent(KeyResultMilestoneFormComponent);
    component = fixture.componentInstance;

    component.formArray = new FormArray([formControlToBeDeleted, formControl]);

    fixture.detectChanges();

    component.deleteMilestone(formControlToBeDeleted);

    expect(component.formArray.length)
      .toBe(1);
    expect(component.formArray.controls[0])
      .toBe(formControl);
  });
});
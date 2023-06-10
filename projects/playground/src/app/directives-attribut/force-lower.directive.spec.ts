import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  createComponentFactory,
  createDirectiveFactory,
  Spectator,
  SpectatorDirective,
} from '@ngneat/spectator';
import { ForceLowerDirective } from './force-lower.directive';

@Component({
  selector: 'app-test',
  template: ` <input type="text" force-lower value="MOCK_VALUE" />`,
})
class TestComponent {}

describe('ForceLowerDirective (avec SpectatorDirective', () => {
  let spectator: SpectatorDirective<ForceLowerDirective>;

  const createDirective = createDirectiveFactory({
    directive: ForceLowerDirective,
  });

  beforeEach(() => {
    spectator = createDirective(`
    <input force-lower value="MOCK_VALUE" />
    `);
  });

  it('should lower initial input value', () => {
    expect(spectator.query('input')).toHaveValue('mock_value');
  });

  it('should lower new input values', () => {
    spectator.typeInElement('TEST_VALUE', 'input');
    expect(spectator.query('input')).toHaveValue('test_value');
  });
});

describe('ForceLowerDirective (avec Spectator)', () => {
  let spectator: Spectator<TestComponent>;

  const createComponent = createComponentFactory({
    component: TestComponent,
    declarations: [ForceLowerDirective],
  });

  beforeEach(() => (spectator = createComponent()));

  it('should lower initial input value', () => {
    expect(spectator.query('input')).toHaveValue('mock_value');
  });

  it('should lower new input values', () => {
    spectator.typeInElement('TEST_VALUE', 'input');
    expect(spectator.query('input')).toHaveValue('test_value');
  });
  /*  const myInput: HTMLInputElement =
      fixture.nativeElement.querySelector('input');

    myInput.value = 'TEST_VALUE';
    myInput.dispatchEvent(new Event('input'));

    expect(myInput.value).toBe('test_value');
  }); */
});

describe('ForceLowerDirective (avec TestBed)', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForceLowerDirective, TestComponent],
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.autoDetectChanges();
  });

  it('should lower initial input value', () => {
    const myInput: HTMLInputElement =
      fixture.nativeElement.querySelector('input');

    expect(myInput.value).toBe('mock_value');
  });

  it('should lower new input values', () => {
    const myInput: HTMLInputElement =
      fixture.nativeElement.querySelector('input');

    myInput.value = 'TEST_VALUE';
    myInput.dispatchEvent(new Event('input'));

    expect(myInput.value).toBe('test_value');
  });
});

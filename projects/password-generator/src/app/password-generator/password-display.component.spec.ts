import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  createComponentFactory,
  Spectator,
  SpectatorHost,
  createHostFactory,
} from '@ngneat/spectator';
import { PasswordDisplayComponent } from './password-display.component';

@Component({
  selector: 'test',
  template: `<password-display password="MOCK_PASSWORD"></password-display>`,
})
class TestComponent {}

@Component({
  selector: 'test',
  template: `<password-display></password-display>`,
})
class TestDefaultComponent {}

describe('PasswordDisplayComponent (avec TestBed)', () => {
  it('should display the input password', () => {
    TestBed.configureTestingModule({
      declarations: [PasswordDisplayComponent, TestComponent],
    });

    const fixture = TestBed.createComponent(TestComponent);
    fixture.autoDetectChanges();

    /*     fixture.componentInstance.message = 'MOCK_MESSAGE';
    fixture.detectChanges(); */

    const article = fixture.nativeElement.querySelector('article');

    expect(article.textContent).toContain('MOCK_PASSWORD');
  });

  it('should display a phrase when no password is given', () => {
    TestBed.configureTestingModule({
      declarations: [PasswordDisplayComponent, TestDefaultComponent],
    });

    const fixture = TestBed.createComponent(TestDefaultComponent);
    fixture.autoDetectChanges();

    /*     fixture.componentInstance.message = 'MOCK_MESSAGE';
    fixture.detectChanges(); */

    const article = fixture.nativeElement.querySelector('article');

    expect(article.textContent).toContain('Cliquez sur le bouton "Générer"');
  });
});

describe('PasswordDisplayComponent (avec Spectator)', () => {
  // let spectator: Spectator<TestComponent>;
  let spectator: SpectatorHost<PasswordDisplayComponent>;

  /*   const createComponent = createComponentFactory({
    component: TestComponent,
    declarations: [PasswordDisplayComponent],
  }); */
  const createComponent = createHostFactory({
    component: PasswordDisplayComponent,
  });

  it('should display a phrase when no password is given', () => {
    spectator = createComponent(`
    <password-display></password-display>
    `);

    expect(spectator.query('article')).toHaveText(
      'Cliquez sur le bouton "Générer"'
    );
  });

  it('should display the input password', () => {
    spectator = createComponent(`
  <password-display password="MOCK_PASSWORD"></password-display>
  `);
    expect(spectator.query('article')).toHaveText('MOCK_PASSWORD');
  });
});

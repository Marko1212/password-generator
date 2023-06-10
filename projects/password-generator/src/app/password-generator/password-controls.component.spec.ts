import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { PasswordControlsComponent } from './password-controls.component';

@Component({
  selector: 'test',
  template: `
    <password-controls
      [password]="password"
      (generate)="onGenerate()"
    ></password-controls>
  `,
})
class TestComponent {
  password?: string;
  onGenerate() {}
}

describe('PasswordControlsComponent (avec TestBed)', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasswordControlsComponent, TestComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TestComponent);
    fixture.autoDetectChanges();
    component = fixture.componentInstance;
  });

  it('should not show a copy button', () => {
    expect(fixture.nativeElement.querySelector('#copy')).toBeNull();
  });

  it('should show a copy button if password has been generated', () => {
    // Si on a un mot de passe dans le composant principal
    fixture.componentInstance.password = 'MOCK_PASSWORD';
    fixture.detectChanges();
    // Alors, je devrai voir le bouton "copy"
    expect(fixture.nativeElement.querySelector('#copy')).toBeTruthy();
  });

  it('should emit an event when user clicks on the button', () => {
    /*     component.onGenerateEvent.subscribe(() => {
      expect(true).toBeTrue();
    }); */

    const spy = spyOn(component, 'onGenerate');
    fixture.nativeElement.querySelector('button').click();
    expect(spy).toHaveBeenCalled();
  });

  it('should copy the password when user clicks the copy button', () => {
    const spy = spyOn(navigator.clipboard, 'writeText');
    // En imaginant que je vois le bouton copy (que j'ai déjà généré un mot
    // de passe)
    fixture.componentInstance.password = 'MOCK_PASSWORD';
    fixture.detectChanges();

    // Quand je click sur le bouton copy
    fixture.nativeElement.querySelector('#copy').click();

    // Alors le mot de passe est copié et le message est affiché
    expect(spy).toHaveBeenCalledWith('MOCK_PASSWORD');

    expect(
      fixture.nativeElement.querySelector('#copy-message').textContent
    ).toContain('Le mot de passe a été copié');
  });

  it('should make the message disappear if a new password is generated', () => {
    const spy = spyOn(navigator.clipboard, 'writeText');
    // En imaginant qu'on ait le message
    fixture.componentInstance.password = 'MOCK_PASSWORD';
    fixture.detectChanges();

    fixture.nativeElement.querySelector('#copy').click();

    expect(fixture.nativeElement.querySelector('#copy-message')).toBeTruthy(); // ligne pas obligatoire

    // Si je change le mot de passe
    fixture.componentInstance.password = 'NEW_MOCK_PASSWORD';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#copy-message')).toBeNull();

    // Si je copie à nouveau
    fixture.nativeElement.querySelector('#copy').click();

    // Alors le message apparaît à nouveau
    expect(fixture.nativeElement.querySelector('#copy-message')).toBeTruthy();
  });
});

describe('PasswordControlsComponent (avec Spectator)', () => {
  let spectator: Spectator<TestComponent>;

  const createComponent = createComponentFactory({
    component: TestComponent,
    declarations: [PasswordControlsComponent],
  });

  beforeEach(() => (spectator = createComponent()));

  it('should emit an event when user clicks on the button', () => {
    /*     spectator.component.onGenerateEvent.subscribe(() => {
      expect(true).toBeTrue();
    }); */
    const spy = spyOn(spectator.component, 'onGenerate');
    spectator.click('button');
    expect(spy).toHaveBeenCalled();
    //  expect(spectator.component.test).toBeTrue();
  });

  it('should not show a copy button', () => {
    expect(spectator.query('#copy')).toBeNull();
  });

  it('should show a copy button if password has been generated', () => {
    // Si on a un mot de passe dans le composant principal
    /*     spectator.component.password = 'MOCK_PASSWORD';
    spectator.fixture.detectChanges(); */

    spectator.setInput('password', 'MOCK_PASSWORD');

    // Alors, je devrai voir le bouton "copy"
    expect(spectator.query('#copy')).toBeTruthy();
  });

  it('should copy the password when user clicks the copy button', () => {
    const spy = spyOn(navigator.clipboard, 'writeText');
    // En imaginant que je vois le bouton copy (que j'ai déjà généré un mot
    // de passe)
    spectator.setInput('password', 'MOCK_PASSWORD');
    // Quand je click sur le bouton copy
    spectator.click('#copy');
    // Alors le mot de passe est copié et le message est affiché
    expect(spy).toHaveBeenCalledWith('MOCK_PASSWORD');
    // expect(spectator.query('#copy-message')).toExist();
    expect(spectator.query('#copy-message')).toHaveText(
      'Le mot de passe a été copié'
    );
  });

  it('should make the message disappear if a new password is generated', () => {
    const spy = spyOn(navigator.clipboard, 'writeText');

    // En imaginant qu'on ait le message
    spectator.setInput('password', 'MOCK_PASSWORD');
    spectator.click('#copy');
    expect(spectator.query('#copy-message')).toExist(); // ligne pas obligatoire

    // Si je change le mot de passe
    spectator.setInput('password', 'NEW_MOCK_PASSWORD');

    // Alors le message ne devrait plus apparaître
    expect(spectator.query('#copy-message')).toBeNull();

    // Si je copie à nouveau
    spectator.click('#copy');

    // Alors le message apparaît à nouveau
    expect(spectator.query('#copy-message')).toExist();
  });
});

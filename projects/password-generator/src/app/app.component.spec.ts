import { ComponentFixture, TestBed } from '@angular/core/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { AppComponent } from './app.component';
import { PasswordGeneratorModule } from './password-generator/password-generator.module';
import { PasswordGeneratorService } from './password-generator/password-generator.service';

describe('AppComponent (avec Spectator)', () => {
  let spectator: Spectator<AppComponent>;
  let component: AppComponent;

  const createComponent = createComponentFactory({
    component: AppComponent,
    declarations: [AppComponent],
    mocks: [PasswordGeneratorService],
    imports: [PasswordGeneratorModule],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should work', () => {
    expect(spectator.query('article')?.textContent).toBe(
      'Cliquez sur le bouton "Générer"'
    );
  });

  it('should change message when user clicks generate button', () => {
    /*     const button = fixture.nativeElement.querySelector('button');
    button.click(); */

    const service = spectator.inject(PasswordGeneratorService);
    /*     const spy = spyOn(service, 'generate');

    spy.and.returnValue('MOCK_PASSWORD'); */
    service.generate.and.returnValue('MOCK_PASSWORD');

    spectator.click('button');

    expect(spectator.query('article')).toHaveText('MOCK_PASSWORD');
  });

  it('should update settings when user clicks on checkboxes', () => {
    spectator.click('#uppercase');
    expect(component.settings.uppercase).toBeTrue();

    spectator.click('#numbers');
    expect(component.settings.numbers).toBeTrue();

    spectator.click('#symbols');
    expect(component.settings.symbols).toBeTrue();

    spectator.typeInElement('33', '#length');

    /*     const length = fixture.nativeElement.querySelector('#length');
    length.value = 33;
    length.dispatchEvent(new Event('input')); */

    expect(component.settings.length).toBe(33);
  });

  it('should show a copy button when password was generated', () => {
    // Spy sur le service de génération
    const service = spectator.inject(PasswordGeneratorService);
    service.generate.and.returnValue('MOCK_PASSWORD');

    // Quand je click sur le bouton générer
    spectator.click('#generate');

    // Alors je dois voir apparaître le bouton copy
    expect(spectator.query('#copy')).not.toBeNull();
  });
});

describe('AppComponent (avec TestBed)', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [PasswordGeneratorModule],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    fixture.autoDetectChanges();
    component = fixture.componentInstance;
  });

  it('should work', () => {
    /*     await TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents(); */

    //  const fixture = TestBed.createComponent(AppComponent);

    //  fixture.detectChanges();

    const article = fixture.nativeElement.querySelector('article');
    expect(article.textContent).toBe('Cliquez sur le bouton "Générer"');
  });

  it('should change message when user clicks generate button', () => {
    /*     await TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent);

    fixture.autoDetectChanges(); */

    const service = TestBed.inject(PasswordGeneratorService);

    const spy = spyOn(service, 'generate');

    spy.and.returnValue('MOCK_PASSWORD');

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    // fixture.detectChanges();

    const article = fixture.nativeElement.querySelector('article');

    expect(article.textContent).toBe('MOCK_PASSWORD');
  });

  it('should update settings when user clicks on checkboxes', () => {
    /*     await TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent);

    fixture.autoDetectChanges(); */

    fixture.nativeElement.querySelector('#uppercase').click();
    expect(component.settings.uppercase).toBeTrue();

    fixture.nativeElement.querySelector('#numbers').click();
    expect(component.settings.numbers).toBeTrue();

    fixture.nativeElement.querySelector('#symbols').click();
    expect(component.settings.symbols).toBeTrue();

    const length = fixture.nativeElement.querySelector('#length');
    length.value = 33;
    length.dispatchEvent(new Event('input'));

    expect(component.settings.length).toBe(33);
  });

  /*   beforeEach(() => TestBed.configureTestingModule({
    declarations: [AppComponent]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = component;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'password-generator'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = component;
    expect(app.title).toEqual('password-generator');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('password-generator app is running!');
  }); */

  it('should show a copy button when password was generated', () => {
    // Spy sur le service de génération
    const service = TestBed.inject(PasswordGeneratorService);
    const spy = spyOn(service, 'generate');
    spy.and.returnValue('MOCK_PASSWORD');

    // Quand je click sur le bouton générer
    fixture.nativeElement.querySelector('#generate').click();
    fixture.detectChanges();

    // Alors je dois voir apparaître le bouton copy
    expect(fixture.nativeElement.querySelector('#copy')).not.toBeNull();
  });
});

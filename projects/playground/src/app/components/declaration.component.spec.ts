import { TestBed } from '@angular/core/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { TAUX_TVA, TaxesService } from '../services/taxes.service';
import { DeclarationComponent } from './declaration.component';

describe('DeclarationComponent avec Spectator', () => {
  let spectator: Spectator<DeclarationComponent>;

  const createSpectator = createComponentFactory({
    component: DeclarationComponent,
    /*     componentProviders: [], */
    providers: [TaxesService, { provide: TAUX_TVA, useValue: 0.2 }],
    mocks: [TaxesService],
  });

  it('should show taxes results', () => {
    spectator = createSpectator();

    const service = spectator.inject(TaxesService);
    service.calculate.and.returnValue(2500);
    /*     const spy = spyOn(service, 'calculate');
    spy.and.returnValue(2500); */

    // Je rentre 2000 dans l'input
    spectator.typeInElement('2000', 'input');

    // Je click sur le bouton
    spectator.click('button');

    // Je dois voir 2500 dans <article>
    expect(spectator.query('article')).toHaveText('2500');
  });
});

/* class FakeService {
  calculate(revenu: number) {
    return revenu + 500;
  }
} */

// const service = new FakeService();
describe('DeclarationComponent avec TestBed', () => {
  it('should show taxes results', () => {
    TestBed.configureTestingModule({
      declarations: [DeclarationComponent],
      providers: [
        /*         {
          provide: TaxesService,
          useClass: FakeService,
        }, */
        TaxesService,
        {
          provide: TAUX_TVA,
          useValue: 0.3,
        },
      ],
    });

    /*     TestBed.overrideComponent(DeclarationComponent, {
      set: {
        providers: [ */
    /*           {
            provide: TaxesService,
            useFactory: () => {
              return new FakeService();
            },
          }, */
    /*           {
            provide: TaxesService,
            useClass: FakeService,
          }, */
    /*  {
            provide: TaxesService,
            useValue: service,
          }, */
    /*         ],
      },
    }); */

    const fixture = TestBed.createComponent(DeclarationComponent);
    fixture.autoDetectChanges(true);

    const service = TestBed.inject(TaxesService);

    const spy = spyOn(service, 'calculate');
    spy.and.callFake((revenu: number) => revenu + 500);

    // const service = fixture.debugElement.injector.get(TaxesService);

    /*     service.calculate = (revenu: number) => {
      console.log('Aucun appel HTTP');
      return revenu + 500;
    }; */

    /* const spy = spyOn(service, 'calculate'); */
    //spy.and.returnValue(1500);
    /*     spy.and.callFake((revenu: number) => {
      return revenu + 500;
    }); */

    // Quand je rentre un montant dans l'input
    const input = fixture.nativeElement.querySelector('input');
    input.value = '1000';
    // Si je click sur le bouton
    fixture.nativeElement.querySelector('button').click();
    // Alors je devrais voir le résultat dans <article>
    expect(
      fixture.nativeElement.querySelector('article').textContent
    ).toContain(1500);
  });
});

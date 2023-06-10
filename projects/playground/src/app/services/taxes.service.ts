import { Inject, Injectable, InjectionToken } from '@angular/core';

export const TAUX_TVA = new InjectionToken('Le taux de TVA');

@Injectable()
export class TaxesService {
  total = 0;

  constructor(@Inject(TAUX_TVA) private tauxDeTVA: number) {
    console.log('Je suis le service n°' + Math.random());
  }

  calculate(revenu: number) {
    console.log('5 appels HTTP');

    this.total += revenu;

    // 500 lignes de calcul extrêmement complexes
    // contenant en plus des appels HTTP
    return revenu + 500;
  }
}

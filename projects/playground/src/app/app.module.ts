import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ConfirmDirective } from './directives-attribut/confirm.directive';
import { CounterComponent } from './components/counter.component';
import { HighlightDirective } from './directives-attribut/highlight.directive';
import { NoOpenDirective } from './directives-attribut/no-open.directive';
import { UserProfileComponent } from './components/user-profile.component';
import { ModelDirective } from './directives-attribut/model.directive';
import { FormsModule } from '@angular/forms';
import { SetClassesDirective } from './directives-attribut/set-classes.directive';
import { ForceLowerDirective } from './directives-attribut/force-lower.directive';
import { NewsLetterComponent } from './components/newsletter.component';
import { CardComponent } from './components/card.component';
import { IfDirective } from './directives-structurelles/if.directive';
import { LoopDirective } from './directives-structurelles/loop.directive';
import { RepeatDirective } from './directives-structurelles/repeat.directive';
import { DeclarationComponent } from './components/declaration.component';
import { RecapComponent } from './components/recap.component';
import { TAUX_TVA, TaxesService } from './services/taxes.service';

@NgModule({
  declarations: [
    AppComponent,
    HighlightDirective,
    NoOpenDirective,
    ConfirmDirective,
    UserProfileComponent,
    CounterComponent,
    ModelDirective,
    SetClassesDirective,
    ForceLowerDirective,
    NewsLetterComponent,
    CardComponent,
    IfDirective,
    LoopDirective,
    RepeatDirective,
    DeclarationComponent,
    RecapComponent,
  ],
  imports: [BrowserModule, FormsModule],
  providers: [TaxesService, { provide: TAUX_TVA, useValue: 0.2 }],
  bootstrap: [AppComponent],
})
export class AppModule {}

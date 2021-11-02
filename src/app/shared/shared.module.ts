// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

// Components
import { PageNotFoundComponent } from './components/';
import { ActionsWindowComponent} from './components/actions-window/actions-window.component';
// import { WebviewDirective } from './directives/';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    ActionsWindowComponent,
    // WebviewDirective
  ],
  imports: [CommonModule, TranslateModule, FormsModule],
  exports: [
    TranslateModule,
    // WebviewDirective,
    FormsModule,
    ActionsWindowComponent
  ]
})
export class SharedModule {}

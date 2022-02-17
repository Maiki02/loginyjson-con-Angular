import { NgModule } from "@angular/core";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from '@angular/material/button';


@NgModule({

    exports: [
      MatToolbarModule,
      MatCardModule,
      MatIconModule,
      MatButtonModule]

})

export class MaterialModule {}

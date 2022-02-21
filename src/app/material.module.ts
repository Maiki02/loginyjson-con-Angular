import { NgModule } from "@angular/core";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule, MatSort } from "@angular/material/sort";

@NgModule({

    exports: [
      MatToolbarModule,
      MatCardModule,
      MatIconModule,
      MatButtonModule,
      MatTableModule,
      MatSortModule]

})

export class MaterialModule {}

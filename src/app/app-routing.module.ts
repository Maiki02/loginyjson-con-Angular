import { TiempoComponent } from './components/tiempo/tiempo.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { PersonsComponent } from './components/persons/persons.component';

const routes: Routes = [
  { path: 'login',  component: LoginComponent},
  { path: 'inicio', component: InicioComponent },
  { path: 'tiempo', component: TiempoComponent },
  { path: 'persons', loadChildren: () => import('./components/persons/persons.module').then(m => m.PersonsModule) },
  { path: 'registro', loadChildren: () => import('./components/registro/registro.module').then(m => m.RegistroModule) },
  { path: 'graficas', loadChildren: () => import('./components/graficas/graficas.module').then(m => m.GraficasModule) },
{path:"**", redirectTo:'login', pathMatch:'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

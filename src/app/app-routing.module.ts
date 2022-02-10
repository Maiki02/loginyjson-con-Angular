import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { PersonsComponent } from './components/persons/persons.component';

const routes: Routes = [ 
  { path: 'login',  component: LoginComponent},
  { path: 'inicio', component: InicioComponent },
  { path: 'persons', loadChildren: () => import('./components/persons/persons.module').then(m => m.PersonsModule) },
{path:"**", redirectTo:'login', pathMatch:'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

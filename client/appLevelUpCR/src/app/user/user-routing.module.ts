import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserIndexComponent } from './user-index/user-index.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserAllComponent } from './user-all/user-all.component';
import { UserFormComponent } from './user-form/user-form.component';
import { AuthGuard } from '../share/guards/auth.guard';
import { UserDisabledComponent } from './user-disabled/user-disabled.component';

const routes: Routes = [
  {
    path: 'usuario',
    component: UserIndexComponent,
    children: [
      { path: 'registrar', component: UserCreateComponent },
      { path: 'login', component: UserLoginComponent },
    ],
  },

  {path:'usuarios/all', 
    component: UserAllComponent,
    canActivate:[AuthGuard],
    data:{
      habilitado: [true],
      roles:['ADMIN']
    }
  },
  {path:'usuarios/disabled', 
    component: UserDisabledComponent,
    canActivate:[AuthGuard],
    data:{
      habilitado: [true],
      roles:['ADMIN']
    }
  },
  {path:'usuarios/create', component: UserFormComponent,
  canActivate:[AuthGuard],
  data:{
    habilitado: [true],
    roles:['ADMIN']
  }},
  {path:'usuarios/update/:id', component: UserFormComponent,
  canActivate:[AuthGuard],
  data:{
    habilitado: [true],
    roles:['ADMIN']
  }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

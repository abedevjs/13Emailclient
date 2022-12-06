import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailResolverService } from './email-resolver.service';
import { EmailShowComponent } from './email-show/email-show.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';

const routes: Routes = [
  {
    path: '', //* url.com/inbox
    component: HomeComponent,
    children: [
      {
        path: 'not-found',
        component: NotFoundComponent
      },
      {
        path: ':id', //* url.com/inbox/id
        component: EmailShowComponent,
        resolve: {
          email: EmailResolverService
        }
      },
      {
        path: '',
        component: PlaceholderComponent
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboxRoutingModule { }

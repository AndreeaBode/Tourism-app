import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { SearchComponent } from './app/search/search.component';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

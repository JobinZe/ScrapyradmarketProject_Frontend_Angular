/// <reference types="@angular/localize" />


import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModuleModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModuleModule)
.catch(err=>console.error(err))

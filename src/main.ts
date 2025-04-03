import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

// Asegúrate de incluir 'provideHttpClient()' en los providers de la configuración
bootstrapApplication(AppComponent, {
  ...appConfig, // Mantén la configuración existente
  providers: [
    ...appConfig.providers,  // Si ya tienes otros proveedores, manténlos
    provideHttpClient()      // Agrega HttpClient aquí
  ]
})
  .catch((err) => console.error(err));
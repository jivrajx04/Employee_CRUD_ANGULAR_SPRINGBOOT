// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { provideRouter } from '@angular/router'; // Import provider for routing
import { routes } from './app/app.routes'; // Import your defined routes
import { provideHttpClient } from '@angular/common/http'; // Import provider for HttpClient
// REMOVED: import { provideReactiveFormsModule } from '@angular/forms'; // This caused the error

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),       // Provides routing capabilities
    provideHttpClient()          // Provides HttpClient for API calls
    // REMOVED: provideReactiveFormsModule() // Not needed here, as ReactiveFormsModule is imported directly in standalone components
  ]
}).catch(err => console.error(err));
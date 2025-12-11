ToAssessment

This project was generated using Angular CLI v20.3.6 and developed as part of a technical assessment.
It demonstrates a modern Angular application using Angular Signals for state management, service-driven architecture, and Angular Material UI components.

🚀 Features Overview

Task (To-Do) management with CRUD operations
(Create, Update, Delete, View Tasks)

Angular Signals–based state management (Angular 16+)

Service-level state handling and business logic

Angular Material dialogs and form inputs

Unit testing for services using Jasmine & Karma

Mock data used in place of a backend API

🛠 Development Server

To start a local development server, run:

ng serve


Navigate to:

http://localhost:4200/


The application will automatically reload when source files are modified.

🧱 Code Scaffolding

Angular CLI provides scaffolding tools to generate application elements.

Example:

ng generate component component-name


For a full list of schematics:

ng generate --help

📦 Building the Project

To build the project:

ng build


The output will be stored in the dist/ directory.
Production builds are optimized for performance.

✅ Running Unit Tests

Unit tests are written using Jasmine and executed via Karma.

ng test

Testing Notes

Service-level unit tests are implemented (e.g., TaskModel)

Angular Signals allow synchronous, isolated testing without subscriptions

Some tests and refinements are still in progress and may not pass in all cases

🌐 End-to-End Testing

To run end-to-end tests:

ng e2e


Angular CLI does not include an e2e framework by default. A preferred framework can be configured if required.

📚 Resources & References

The following resources were referenced during development:

Angular Testing Guide – Writing and structuring unit tests

Angular Routing Overview – Route configuration and navigation

Angular Signals Guide – Reactive state management implementation

Angular Material Documentation – Dialogs and form styling

Stack Overflow – “No provider for ActivatedRoute” – Resolving test configuration issues

🤖 AI Assistance

AI tools were used for learning, debugging, and code review support:

OpenAI ChatGPT

Google Gemini

All code was reviewed, adapted, and implemented by the developer.

📝 Notes

The core UI functionality is fully implemented and working.

The application currently uses mock data instead of a backend API.

The project focuses on demonstrating:

Angular Signals for state management

Clean separation of concerns using services

Modern Angular testing practices

Additional refinements and test coverage may be added.

🔗 Additional Resources

For more information on Angular CLI commands and usage:

Angular CLI Overview and Command Reference

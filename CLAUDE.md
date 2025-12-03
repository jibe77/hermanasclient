# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Hermanas Client is an Angular 12 SPA for remote monitoring and control of an automated chicken coop IoT system. It communicates with a Spring Boot backend via REST APIs and WebSockets (STOMP protocol).

- **Live**: http://www.hermanas.fr
- **Backend repo**: https://github.com/jibe77/hermanas

## Common Commands

```bash
# Development
npm install              # Install dependencies
npm start                # Dev server at localhost:4200 (French locale, includes Pug watcher)
npm run build            # Production build with i18n
npm run build:debug      # Production build with source maps
npm run build:pug        # Compile Pug templates to HTML

# Testing
npm test                 # Unit tests (Karma/Jasmine)
npm run e2e              # E2E tests (Protractor)

# Code Quality
npm run lint             # Run TSLint
npm run lint:fix         # Auto-fix lint issues

# Docker
npm run docker:build     # Build Docker image
npm run docker:run       # Run container

# Code Generation
npm run generate:module -- --path src/modules --name ModuleName
npm run generate:component -- --path src/modules/module-name/containers --name ComponentName
npm run generate:service -- --path src/modules/module-name/services --name ServiceName
```

## Architecture

### Module Structure
All feature modules follow MVCC pattern and are lazy-loaded:

```
src/modules/
├── app-common/      # Shared components, services, guards
├── auth/            # AWS Amplify authentication
├── dashboard/       # Main dashboard with WebSocket services
├── camera/          # Camera feed
├── energy/          # Energy monitoring
├── music/           # Music control
├── weather/         # Weather data
├── logs/            # System logs
├── notification/    # Notifications
├── system/          # System configuration
├── navigation/      # Layout and UI
└── [others...]
```

Each module contains: `components/`, `containers/`, `services/`, `guards/`, `models/`, and routing module.

### Key Services
- **WebSocketService** (`src/modules/dashboard/services/`) - STOMP WebSocket connection to broker at `wss://poulailler57.ddns.net:5780/api/v1/stomp`
- **API.service.ts** (`src/app/`) - Auto-generated AWS Amplify GraphQL service
- **AbstractService** (`src/modules/app-common/services/`) - Base service with domain configuration at `https://poulailler57.ddns.net:5780/api/v1`

### Component Prefix
All components use the `sb` prefix (e.g., `sb-dashboard`).

## Technology Stack

- Angular 12.1.0 with TypeScript 4.3.4
- Bootstrap 4.6.0 + ng-bootstrap 10.0.0
- Angular Material 12.1.0
- AWS Amplify 4.1.0 (auth, GraphQL)
- RxJS 6.6.7
- ng2-stompjs 8.0.0 (WebSockets)
- Chart.js 3.6.2
- Pug for templates (compiled to HTML)

## Code Style

- TSLint with Prettier integration
- 140 character max line length
- 4-space indentation
- Single quotes
- Console logs forbidden except `console.error`
- XLIFF format for i18n (`src/locale/messages.xlf`)

## Memory Issues

If builds run out of memory, increase Node heap size in package.json:
```json
"ng": "cross-env NODE_OPTIONS=--max_old_space_size=2048 ./node_modules/.bin/ng"
```

---

## TODO: Improvement Plan

### Phase 1 - Backend Integration Updates ✅ COMPLETED

All backend breaking changes have been implemented:

- [x] **Updated HTTP methods** - Changed state-changing endpoints from GET to POST:
  - `door.service.ts` - POST /api/v1/door/open, POST /api/v1/door/close
  - `light.service.ts` - POST /api/v1/light/switch
  - Note: /system/shutdown and /system/reboot not yet implemented in frontend

- [x] **Updated API paths to v1** - All REST endpoints now use /api/v1/* paths:
  - Updated `abstract.service.ts` - Base URL now includes /api/v1
  - Updated `websocket.service.ts` - WebSocket endpoint now /api/v1/stomp
  - Updated `progresswebsocket.service.ts` - WebSocket endpoint now /api/v1/stomp
  - All services now automatically use versioned endpoints via AbstractService

### Phase 2 - Critical (Immediate)

- [ ] **Migrate TSLint to ESLint** - TSLint is deprecated since 2022
  ```bash
  ng add @angular-eslint/schematics
  ng g @angular-eslint/schematics:convert-tslint-to-eslint
  ```
- [ ] **Move hardcoded URLs to environment files**
  - `src/modules/app-common/services/abstract.service.ts:5` - `domainBase`
  - `src/modules/dashboard/services/websocket.service.ts:16` - `brokerURL`
- [ ] **Fix memory leaks - unmanaged subscriptions**
  - `src/modules/dashboard/components/dashboard-widgets/dashboard-widgets.component.ts:95-113` - WebSocket subscription never unsubscribed
  - `src/modules/weather/components/weather-table-area/weather-table-area.component.ts:40-61` - `eventsSubscription` missing unsubscribe
  - `src/modules/dashboard/components/dashboard-door-action/dashboard-door-action.component.ts:39-51` - fire-and-forget subscriptions
  - `src/modules/dashboard/components/dashboard-accessories-action/dashboard-accessories-action.component.ts:44-60` - fire-and-forget subscriptions
- [ ] **Implement route guards** - All guards return `of(true)` with no actual protection
  - `src/modules/auth/guards/auth.guard.ts`
  - `src/modules/dashboard/guards/dashboard.guard.ts`
  - `src/modules/navigation/guards/navigation.guard.ts`

### Phase 3 - Angular Migration

- [ ] **Upgrade Angular 12 → 18** (EOL since August 2022)
  - Follow https://angular.dev/update-guide
  - Incremental: 12 → 13 → 14 → 15 → 16 → 17 → 18
  - Update TypeScript 4.3.4 → 5.x
  - Update RxJS 6.6.7 → 7.8.x
  - Update zone.js 0.11.4 → 0.14.x
- [ ] **Replace Protractor with Cypress/Playwright** - Protractor deprecated December 2022
- [ ] **Upgrade Bootstrap 4.6.0 → 5.x**
- [ ] **Upgrade AWS Amplify 4.x → 6.x**
- [ ] **Upgrade FontAwesome 5.x → 6.x**

### Phase 4 - Architecture Improvements

- [ ] **Implement state management** (NgRx or signals) - Currently ad-hoc BehaviorSubjects
- [ ] **Refactor fat component** `dashboard-widgets.component.ts` (339 lines, 7 subscriptions)
  - Extract meteo widget
  - Extract door widget
  - Extract accessories widget (fan, light, music)
- [ ] **Add global HTTP interceptors** (currently only in DashboardModule)
  - Auth interceptor (replace manual headers in `AbstractService.getHeadersWithAuth()`)
  - Retry interceptor with exponential backoff
  - Logging interceptor
- [ ] **Implement `takeUntil()` pattern** for all component subscriptions
- [ ] **Remove `any` types** - Add proper interfaces
  - `src/modules/dashboard/services/websocket.service.ts:13-14`
  - All switch services: `light.service.ts`, `fan.service.ts`, `music.service.ts`

### Phase 5 - Testing

- [ ] **Add WebSocket service tests** - Critical async logic untested
  - `src/modules/dashboard/services/websocket.service.ts`
  - `src/modules/dashboard/services/progresswebsocket.service.ts`
- [ ] **Add HTTP interceptor tests**
  - `src/modules/dashboard/interceptors/http-error.interceptor.ts`
- [ ] **Add directive tests** (0/2 tested)
  - `src/modules/weather/directives/sortable.directive.ts`
  - `src/modules/system/directives/sortable.directive.ts`
- [ ] **Improve service tests** - Most only check `toBeTruthy()`, need actual method testing
- [ ] **Expand E2E tests** - Currently only 1 test checking page title

### Quick Wins (Can Do Today)

- [ ] **Remove identity map operators** doing nothing
  - `src/modules/dashboard/services/light.service.ts:21-24`
  - `src/modules/weather/services/weather.service.ts:19-22`
- [ ] **Remove `@Injectable()` from component**
  - `src/modules/app-common/components/common-cards/common-cards.component.ts:14`
- [ ] **Move template logic to component methods**
  - `src/modules/dashboard/components/dashboard-widgets/dashboard-widgets.component.html:39` - Complex *ngIf conditions

### Features to Add

- [ ] Global error handler (Angular `ErrorHandler`)
- [ ] Centralized loading state management
- [ ] Toast notification service
- [ ] Structured logging service (replace `console.log`)
- [ ] PWA/offline support with service worker
- [ ] Retry logic for failed HTTP requests

### Known Technical Debt

| Issue | Location | Severity |
|-------|----------|----------|
| Angular 12 EOL | package.json | Critical |
| TSLint deprecated | tslint.json | Critical |
| Protractor deprecated | e2e/ | High |
| Non-functional guards | src/modules/*/guards/ | High |
| Hardcoded URLs | abstract.service.ts, websocket.service.ts | High |
| Memory leaks | dashboard-widgets, weather-table-area | High |
| No state management | Services using BehaviorSubject | Medium |
| Fat component | dashboard-widgets.component.ts | Medium |
| Shallow tests | Most .spec.ts files | Medium |

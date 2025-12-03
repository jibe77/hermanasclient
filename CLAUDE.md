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
npm run e2e              # E2E tests (Playwright)
npm run e2e:headed       # E2E tests with visible browser
npm run e2e:ui           # E2E tests with Playwright UI mode
npm run e2e:debug        # E2E tests in debug mode
npm run e2e:report       # Show HTML test report

# Code Quality
npm run lint             # Run ESLint
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
- Playwright (E2E testing)
- ESLint with Prettier integration

## Code Style

- ESLint with Prettier integration
- 140 character max line length
- 4-space indentation
- Single quotes
- Console logs forbidden except `console.error`
- XLIFF format for i18n (`src/locale/messages.xlf`)

## Memory Issues and Node.js Compatibility

Node.js 20 compatibility with Angular 12 requires the legacy OpenSSL provider:
```json
"ng": "cross-env NODE_OPTIONS=\"--max_old_space_size=2048 --openssl-legacy-provider\" ./node_modules/.bin/ng"
```

Note: Angular 12 officially supports Node.js 12-16. The `--openssl-legacy-provider` flag is a workaround for Node.js 17+ compatibility.

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

- [x] **Migrate TSLint to ESLint** ✅ COMPLETED - TSLint is deprecated since 2022
  - Installed @angular-eslint/builder@12.7.0, @angular-eslint/eslint-plugin@12.7.0
  - Installed @typescript-eslint/eslint-plugin@4.33.0, @typescript-eslint/parser@4.33.0
  - Installed eslint@7.32.0 (compatible with Angular 12)
  - Created .eslintrc.json with rules migrated from tslint.json
  - Updated angular.json to use @angular-eslint/builder:lint
  - Removed tslint, tslint-plugin-prettier, and codelyzer packages
  - Deleted tslint.json configuration file
  - ESLint now working with `npm run lint` and `npm run lint:fix`
- [x] **Move hardcoded URLs to environment files** ✅ COMPLETED
  - Added `apiUrl` and `wsUrl` to both `environment.ts` and `environment.prod.ts`
  - Updated `AbstractService` to use `environment.apiUrl` instead of hardcoded URL
  - Updated `WebSocketService` to use `environment.wsUrl` instead of hardcoded URL
  - Updated `ProgressWebsocketService` to use `environment.wsUrl` instead of hardcoded URL
  - URLs now configurable per environment (development/production)
- [x] **Fix memory leaks - unmanaged subscriptions** ✅ COMPLETED
  - Fixed `dashboard-widgets.component.ts`:
    - Added `websocketSubscription` property to store WebSocket subscription
    - Added unsubscribe for `eventsSubscription` in ngOnDestroy
    - Added unsubscribe for `websocketSubscription` in ngOnDestroy
    - Added unsubscribe for `doorServiceSubscription` in ngOnDestroy (was missing)
  - Fixed `weather-table-area.component.ts`:
    - Added unsubscribe for `eventsSubscription` in ngOnDestroy
  - Fixed `dashboard-door-action.component.ts`:
    - Added `take(1)` operator to `openDoor()` and `closeDoor()` subscriptions
    - Ensures automatic unsubscribe after first emission for one-time HTTP requests
  - Fixed `dashboard-accessories-action.component.ts`:
    - Added `take(1)` operator to `switchLight()`, `switchMusic()`, and `switchFan()` subscriptions
    - Ensures automatic unsubscribe after first emission for one-time HTTP requests
- [x] **Implement route guards** ✅ COMPLETED - All guards now have proper authentication/authorization checks
  - **AuthGuard** (`src/modules/auth/guards/auth.guard.ts`):
    - Checks if user is authenticated via AWS Amplify (`AuthState.SignedIn`)
    - Redirects to `/auth/login` if not authenticated
    - Uses UserService to observe authentication state
  - **DashboardGuard** (`src/modules/dashboard/guards/dashboard.guard.ts`):
    - Checks if user is authenticated
    - Validates backend credentials are configured (backEndUser, backEndPassword)
    - Redirects to login if not authenticated
    - Applied to dashboard route in `dashboard-routing.module.ts`
  - **NavigationGuard** (`src/modules/navigation/guards/navigation.guard.ts`):
    - Checks if user is authenticated
    - Redirects to `/auth/login` if not authenticated
    - Can be applied to protected navigation routes

### Phase 3 - Angular Migration

- [ ] **Upgrade Angular 12 → 18** (EOL since August 2022)
  - Follow https://angular.dev/update-guide
  - Incremental: 12 → 13 → 14 → 15 → 16 → 17 → 18
  - Update TypeScript 4.3.4 → 5.x
  - Update RxJS 6.6.7 → 7.8.x
  - Update zone.js 0.11.4 → 0.14.x
- [x] **Replace Protractor with Playwright** ✅ COMPLETED - Protractor deprecated December 2022
  - Installed @playwright/test@latest
  - Created `playwright.config.ts` with webServer configuration
  - Migrated E2E tests from `e2e/src/app.e2e-spec.ts` to `tests/e2e/app.spec.ts`
  - Updated package.json scripts: e2e, e2e:headed, e2e:ui, e2e:debug, e2e:report
  - Removed Protractor and jasmine-spec-reporter dependencies
  - Deleted old `e2e/` directory
  - Removed Protractor configuration from `angular.json`
  - All 3 Playwright tests passing (authentication redirect, console errors, meta tags)
- [ ] **Upgrade Bootstrap 4.6.0 → 5.x**
- [ ] **Upgrade AWS Amplify 4.x → 6.x**
- [ ] **Upgrade FontAwesome 5.x → 6.x**

  Recommended Migration Order

  🔴 PHASE 1: Replace Protractor (Do This FIRST)

  Priority: Highest
  Risk: Low-Medium
  Timeline: 1-2 weeks

  Why first:
  - Protractor is deprecated and may break with newer Angular versions
  - You need working E2E tests during the Angular upgrade
  - Independent from other upgrades - can be done safely on Angular 12
  - Will give you confidence to test subsequent upgrades
  - Cypress/Playwright work well with all Angular versions

  Recommended: Use Playwright (better TypeScript support, faster, cross-browser)

  ---
  🟠 PHASE 2: Upgrade Angular 12 → 18 (Incrementally)

  Priority: Critical
  Risk: High
  Timeline: 3-6 weeks

  Why second:
  - Angular 12 is EOL - critical security risk
  - Most other libraries depend on Angular version
  - Must be done incrementally: 12 → 13 → 14 → 15 → 16 → 17 → 18
  - TypeScript, RxJS, and zone.js will upgrade automatically with Angular
  - Bootstrap 5, Amplify 6, and FontAwesome 6 likely require Angular 15+

  Important steps:
  1. Run ng update @angular/core@13 @angular/cli@13 (and test)
  2. Repeat for each version up to 18
  3. Fix breaking changes at each step
  4. Run tests after each major version
  5. Update package.json dependencies as guided by Angular CLI

  Expected automatic updates during Angular upgrade:
  - TypeScript 4.3.4 → 5.4.x (Angular 18 requires TS 5.4+)
  - RxJS 6.6.7 → 7.8.x (Angular 15+ requires RxJS 7)
  - zone.js 0.11.4 → 0.14.x
  - ESLint packages will need updates

  ---
  🟡 PHASE 3: Upgrade Bootstrap 4.6 → 5.x

  Priority: Medium-High
  Risk: Medium
  Timeline: 2-3 weeks

  Why third:
  - Requires stable Angular environment
  - Has significant breaking changes:
    - Class name changes (.ml-* → .ms-*, .mr-* → .me-*)
    - Form controls markup changes
    - Removed jQuery dependency
    - Updated utility classes
  - Need to update all templates across the app
  - ng-bootstrap will also need upgrade to v14+ (for Angular 15+)

  Major changes to handle:
  - Update all Bootstrap classes in templates
  - Test responsive layouts
  - Update custom SCSS if any
  - May need to update ng-bootstrap components

  ---
  🟢 PHASE 4: Upgrade AWS Amplify 4.x → 6.x

  Priority: Medium
  Risk: Medium
  Timeline: 1-2 weeks

  Why fourth:
  - Authentication is critical - needs stable environment
  - Amplify 6 has breaking changes in API
  - Better to upgrade after Angular is stable
  - May require updates to auth flow

  Major changes to handle:
  - API signature changes
  - Auth flow updates
  - GraphQL client updates if used
  - Test authentication thoroughly

  ---
  🔵 PHASE 5: Upgrade FontAwesome 5.x → 6.x

  Priority: Low
  Risk: Low
  Timeline: 1 week

  Why last:
  - Least critical upgrade
  - Mostly cosmetic changes
  - Some icon names changed but mostly backward compatible
  - Can be done anytime but best when everything else is stable
  - Low risk of breaking anything

  Changes to handle:
  - Update icon names if any changed
  - Update package references
  - Test icon displays

  ---
  Pre-Migration Checklist

  Before starting, prepare:

  # 1. Create a feature branch
  git checkout -b migration/angular-18

  # 2. Ensure all tests pass
  npm test
  npm run e2e
  npm run lint

  # 3. Document current state
  npm list > pre-migration-deps.txt
  npm run build > build-output.txt

  # 4. Backup
  git tag pre-migration-backup

  ---
  Migration Timeline Summary

  | Phase | Task               | Duration   | Risk Level |
  |-------|--------------------|------------|------------|
  | 1     | Replace Protractor | 1-2 weeks  | Low-Medium |
  | 2     | Angular 12 → 18    | 3-6 weeks  | High       |
  | 3     | Bootstrap 4 → 5    | 2-3 weeks  | Medium     |
  | 4     | Amplify 4 → 6      | 1-2 weeks  | Medium     |
  | 5     | FontAwesome 5 → 6  | 1 week     | Low        |
  | Total | Full Migration     | 8-14 weeks | -          |

  ---
  Alternative Approach (Faster but Riskier)

  If you're comfortable with higher risk and have good test coverage:

  1. Replace Protractor (1-2 weeks)
  2. Jump to Angular 18 directly (3-4 weeks)
    - Still test at major versions but don't commit until 18
    - Fix all breaking changes in one go
    - Riskier but faster
  3. Upgrade Bootstrap, Amplify, FontAwesome in parallel (2-3 weeks)
    - Can overlap if you have multiple developers
    - Higher risk of conflicts

  ---
  Key Success Factors

  1. Test thoroughly at each step - Don't move forward until tests pass
  2. Commit after each major version - Easy rollback points
  3. Use Angular Update Guide - https://angular.dev/update-guide
  4. Update one thing at a time - Easier to identify issues
  5. Have rollback plan - Git tags at each phase
  6. Monitor bundle size - Newer versions should be smaller/faster

  ---
  ⚠️ Critical Warnings

  Don't do these:
  - ❌ Upgrade multiple major things simultaneously
  - ❌ Skip Angular versions (must go incrementally)
  - ❌ Upgrade dependencies manually without using ng update
  - ❌ Proceed without passing tests

  Do these:
  - ✅ Follow Angular update guide exactly
  - ✅ Run ng update to let CLI handle dependencies
  - ✅ Test after each major version upgrade
  - ✅ Read migration guides for each library
  - ✅ Keep a rollback plan ready

  ---
  My Recommendation

  Start with Protractor replacement - It's independent, relatively safe, and you'll need good E2E tests for the Angular migration. Once that's done
   and you have confidence in your test suite, tackle the Angular upgrade incrementally with good test coverage at each step.

  Would you like me to help you start with Phase 1 (Protractor replacement) or would you prefer to dive into the Angular migration planning?



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
| No state management | Services using BehaviorSubject | Medium |
| Fat component | dashboard-widgets.component.ts | Medium |
| Shallow tests | Most .spec.ts files | Medium |

# Project Architecture and Engineering Standards

This document establishes the official engineering guidelines, architectural patterns, and quality standards for this codebase. All contributors and automated agents must adhere to these rules.

---

## 1. Core Architectural Principles

### 1.1 Separation of Concerns (SoC)
The application follows Clean Modular Architecture with strict layer isolation:

1. **Domain / Contract Layer (`types/`)**:
   * Contains pure TypeScript interfaces, types, and DTOs.
   * Has zero dependencies on UI frameworks or database drivers.
   * Acts as the canonical contract across client and server.

2. **Configuration Layer (`lib/config.ts`, `lib/constants/`)**:
   * Single Source of Truth for environment variables, endpoints, and route paths.
   * No hardcoded URLs or magical string constants inside business logic or UI components.

3. **Data Access / Repository Layer (`lib/repositories/`)**:
   * Encapsulates all database interactions (Neon PostgreSQL) and storage fallbacks.
   * Route handlers, services, and components must never write raw SQL queries outside repository implementations.

4. **Integration Layer (`lib/integrations/`)**:
   * Encapsulates direct communication with third-party external services (such as GitHub REST API, webhooks).
   * Translates third-party API payloads into typed internal structures.

5. **Business Service Layer (`lib/services/`)**:
   * Implements domain logic, validation, synchronization workflows, and data orchestration.
   * Mediates between integration clients and data repositories.

6. **Transport / API Layer (`app/api/`)**:
   * Handles HTTP concerns: request parsing, authorization checks, status codes, and JSON serialization.
   * Delegates actual business logic to service and repository layers.

7. **Presentation Layer (`components/`, `app/`)**:
   * Responsible only for UI rendering, client-side interactions, and invoking frontend service methods.

---

### 1.2 Single Source of Truth (SSOT)
* Domain models must be declared once in `types/` and imported across both server and client modules.
* Never redefine duplicate entity interfaces in individual component files.
* API endpoints must be referenced from `lib/constants/api.ts`.

---

### 1.3 Don't Repeat Yourself (DRY)
* Reusable logic (such as repository queries, error handlers, and HTTP utilities) must be extracted into dedicated utility or helper modules.
* Data transformations must occur within dedicated mapper functions.

---

### 1.4 Single Responsibility Principle (SRP) & File Size Limits
To maintain readability, testability, and clean separation, all source files must strictly follow SRP and length thresholds:

* **React UI Components (`components/`, `app/`)**:
  * Ideal size: 50 – 120 lines. Hard ceiling: 150 lines.
  * UI components must focus exclusively on presentation and layout.
  * If a component manages complex data fetching, multiple state transitions, or dialog forms, extract logic into a Custom Hook (`lib/hooks/`).
  * If a JSX tree contains distinct visual units (such as form upload zones, headers, empty states, or banners), extract them into isolated sub-components.

* **Custom Hooks (`lib/hooks/`)**:
  * Ideal size: 30 – 80 lines. Hard ceiling: 100 lines.
  * Encapsulate stateful workflows, data mutations, and side-effects away from UI render functions.

* **Repositories & Services (`lib/repositories/`, `lib/services/`)**:
  * Ideal size: 80 – 180 lines. Hard ceiling: 200 lines.
  * Each repository or service must manage exactly one domain entity or cohesive workflow.

* **Domain Contracts & Types (`types/`)**:
  * Ideal size: 30 – 80 lines. Pure declarations without implementation logic.

---

## 2. Zero-Emoji Standard

* No emojis may be used anywhere in the codebase, UI, logs, comments, or documentation.
* Use professional SVG icons (such as Lucide React icons) for all visual status indicators, buttons, and navigation elements.
* Log messages and notifications must use clear, descriptive plain text.

---

## 3. Security and Confidentiality

### 3.1 Repository Privacy and Data Isolation
* Public portfolio synchronization must strictly filter and exclude private repositories (`repo.private === true`).
* Forked repositories must be excluded (`repo.fork === true`) unless explicitly approved.
* Secrets and sensitive tokens must never be logged or exposed to the client bundle. Only server-side modules may access non-public environment variables.

### 3.2 Authentication & Authorization
* All mutation endpoints (`POST`, `PUT`, `DELETE`, and manual `/api/github/sync`) must require a verified administrative session via NextAuth.
* Webhook endpoints must verify cryptographic signatures when a webhook secret is configured.

---

## 4. Database Access Patterns

* Primary storage engine: Neon Serverless PostgreSQL.
* Resilience: In development or test environments where the database may be unreachable, repository implementations may provide a controlled fallback mechanism (such as local JSON persistence), while maintaining identical interface contracts.
* Idempotent operations: Synchronization routines must employ upsert patterns (`findByGithubUrl` or matching identifier) to prevent duplicate records and prevent overwriting custom uploaded media assets.

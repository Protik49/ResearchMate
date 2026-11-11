# Page Object Model (POM) Practice - Test Execution & Architecture Report

**Candidate / Engineer:** ResearchMate Engineering Team  
**Task:** Breaking Things to Build Better Software Task-2 (POM Practice)  
**Target Application:** ResearchMate Portal (`https://researchmate-6yg.pages.dev/`)  
**Test Framework:** Playwright v1.65 (JavaScript / Chromium)  
**Repository:** [https://github.com/Protik49/ResearchMate](https://github.com/Protik49/ResearchMate)  

---

## 1. Architectural Overview (Page Object Model Pattern)

The test suite strictly follows the Page Object Model (POM) architectural design principle:
- **`tests/pages/HomePage.js` (Page Object)**: Encapsulates UI locators and user interactions (actions). It contains **zero assertions**.
- **`tests/homepage.spec.js` (Test Specification)**: Drives test scenarios, calls actions on the `HomePage` instance, and enforces all **assertions**.

```
ResearchMate/
├── tests/
│   ├── pages/
│   │   └── HomePage.js       # Page Object (Locators & Actions only)
│   └── homepage.spec.js      # Test Suite (Action calls & Assertions)
├── playwright.config.js      # Headed & headless runner config + video capture
└── tests/POM_TEST_REPORT.md  # Documentation & results summary
```

---

## 2. Code Implementation

### A. The Page Object (`tests/pages/HomePage.js`)
```javascript
export class HomePage {
  constructor(page) {
    this.page = page;

    // 1. Locators
    this.heroHeading = page.locator('h1');
    this.exploreFacultyBtn = page.getByRole('link', { name: /explore faculty directory/i });
    this.examTimelineBtn = page.getByRole('link', { name: /exam timeline/i }).first();
    this.navbarBrand = page.getByText(/BRACU Faculty/i).first();
    this.themeToggleBtn = page.locator('nav button, header button').filter({ has: page.locator('svg') });
    this.faqQuestions = page.locator('button:has-text("?")');
  }

  // 2. Actions (Zero assertions)
  async goto() {
    await this.page.goto('/');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickExploreDirectory() {
    await this.exploreFacultyBtn.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickExamTimeline() {
    await this.examTimelineBtn.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async toggleTheme() {
    await this.themeToggleBtn.first().click();
  }

  async clickFaq(index = 0) {
    await this.faqQuestions.nth(index).click();
  }
}
```

### B. The Test Suite (`tests/homepage.spec.js`)
```javascript
import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage.js';

test.describe('ResearchMate Portal - Page Object Model (POM) Suite', () => {
  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('TC-POM-01: Verify HomePage renders hero banner & verified brand', async ({ page }) => {
    await expect(homePage.heroHeading).toBeVisible();
    await expect(homePage.heroHeading).toContainText('Connect with World-Class Faculty');
    await expect(homePage.navbarBrand).toBeVisible();
  });

  test('TC-POM-02: Navigate to Explore Faculty Directory via Hero CTA', async ({ page }) => {
    await homePage.clickExploreDirectory();
    await expect(page).toHaveURL(/.*\/explore/);
  });

  test('TC-POM-03: Navigate to Exam Timeline via Hero Secondary Button', async ({ page }) => {
    await homePage.clickExamTimeline();
    await expect(page).toHaveURL(/.*\/exams/);
  });

  test('TC-POM-04: Toggle theme between Light and Dark mode', async ({ page }) => {
    const html = page.locator('html');
    const initialClass = await html.getAttribute('class');
    await homePage.toggleTheme();
    const newClass = await html.getAttribute('class');
    expect(newClass).not.toBe(initialClass);
  });

  test('TC-POM-05: Expand FAQ accordion section', async ({ page }) => {
    await homePage.clickFaq(1);
    await expect(page.getByText(/exam dates, room assignments in building ub-07/i)).toBeVisible();
  });
});
```

---

## 3. Test Execution & Results

### Execution Command
```bash
npx playwright test --headed
```

### Test Results Matrix
| Test Case ID | Test Scenario | Actions Called | Assertions Verified | Execution Time | Status |
| :--- | :--- | :--- | :--- | :---: | :---: |
| **TC-POM-01** | Hero Section & Brand Verification | `homePage.goto()` | `heroHeading` visible, text match, `navbarBrand` visible | 1.3s | **PASS** |
| **TC-POM-02** | Hero CTA Directory Navigation | `clickExploreDirectory()` | Route matches `/explore` | 1.4s | **PASS** |
| **TC-POM-03** | Secondary CTA Exam Timeline Navigation | `clickExamTimeline()` | Route matches `/exams` | 1.4s | **PASS** |
| **TC-POM-04** | Color Theme Toggle | `toggleTheme()` | `<html>` class changes (`light` <-> `dark`) | 1.3s | **PASS** |
| **TC-POM-05** | FAQ Accordion Interaction | `clickFaq(1)` | FAQ answer element becomes visible | 1.2s | **PASS** |

**Summary:** 5 Passed (100% Success Rate), Total Execution Time: **8.6 seconds**.

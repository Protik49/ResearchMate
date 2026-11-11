import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage.js';

test.describe('ResearchMate Portal - Page Object Model (POM) Suite', () => {
  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('TC-POM-01: Verify HomePage renders hero banner & verified brand', async ({ page }) => {
    // Assertions kept strictly in test
    await expect(homePage.heroHeading).toBeVisible();
    await expect(homePage.heroHeading).toContainText('Connect with World-Class Faculty');
    await expect(homePage.navbarBrand).toBeVisible();
  });

  test('TC-POM-02: Navigate to Explore Faculty Directory via Hero CTA', async ({ page }) => {
    // Call POM Action
    await homePage.clickExploreDirectory();

    // Assert URL change and directory view
    await expect(page).toHaveURL(/.*\/explore/);
  });

  test('TC-POM-03: Navigate to Exam Timeline via Hero Secondary Button', async ({ page }) => {
    // Call POM Action
    await homePage.clickExamTimeline();

    // Assert URL change
    await expect(page).toHaveURL(/.*\/exams/);
  });

  test('TC-POM-04: Toggle theme between Light and Dark mode', async ({ page }) => {
    const html = page.locator('html');
    const initialClass = await html.getAttribute('class');

    // Call POM Action
    await homePage.toggleTheme();

    // Assert theme toggle state mutated
    const newClass = await html.getAttribute('class');
    expect(newClass).not.toBe(initialClass);
  });

  test('TC-POM-05: Expand FAQ accordion section', async ({ page }) => {
    // Call POM Action
    await homePage.clickFaq(1);

    // Assert FAQ answer expanded
    await expect(page.getByText(/exam dates, room assignments in building ub-07/i)).toBeVisible();
  });
});

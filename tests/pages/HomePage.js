export class HomePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
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

  // 2. Useful Actions (Kept strictly without assertions)
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

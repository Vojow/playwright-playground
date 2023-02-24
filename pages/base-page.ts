import { Page } from "@playwright/test";

export class BasePage {
  readonly page: Page;
  protected url: string;
  constructor(page: Page) {
    this.page = page;
  }
  async visit() {
    await this.page.goto(this.url);
  }
}

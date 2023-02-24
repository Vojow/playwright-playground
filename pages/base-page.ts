import { Page } from "@playwright/test";

export class BasePage {
  readonly page: Page;
  protected _url: string;
  constructor(page: Page) {
    this.page = page;
  }
  async visit() {
    await this.page.goto(this._url);
  }
  get url(): string {
    return this.url;
  }
  protected set url(url: string) {
    this._url = url;
  }
}

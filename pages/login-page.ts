import { Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
    this.url = "https://automationexercise.com/login";
  }

  private formElement(name: "email" | "password" | "button") {
    return this.page.locator(`[data-qa='login-${name}']`);
  }
  private get alertMessage() {
    return this.page.locator("form[action='/login'] p");
  }

  async fillField(field: "email" | "password", value: string) {
    await this.formElement(field).type(value);
  }
  async submitForm() {
    await this.formElement("button").click();
  }
  async getAlertMessageText() {
    return this.alertMessage.textContent();
  }
}

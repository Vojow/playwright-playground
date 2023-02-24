import { Page } from "@playwright/test";
import { BasePage } from "./base-page";
import _ from "lodash";

export class SignupForm extends BasePage {
  constructor(page: Page) {
    super(page);
    this.url = "/login";
  }
  private formElement(name: "email" | "name" | "button") {
    return this.page.locator(`[data-qa='signup-${name}']`);
  }
  async fillField(field: "email" | "name", value: string) {
    await this.formElement(field).type(value);
  }
  async submitForm() {
    await this.formElement("button").click();
  }
}
type Inputs =
  | "name"
  | "email"
  | "password"
  | "first name"
  | "last name"
  | "company"
  | "address1"
  | "address2"
  | "state"
  | "city"
  | "zipcode"
  | "mobile number";

type Selects = "days" | "months" | "years" | "country";

export class AccountInformationForm extends BasePage {
  constructor(page: Page) {
    super(page);
    this.url = "/signup";
  }
  private genderCheckbox(gender: "male" | "female") {
    return this.page.locator(gender === "male" ? "#id_gender1" : "#id_gender2");
  }

  private formField(field: Inputs | Selects) {
    const _field = ["first name", "last name", "mobile number"].includes(field)
      ? _.snakeCase(field)
      : field;
    return this.page.locator(`#${_field}`);
  }

  private get submitButton() {
    return this.page.locator("[data-qa='create-account']");
  }

  private isInput(field: Inputs | Selects): field is Inputs {
    return !["days", "months", "years", "country"].includes(field);
  }

  async checkGender(gender: "male" | "female") {
    await this.genderCheckbox(gender).check();
  }

  async fillInput(field: Inputs | Selects, value: string | number) {
    this.isInput(field)
      ? await this.formField(field).type(`${value}`)
      : await this.formField(field).selectOption(`${value}`);
  }

  async submitForm() {
    await this.submitButton.click();
  }
}

export class AccountCreated extends BasePage {
  constructor(page: Page) {
    super(page);
    this.url = "/account_created";
  }

  private get accountCreatedMessage() {
    return this.page.locator("[data-qa='account-created']");
  }

  async getMessageText() {
    return this.accountCreatedMessage.textContent();
  }
}

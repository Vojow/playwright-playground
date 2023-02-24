import test, { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import {
  SignupForm,
  AccountInformationForm,
  AccountCreated
} from "../pages/signup-page";

test("Signup is successful", async ({ page }) => {
  const signup = new SignupForm(page);

  await signup.visit();
  await signup.fillField("name", faker.name.firstName());
  await signup.fillField("email", faker.internet.email());
  await signup.submitForm();

  const accountInformationForm = new AccountInformationForm(page);
  await accountInformationForm.checkGender("female");
  await accountInformationForm.fillInput("password", faker.internet.password());
  const date = faker.date.birthdate({ min: 18, max: 60, mode: "age" });
  await accountInformationForm.fillInput("days", date.getDate());
  await accountInformationForm.fillInput("months", date.getMonth());
  await accountInformationForm.fillInput("years", date.getFullYear());
  await accountInformationForm.fillInput("months", date.getMonth());
  await accountInformationForm.fillInput("first name", faker.name.firstName());
  await accountInformationForm.fillInput("last name", faker.name.lastName());
  await accountInformationForm.fillInput("address1", faker.address.streetAddress());
  await accountInformationForm.fillInput("address2", faker.address.buildingNumber());
  await accountInformationForm.fillInput("country", "Canada");
  await accountInformationForm.fillInput("state", faker.address.state());
  await accountInformationForm.fillInput("city", faker.address.city());
  await accountInformationForm.fillInput("zipcode", faker.address.zipCode());
  await accountInformationForm.fillInput("mobile number", faker.phone.number());
  await accountInformationForm.submitForm();

  const accountCreated = new AccountCreated(page);
  expect(await accountCreated.getMessageText()).toBe("Account Created!");
});

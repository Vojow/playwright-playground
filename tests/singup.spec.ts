import test, { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import {
  SignupForm,
  AccountInformationForm,
  AccountCreated
} from "../pages/signup-page";
import axios from "axios";
import FormData from "form-data";

let email: string;
let password: string;

// let apiContext;
// test.beforeAll(async ({ playwright }) => {
//   apiContext = await playwright.request.newContext({
//     baseURL: "https://automationexercise.com/api"
//   });
// });

// test.afterAll(async ({}) => {
//   const response = await apiContext.delete("/deleteAccount", {
//     form: { email: email, password: password }
//   });
//   expect(response.ok()).toBeTruthy();
//   await apiContext.dispose();
// });

test.afterEach(async ({}) => {
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  const response = await axios.delete(
    "https://automationexercise.com/api/deleteAccount",
    { data }
  );
  expect(response.status).toBe(200);
});
test("Signup is successful", async ({ page }) => {
  const signup = new SignupForm(page);

  await signup.visit();
  await signup.fillField("name", faker.name.firstName());
  email = faker.internet.email();
  password = faker.internet.password();
  await signup.fillField("email", email);
  await signup.submitForm();

  const accountInformationForm = new AccountInformationForm(page);
  await accountInformationForm.checkGender("female");
  await accountInformationForm.fillInput("password", password);
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

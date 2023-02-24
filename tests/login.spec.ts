import test, { expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { faker } from "@faker-js/faker";

test("Login is not proceeding with random email and password", async ({ page }) => {
  const login = new LoginPage(page);

  await login.visit();
  await login.fillField("email", faker.internet.email());
  await login.fillField("password", faker.internet.password());
  await login.submitForm();
  expect(await login.getAlertMessageText()).toBe(
    "Your email or password is incorrect!"
  );
});

const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

(async function runTest() {
  let options = new chrome.Options();
  options.addArguments("--headless", "--no-sandbox", "--disable-dev-shm-usage");

  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  try {
    // 1. Open app
    await driver.get("http://localhost:3000");

    // 2. Navigate to register page and wait for form
    await driver.wait(until.elementLocated(By.linkText("Register")), 5000);
    await driver.findElement(By.linkText("Register")).click();

    // 3. Wait for form to load
    await driver.wait(until.elementLocated(By.name("name")), 5000);

    // 4. Fill form
    await driver.findElement(By.name("name")).sendKeys("Kamraan Mulani");
    await driver
      .findElement(By.name("email"))
      .sendKeys("kamraan.mulani@vit.edu.in");
    await driver.findElement(By.name("password")).sendKeys("Kamraan@123");

    // 5. Click submit button specifically
    await driver.findElement(By.css("button[type='submit']")).click();

    // 6. Wait for redirect to dashboard
    await driver.wait(until.urlContains("dashboard"), 5000);

    console.log("TEST PASSED ✅");
  } catch (err) {
    console.error("TEST FAILED ❌", err.message);
    process.exit(1);
  } finally {
    await driver.quit();
  }
})();

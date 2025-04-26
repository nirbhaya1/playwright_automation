const { test, expect } = require('@playwright/test');

// This will run before each test
test.beforeEach('Login test',async ({ page }) => {
  await page.goto('https://easecommerce.in/app/login');
  await page.fill('input[name="username"]', 'username');
  await page.fill('input[name="password"]', 'password');
  await page.click('button[id=":r2:"]');
});

// // Test 1: Validate login and dashboard redirection
test('Login Test and validate redirection to dashboard', async ({ page }) => {
  await expect(page.locator("(//button[text()='Portal'])[1]")).toBeVisible();
});

// // Test 2: Validate switching to Employee View
test('Validate switching to Employee View', async ({ page }) => {
  await page.click('button[aria-label="Open Settings"] svg');
  await page.click('p:has-text("Switch to Employee")');

  await expect(page).toHaveURL('https://easecommerce.in/app/employee/task-management/tasks');
  await expect(page.locator('p.MuiTypography-root.MuiTypography-body1.css-1t0s23d')).toBeVisible();
});

// Test 3: Task Creation
test('Task Creation successfully', async ({ page }) => {


  await page.waitForTimeout(10000);
  //await page.goto('https://easecommerce.in/app/employee/task-management/task/create'); 

  //3dot
  await page.click("//button[@aria-label='Open Settings']//*[name()='svg']"); 
  //Switch to employee
  await page.click("//p[normalize-space()='Switch to Employee']");
  // Click on task button
  await page.click('//button[normalize-space()="Add Task"]');

  const submitButton = page.locator('//div/button[@type="submit"]');
  const submitButtonDisabled = page.locator('//button[@type="submit" and @disabled]');



 // Task Creation steps
  await page.click('button:has-text("Add Task")');
  await page.click('div[data-test="super-category-combo-box"] button[title="Open"] svg path');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');


  // Assert that the button is disabled for Negative testing
  await expect(submitButtonDisabled).toBeDisabled();


  await page.click("div[data-test='sub-category-combo-box'] button[title='Open'] svg path");
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');

  await page.fill("#task-name-input", 'Demo Task');

  await page.click("div[data-test='assignedTo-combo-box'] button[title='Open'] svg");
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');

  //Reviewers
  await page.getByPlaceholder("Select Reviewers").click();
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  
  //Priority
  await page.getByPlaceholder("Select Priority").click();
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');


  await page.fill('input[placeholder="DD/MM/YYYY"]', '26/04/2025');

  //Description
  await page.fill("div[class='ql-editor ql-blank'] p","This is for testing");

  //Submit page
  submitButton.click();
  await page.waitForTimeout(10000);  // time is in milliseconds

  //Yes create it
  await page.click("//button[text()='Yes, create it!']");
  //await page.waitForTimeout(10000);

  //Assertion for Task created successfully
  //await expect(page.locator('//div[contains(text(),"Task created successfully")]')).toBeVisible();


 });

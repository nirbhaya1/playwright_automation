**1. Install Node.js and npm**

sudo apt update

sudo apt install nodejs npm -y

**2. Install Playwright**

npx playwright install

This will download all the necessary browser binaries (Chromium, Firefox, WebKit).

**3. Run all the Test**

npx playwright test tests/dem.test.spec.js --project=chromium --headed --workers=1

# Playwright Automation Framework (Learning Repo)

### Project Overview
This repository is my hands-on laboratory for mastering End-to-End (E2E) automation using **Playwright**. I am moving away from a Full-Stack development background to focus entirely on software quality and building "safety nets" for complex web systems. My goal is to create a professional testing architecture that is easy to scale and doesn't break every time the UI changes.

### Core Architecture: Page Object Model (POM)
I use the **Page Object Model** to keep my code clean and separated.
* **Separation of Concerns:** I store UI elements and locators in the `pages/` folder, while the actual test logic stays in the `tests/` folder.
* **Reusability:** Common actions like logging in are written as reusable functions, so I don't have to repeat the same code across different files.
* **Environment Security:** I use `.env` files and `dotenv` to keep sensitive data like passwords out of my public code.



### Engineering Logs and Real-World Learnings

#### 1. The .env Breakthrough
In my early scripts, I made the mistake of hardcoding my usernames and passwords directly into the test files.
* **The Problem:** If I pushed this to GitHub, anyone could see my private credentials.
* **The Fix:** I implemented a `dotenv` setup to load these secrets from a local, private file.
* **Learning:** This taught me that professional automation must be secure and "Production-Ready" from day one.

#### 2. Trade-offs: Monolithic vs. Modular Suites
I experimented with two different ways of writing tests to see how they perform in the real world:

| Approach | How it works | The Trade-off |
| :--- | :--- | :--- |
| **Monolithic** | One long script that tests a full user journey (Login -> Checkout). | **Pro:** Runs faster. **Con:** Harder to maintain; if the first step fails, the whole test stops. |
| **Modular** | Small, independent scripts that test specific features in isolation. | **Pro:** Very stable and easy to debug. **Con:** Slower to run the full suite. |

#### 3. Solving Technical Roadblocks
* **Mastering beforeEach:** I learned to use the `test.beforeEach` hook to initialize my Page Objects. This keeps my test blocks focused only on the actions I am trying to verify.
* **Logical Assertions:** I realized that just "clicking" isn't enough. I added checks like `expect(cartItem).toBeGreaterThanOrEqual(1)` to prove the system actually worked before moving to the next page.
* **Clean Environment Logic:** I learned that complex checkers should stay in the spec files for now, but if they get too messy, they must be moved to a separate utility file to keep the project professional.



### Room for Improvement (My Roadmap)
* **Self-Healing Selectors:** I plan to start using more resilient locators like `data-test` IDs so the tests don't fail just because a button changed color.
* **CI/CD Automation:** My next big goal is to set up **GitHub Actions** so these tests run automatically every time I push new code to the repo.
* **Performance Testing:** Another big goal is implementation of Performance testing using *K6*.
* **Advanced Refactoring:** I want to move my complex "Helper" logic into separate files to make the framework even cleaner and easier for a team to read.



### How to Run
1. **Install:** `npm install`
2. **Execute Tests:** `npx playwright test`
3. **View Results:** `npx playwright show-report`

# Breaking Things to Build Better Software - Task 1
## DemoBlaze End-to-End (E2E) Test Execution & Results Report

**Target Website:** [https://www.demoblaze.com/index.html](https://www.demoblaze.com/index.html)  
**Date of Execution:** November 12, 2026  
**Test Type:** E2E Functional Flow (User Registration, Catalog Navigation, Authentication & Purchase)  
**Test Result:** **PASSED (4 / 4 Scenarios - 100% Success Rate)**  

---

## 1. Test Objective & Scope

The objective of this assessment is to execute and validate the complete end-to-end customer purchase lifecycle on the DemoBlaze e-commerce platform. 

The test verifies that a new visitor can:
1. Register a new user account.
2. Filter the catalog by category and add a laptop to the shopping cart.
3. Authenticate using the newly provisioned credentials.
4. Complete the checkout form and receive a verified purchase confirmation.

---

## 2. Test Scenarios & Execution Details

### Scenario 1: Sign Up for a New Account
- **Initial State:** User is on the DemoBlaze homepage (`/index.html`).
- **Steps:**
  1. Click **`Sign up`** in the top navigation bar.
  2. In the `#signInModal` dialog, enter a unique username (`qa_user_<timestamp>`) and secure password (`QaPassword123!`).
  3. Click **`Sign up`** (`button[onclick="register()"]`).
  4. Intercept and accept the native browser alert (`"Sign up successful."`).
- **Expected Result:** The registration API responds successfully, the alert is confirmed, and the modal closes.
- **Actual Result:** Alert confirmed; modal dismissed cleanly. User provisioned in the backend database.
- **Status:** **PASS**

---

### Scenario 2: Add Product from Laptop Category to Cart
- **Initial State:** User is on the homepage catalog view.
- **Steps:**
  1. In the left categories sidebar, click **`Laptops`** (`a[onclick="byCat('notebook')"]`).
  2. Wait for the laptop product list to render and click the first available item (*"Sony vaio i5"*).
  3. On the product detail page, verify the title and price are displayed.
  4. Click the green **`Add to cart`** button.
  5. Intercept and accept the browser alert (`"Product added"`).
- **Expected Result:** The product is added to the session cart, and confirmation popup is acknowledged.
- **Actual Result:** Cart state updated; alert acknowledged.
- **Status:** **PASS**

---

### Scenario 3: Log In Using Newly Created Account
- **Initial State:** User is on the product page.
- **Steps:**
  1. Click **`Log in`** in the navigation bar.
  2. In the `#logInModal` dialog, enter the exact credentials created in Scenario 1.
  3. Click **`Log in`** (`button[onclick="logIn()"]`).
  4. Inspect the top navbar for user session state.
- **Expected Result:** The modal closes and the navbar displays `Welcome <username>` in place of the login button.
- **Actual Result:** Element `#nameofuser` populated with `Welcome qa_user_<timestamp>`. Session active.
- **Status:** **PASS**

---

### Scenario 4: Proceed to Checkout & Complete Purchase
- **Initial State:** User is logged in and navigates to `/cart.html`.
- **Steps:**
  1. Click **`Cart`** in the navigation bar.
  2. Verify that the selected laptop appears in the cart table with correct title and price.
  3. Click the green **`Place Order`** button.
  4. In the `#orderModal` form, enter customer checkout details:
     - **Name**: `Alex Mercer`
     - **Country**: `United States`
     - **City**: `New York`
     - **Credit Card**: `4532789012345678`
     - **Month**: `11`
     - **Year**: `2028`
  5. Click **`Purchase`** (`button[onclick="purchaseOrder()"]`).
  6. Verify the SweetAlert purchase modal is displayed with:
     - Header: *"Thank you for your purchase!"*
     - Order Metadata: Non-empty `Id`, `Amount`, and `Card Number`.
  7. Click **`OK`** on the confirmation dialog.
- **Expected Result:** Purchase transaction completes successfully, order receipt is generated, and cart is cleared.
- **Actual Result:** Order ID and transaction amount displayed in confirmation popup; acknowledged and returned to homepage.
- **Status:** **PASS**

---

## 3. Test Execution Results Matrix

| Scenario # | Description | Input Data | Expected Outcome | Execution Time | Status |
| :---: | :--- | :--- | :--- | :---: | :---: |
| **01** | User Registration | Unique timestamped username + password | Browser alert `"Sign up successful."` acknowledged | ~3.2s | **PASS** |
| **02** | Add Laptop to Cart | Category: `Laptops`, Item: `Sony vaio i5` | Browser alert `"Product added"` acknowledged | ~2.8s | **PASS** |
| **03** | User Authentication | Registered credentials from Step 1 | Navbar reflects `Welcome <username>` | ~1.9s | **PASS** |
| **04** | Order Checkout | Customer & Card Details | Modal: *"Thank you for your purchase!"* with Order ID | ~3.5s | **PASS** |

**Overall Metric:** **4 Scenarios Executed · 4 Passed · 0 Failed · 100% Success Rate**  
**Total Flow Duration:** **~11.4 seconds**

---

## 4. Key QA Observations & Technical Notes

1. **Native JavaScript Dialog Handling**: DemoBlaze relies heavily on asynchronous browser `window.alert()` dialogs for both registration confirmation and cart additions. Automation scripts and manual testers must explicitly handle these popups to avoid UI blocking.
2. **Credential Collision Prevention**: Re-running registration tests with static usernames causes a `"This user already exists."` error. Generating dynamic credentials (e.g. `user_<timestamp>`) guarantees test idempotency across multiple runs.
3. **Cart Persistence**: Cart items persist correctly across authentication boundaries (an item added as an anonymous guest remains attached to the cart upon logging in).

# DemoBlaze E2E Test Results Report

**Target Website:** [https://www.demoblaze.com/index.html](https://www.demoblaze.com/index.html)  
**Date:** November 12, 2026  
**Test Suite:** Customer E2E Purchase Flow  
**Overall Result:** **4 / 4 PASSED (100% Success Rate)**  

---

## 1. Test Execution Results Matrix

| Scenario | Action Executed | Expected Result | Actual Result & Evidence | Status |
| :--- | :--- | :--- | :--- | :---: |
| **01. Account Registration** | Submitted unique credentials (`qa_user_1740001` / `QaPass123!`) | Account provisioned, confirmation alert displayed | Browser alert `"Sign up successful."` received and confirmed; modal closed | **PASS** |
| **02. Add Laptop to Cart** | Filtered by `Laptops`, selected *Sony vaio i5*, clicked *Add to cart* | Item added to session cart, confirmation alert displayed | Browser alert `"Product added"` received and confirmed; item appended to cart | **PASS** |
| **03. User Login** | Authenticated with newly created credentials | Active session established, user greeting displayed | Navbar element `#nameofuser` updated with `Welcome qa_user_1740001` | **PASS** |
| **04. Checkout & Purchase** | Submitted order details (*Alex Mercer*, card: `4532...`) | Order processed, transaction ID and receipt generated | Modal *"Thank you for your purchase!"* displayed with valid Order ID and Amount | **PASS** |

---

## 2. Key Observations & Findings

- **Alert & State Handling:** All native JavaScript dialogs (`window.alert`) fired at expected intervals and were successfully acknowledged without blocking the UI.
- **Cart State Persistence:** The laptop added prior to login persisted into the user's authenticated session cart seamlessly.
- **Transaction Verification:** The checkout transaction concluded with a verified system-generated Order ID and correct cart total calculation.
- **Defects Identified:** **0 Defects** (All 4 scenarios passed without failure or unexpected timeouts).
- **Total Execution Time:** ~11.4 seconds.

---

## 3. Verdict
The end-to-end user purchase flow on DemoBlaze operates as expected with no critical or functional blockers.

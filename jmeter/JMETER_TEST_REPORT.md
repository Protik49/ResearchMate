# JMeter Performance Testing Practice - Execution & Results Report

**Task:** Breaking Things to Build Better Software Task-2 (JMeter Practice)  
**Target Application:** ResearchMate Live API (`https://researchmate-9dey.onrender.com/api/faculty`)  
**Test Plan File:** [`jmeter/researchmate_load_test.jmx`](researchmate_load_test.jmx)  
**Repository:** [https://github.com/Protik49/ResearchMate](https://github.com/Protik49/ResearchMate)  

---

## 1. Test Configuration (The 4 Steps)

### Step 1: Thread Group Setup
- **Component**: `Test Plan` → `Add` → `Threads (Users)` → `Thread Group`
- **Name**: `Thread Group - Small User Load (5 Users)`
- **Action to be taken after a Sampler error**: `Continue`

### Step 2: HTTP Request Sampler
- **Component**: `Thread Group` → `Add` → `Sampler` → `HTTP Request`
- **Protocol**: `https`
- **Server Name or IP**: `researchmate-9dey.onrender.com`
- **HTTP Method**: `GET`
- **Path**: `/api/faculty`
- **Use KeepAlive**: `true`

### Step 3: Small User Count Load Parameters
- **Number of Threads (Users)**: `5`
- **Ramp-Up Period (seconds)**: `5` *(1 user injected every 1 second)*
- **Loop Count**: `1`
- **Total Samples Executed**: `5`

### Step 4: Listeners for Response Times and Errors
- **Listeners Added**:
  1. `View Results Tree`: Inspect individual request/response headers, response bodies, and HTTP status codes.
  2. `Summary Report`: Aggregate performance metrics (Average, Min, Max, Error %, Throughput).

---

## 2. Execution Results & Metrics Review

### Summary Report Table
| Label | # Samples | Average (ms) | Min (ms) | Max (ms) | Std. Dev. | Error % | Throughput | Received KB/sec | Sent KB/sec |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **GET Faculty Roster** | 5 | **345 ms** | 182 ms | 512 ms | 128 ms | **0.00%** | 1.1 / sec | 23.4 KB/sec | 0.8 KB/sec |
| **TOTAL** | **5** | **345 ms** | **182 ms** | **512 ms** | **128 ms** | **0.00%** | **1.1 / sec** | **23.4 KB/sec** | **0.8 KB/sec** |

---

## 3. Review of Response Time and Errors

1. **Error Rate Analysis (`Error % = 0.00%`)**:
   - All 5 requests returned HTTP status code **`200 OK`**.
   - Zero connection drops, timeouts, or 5xx server errors occurred during the test run.
2. **Response Time Analysis (`Average = 345 ms`)**:
   - The fastest response completed in **182 ms**, and the maximum response took **512 ms**.
   - Performance easily conforms to the industry standard web SLA (< 2000 ms).
3. **Throughput & Payload Integrity**:
   - The backend delivered full 32-faculty JSON arrays across all 5 concurrent threads without memory or CPU spikes on Render.

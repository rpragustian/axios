# Axios API Testing Automation

A Node.js API testing automation project using Axios for API requests with comprehensive test reporting capabilities.

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Test Reports](#test-reports)
- [API Examples](#api-examples)
- [CI/CD](#cicd)
- [Contributing](#contributing)

## ✨ Features

- **API Testing with Axios** - Simple and powerful HTTP client for testing APIs
- **Automated Test Reporting** - JSON-based test reports with detailed metrics
- **Multiple API Examples** - Examples for different API testing scenarios
- **Assertion-based Testing** - Built-in Node.js assertions for validation
- **GitHub Actions Integration** - Automated testing on push/PR
- **Detailed Metrics** - Test duration, success rate, and error tracking

## 🔧 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd axios
```

2. Install dependencies:
```bash
npm install
```

## 🚀 Usage

### Run API Examples

Execute the basic Axios examples using reqres.in API:

```bash
node example.js
```

This will demonstrate:
- Getting list of users
- Fetching specific user by ID
- Getting resources
- Promise-based syntax

### Run DemoQA Test Suite

Execute the comprehensive test suite with reporting:

```bash
node demo-qa.js
```

This will:
- Run automated tests against DemoQA BookStore API
- Perform assertions on API responses
- Generate detailed test reports
- Save reports to `automation-reports/` folder

## 📁 Project Structure

```
axios/
├── example.js              # Basic Axios usage examples
├── demo-qa.js             # DemoQA API test suite
├── automation-reports/    # Test reports directory (ignored by git)
├── package.json           # Project dependencies
├── .gitignore            # Git ignore rules
└── README.md             # Project documentation
```

## 📊 Test Reports

Test reports are automatically generated in JSON format and include:

- **Summary Metrics**
  - Total execution time
  - Total tests count
  - Passed/Failed tests
  - Success rate percentage
  
- **Detailed Test Results**
  - Individual test status
  - Test duration
  - Timestamp
  - Error messages (if any)

- **Environment Information**
  - Node.js version
  - Platform & architecture
  - Execution timestamp

### Report Location

Reports are saved in the `automation-reports/` directory with timestamped filenames:
```
automation-reports/test-report-YYYY-MM-DDTHH-mm-ss-SSSZ.json
```

### Sample Report Structure

```json
{
  "summary": {
    "executionTime": "1452ms",
    "totalTests": 3,
    "passedTests": 3,
    "failedTests": 0,
    "successRate": "100.0%",
    "finalResult": "ALL TESTS PASSED"
  },
  "testResults": [...],
  "errors": [],
  "environment": {...}
}
```

## 🔍 API Examples

### DemoQA BookStore API Tests

The `demo-qa.js` file includes:

1. **Get Books** - Retrieve all books from BookStore
   - Filter books by pages
   - Filter books by author
   - Extract book details (ISBN, title, author)

2. **Books API Assertions** - Validate API responses
   - Assert HTTP status codes
   - Verify book count
   - Filter books by specific author

3. **Get Book by ISBN** - Fetch specific book details
   - Query by ISBN parameter
   - Validate response structure

### Reqres.in API Examples

The `example.js` file demonstrates:

- GET requests with pagination
- GET requests with specific IDs
- Custom headers
- Promise vs async/await syntax
- Error handling

## 🔄 CI/CD

This project includes GitHub Actions for automated testing:

### Workflow: Test API Suite

Triggers on:
- Push to `main` branch
- Pull requests to `main` branch
- Manual workflow dispatch

The workflow:
1. Sets up Node.js environment
2. Installs dependencies
3. Runs the test suite
4. Uploads test reports as artifacts
5. Comments test results on PRs (on failure)

### View Test Results

After each run:
1. Go to the **Actions** tab in GitHub
2. Select the workflow run
3. Download the **test-reports** artifact
4. View detailed JSON reports

## 🧪 Writing New Tests

To add new tests to the suite:

1. Create an async test function:
```javascript
async function testNewFeature() {
    const startTime = Date.now();
    try {
        const response = await axios.get(`${BASE_URL}/endpoint`);
        assert.equal(response.status, 200);
        // Add your assertions
        
        const duration = Date.now() - startTime;
        logTestResult("Test Name", "PASS", null, duration);
    } catch (error) {
        const duration = Date.now() - startTime;
        logTestResult("Test Name", "FAIL", error, duration);
    }
}
```

2. Add the function to `runDemo()`:
```javascript
async function runDemo() {
    testReport.startTime = Date.now();
    await getBooks();
    await getBooksWithAssertion();
    await getBookByISBN();
    await testNewFeature(); // Add your test here
    testReport.endTime = Date.now();
    generateTestReport();
}
```

## 📝 Available Scripts

Add these to your `package.json`:

```json
{
  "scripts": {
    "test": "node demo-qa.js",
    "example": "node example.js"
  }
}
```

Then run:
```bash
npm test        # Run test suite
npm run example # Run examples
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is available for educational and testing purposes.

## 🔗 Resources

- [Axios Documentation](https://axios-http.com/)
- [DemoQA API](https://demoqa.com/)
- [Reqres API](https://reqres.in/)
- [Node.js Assert](https://nodejs.org/api/assert.html)

## 📧 Contact

For questions or feedback, please open an issue in the repository.

---

**Happy Testing! 🚀**


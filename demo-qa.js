const axios = require('axios');
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const BASE_URL = 'https://demoqa.com';

let firstBookISBN = [];
const author = "Addy Osmani";

// Test Report Structure
const testReport = {
    startTime: null,
    endTime: null,
    totalTests: 0,
    passedTests: 0,
    failedTests: 0,
    testResults: [],
    errors: []
};

function logTestResult(testName, status, error = null, duration = 0) {
    const result = {
        testName,
        status,
        duration: `${duration}ms`,
        timestamp: new Date().toISOString(),
        error: error ? error.message : null
    };
    
    testReport.testResults.push(result);
    testReport.totalTests++;
    
    if (status === 'PASS') {
        testReport.passedTests++;
        console.log(`✅ ${testName} - PASSED (${duration}ms)`);
    } else {
        testReport.failedTests++;
        console.log(`❌ ${testName} - FAILED (${duration}ms)`);
        if (error) {
            console.log(`   Error: ${error.message}`);
            testReport.errors.push({ testName, error: error.message });
        }
    }
}

function generateJSONReport() {
    const totalDuration = testReport.endTime - testReport.startTime;
    const successRate = ((testReport.passedTests / testReport.totalTests) * 100).toFixed(1);
    
    const jsonReport = {
        summary: {
            executionTime: `${totalDuration}ms`,
            totalTests: testReport.totalTests,
            passedTests: testReport.passedTests,
            failedTests: testReport.failedTests,
            successRate: `${successRate}%`,
            finalResult: testReport.failedTests === 0 ? 'ALL TESTS PASSED' : `${testReport.failedTests} TEST(S) FAILED`,
            startTime: new Date(testReport.startTime).toISOString(),
            endTime: new Date(testReport.endTime).toISOString(),
            duration: totalDuration
        },
        testResults: testReport.testResults,
        errors: testReport.errors,
        environment: {
            nodeVersion: process.version,
            platform: process.platform,
            arch: process.arch,
            timestamp: new Date().toISOString()
        }
    };
    
    return jsonReport;
}

function saveJSONReport(jsonReport) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `test-report-${timestamp}.json`;
    const reportsDir = path.join(__dirname, 'automation-reports');
    
    // Create automation-reports directory if it doesn't exist
    if (!fs.existsSync(reportsDir)) {
        fs.mkdirSync(reportsDir, { recursive: true });
    }
    
    const filepath = path.join(reportsDir, filename);
    
    try {
        fs.writeFileSync(filepath, JSON.stringify(jsonReport, null, 2));
        console.log(`\n📄 JSON Test Report saved: automation-reports/${filename}`);
        return filepath;
    } catch (error) {
        console.error('Error saving JSON report:', error.message);
        return null;
    }
}

function generateTestReport() {
    const totalDuration = testReport.endTime - testReport.startTime;
    
    console.log('\n' + '='.repeat(60));
    console.log('                    TEST EXECUTION REPORT');
    console.log('='.repeat(60));
    console.log(`Execution Time: ${totalDuration}ms`);
    console.log(`Total Tests: ${testReport.totalTests}`);
    console.log(`Passed: ${testReport.passedTests}`);
    console.log(`Failed: ${testReport.failedTests}`);
    console.log(`Success Rate: ${((testReport.passedTests / testReport.totalTests) * 100).toFixed(1)}%`);
    console.log('='.repeat(60));
    
    console.log('\nDETAILED TEST RESULTS:');
    console.log('-'.repeat(40));
    testReport.testResults.forEach((result, index) => {
        const status = result.status === 'PASS' ? '✅' : '❌';
        console.log(`${index + 1}. ${status} ${result.testName}`);
        console.log(`   Duration: ${result.duration}`);
        console.log(`   Time: ${result.timestamp}`);
        if (result.error) {
            console.log(`   Error: ${result.error}`);
        }
        console.log('');
    });
    
    if (testReport.errors.length > 0) {
        console.log('\nFAILED TESTS SUMMARY:');
        console.log('-'.repeat(40));
        testReport.errors.forEach((error, index) => {
            console.log(`${index + 1}. ${error.testName}: ${error.error}`);
        });
    }
    
    console.log('\n' + '='.repeat(60));
    console.log(`FINAL RESULT: ${testReport.failedTests === 0 ? 'ALL TESTS PASSED' : `${testReport.failedTests} TEST(S) FAILED`}`);
    console.log('='.repeat(60));
    
    // Generate and save JSON report
    const jsonReport = generateJSONReport();
    const jsonFilePath = saveJSONReport(jsonReport);
    
    return testReport.failedTests === 0;
}

async function getBooks() {
    const startTime = Date.now();
    const response = await axios.get(`${BASE_URL}/BookStore/v1/Books`);
    const filteredBooks = response.data.books.map(book => ({
        isbn: book.isbn,
        title: book.title,
        author: book.author
    }));

    const firstBook = response.data.books[0];
    const totalBooks = response.data.books.length;
    const totalBooksLessThan300Pages = response.data.books.filter(book => book.pages < 300).length;
    const booksByAuthor = response.data.books.filter(book => book.author === "Richard E. Silverman");
    
    console.log("first book:", firstBook);
    console.log("filtered books:", filteredBooks);
    console.log("total books:", totalBooks);
    console.log("total books less than 300 pages:", totalBooksLessThan300Pages);
    console.log("books by author:", booksByAuthor);

    firstBookISBN = response.data.books[0].isbn;
    console.log("first book ISBN:", firstBookISBN);
    
    const duration = Date.now() - startTime;
    logTestResult("Get Books API", "PASS", null, duration);
}

async function getBooksWithAssertion(){
    const startTime = Date.now();
    const response = await axios.get(`${BASE_URL}/BookStore/v1/Books`);

    assert.equal(response.status, 200);
    assert.equal(response.data.books.length, 8);

    const filteredBooksAuthor = response.data.books.filter(book => book.author === author);

    assert.equal(filteredBooksAuthor.length, 1);
    assert.equal(filteredBooksAuthor[0].author, author);

    firstBookISBN = filteredBooksAuthor[0].isbn;
    console.log("second book ISBN:", firstBookISBN);
    
    const duration = Date.now() - startTime;
    logTestResult("Books API Assertions", "PASS", null, duration);
}

async function getBookByISBN(isbn) {
    const startTime = Date.now();
    isbn = firstBookISBN;
    const response = await axios.get(`${BASE_URL}/BookStore/v1/Book?ISBN=${isbn}`);
    console.log("url request:", `${BASE_URL}/BookStore/v1/Book?ISBN=${isbn}`);
    assert.equal(response.status, 200);
    console.log("book by ISBN:", response.data);
    
    const duration = Date.now() - startTime;
    logTestResult("Get Book by ISBN", "PASS", null, duration);
}


async function runDemo() {
    testReport.startTime = Date.now();
    console.log('Starting API Test Suite...\n');
    
    await getBooks();
    await getBooksWithAssertion();
    await getBookByISBN();
    
    testReport.endTime = Date.now();
    const allTestsPassed = generateTestReport();
    process.exit(allTestsPassed ? 0 : 1);
}

runDemo();
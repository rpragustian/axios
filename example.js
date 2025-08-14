const axios = require('axios');

// Base URL for reqres.in API
const BASE_URL = 'https://reqres.in/api';

// Example 1: Get list of users (paginated)
async function getUsers(page = 1) {
    const response = await axios.get(`${BASE_URL}/users`, {
      params: { page },
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      }
    });
    console.log('Users:', response.data);
    return response.data;
  }

// Example 2: Get a specific user by ID
async function getUserById(id) {
  try {
    const response = await axios.get(`${BASE_URL}/users/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      }
    });
    console.log(`User ${id}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error.message);
  }
}

// Example 3: Get list of resources
async function getResources() {
  try {
    const response = await axios.get(`${BASE_URL}/unknown`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      }
    });
    console.log('Resources:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching resources:', error.message);
  }
}

// Example 4: Get a specific resource by ID
async function getResourceById(id) {
  try {
    const response = await axios.get(`${BASE_URL}/unknown/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      }
    });
    console.log(`Resource ${id}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching resource ${id}:`, error.message);
  }
}

// Example 5: Using Promise syntax instead of async/await
function getUsersPromise(page = 1) {
  return axios.get(`${BASE_URL}/users`, {
    params: { page }
  })
  .then(function (response) {
    console.log('Users (Promise):', response.data);
    return response.data;
  })
  .catch(function (error) {
    console.error('Error fetching users:', error.message);
  });
}

// Run examples
async function runExamples() {
  console.log('=== reqres.in API Examples ===\n');
  
  // Get first page of users
  await getUsers(1);
  console.log('\n---\n');
  
  // Get a specific user
  await getUserById(2);
  console.log('\n---\n');
  
  // Get resources
  await getResources();
  console.log('\n---\n');
  
  // Get a specific resource
  await getResourceById(1);
  console.log('\n---\n');
  
  // Using Promise syntax
  getUsersPromise(2);
}

// Execute examples
runExamples();

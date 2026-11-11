import fs from 'fs';
import path from 'path';

const collection = {
  info: {
    _postman_id: "7d9b231a-e8d1-4bc8-8c12-92a15f0139b4",
    name: "Talentry - API Testing - ResearchMate BRACU Portal",
    description: "Automated API Test Suite for BRACU Faculty & Academic Portal (ResearchMate) covering RESTful CRUD, Supabase JWT Authentication, RBAC Role-based authorization, parameterization, and edge-case negative testing.",
    schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  item: [
    {
      name: "GET Requests",
      item: [
        {
          name: "GET - Retrieve All Faculty Profiles",
          event: [
            {
              listen: "test",
              script: {
                type: "text/javascript",
                exec: [
                  "pm.test('Status code is 200 OK', function () {",
                  "    pm.response.to.have.status(200);",
                  "});",
                  "pm.test('Response is a JSON array with faculty records', function () {",
                  "    const jsonData = pm.response.json();",
                  "    pm.expect(jsonData).to.be.an('array');",
                  "    pm.expect(jsonData.length).to.be.above(0);",
                  "});",
                  "pm.test('Faculty object contains required schema keys', function () {",
                  "    const first = pm.response.json()[0];",
                  "    pm.expect(first).to.have.property('id');",
                  "    pm.expect(first).to.have.property('name');",
                  "    pm.expect(first).to.have.property('designation');",
                  "    pm.expect(first).to.have.property('department');",
                  "    pm.environment.set('facultyId', first.id);",
                  "});",
                  "pm.test('Response time is below 2000ms', function () {",
                  "    pm.expect(pm.response.responseTime).to.be.below(2000);",
                  "});"
                ]
              }
            }
          ],
          request: {
            method: "GET",
            header: [{ key: "Accept", value: "application/json" }],
            url: {
              raw: "{{baseUrl}}/faculty",
              host: ["{{baseUrl}}"],
              path: ["faculty"]
            }
          }
        },
        {
          name: "GET - Retrieve Single Faculty by ID",
          event: [
            {
              listen: "test",
              script: {
                type: "text/javascript",
                exec: [
                  "pm.test('Status code is 200 OK', function () {",
                  "    pm.response.to.have.status(200);",
                  "});",
                  "pm.test('Response matches requested faculty ID', function () {",
                  "    const data = pm.response.json();",
                  "    pm.expect(data.id).to.eql(pm.environment.get('facultyId'));",
                  "    pm.expect(data.name).to.be.a('string');",
                  "});"
                ]
              }
            }
          ],
          request: {
            method: "GET",
            header: [{ key: "Accept", value: "application/json" }],
            url: {
              raw: "{{baseUrl}}/faculty/{{facultyId}}",
              host: ["{{baseUrl}}"],
              path: ["faculty", "{{facultyId}}"]
            }
          }
        },
        {
          name: "GET - Search Faculty by Query Param",
          event: [
            {
              listen: "test",
              script: {
                type: "text/javascript",
                exec: [
                  "pm.test('Status code is 200 OK', function () {",
                  "    pm.response.to.have.status(200);",
                  "});",
                  "pm.test('Search filter returns matching subset', function () {",
                  "    const data = pm.response.json();",
                  "    pm.expect(data).to.be.an('array');",
                  "});"
                ]
              }
            }
          ],
          request: {
            method: "GET",
            header: [{ key: "Accept", value: "application/json" }],
            url: {
              raw: "{{baseUrl}}/faculty?search=Matin",
              host: ["{{baseUrl}}"],
              path: ["faculty"],
              query: [{ key: "search", value: "Matin" }]
            }
          }
        },
        {
          name: "GET - Retrieve Exam Timetables",
          event: [
            {
              listen: "test",
              script: {
                type: "text/javascript",
                exec: [
                  "pm.test('Status code is 200 OK', function () {",
                  "    pm.response.to.have.status(200);",
                  "});",
                  "pm.test('Returns exam roster data', function () {",
                  "    pm.expect(pm.response.json()).to.not.be.null;",
                  "});"
                ]
              }
            }
          ],
          request: {
            method: "GET",
            header: [{ key: "Accept", value: "application/json" }],
            url: {
              raw: "{{baseUrl}}/exams",
              host: ["{{baseUrl}}"],
              path: ["exams"]
            }
          }
        },
        {
          name: "GET - Retrieve Department Academic Notices",
          event: [
            {
              listen: "test",
              script: {
                type: "text/javascript",
                exec: [
                  "pm.test('Status code is 200 OK', function () {",
                  "    pm.response.to.have.status(200);",
                  "});"
                ]
              }
            }
          ],
          request: {
            method: "GET",
            header: [{ key: "Accept", value: "application/json" }],
            url: {
              raw: "{{baseUrl}}/updates",
              host: ["{{baseUrl}}"],
              path: ["updates"]
            }
          }
        },
        {
          name: "GET - Retrieve Department Analytics Overview",
          event: [
            {
              listen: "test",
              script: {
                type: "text/javascript",
                exec: [
                  "pm.test('Status code is 200 OK', function () {",
                  "    pm.response.to.have.status(200);",
                  "});",
                  "pm.test('Analytics overview has kpis and charts', function () {",
                  "    const data = pm.response.json();",
                  "    pm.expect(data).to.have.property('kpis');",
                  "    pm.expect(data).to.have.property('designationChart');",
                  "});"
                ]
              }
            }
          ],
          request: {
            method: "GET",
            header: [{ key: "Accept", value: "application/json" }],
            url: {
              raw: "{{baseUrl}}/analytics/overview",
              host: ["{{baseUrl}}"],
              path: ["analytics", "overview"]
            }
          }
        },
        {
          name: "GET - Retrieve Advising Messages Inbox",
          event: [
            {
              listen: "test",
              script: {
                type: "text/javascript",
                exec: [
                  "pm.test('Status code is 200 OK', function () {",
                  "    pm.response.to.have.status(200);",
                  "});",
                  "pm.test('Inbox returns messages list', function () {",
                  "    pm.expect(pm.response.json()).to.be.an('array');",
                  "});"
                ]
              }
            }
          ],
          request: {
            method: "GET",
            header: [{ key: "Accept", value: "application/json" }],
            url: {
              raw: "{{baseUrl}}/contact",
              host: ["{{baseUrl}}"],
              path: ["contact"]
            }
          }
        }
      ]
    },
    {
      name: "POST Requests",
      item: [
        {
          name: "POST - Register New User - Valid Data",
          event: [
            {
              listen: "test",
              script: {
                type: "text/javascript",
                exec: [
                  "pm.test('Status code is 200 or 201 Created', function () {",
                  "    pm.expect(pm.response.code).to.be.oneOf([200, 201]);",
                  "});",
                  "pm.test('Returns verified user payload', function () {",
                  "    const data = pm.response.json();",
                  "    pm.expect(data.success).to.be.true;",
                  "    pm.expect(data.user).to.have.property('id');",
                  "    pm.expect(data.user).to.have.property('email');",
                  "});"
                ]
              }
            }
          ],
          request: {
            method: "POST",
            header: [{ key: "Content-Type", value: "application/json" }],
            body: {
              mode: "raw",
              raw: JSON.stringify({
                email: "qa_student_test_{{$timestamp}}@bracu.ac.bd",
                password: "password123",
                fullName: "QA Candidate Student",
                role: "student"
              }, null, 2)
            },
            url: {
              raw: "{{baseUrl}}/auth/register",
              host: ["{{baseUrl}}"],
              path: ["auth", "register"]
            }
          }
        },
        {
          name: "POST - Sign In User - Valid Credentials",
          event: [
            {
              listen: "test",
              script: {
                type: "text/javascript",
                exec: [
                  "pm.test('Status code is 200 OK', function () {",
                  "    pm.response.to.have.status(200);",
                  "});",
                  "pm.test('Returns authenticated user and session', function () {",
                  "    const data = pm.response.json();",
                  "    pm.expect(data.success).to.be.true;",
                  "    if (data.session && data.session.access_token) {",
                  "        pm.environment.set('studentToken', data.session.access_token);",
                  "    }",
                  "});"
                ]
              }
            }
          ],
          request: {
            method: "POST",
            header: [{ key: "Content-Type", value: "application/json" }],
            body: {
              mode: "raw",
              raw: JSON.stringify({
                email: "admin@bracu.ac.bd",
                password: "password123"
              }, null, 2)
            },
            url: {
              raw: "{{baseUrl}}/auth/login",
              host: ["{{baseUrl}}"],
              path: ["auth", "login"]
            }
          }
        },
        {
          name: "POST - Submit Student Advising Inquiry - Valid Data",
          event: [
            {
              listen: "test",
              script: {
                type: "text/javascript",
                exec: [
                  "pm.test('Status code is 201 Created', function () {",
                  "    pm.response.to.have.status(201);",
                  "});",
                  "pm.test('Confirmation message returned', function () {",
                  "    const data = pm.response.json();",
                  "    pm.expect(data.success).to.be.true;",
                  "    pm.expect(data.data.email).to.eql('student.qa@g.bracu.ac.bd');",
                  "});"
                ]
              }
            }
          ],
          request: {
            method: "POST",
            header: [{ key: "Content-Type", value: "application/json" }],
            body: {
              mode: "raw",
              raw: JSON.stringify({
                name: "Tanvir Ahmed",
                email: "student.qa@g.bracu.ac.bd",
                subject: "Undergraduate Capstone Supervisor Approval",
                message: "Dear Department Coordinator, I would like to submit my thesis concept paper for review."
              }, null, 2)
            },
            url: {
              raw: "{{baseUrl}}/contact",
              host: ["{{baseUrl}}"],
              path: ["contact"]
            }
          }
        },
        {
          name: "POST - Create Faculty Profile - Admin Authorized",
          event: [
            {
              listen: "test",
              script: {
                type: "text/javascript",
                exec: [
                  "pm.test('Status code is 201 Created', function () {",
                  "    pm.response.to.have.status(201);",
                  "});",
                  "pm.test('Created faculty record returned with ID', function () {",
                  "    const data = pm.response.json();",
                  "    pm.expect(data.data).to.have.property('id');",
                  "    pm.environment.set('createdFacultyId', data.data.id);",
                  "});"
                ]
              }
            }
          ],
          request: {
            auth: {
              type: "bearer",
              bearer: [{ key: "token", value: "{{adminToken}}", type: "string" }]
            },
            method: "POST",
            header: [
              { key: "Content-Type", value: "application/json" }
            ],
            body: {
              mode: "raw",
              raw: JSON.stringify({
                name: "Dr. Nadia Tasnim",
                designation: "Assistant Professor",
                researchInterests: ["Quantum Algorithms", "Cryptography", "Network Security"],
                bio: "PhD in Cryptography and Quantum Complexity from University of Melbourne. Leading Quantum Secure Lab at BRACU.",
                imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"
              }, null, 2)
            },
            url: {
              raw: "{{baseUrl}}/faculty",
              host: ["{{baseUrl}}"],
              path: ["faculty"]
            }
          }
        }
      ]
    },
    {
      name: "PUT & PATCH Requests",
      item: [
        {
          name: "PUT - Update Faculty Profile Details",
          event: [
            {
              listen: "test",
              script: {
                type: "text/javascript",
                exec: [
                  "pm.test('Status code is 200 OK', function () {",
                  "    pm.response.to.have.status(200);",
                  "});",
                  "pm.test('Updated details reflected in response', function () {",
                  "    const data = pm.response.json();",
                  "    pm.expect(data.success).to.be.true;",
                  "    pm.expect(data.data.designation).to.eql('Associate Professor');",
                  "});"
                ]
              }
            }
          ],
          request: {
            auth: {
              type: "bearer",
              bearer: [{ key: "token", value: "{{adminToken}}", type: "string" }]
            },
            method: "PUT",
            header: [{ key: "Content-Type", value: "application/json" }],
            body: {
              mode: "raw",
              raw: JSON.stringify({
                designation: "Associate Professor",
                bio: "Promoted to Associate Professor. Research leader in Distributed Systems and Cloud Architecture."
              }, null, 2)
            },
            url: {
              raw: "{{baseUrl}}/faculty/{{createdFacultyId}}",
              host: ["{{baseUrl}}"],
              path: ["faculty", "{{createdFacultyId}}"]
            }
          }
        },
        {
          name: "PATCH - Partial Update Faculty Designation",
          event: [
            {
              listen: "test",
              script: {
                type: "text/javascript",
                exec: [
                  "pm.test('Status code is 200 OK', function () {",
                  "    pm.response.to.have.status(200);",
                  "});"
                ]
              }
            }
          ],
          request: {
            auth: {
              type: "bearer",
              bearer: [{ key: "token", value: "{{adminToken}}", type: "string" }]
            },
            method: "PATCH",
            header: [{ key: "Content-Type", value: "application/json" }],
            body: {
              mode: "raw",
              raw: JSON.stringify({
                designation: "Senior Associate Professor"
              }, null, 2)
            },
            url: {
              raw: "{{baseUrl}}/faculty/{{createdFacultyId}}",
              host: ["{{baseUrl}}"],
              path: ["faculty", "{{createdFacultyId}}"]
            }
          }
        }
      ]
    },
    {
      name: "DELETE Requests",
      item: [
        {
          name: "DELETE - Remove Faculty Profile - Admin Authorized",
          event: [
            {
              listen: "test",
              script: {
                type: "text/javascript",
                exec: [
                  "pm.test('Status code is 200 OK', function () {",
                  "    pm.response.to.have.status(200);",
                  "});",
                  "pm.test('Success message returned', function () {",
                  "    const data = pm.response.json();",
                  "    pm.expect(data.success).to.be.true;",
                  "    pm.expect(data.message).to.include('deleted successfully');",
                  "});"
                ]
              }
            }
          ],
          request: {
            auth: {
              type: "bearer",
              bearer: [{ key: "token", value: "{{adminToken}}", type: "string" }]
            },
            method: "DELETE",
            header: [],
            url: {
              raw: "{{baseUrl}}/faculty/{{createdFacultyId}}",
              host: ["{{baseUrl}}"],
              path: ["faculty", "{{createdFacultyId}}"]
            }
          }
        }
      ]
    },
    {
      name: "Authentication Tests",
      item: [
        {
          name: "POST - Register Demo Administrator",
          event: [
            {
              listen: "test",
              script: {
                type: "text/javascript",
                exec: [
                  "pm.test('Status code is 200 or 201', function () {",
                  "    pm.expect(pm.response.code).to.be.oneOf([200, 201]);",
                  "});",
                  "pm.test('User created with admin role', function () {",
                  "    const data = pm.response.json();",
                  "    pm.expect(data.user.role).to.eql('admin');",
                  "});"
                ]
              }
            }
          ],
          request: {
            method: "POST",
            header: [{ key: "Content-Type", value: "application/json" }],
            body: {
              mode: "raw",
              raw: JSON.stringify({
                email: "admin@bracu.ac.bd",
                password: "password123",
                fullName: "Department Administrator",
                role: "admin"
              }, null, 2)
            },
            url: {
              raw: "{{baseUrl}}/auth/register",
              host: ["{{baseUrl}}"],
              path: ["auth", "register"]
            }
          }
        },
        {
          name: "POST - Login Demo Administrator & Capture Token",
          event: [
            {
              listen: "test",
              script: {
                type: "text/javascript",
                exec: [
                  "pm.test('Status code is 200 OK', function () {",
                  "    pm.response.to.have.status(200);",
                  "});",
                  "pm.test('User is admin and token captured', function () {",
                  "    const data = pm.response.json();",
                  "    pm.expect(data.user.role).to.eql('admin');",
                  "    if (data.session && data.session.access_token) {",
                  "        pm.environment.set('adminToken', data.session.access_token);",
                  "    }",
                  "});"
                ]
              }
            }
          ],
          request: {
            method: "POST",
            header: [{ key: "Content-Type", value: "application/json" }],
            body: {
              mode: "raw",
              raw: JSON.stringify({
                email: "admin@bracu.ac.bd",
                password: "password123"
              }, null, 2)
            },
            url: {
              raw: "{{baseUrl}}/auth/login",
              host: ["{{baseUrl}}"],
              path: ["auth", "login"]
            }
          }
        }
      ]
    },
    {
      name: "Negative & Error Handling Tests",
      item: [
        {
          name: "POST - Register User - Missing Required Fields (400)",
          event: [
            {
              listen: "test",
              script: {
                type: "text/javascript",
                exec: [
                  "pm.test('Status code is 400 Bad Request', function () {",
                  "    pm.response.to.have.status(400);",
                  "});",
                  "pm.test('Error message identifies missing credentials', function () {",
                  "    const data = pm.response.json();",
                  "    pm.expect(data).to.have.property('error');",
                  "    pm.expect(data.error).to.include('required');",
                  "});"
                ]
              }
            }
          ],
          request: {
            method: "POST",
            header: [{ key: "Content-Type", value: "application/json" }],
            body: {
              mode: "raw",
              raw: JSON.stringify({
                fullName: "Incomplete User"
              }, null, 2)
            },
            url: {
              raw: "{{baseUrl}}/auth/register",
              host: ["{{baseUrl}}"],
              path: ["auth", "register"]
            }
          }
        },
        {
          name: "POST - Submit Advising Message - Missing Fields (400)",
          event: [
            {
              listen: "test",
              script: {
                type: "text/javascript",
                exec: [
                  "pm.test('Status code is 400 Bad Request', function () {",
                  "    pm.response.to.have.status(400);",
                  "});",
                  "pm.test('Identifies required contact fields', function () {",
                  "    const data = pm.response.json();",
                  "    pm.expect(data.error).to.include('required');",
                  "});"
                ]
              }
            }
          ],
          request: {
            method: "POST",
            header: [{ key: "Content-Type", value: "application/json" }],
            body: {
              mode: "raw",
              raw: JSON.stringify({
                name: "Only Name Provided"
              }, null, 2)
            },
            url: {
              raw: "{{baseUrl}}/contact",
              host: ["{{baseUrl}}"],
              path: ["contact"]
            }
          }
        },
        {
          name: "POST - Submit Advising Message - Invalid Email Format (400)",
          event: [
            {
              listen: "test",
              script: {
                type: "text/javascript",
                exec: [
                  "pm.test('Status code is 400 Bad Request', function () {",
                  "    pm.response.to.have.status(400);",
                  "});",
                  "pm.test('Rejects invalid email format', function () {",
                  "    const data = pm.response.json();",
                  "    pm.expect(data.error).to.include('Invalid email');",
                  "});"
                ]
              }
            }
          ],
          request: {
            method: "POST",
            header: [{ key: "Content-Type", value: "application/json" }],
            body: {
              mode: "raw",
              raw: JSON.stringify({
                name: "Bad Email Tester",
                email: "not-an-email-at-all",
                subject: "Inquiry",
                message: "Hello department."
              }, null, 2)
            },
            url: {
              raw: "{{baseUrl}}/contact",
              host: ["{{baseUrl}}"],
              path: ["contact"]
            }
          }
        },
        {
          name: "POST - Create Faculty - Missing Authorization Header (401)",
          event: [
            {
              listen: "test",
              script: {
                type: "text/javascript",
                exec: [
                  "pm.test('Status code is 401 Unauthorized', function () {",
                  "    pm.response.to.have.status(401);",
                  "});",
                  "pm.test('Error message reports missing header', function () {",
                  "    const data = pm.response.json();",
                  "    pm.expect(data.error).to.include('authorization header');",
                  "});"
                ]
              }
            }
          ],
          request: {
            method: "POST",
            header: [{ key: "Content-Type", value: "application/json" }],
            body: {
              mode: "raw",
              raw: JSON.stringify({
                name: "Unauthenticated Professor",
                designation: "Lecturer"
              }, null, 2)
            },
            url: {
              raw: "{{baseUrl}}/faculty",
              host: ["{{baseUrl}}"],
              path: ["faculty"]
            }
          }
        },
        {
          name: "POST - Create Faculty - Student Token Without Admin Privileges (403)",
          event: [
            {
              listen: "test",
              script: {
                type: "text/javascript",
                exec: [
                  "pm.test('Status code is 403 Forbidden', function () {",
                  "    pm.response.to.have.status(403);",
                  "});",
                  "pm.test('Error message denotes privilege requirement', function () {",
                  "    const data = pm.response.json();",
                  "    pm.expect(data.error).to.include('privileges');",
                  "});"
                ]
              }
            }
          ],
          request: {
            auth: {
              type: "bearer",
              bearer: [{ key: "token", value: "{{studentToken}}", type: "string" }]
            },
            method: "POST",
            header: [{ key: "Content-Type", value: "application/json" }],
            body: {
              mode: "raw",
              raw: JSON.stringify({
                name: "Intruder Faculty",
                designation: "Lecturer"
              }, null, 2)
            },
            url: {
              raw: "{{baseUrl}}/faculty",
              host: ["{{baseUrl}}"],
              path: ["faculty"]
            }
          }
        },
        {
          name: "GET - Retrieve Non-Existent Faculty ID (404)",
          event: [
            {
              listen: "test",
              script: {
                type: "text/javascript",
                exec: [
                  "pm.test('Status code is 404 Not Found', function () {",
                  "    pm.response.to.have.status(404);",
                  "});",
                  "pm.test('Error message reports resource not found', function () {",
                  "    const data = pm.response.json();",
                  "    pm.expect(data.error).to.include('not found');",
                  "});"
                ]
              }
            }
          ],
          request: {
            method: "GET",
            header: [{ key: "Accept", value: "application/json" }],
            url: {
              raw: "{{baseUrl}}/faculty/00000000-0000-0000-0000-000000000000",
              host: ["{{baseUrl}}"],
              path: ["faculty", "00000000-0000-0000-0000-000000000000"]
            }
          }
        },
        {
          name: "PUT - Update Non-Existent Faculty ID (404)",
          event: [
            {
              listen: "test",
              script: {
                type: "text/javascript",
                exec: [
                  "pm.test('Status code is 404 Not Found', function () {",
                  "    pm.response.to.have.status(404);",
                  "});"
                ]
              }
            }
          ],
          request: {
            auth: {
              type: "bearer",
              bearer: [{ key: "token", value: "{{adminToken}}", type: "string" }]
            },
            method: "PUT",
            header: [{ key: "Content-Type", value: "application/json" }],
            body: {
              mode: "raw",
              raw: JSON.stringify({ designation: "Updated" }, null, 2)
            },
            url: {
              raw: "{{baseUrl}}/faculty/00000000-0000-0000-0000-000000000000",
              host: ["{{baseUrl}}"],
              path: ["faculty", "00000000-0000-0000-0000-000000000000"]
            }
          }
        },
        {
          name: "DELETE - Delete Faculty - Malformed Invalid Token (401)",
          event: [
            {
              listen: "test",
              script: {
                type: "text/javascript",
                exec: [
                  "pm.test('Status code is 401 Unauthorized', function () {",
                  "    pm.response.to.have.status(401);",
                  "});"
                ]
              }
            }
          ],
          request: {
            auth: {
              type: "bearer",
              bearer: [{ key: "token", value: "invalid-garbage-token-xyz-123", type: "string" }]
            },
            method: "DELETE",
            header: [],
            url: {
              raw: "{{baseUrl}}/faculty/{{facultyId}}",
              host: ["{{baseUrl}}"],
              path: ["faculty", "{{facultyId}}"]
            }
          }
        },
        {
          name: "DELETE - Delete Non-Existent Faculty ID (404)",
          event: [
            {
              listen: "test",
              script: {
                type: "text/javascript",
                exec: [
                  "pm.test('Status code is 404 Not Found', function () {",
                  "    pm.response.to.have.status(404);",
                  "});"
                ]
              }
            }
          ],
          request: {
            auth: {
              type: "bearer",
              bearer: [{ key: "token", value: "{{adminToken}}", type: "string" }]
            },
            method: "DELETE",
            header: [],
            url: {
              raw: "{{baseUrl}}/faculty/00000000-0000-0000-0000-000000000000",
              host: ["{{baseUrl}}"],
              path: ["faculty", "00000000-0000-0000-0000-000000000000"]
            }
          }
        }
      ]
    }
  ]
};

const environment = {
  id: "3c847a9e-11df-4b53-99b8-39d09c3e9821",
  name: "Talentry - ResearchMate Environment",
  values: [
    {
      key: "baseUrl",
      value: "http://localhost:5000/api",
      type: "default",
      enabled: true
    },
    {
      key: "adminToken",
      value: "",
      type: "secret",
      enabled: true
    },
    {
      key: "studentToken",
      value: "",
      type: "secret",
      enabled: true
    },
    {
      key: "facultyId",
      value: "45a4f5ad-8322-416a-afc2-eea345363006",
      type: "default",
      enabled: true
    },
    {
      key: "createdFacultyId",
      value: "",
      type: "default",
      enabled: true
    }
  ]
};

const outDir = path.resolve('postman');
fs.writeFileSync(path.join(outDir, 'Talentry_API_Testing_ResearchMate.postman_collection.json'), JSON.stringify(collection, null, 2));
fs.writeFileSync(path.join(outDir, 'Talentry_API_Testing_ResearchMate.postman_environment.json'), JSON.stringify(environment, null, 2));

console.log('Postman collection and environment successfully generated in /postman');

const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const cohortName = process.argv[2];

const values = [`%${cohortName}%`];

const queryString = `
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohorts, COUNT(assistance_requests) as total_assistances
FROM teachers
JOIN assistance_requests ON teachers.id = teacher_id
JOIN students ON students.id = student_id
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
GROUP BY teachers.name, cohorts.name
ORDER BY teacher;
`;

pool.query(queryString, values)
.then(res => {
 for (element of res.rows) {
  console.log(`${element.cohorts}: ${element.teacher}`)
 }
})
.catch(err => console.error('query error', err.stack));
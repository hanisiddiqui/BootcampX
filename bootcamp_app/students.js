const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const cohortName = `%${process.argv[2]}%`;
const limit = `${process.argv[3]}`;

const values = [`%${cohortName}%`, `${limit}`];

const queryString = `
SELECT students.id as id, students.name as name, cohorts.name as cohort_name
FROM students
JOIN cohorts ON cohorts.id = students.cohort_id
WHERE cohorts.name LIKE $1
LIMIT $2`;

pool.query(queryString, values)
.then(res => {
 for (element of res.rows) {
  console.log(`${element.name} has an id of ${element.id} and was in the ${element.cohort_name} cohort`)
 }
})
.catch(err => console.error('query error', err.stack));
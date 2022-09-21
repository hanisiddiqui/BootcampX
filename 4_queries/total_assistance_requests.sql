SELECT teachers.name as name, COUNT(assistance_requests.*) as total_assistances
FROM teachers
JOIN assistance_requests
ON teachers.id = assistance_requests.teacher_id
WHERE teachers.name = 'Waylon Boehm'
GROUP BY name;
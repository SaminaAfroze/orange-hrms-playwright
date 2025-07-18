import fs from 'fs';
import path from 'path';

function getEmployeeId() {
  const filePath = path.join(__dirname, '../testData/employee.json');
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data).employeeId;
}

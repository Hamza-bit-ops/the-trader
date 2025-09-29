// app/students/page.tsx
import StudentManagementSystem from "../students/page";
import PasswordProtection from "../../src/components/passwordProtection/page"

export default function StudentsPage() {
  return (
    <PasswordProtection>
      <StudentManagementSystem />
    </PasswordProtection>
  );
}
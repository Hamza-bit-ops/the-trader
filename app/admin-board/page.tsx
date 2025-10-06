// app/students/page.tsx
"use client";
import StudentManagementSystem from "../students/page";
import PasswordProtection from "../../src/components/passwordProtection"

export default function StudentsPage() {
  return (
    <PasswordProtection>
      <StudentManagementSystem />
    </PasswordProtection>
  );
}
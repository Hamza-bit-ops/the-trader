import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/db";
import Student from "@/src/models/student";

// GET all students
export async function GET() {
  await connectDB();
  const students = await Student.find().sort({ createdAt: -1 });
  return NextResponse.json(students);
}

// POST new student
export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const student = await Student.create(body);
  return NextResponse.json(student, { status: 201 });
}

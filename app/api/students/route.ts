import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/src/lib/db";
import Student from "@/src/models/student";

// GET all students
export async function GET() {
  try {
    await connectDB();
    const students = await Student.find().sort({ createdAt: -1 });
    return NextResponse.json(students, { status: 200 });
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 }
    );
  }
}

// POST new student
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    
    const body = await req.json();
    
    // Validate required fields
    const { name, email, phone, course, feeAmount, enrollmentDate } = body;
    
    if (!name || !email || !phone || !course || !feeAmount || !enrollmentDate) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return NextResponse.json(
        { error: "Student with this email already exists" },
        { status: 409 }
      );
    }

    // Create new student
    const studentData = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      course: course.trim(),
      feeAmount: Number(feeAmount),
      paidAmount: Number(body.paidAmount) || 0,
      status: body.status || 'pending',
      enrollmentDate: new Date(enrollmentDate),
      notes: body.notes?.trim() || ''
    };

    // Auto-calculate status based on payment
    if (studentData.paidAmount >= studentData.feeAmount) {
      studentData.status = 'paid';
    } else if (studentData.paidAmount > 0) {
      studentData.status = 'partial';
    } else {
      studentData.status = 'pending';
    }

    const student = await Student.create(studentData);
    
    return NextResponse.json(student, { status: 201 });
  } catch (error) {
    console.error("Error creating student:", error);
    return NextResponse.json(
      { error: "Failed to create student" },
      { status: 500 }
    );
  }
}
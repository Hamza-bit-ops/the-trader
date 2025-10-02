import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/src/lib/db";
import Student from "@/src/models/student";

interface StudentCreateData {
  name: string;
  email: string;
  phone: string;
  cnic: string;
  studentType: 'local' | 'foreigner';
  course: 'basics' | 'advance' | 'pro';
  feeAmount: number;
  paidAmount: number;
  discount: number;
  discountAmount: number;
  finalAmount: number;
  status: string;
  enrollmentDate: string;
  profilePicture?: string;
  notes?: string;
}

// Helper function to validate base64 image
const isValidBase64Image = (str: string): boolean => {
  if (!str || typeof str !== 'string') return false;
  
  // Check if it's a valid data URL format
  const dataURLRegex = /^data:image\/(jpeg|jpg|png|gif|webp);base64,/;
  if (!dataURLRegex.test(str)) return false;
  
  // Extract base64 part
  const base64Part = str.split(',')[1];
  if (!base64Part) return false;
  
  // Check if it's valid base64
  try {
    const decoded = atob(base64Part);
    // Basic size check (limit to 2MB)
    return decoded.length <= 2 * 1024 * 1024;
  } catch {
    return false;
  }
};

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
    
    const body: StudentCreateData = await req.json();
    
    console.log('=== RECEIVED BODY ===');
    console.log(JSON.stringify(body, null, 2));
    console.log('====================');
    
    // Validate required fields - IMPORTANT: Allow 0 values for feeAmount and finalAmount
    const { name, email, phone, cnic, studentType, course, feeAmount, finalAmount, enrollmentDate } = body;
    
    const missingFields = [];
    if (!name?.trim()) missingFields.push('name');
    if (!email?.trim()) missingFields.push('email');
    if (!phone?.trim()) missingFields.push('phone');
    if (!cnic?.trim()) missingFields.push('cnic');
    if (!studentType) missingFields.push('studentType');
    if (!course) missingFields.push('course');
    if (feeAmount === undefined || feeAmount === null) missingFields.push('feeAmount');
    if (finalAmount === undefined || finalAmount === null) missingFields.push('finalAmount');
    if (!enrollmentDate) missingFields.push('enrollmentDate');
    
    if (missingFields.length > 0) {
      console.error('Missing fields:', missingFields);
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingStudent = await Student.findOne({ email: email.toLowerCase().trim() });
    if (existingStudent) {
      return NextResponse.json(
        { error: "Student with this email already exists" },
        { status: 409 }
      );
    }

    // Check if CNIC already exists for local students
    if (studentType === 'local') {
      const existingCNIC = await Student.findOne({ cnic: cnic.trim() });
      if (existingCNIC) {
        return NextResponse.json(
          { error: "Student with this CNIC already exists" },
          { status: 409 }
        );
      }
    }

    // Validate profile picture if provided
    if (body.profilePicture && !isValidBase64Image(body.profilePicture)) {
      return NextResponse.json(
        { error: "Invalid profile picture format. Please upload a valid image (JPEG, PNG, GIF, WebP) under 2MB." },
        { status: 400 }
      );
    }

    // Validate payment amounts - only if finalAmount > 0
    const paidAmount = Number(body.paidAmount) || 0;
    const finalAmountNum = Number(finalAmount);
    
    if (finalAmountNum > 0 && paidAmount > finalAmountNum) {
      return NextResponse.json(
        { error: "Paid amount cannot exceed final amount" },
        { status: 400 }
      );
    }

    // Create new student
    const studentData = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      cnic: cnic.trim(),
      studentType,
      course,
      feeAmount: Number(feeAmount),
      paidAmount,
      discount: Number(body.discount) || 0,
      discountAmount: Number(body.discountAmount) || 0,
      finalAmount: finalAmountNum,
      status: body.status || 'pending',
      enrollmentDate: new Date(enrollmentDate),
      profilePicture: body.profilePicture || '',
      notes: body.notes?.trim() || ''
    };

    // Auto-calculate status based on payment
    if (finalAmountNum === 0) {
      // 100% discount case - automatically mark as paid
      studentData.status = 'paid';
    } else if (studentData.paidAmount >= studentData.finalAmount) {
      studentData.status = 'paid';
    } else if (studentData.paidAmount > 0) {
      studentData.status = 'partial';
    } else {
      studentData.status = 'pending';
    }

    console.log('=== CREATING STUDENT ===');
    console.log(JSON.stringify(studentData, null, 2));
    console.log('========================');

    const student = await Student.create(studentData);
    
    return NextResponse.json(student, { status: 201 });
  } catch (error) {
    console.error("Error creating student:", error);
    
    if (error instanceof Error) {
      // Handle specific mongoose validation errors
      if (error.name === 'ValidationError') {
        return NextResponse.json(
          { error: "Validation error", details: error.message },
          { status: 400 }
        );
      }
      
      // Handle duplicate key errors
      if (error.message.includes('E11000')) {
        return NextResponse.json(
          { error: "Email already exists" },
          { status: 409 }
        );
      }
    }
    
    return NextResponse.json(
      { error: "Failed to create student" },
      { status: 500 }
    );
  }
}
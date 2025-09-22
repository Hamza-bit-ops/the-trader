import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/src/lib/db";
import Student from "@/src/models/student";
import mongoose from "mongoose";

interface StudentUpdateData {
  name?: string;
  email?: string;
  phone?: string;
  course?: string;
  feeAmount?: number;
  paidAmount?: number;
    finalAmount: number;  
  status?: string;
  enrollmentDate?: string;
  notes?: string;
}

// GET single student
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    const params = await context.params;
    const { id } = params;
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid student ID" },
        { status: 400 }
      );
    }

    const student = await Student.findById(id);
    
    if (!student) {
      return NextResponse.json(
        { error: "Student not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(student, { status: 200 });
    
  } catch (error) {
    console.error("Error fetching student:", error);
    return NextResponse.json(
      { error: "Failed to fetch student" },
      { status: 500 }
    );
  }
}

// UPDATE student
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    const params = await context.params;
    const { id } = params;
    const body: StudentUpdateData = await request.json();
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid student ID" },
        { status: 400 }
      );
    }

    // Check if student exists
    const existingStudent = await Student.findById(id);
    if (!existingStudent) {
      return NextResponse.json(
        { error: "Student not found" },
        { status: 404 }
      );
    }

    // Prepare update data
    const updateData = {
      name: body.name?.trim(),
      email: body.email?.toLowerCase().trim(),
      phone: body.phone?.trim(),
      course: body.course?.trim(),
      feeAmount: Number(body.feeAmount),
      paidAmount: Number(body.paidAmount) || 0,
      status: body.status,
      enrollmentDate: body.enrollmentDate ? new Date(body.enrollmentDate) : undefined,
      notes: body.notes?.trim() || ''
    };

    // Validate required fields
    if (!updateData.name || !updateData.email || !updateData.phone || 
        !updateData.course || !updateData.feeAmount || !updateData.enrollmentDate) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check for email conflicts (excluding current student)
    if (updateData.email !== existingStudent.email) {
      const emailConflict = await Student.findOne({ 
        email: updateData.email, 
        _id: { $ne: id } 
      });
      
      if (emailConflict) {
        return NextResponse.json(
          { error: "Email already exists for another student" },
          { status: 409 }
        );
      }
    }

  // Auto-calculate status based on payment (consider finalAmount after discount)
const finalAmount = Number(body.finalAmount) || updateData.feeAmount;

if (updateData.paidAmount >= finalAmount) {
  updateData.status = 'paid';
} else if (updateData.paidAmount > 0) {
  updateData.status = 'partial';
} else {
  updateData.status = 'pending';
}

    // Update student
    const updatedStudent = await Student.findByIdAndUpdate(
      id, 
      updateData, 
      { 
        new: true, 
        runValidators: true 
      }
    );

    return NextResponse.json(updatedStudent, { status: 200 });
    
  } catch (error) {
    console.error("Error updating student:", error);
    
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json(
        { error: "Validation error", details: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to update student" },
      { status: 500 }
    );
  }
}

// DELETE student
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    const params = await context.params;
    const { id } = params;
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid student ID" },
        { status: 400 }
      );
    }

    // Check if student exists and delete
    const deletedStudent = await Student.findByIdAndDelete(id);
    
    if (!deletedStudent) {
      return NextResponse.json(
        { error: "Student not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        message: "Student deleted successfully", 
        deletedStudent: {
          id: deletedStudent._id,
          name: deletedStudent.name,
          email: deletedStudent.email
        }
      }, 
      { status: 200 }
    );
    
  } catch (error) {
    console.error("Error deleting student:", error);
    return NextResponse.json(
      { error: "Failed to delete student" },
      { status: 500 }
    );
  }
}
import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/db";
import Student from "@/src/models/student";

// UPDATE student
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const body = await req.json();
  const updated = await Student.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(updated);
}

// DELETE student
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  await Student.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Deleted successfully" });
}

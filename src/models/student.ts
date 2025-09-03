import mongoose, { Schema, Document, models } from "mongoose";

export interface IStudent extends Document {
  name: string;
  email: string;
  phone: string;
  course: string;
  feeAmount: number;
  paidAmount: number;
  status: string;
  enrollmentDate: Date;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const StudentSchema = new Schema<IStudent>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    course: { type: String, required: true },
    feeAmount: { type: Number, required: true },
    paidAmount: { type: Number, default: 0 },
    status: { 
      type: String, 
      enum: ["pending", "partial", "paid", "overdue"], 
      default: "pending" 
    },
    enrollmentDate: { type: Date, required: true },
    notes: { type: String },
  },
  { timestamps: true }
  
);

export default models.Student || mongoose.model<IStudent>("Student", StudentSchema);
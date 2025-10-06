import mongoose, { Schema, Document, models } from "mongoose";

export interface IStudent extends Document {
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
  enrollmentDate: Date;
  profilePicture?: string; // URL or base64 string
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const StudentSchema = new Schema<IStudent>(
  {
    name: { 
      type: String, 
      required: [true, 'Student name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: { 
      type: String, 
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    phone: { 
      type: String, 
      required: [true, 'Phone number is required'],
      trim: true,
      minlength: [10, 'Phone number must be at least 10 digits'],
      maxlength: [20, 'Phone number cannot exceed 20 characters']
    },
    cnic: {
      type: String,
      required: [true, 'CNIC or Passport is required'],
      trim: true,
      minlength: [5, 'CNIC/Passport must be at least 5 characters'],
      maxlength: [20, 'CNIC/Passport cannot exceed 20 characters']
    },
    studentType: {
      type: String,
      required: [true, 'Student type is required'],
      enum: {
        values: ['local', 'foreigner'],
        message: 'Student type must be either local or foreigner'
      }
    },
    course: { 
      type: String, 
      required: [true, 'Course selection is required'],
      enum: {
        values: ['basics', 'advance', 'pro'],
        message: 'Course must be basics, advance, or pro'
      }
    },
    feeAmount: { 
      type: Number, 
      min: [0, 'Fee amount cannot be negative']
    },
    paidAmount: { 
      type: Number, 
      default: 0,
      min: [0, 'Paid amount cannot be negative']
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, 'Discount cannot be negative'],
      max: [100, 'Discount cannot exceed 100%']
    },
    discountAmount: {
      type: Number,
      default: 0,
      min: [0, 'Discount amount cannot be negative']
    },
    finalAmount: {
      type: Number,
      min: [0, 'Final amount cannot be negative']
    },
    status: { 
      type: String, 
      enum: {
        values: ["pending", "partial", "paid", "overdue"],
        message: 'Status must be pending, partial, paid, or overdue'
      },
      default: "pending" 
    },
    enrollmentDate: { 
      type: Date, 
    },
    profilePicture: {
      type: String,
      default: '',
      maxlength: [500000, 'Profile picture data too large'] // Limit for base64 images
    },
    notes: { 
      type: String,
      maxlength: [1000, 'Notes cannot exceed 1000 characters']
    },
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Index for better performance
StudentSchema.index({ email: 1 });
StudentSchema.index({ cnic: 1 });
StudentSchema.index({ studentType: 1 });
StudentSchema.index({ course: 1 });
StudentSchema.index({ status: 1 });

// Virtual for payment completion percentage
StudentSchema.virtual('paymentPercentage').get(function() {
  return this.finalAmount > 0 ? Math.round((this.paidAmount / this.finalAmount) * 100) : 0;
});

// Virtual for remaining amount
StudentSchema.virtual('remainingAmount').get(function() {
  return Math.max(0, this.finalAmount - this.paidAmount);
});

// Pre-save middleware to auto-calculate status
StudentSchema.pre('save', function(next) {
  if (this.paidAmount >= this.finalAmount) {
    this.status = 'paid';
  } else if (this.paidAmount > 0) {
    this.status = 'partial';
  } else {
    this.status = 'pending';
  }
  next();
});

export default models.Student || mongoose.model<IStudent>("Student", StudentSchema);
'use client';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, Filter, Edit, Trash2, Phone, Mail, DollarSign, Clock, CheckCircle, XCircle, AlertCircle, User, Calendar, BookOpen, Loader2, Star, TrendingUp, CreditCard, Percent, Upload, X, Camera, Save, UserPlus, Eye, EyeOff, Download, FileText, LogOut, Lock } from 'lucide-react';
import Image from "next/image";

interface Student {
  _id: string;
  id?: number;
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
  notes: string;
  createdAt?: string;
  updatedAt?: string;
}

const StudentManagementSystem = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [courseFilter, setCourseFilter] = useState('all');
  const [studentTypeFilter, setStudentTypeFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [profilePreview, setProfilePreview] = useState<string>('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const CORRECT_PASSWORD = 'gul-sher';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cnic: '',
    studentType: 'local' as 'local' | 'foreigner',
    course: 'basics' as 'basics' | 'advance' | 'pro',
    feeAmount: '',
    paidAmount: '',
    discount: '',
    discountAmount: '',
    finalAmount: '',
    status: 'pending',
    enrollmentDate: '',
    profilePicture: '',
    notes: ''
  });
  const feeStructure = useMemo(
    () => ({
      local: {
        basics: 20000,
        advance: 30000,
        pro: 40000,
      },
      foreigner: {
        basics: 100,
        advance: 200,
        pro: 300,
      },
    }),
    []
  );
  // Load students data
  useEffect(() => {
    if (isAuthenticated) {
      loadStudents();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const studentType = formData.studentType;
    const course = formData.course;

    if (!studentType || !course) return;

    const baseFee = feeStructure[studentType][course] || 0;
    const discountPercent = Number(formData.discount) || 0;
    const discountAmount = (baseFee * discountPercent) / 100;
    const finalAmount = baseFee - discountAmount;

    const paidAmount = Number(formData.paidAmount) || 0;

    let status = "pending";

    // If 100% discount (finalAmount = 0), automatically mark as paid
    if (finalAmount === 0) {
      status = "paid";
    } else if (paidAmount === finalAmount && finalAmount > 0) {
      status = "paid";
    } else if (paidAmount > 0 && paidAmount < finalAmount) {
      status = "partial";
    }

    if (editingStudent && editingStudent.status === "paid" && paidAmount === finalAmount) {
      status = "paid";
    }

    setFormData((prev) => ({
      ...prev,
      feeAmount: baseFee.toString(),
      discountAmount: discountAmount.toString(),
      finalAmount: finalAmount.toString(),
      status,
    }));
  }, [formData.studentType, formData.course, formData.discount, formData.paidAmount, feeStructure, editingStudent]);


  // Password Login Handler
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordError('');
      setPasswordInput('');
    } else {
      setPasswordError('Incorrect password. Please try again.');
      setPasswordInput('');
    }
  };

  // Logout Handler
  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasswordInput('');
    setPasswordError('');
  };



  const loadStudents = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/students-the");
      if (res.ok) {
        const data = await res.json();
        setStudents(data);
      } else {
        setStudents([
          {
            _id: '1',
            name: 'Ahmed Khan',
            email: 'ahmed@example.com',
            phone: '+92-300-1234567',
            cnic: '12345-6789012-3',
            studentType: 'local',
            course: 'basics',
            feeAmount: 20000,
            paidAmount: 15000,
            discount: 0,
            discountAmount: 0,
            finalAmount: 20000,
            status: 'partial',
            enrollmentDate: '2024-01-15',
            profilePicture: '',
            notes: 'Excellent progress in technical analysis'
          },
          {
            _id: '2',
            name: 'Sarah Ali',
            email: 'sarah@example.com',
            phone: '+92-301-2345678',
            cnic: '12345-6789012-4',
            studentType: 'local',
            course: 'advance',
            feeAmount: 30000,
            paidAmount: 27000, // Corrected paid amount
            discount: 10,
            discountAmount: 3000,
            finalAmount: 27000,
            status: 'paid',
            enrollmentDate: '2024-02-01',
            profilePicture: '',
            notes: 'Completed all modules successfully'
          },
          {
            _id: '3',
            name: 'John Smith',
            email: 'john@example.com',
            phone: '+1-555-0123',
            cnic: 'US-PASSPORT-789',
            studentType: 'foreigner',
            course: 'pro',
            feeAmount: 300,
            paidAmount: 0,
            discount: 15,
            discountAmount: 45,
            finalAmount: 255,
            status: 'pending',
            enrollmentDate: '2024-03-10',
            profilePicture: '',
            notes: 'International student from USA'
          }
        ]);
      }
    } catch (error) {
      console.error('Error loading students:', error);
      setStudents([]); // Set to empty array on error
    }
    setLoading(false);
  };
  // Handle profile picture upload
  const handleProfilePictureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match(/^image\/(jpeg|jpg|png|gif|webp)$/)) {
      alert('Please select a valid image file (JPEG, PNG, GIF, WebP)');
      return;
    }

    // Validate file size (2MB max)
    if (file.size > 2 * 1024 * 1024) {
      alert('Image size must be less than 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setFormData(prev => ({ ...prev, profilePicture: result }));
      setProfilePreview(result);
    };
    reader.readAsDataURL(file);
  };
  const removeProfilePicture = () => {
    setFormData(prev => ({ ...prev, profilePicture: '' }));
    setProfilePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  const validateForm = () => {
    const errors = [];

    if (!formData.name.trim()) errors.push("Student name is required");
    if (!formData.email.trim()) errors.push("Email is required");
    if (!formData.phone.trim()) errors.push("Phone number is required");
    if (!formData.cnic.trim()) errors.push("CNIC/Passport is required");
    if (!formData.studentType) errors.push("Student type is required");
    if (!formData.course) errors.push("Course selection is required");
    if (!formData.enrollmentDate) errors.push("Enrollment date is required");
    const paidAmount = Number(formData.paidAmount) || 0;
    const finalAmount = Number(formData.finalAmount);
    if (paidAmount > finalAmount) errors.push("Paid amount cannot exceed the final amount");
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.push("Please enter a valid email address");
    }

    if (errors.length > 0) {
      alert("Please fix the following errors:\n\n" + errors.join("\n"));
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setSubmitLoading(true);
    try {
      const requestData = {
        ...formData,
        feeAmount: Number(formData.feeAmount) || 0,
        paidAmount: Number(formData.paidAmount) || 0,
        discount: Number(formData.discount) || 0,
        discountAmount: Number(formData.discountAmount) || 0,
        finalAmount: Number(formData.finalAmount) || 0,
      };
      if (editingStudent) {
        // Update existing student
        const res = await fetch(`/api/students-the/${editingStudent._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        });
        if (res.ok) {
          const updatedStudent = await res.json();
          setStudents(prev =>
            prev.map(student =>
              student._id === editingStudent._id ? updatedStudent : student
            )
          );
          alert('Student updated successfully!');
        } else {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Failed to update student');
        }
      } else {
        // Create new student
        const res = await fetch("/api/students-the", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        });
        if (res.ok) {
          const newStudent = await res.json();
          setStudents(prev => [newStudent, ...prev]);
          alert('Student added successfully!');
        } else {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Failed to create student');
        }
      }

      resetForm();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(error instanceof Error ? error.message : 'An error occurred. Please try again.');
    }
    setSubmitLoading(false);
  };
  const resetForm = () => {
    setShowForm(false);
    setEditingStudent(null);
    setProfilePreview('');
    setFormData({
      name: "",
      email: "",
      phone: "",
      cnic: "",
      studentType: "local",
      course: "basics",
      feeAmount: "",
      paidAmount: "",
      discount: "",
      discountAmount: "",
      finalAmount: "",
      status: "pending",
      enrollmentDate: "",
      profilePicture: "",
      notes: "",
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  const handleEdit = (student: Student) => {
    setFormData({
      name: student.name,
      email: student.email,
      phone: student.phone,
      cnic: student.cnic,
      studentType: student.studentType,
      course: student.course,
      feeAmount: student.feeAmount.toString(),
      paidAmount: student.paidAmount.toString(),
      discount: student.discount.toString(),
      discountAmount: student.discountAmount.toString(),
      finalAmount: student.finalAmount.toString(),
      status: student.status,
      enrollmentDate: student.enrollmentDate,
      profilePicture: student.profilePicture || '',
      notes: student.notes || ''
    });
    setProfilePreview(student.profilePicture || '');
    setEditingStudent(student);
    setShowForm(true);
  };

  const handleDelete = async (studentId: string) => {
    if (!window.confirm("Are you sure you want to delete this student? This action cannot be undone.")) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/students-the/${studentId}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setStudents(prev => prev.filter(student => student._id !== studentId));
        alert('Student deleted successfully!');
      } else {
        throw new Error('Failed to delete student');
      }
    } catch (error) {
      console.error('Error deleting student:', error);
      alert('Failed to delete student. Please try again.');
    }
    setLoading(false);
  };
  const handleViewDetails = (student: Student) => {
    setSelectedStudent(student);
    setShowDetailModal(true);
  };
  const downloadPDF = (student: Student) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    const formatCurrency = (amount: number, type: 'local' | 'foreigner') => {
      return type === 'local' ?
        `PKR ${amount.toLocaleString()}` : `$${amount.toLocaleString()}`;
    };

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Student Details - ${student.name}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Arial', sans-serif; background: #0f172a; padding: 20px; color: #f1f5f9; font-size: 14px; }
          .container { max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1e293b, #334155); border-radius: 15px; border: 2px solid #f59e0b; overflow: hidden; }
          .header { background: linear-gradient(135deg, #f59e0b, #eab308); color: #0f172a; padding: 25px; text-align: center; }
          .header h1 { font-size: 1.8em; margin-bottom: 5px; font-weight: bold; }
          .header p { font-size: 1em; opacity: 0.8; }
          .content { padding: 25px; }
          .student-info { display: flex; align-items: center; margin-bottom: 20px; padding-bottom: 20px; border-bottom: 2px solid #374151; }
          .profile { width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg, #f59e0b, #eab308); display: flex; align-items: center; justify-content: center; color: #0f172a; font-size: 2em; font-weight: bold; margin-right: 20px; overflow: hidden; }
          .student-details h2 { font-size: 1.4em; margin-bottom: 5px; color: #f59e0b; }
          .student-details p { margin: 2px 0; color: #cbd5e1; }
          .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px; }
          .info-item { background: #374151; padding: 12px; border-radius: 8px; border-left: 3px solid #f59e0b; }
          .info-label { font-weight: bold; color: #f59e0b; font-size: 0.9em; }
          .info-value { color: #f1f5f9; margin-top: 3px; }
          .payment-summary { background: #374151; padding: 15px; border-radius: 8px; border: 1px solid #f59e0b; }
          .payment-row { display: flex; justify-content: space-between; margin-bottom: 8px; }
          .payment-total { font-weight: bold; font-size: 1.1em; border-top: 1px solid #f59e0b; padding-top: 8px; color: #f59e0b; }
          .status-badge { display: inline-block; padding: 4px 12px; border-radius: 15px; font-size: 0.8em; font-weight: bold; text-transform: capitalize; margin-left: 10px; }
          .status-paid { background: #059669; color: white; }
          .status-partial { background: #d97706; color: white; }
          .status-pending { background: #dc2626; color: white; }
          @media print {
            body { background: white; color: black; }
            .container { border: 2px solid #f59e0b; }
            .header { background: #f59e0b; color: black; }
            .content { color: black; }
            .info-item { background: #f8f9fa; color: black; }
            .payment-summary { background: #f8f9fa; color: black; }
          }

        .stamp-logo {
  width: 170px;       
  height: 170px;
  border-radius: 50%;   /* circle */
  object-fit: cover;    /* image crop ho kar fit ho jaye */
  margin-top: 15px;
  display: block;
  margin-left: auto;    /* right side align */
  opacity: 0.8;         /* thoda transparent */
  transform: rotate(-30deg);
}
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Th3 Trad3rs Consultancy</h1>
            <p>Student Management System</p>
          </div>
          <div class="content">
            <div class="student-info">
              <div class="profile">
                ${student.profilePicture ?
        `<img src="${student.profilePicture}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;" />`
        : student.name.charAt(0).toUpperCase()}
              </div>
              <div class="student-details">
                <h2>${student.name}</h2>
                <p><strong>Email:</strong> ${student.email}</p>
                <p><strong>Phone:</strong> ${student.phone}</p>
                <p><strong>CNIC:</strong> ${student.cnic}
                <p><strong >Status:</strong> <span class="status-badge status-${student.status}">${student.status}</span>
                </p>

             
              </div>
                  <img src="stamp-removebg-preview.png"   class="stamp-logo">
            </div>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Course</div>
                <div class="info-value">${student.course.charAt(0).toUpperCase() + student.course.slice(1)}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Student Type</div>
                <div class="info-value">${student.studentType === 'local' ? 'Local' : 'International'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Enrollment Date</div>
                <div class="info-value">${new Date(student.enrollmentDate).toLocaleDateString('en-GB')}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Payment Progress</div>
                <div class="info-value">${student.finalAmount > 0 ? Math.round((student.paidAmount / student.finalAmount) * 100) : 0}%</div>
              </div>
            </div>
               


            <div class="payment-summary">
              <div class="payment-row">
                <span>Course Fee:</span>
                <span>${formatCurrency(student.feeAmount, student.studentType)}</span>
              </div>
              ${student.discount > 0 ? `
              <div class="payment-row">
                <span>Discount (${student.discount}%):</span>
                <span>-${formatCurrency(student.discountAmount, student.studentType)}</span>
              </div>
              ` : ''}
              <div class="payment-row payment-total">
                <span>Final Amount:</span>
                <span>${formatCurrency(student.finalAmount, student.studentType)}</span>
              </div>
              <div class="payment-row">
                <span>Paid:</span>
                <span style="color: #059669;">${formatCurrency(student.paidAmount, student.studentType)}</span>
              </div>
              <div class="payment-row">
                <span>Remaining:</span>
                <span style="color: #dc2626;">${formatCurrency(student.finalAmount - student.paidAmount, student.studentType)}</span>
              </div>
            </div>
            ${student.notes ? `
            <div style="margin-top: 15px; padding: 12px; background: #374151; border-radius: 8px; border-left: 3px solid #f59e0b;">
              <div style="font-weight: bold; color: #f59e0b; margin-bottom: 5px;">Notes:</div>
              <div style="color: #cbd5e1; font-size: 0.9em;">${student.notes}</div>
            </div>
            ` : ''}
            <div style="text-align: center; margin-top: 20px; padding-top: 15px; border-top: 1px solid #374151; color: #94a3b8; font-size: 0.8em;">
              Generated on ${new Date().toLocaleDateString('en-GB')} at ${new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
    }, 250);
  };
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid': return 'bg-emerald-50 text-emerald-800 border border-emerald-300 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-700';
      case 'partial': return 'bg-amber-50 text-amber-800 border border-amber-300 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-700';
      case 'pending': return 'bg-slate-50 text-slate-700 border border-slate-200 dark:bg-slate-900/20 dark:text-slate-300 dark:border-slate-800';
      case 'overdue': return 'bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800';
      default: return 'bg-gray-50 text-gray-700 border border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid': return <CheckCircle className="w-4 h-4" />;
      case 'partial': return <Clock className="w-4 h-4" />;
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      case 'overdue': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };
  const filteredStudents = useMemo(() => {
    const filtered = students.filter(student => {
      const searchTermLower = searchTerm.toLowerCase();
      const matchesSearch = student.name.toLowerCase().includes(searchTermLower) ||
        student.email.toLowerCase().includes(searchTermLower) ||
        student.phone.includes(searchTerm) ||
        student.cnic.toLowerCase().includes(searchTermLower);
      const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
      const matchesCourse = courseFilter === 'all' || student.course === courseFilter;
      const matchesType = studentTypeFilter === 'all' || student.studentType === studentTypeFilter;
      return matchesSearch && matchesStatus && matchesCourse && matchesType;
    });

    // Sort by enrollment date: newest first (oldest at bottom)
    return filtered.sort((a, b) => {
      const dateA = new Date(a.enrollmentDate).getTime();
      const dateB = new Date(b.enrollmentDate).getTime();
      return dateB - dateA; // Descending order (newest first)
    });
  }, [students, searchTerm, statusFilter, courseFilter, studentTypeFilter]);

  const stats = useMemo(() => {
    const localStudents = students.filter(s => s.studentType === 'local');
    const foreignStudents = students.filter(s => s.studentType === 'foreigner');

    const localRevenue = localStudents.reduce((sum, s) => sum + (s.paidAmount || 0), 0);
    const pendingLocalRevenue = localStudents.reduce((sum, s) => sum + Math.max(0, (s.finalAmount || 0) - (s.paidAmount || 0)), 0);

    const foreignerRevenue = foreignStudents.reduce((sum, s) => sum + (s.paidAmount || 0), 0);
    const pendingForeignerRevenue = foreignStudents.reduce((sum, s) => sum + Math.max(0, (s.finalAmount || 0) - (s.paidAmount || 0)), 0);


    return {
      total: students.length,
      paid: students.filter(s => s.status === 'paid').length,
      pending: students.filter(s => s.status === 'pending').length,
      partial: students.filter(s => s.status === 'partial').length,
      locals: localStudents.length,
      foreigners: foreignStudents.length,
      localRevenue,
      pendingLocalRevenue,
      foreignerRevenue,
      pendingForeignerRevenue
    };
  }, [students]);

  const formatCurrency = (amount: number | undefined | null, type: 'local' | 'foreigner') => {
    const safeAmount = amount || 0;
    return type === 'local' ? `PKR ${safeAmount.toLocaleString()}` : `$${safeAmount.toLocaleString()}`;
  };
  const StudentCard = ({ student }: { student: Student; index: number }) => (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 dark:bg-slate-800/90 dark:border-slate-700/50 p-6">
      <div className="flex flex-col space-y-4">
        {/* Header with profile */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            {student.profilePicture ? (
              <Image
                src={student.profilePicture}
                alt={student.name}
                width={64}
                height={64}
                className="w-16 h-16 rounded-full object-cover shadow-lg border-2 border-blue-200 dark:border-blue-600"
              />
            ) : (
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                {student.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">{student.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{student.cnic}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300 capitalize">{student.course}</p>
          </div>
          <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(student.status)}`}>
            {getStatusIcon(student.status)}
            <span className="capitalize">{student.status}</span>
          </span>
        </div>

        {/* Course and Type */}
        <div className="flex flex-wrap gap-2">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium dark:bg-blue-900/20 dark:text-blue-300 capitalize">
            {student.course}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${student.studentType === 'local' ?
            'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' : 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300'}`}>
            {student.studentType === 'local' ? 'Local' : 'International'}
          </span>
        </div>

        {/* Enrollment Date */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <Calendar className="w-4 h-4" />
          <span>Enrolled: {new Date(student.enrollmentDate).toLocaleDateString()}</span>
        </div>

        {/* Actions */}
        <div className="flex space-x-2 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => handleViewDetails(student)}
            className="flex-1 bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30"
          >
            <Eye className="w-4 h-4" />
            <span>View</span>
          </button>
          <button
            onClick={() => handleEdit(student)}
            className="flex-1 bg-green-50 text-green-600 hover:bg-green-100 px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/30"
          >
            <Edit className="w-4 h-4" />
            <span>Edit</span>
          </button>
          <button
            onClick={() => handleDelete(student._id)}
            className="flex-1 bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );


if (!isAuthenticated) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl w-full max-w-md p-8 transform animate-modal border border-slate-200/50">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl shadow-lg mb-4">
            <Lock className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">
            Student Management
          </h1>
          <p className="text-gray-600 text-lg">Enter password to access the system</p>
        </div>

        <form onSubmit={handlePasswordSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-600 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setPasswordError('');
                }}
                className="w-full pl-12 pr-12 py-4 border-2 border-amber-200 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 bg-white/70 backdrop-blur-sm text-gray-800 placeholder-gray-500"
                placeholder="Enter password"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-amber-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {passwordError && (
              <div className="mt-3 flex items-center space-x-2 text-red-600">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm font-medium">{passwordError}</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3"
          >
            <Lock className="w-5 h-5" />
            <span>Login</span>
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Th3 Trad3rs Consultancy © 2024
          </p>
        </div>
      </div>
    </div>
  );
}

  return (



    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 lg:p-6 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto">


        {/* Header Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 lg:p-8 mb-8 border border-slate-200/50 dark:bg-slate-800/90 dark:border-slate-700/50">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <div className="mb-6 lg:mb-0">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl shadow-lg">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Student Management
                </h1>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">Manage your trading academy students and track payments efficiently</p>
            </div>
            <button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-3 group"
            >
              <UserPlus className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              <span>Add New Student</span>

              <button
  onClick={handleLogout}
  className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
  title="Logout"
>
  <LogOut className="w-5 h-5" />
  <span className="hidden sm:block">Logout</span>
</button>
            </button>
          </div>

          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 lg:gap-6">
            {[
              { label: 'Total Students', value: stats.total, icon: User, color: 'from-blue-500 to-blue-600' },
              { label: 'Paid', value: stats.paid, icon: CheckCircle, color: 'from-emerald-500 to-emerald-600' },
              { label: 'Pending', value: stats.pending, icon: AlertCircle, color: 'from-slate-500 to-slate-600' },
              { label: 'Partial', value: stats.partial, icon: Clock, color: 'from-amber-500 to-amber-600' },
              { label: 'Local Revenue (PKR )', value: `PKR ${stats.localRevenue.toLocaleString()}`, icon: TrendingUp, color: 'from-green-500 to-green-600' },
              { label: 'Pending (PKR )', value: `PKR ${stats.pendingLocalRevenue.toLocaleString()}`, icon: DollarSign, color: 'from-orange-500 to-orange-600' },
              { label: 'Intl Revenue ($)', value: `$${stats.foreignerRevenue.toLocaleString()}`, icon: TrendingUp, color: 'from-purple-500 to-purple-600' },
              { label: 'Pending ($)', value: `$${stats.pendingForeignerRevenue.toLocaleString()}`, icon: DollarSign, color: 'from-red-500 to-red-600' }
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={stat.label}
                  className={`bg-white/50 dark:bg-slate-800/50 p-4 lg:p-6 rounded-2xl border border-slate-200/50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 dark:border-slate-700/30`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center mb-3 lg:mb-4 shadow-md`}>
                    <IconComponent className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <div className="text-xl lg:text-2xl xl:text-3xl font-bold text-gray-800 dark:text-white mb-1">{stat.value}</div>
                  <div className="text-gray-600 dark:text-gray-300 text-xs lg:text-sm font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 mb-8 border border-slate-200/50 dark:bg-slate-800/90 dark:border-slate-700/50">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-600 w-5 h-5" />
              <input
                type="text"
                placeholder="Search students by name, email, phone, or CNIC..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 bg-white/70 backdrop-blur-sm dark:bg-slate-700/70 dark:border-slate-600 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-600 w-5 h-5" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-12 pr-8 py-4 border-2 border-amber-200 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 bg-white/70 backdrop-blur-sm dark:bg-slate-700/70 dark:border-slate-600 dark:text-white"
                >
                  <option value="all">All Status</option>
                  <option value="paid">Paid</option>
                  <option value="partial">Partial</option>
                  <option value="pending">Pending</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
              >
                {showAdvancedFilters ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                <span>Filters</span>
              </button>
              <button
                onClick={() => setViewMode(viewMode === 'table' ? 'cards' : 'table')}
                className="px-6 py-4 bg-gradient-to-r from-amber-600 to-yellow-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
              >
                {viewMode === 'table' ? <BookOpen className="w-5 h-5" /> : <User className="w-5 h-5" />}
                <span>{viewMode === 'table' ? 'Cards' : 'Table'}</span>
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <div className="grid md:grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-2xl border border-slate-200 dark:border-slate-600">
              <div className="relative">
                <BookOpen className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-600 w-5 h-5" />
                <select
                  value={courseFilter}
                  onChange={(e) => setCourseFilter(e.target.value)}
                  className="w-full pl-12 pr-8 py-3 border-2 border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 bg-white/70 backdrop-blur-sm dark:bg-slate-600/70 dark:border-slate-500 dark:text-white"
                >
                  <option value="all">All Courses</option>
                  <option value="basics">Basics</option>
                  <option value="advance">Advance</option>
                  <option value="pro">Pro</option>
                </select>
              </div>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-600 w-5 h-5" />
                <select
                  value={studentTypeFilter}
                  onChange={(e) => setStudentTypeFilter(e.target.value)}
                  className="w-full pl-12 pr-8 py-3 border-2 border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 bg-white/70 backdrop-blur-sm dark:bg-slate-600/70 dark:border-slate-500 dark:text-white"
                >
                  <option value="all">All Types</option>
                  <option value="local">Local</option>
                  <option value="foreigner">International</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Students Display */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-200/50 overflow-hidden dark:bg-slate-800/90 dark:border-slate-700/50">
          {loading ?
            (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                <span className="ml-3 text-gray-600 dark:text-gray-300 font-medium">Loading students...</span>
              </div>
            ) : viewMode === 'cards' ?
              (
                <div className="p-6">
                  {filteredStudents.length === 0 ? (
                    <div className="text-center py-20">
                      <div className="text-8xl mb-6">🔍</div>
                      <h3 className="text-2xl font-bold text-gray-800 dark:te xt-white mb-3">No students found</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-lg">Try adjusting your search or filter criteria</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredStudents.map((student, index) => (
                        <StudentCard key={student._id} student={student} index={index} />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-slate-50/80 via-blue-50/80 to-indigo-50/80 border-b-2 border-slate-200 dark:from-slate-700/50 dark:to-slate-600/50 dark:border-slate-600/50">
                      <tr>
                        <th className="text-left py-6 px-6 font-bold text-gray-700 dark:text-gray-200">
                          <div className="flex items-center space-x-2">
                            <User className="w-5 h-5 text-amber-600" />
                            <span>Student</span>
                          </div>
                        </th>
                        <th className="text-left py-6 px-6 font-bold text-gray-700 dark:text-gray-200">
                          <div className="flex items-center space-x-2">
                            <CreditCard className="w-5 h-5 text-amber-600" />
                            <span>CNIC/Passport</span>
                          </div>
                        </th>
                        <th className="text-left py-6 px-6 font-bold text-gray-700 dark:text-gray-200">
                          <div className="flex items-center space-x-2">
                            <BookOpen className="w-5 h-5 text-amber-600" />
                            <span>Course</span>
                          </div>
                        </th>
                        <th className="text-left py-6 px-6 font-bold text-gray-700 dark:text-gray-200">
                          <div className="flex items-center space-x-2">
                            <User className="w-5 h-5 text-amber-600" />
                            <span>Type</span>
                          </div>
                        </th>
                        <th className="text-left py-6 px-6 font-bold text-gray-700 dark:text-gray-200">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-5 h-5 text-amber-600" />
                            <span>Enrollment</span>
                          </div>
                        </th>
                        <th className="text-left py-6 px-6 font-bold text-gray-700 dark:text-gray-200">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.map((student, index) => (
                        <tr
                          key={student._id}
                          className="border-b border-slate-100/50 hover:bg-gradient-to-r hover:from-slate-50/30 hover:to-blue-50/30 transition-all duration-300 dark:border-slate-700/50 dark:hover:from-slate-700/30 dark:hover:to-slate-600/30"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <td className="py-6 px-6">
                            <div className="flex items-center space-x-4">
                              <div className="relative">
                                {student.profilePicture ?
                                  (
                                    <Image
                                      src={student.profilePicture}
                                      alt={student.name}
                                      width={56}
                                      height={56}
                                      className="w-14 h-14 rounded-2xl object-cover shadow-lg border-2 border-blue-200 dark:border-blue-600"
                                    />

                                  ) : (
                                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                      {student.name.charAt(0).toUpperCase()}
                                    </div>
                                  )}
                              </div>
                              <div>
                                <div className="font-bold text-gray-800 dark:text-white text-lg">{student.name}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center space-x-1 mt-1">
                                  <Mail className="w-3 h-3 text-amber-600" />
                                  <span>{student.email}</span>
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center space-x-1">
                                  <Phone className="w-3 h-3 text-orange-600" />
                                  <span>{student.phone}</span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-6 px-6">
                            <div className="text-sm font-semibold text-gray-800 dark:text-white bg-gradient-to-r from-amber-50 to-orange-50 dark:from-slate-700 dark:to-slate-600 px-4 py-2 rounded-xl inline-block border border-amber-200 dark:border-slate-600">
                              {student.cnic}
                            </div>
                          </td>
                          <td className="py-6 px-6">
                            <div className="text-sm font-semibold text-gray-800 dark:text-white bg-gradient-to-r from-amber-50 to-orange-50 dark:from-slate-700 dark:to-slate-600 px-4 py-2 rounded-xl inline-block border border-amber-200 dark:border-slate-600 capitalize">
                              {student.course}
                            </div>
                          </td>
                          <td className="py-6 px-6">
                            <div className={`text-xs px-3 py-2 rounded-full font-medium ${student.studentType === 'local' ?
                              'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' : 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300'}`}>
                              {student.studentType === 'local' ? 'Local' : 'International'}
                            </div>
                          </td>
                          <td className="py-6 px-6 text-sm text-gray-600 dark:text-gray-300 font-medium">
                            {new Date(student.enrollmentDate).toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </td>
                          <td className="py-6 px-6">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleViewDetails(student)}
                                className="p-3 text-amber-600 hover:bg-amber-50 rounded-xl transition-all duration-300 hover:scale-110 dark:text-amber-400 dark:hover:bg-slate-700 group border border-amber-200 dark:border-amber-700"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4 group-hover:scale-125 transition-transform duration-300" />
                              </button>
                              <button
                                onClick={() => handleEdit(student)}
                                className="p-3 text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-300 hover:scale-110 dark:text-orange-400 dark:hover:bg-slate-700 group border border-orange-200 dark:border-orange-700"
                                title="Edit Student"
                              >
                                <Edit className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                              </button>
                              <button
                                onClick={() => handleDelete(student._id)}
                                className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 hover:scale-110 dark:text-red-400 dark:hover:bg-slate-700 group border border-red-200 dark:border-red-700"
                                title="Delete Student"
                              >
                                <Trash2 className="w-4 h-4 group-hover:scale-125 transition-transform duration-300" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {filteredStudents.length === 0 && (
                    <div className="text-center py-20">
                      <div className="text-8xl mb-6">🔍</div>
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">No students found</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-lg">Try adjusting your search or filter criteria</p>
                    </div>
                  )}
                </div>
              )}
        </div>


        {/* Student Details Modal */}
        {showDetailModal && selectedStudent && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl w-full max-w-5xl max-h-screen overflow-y-auto transform animate-modal dark:bg-slate-800/95 border border-slate-200/50 dark:border-slate-700/50">
              <div className="sticky top-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-6 border-b border-slate-200 dark:border-slate-700 rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl shadow-lg">
                      <FileText className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                      Student Details
                    </h2>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => downloadPDF(selectedStudent)}
                      className="p-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center space-x-2"
                    >
                      <Download className="w-5 h-5" />
                      <span className="hidden sm:block">Download PDF</span>
                    </button>
                    <button
                      onClick={() => setShowDetailModal(false)}
                      className="p-3 hover:bg-gray-100 rounded-2xl transition-all duration-300 hover:scale-110 dark:hover:bg-slate-700"
                    >
                      <X className="w-7 h-7 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-8 space-y-8">
                {/* Profile Section */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-700/50 dark:to-slate-600/50 p-6 rounded-2xl border border-blue-200 dark:border-slate-600 text-center">
                  <div className="flex flex-col items-center space-y-4">
                    {selectedStudent.profilePicture ?
                      (
                        <Image
                          src={selectedStudent.profilePicture}
                          alt={selectedStudent.name}
                          width={128}
                          height={128}
                          className="w-32 h-32 rounded-full object-cover shadow-xl border-4 border-white dark:border-slate-500"
                        />

                      ) :
                      (
                        <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-5xl shadow-xl">
                          {selectedStudent.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    <div>
                      <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{selectedStudent.name}</h3>
                      <span className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(selectedStudent.status)}`}>
                        {getStatusIcon(selectedStudent.status)}
                        <span className="capitalize">{selectedStudent.status}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-slate-700/50 dark:to-slate-600/50 p-6 rounded-2xl border border-green-200 dark:border-slate-600">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <span>Personal Information</span>
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white/60 dark:bg-slate-800/60 p-4 rounded-xl border border-green-100 dark:border-slate-600">
                      <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 flex items-center space-x-2">
                        <Mail className="w-4 h-4" />
                        <span>Email Address</span>
                      </div>
                      <div className="text-gray-800 dark:text-white font-semibold">{selectedStudent.email}</div>
                    </div>
                    <div className="bg-white/60 dark:bg-slate-800/60 p-4 rounded-xl border border-green-100 dark:border-slate-600">
                      <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 flex items-center space-x-2">
                        <Phone className="w-4 h-4" />
                        <span>Phone Number</span>
                      </div>
                      <div className="text-gray-800 dark:text-white font-semibold">{selectedStudent.phone}</div>
                    </div>
                    <div className="bg-white/60 dark:bg-slate-800/60 p-4 rounded-xl border border-green-100 dark:border-slate-600">
                      <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 flex items-center space-x-2">
                        <CreditCard className="w-4 h-4" />
                        <span>CNIC/Passport</span>
                      </div>
                      <div className="text-gray-800 dark:text-white font-semibold">{selectedStudent.cnic}</div>
                    </div>
                    <div className="bg-white/60 dark:bg-slate-800/60 p-4 rounded-xl border border-green-100 dark:border-slate-600">
                      <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>Student Type</span>
                      </div>
                      <div className="text-gray-800 dark:text-white font-semibold capitalize">
                        {selectedStudent.studentType === 'local' ? 'Local Student' : 'International Student'}
                      </div>
                    </div>
                    <div className="bg-white/60 dark:bg-slate-800/60 p-4 rounded-xl border border-green-100 dark:border-slate-600">
                      <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 flex items-center space-x-2">
                        <BookOpen className="w-4 h-4" />
                        <span>Course Enrolled</span>
                      </div>
                      <div className="text-gray-800 dark:text-white font-semibold capitalize">{selectedStudent.course}</div>
                    </div>
                    <div className="bg-white/60 dark:bg-slate-800/60 p-4 rounded-xl border border-green-100 dark:border-slate-600">
                      <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>Enrollment Date</span>
                      </div>
                      <div className="text-gray-800 dark:text-white font-semibold">
                        {new Date(selectedStudent.enrollmentDate).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                </div>


                {/* Fee Structure & Payment Details */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-slate-700/50 dark:to-slate-600/50 p-6 rounded-2xl border border-amber-200 dark:border-slate-600">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg">
                      <DollarSign className="w-5 h-5 text-white" />
                    </div>
                    <span>Fee Structure & Payment Details</span>
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-4">
                      <div className="bg-white/60 dark:bg-slate-800/60 p-5 rounded-xl border border-amber-100 dark:border-slate-600">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-gray-600 dark:text-gray-400 font-medium">Base Course Fee:</span>
                          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                            {formatCurrency(selectedStudent.feeAmount, selectedStudent.studentType)}
                          </span>
                        </div>
                        {selectedStudent.discount > 0 && (
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-gray-600 dark:text-gray-400 font-medium">Discount ({selectedStudent.discount}%):</span>
                            <span className="text-lg font-bold text-green-600 dark:text-green-400">
                              -{formatCurrency(selectedStudent.discountAmount, selectedStudent.studentType)}
                            </span>
                          </div>
                        )}
                        <div className="border-t pt-3">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-800 dark:text-white font-bold">Final Amount:</span>
                            <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                              {formatCurrency(selectedStudent.finalAmount, selectedStudent.studentType)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-white/60 dark:bg-slate-800/60 p-5 rounded-xl border border-amber-100 dark:border-slate-600">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-gray-600 dark:text-gray-400 font-medium">Amount Paid:</span>
                          <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                            {formatCurrency(selectedStudent.paidAmount, selectedStudent.studentType)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-gray-600 dark:text-gray-400 font-medium">Remaining Balance:</span>
                          <span className="text-lg font-bold text-red-600 dark:text-red-400">
                            {formatCurrency(selectedStudent.finalAmount - selectedStudent.paidAmount, selectedStudent.studentType)}
                          </span>
                        </div>
                        <div className="border-t pt-3">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-800 dark:text-white font-bold">Payment Progress:</span>
                            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                              {selectedStudent.finalAmount > 0 ?
                                Math.round((selectedStudent.paidAmount / selectedStudent.finalAmount) * 100) : 0}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-600">
                            <div
                              className="bg-gradient-to-r from-emerald-400 to-blue-500 h-3 rounded-full transition-all duration-1000 shadow-sm"
                              style={{
                                width: `${selectedStudent.finalAmount > 0 ?
                                  Math.min((selectedStudent.paidAmount / selectedStudent.finalAmount) * 100, 100) : 0}%`
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Status Summary */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-600/50 dark:to-slate-700/50 p-5 rounded-xl border border-blue-200 dark:border-slate-600">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-full ${selectedStudent.status === 'paid' ?
                          'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600' :
                          selectedStudent.status === 'partial' ?
                            'bg-amber-100 dark:bg-amber-900/20 text-amber-600' :
                            'bg-red-100 dark:bg-red-900/20 text-red-600'
                          }`}>
                          {getStatusIcon(selectedStudent.status)}
                        </div>
                        <div>
                          <div className="text-lg font-bold text-gray-800 dark:text-white">Payment Status</div>
                          <div className="text-gray-600 dark:text-gray-400">
                            {selectedStudent.status === 'paid' ?
                              'All payments completed' :
                              selectedStudent.status === 'partial' ?
                                'Partial payment made' :
                                'Payment pending'}
                          </div>
                        </div>
                      </div>
                      <span className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-lg font-bold ${getStatusColor(selectedStudent.status)}`}>
                        <span className="capitalize">{selectedStudent.status}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Additional Notes */}
                {selectedStudent.notes && (
                  <div className="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-slate-700/50 dark:to-slate-600/50 p-6 rounded-2xl border border-rose-200 dark:border-slate-600">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg">
                        <Star className="w-5 h-5 text-white" />
                      </div>
                      <span>Additional Notes</span>
                    </h3>
                    <div className="bg-white/60 dark:bg-slate-800/60 p-5 rounded-xl border border-rose-100 dark:border-slate-600">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{selectedStudent.notes}</p>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t-2 border-slate-200 dark:border-slate-600">
                  <button
                    onClick={() => downloadPDF(selectedStudent)}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-8 rounded-2xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3"
                  >
                    <Download className="w-6 h-6" />
                    <span className="text-lg">Download as PDF</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowDetailModal(false);
                      handleEdit(selectedStudent);
                    }}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-8 rounded-2xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3"
                  >
                    <Edit className="w-6 h-6" />
                    <span className="text-lg">Edit Student</span>
                  </button>
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="px-8 py-4 border-2 border-gray-300 text-gray-700 dark:text-gray-300 rounded-2xl font-bold hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-105 dark:border-slate-600 text-lg"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Add/Edit Student Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl w-full max-w-4xl max-h-screen overflow-y-auto transform animate-modal dark:bg-slate-800/95 border border-slate-200/50 dark:border-slate-700/50">
              <div className="sticky top-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-6 border-b border-slate-200 dark:border-slate-700 rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                      {editingStudent ? <Edit className="w-7 h-7 text-white" /> : <UserPlus className="w-7 h-7 text-white" />}
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {editingStudent ? 'Edit Student' : 'Add New Student'}
                    </h2>
                  </div>
                  <button
                    onClick={resetForm}
                    className="p-3 hover:bg-gray-100 rounded-2xl transition-all duration-300 hover:scale-110 dark:hover:bg-slate-700"
                  >
                    <X className="w-7 h-7 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              </div>

              <div className="p-8 space-y-8">
                {/* Profile Picture Upload Section */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-slate-700/50 dark:to-slate-600/50 p-6 rounded-2xl border border-purple-200 dark:border-slate-600">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                      <Camera className="w-5 h-5 text-white" />
                    </div>
                    <span>Profile Picture</span>
                  </h3>

                  <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
                    {/* Profile Picture Preview */}
                    <div className="relative">
                      {profilePreview || formData.profilePicture ? (
                        <div className="relative">
                          <Image
                            src={profilePreview || formData.profilePicture!}
                            alt="Profile Preview"
                            width={128}
                            height={128}
                            className="w-32 h-32 rounded-3xl object-cover shadow-xl border-4 border-purple-200 dark:border-purple-600"
                          />
                          <button
                            type="button"
                            onClick={removeProfilePicture}
                            className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="w-32 h-32 bg-gradient-to-br from-purple-400 via-pink-400 to-rose-400 rounded-full flex items-center justify-center text-white font-bold text-4xl shadow-xl border-4 border-purple-200 dark:border-purple-600">
                          {formData.name ? formData.name.charAt(0).toUpperCase() : <Camera className="w-12 h-12" />}
                        </div>
                      )}
                    </div>

                    {/* Upload Controls */}
                    <div className="flex-1">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                        onChange={handleProfilePictureUpload}
                        className="hidden"
                      />
                      <div className="space-y-4">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="bg-gradient-to-r from-purple-400 to-pink-400 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-3"
                        >
                          <Upload className="w-5 h-5" />
                          <span>Upload Profile Picture</span>
                        </button>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Supported formats: JPEG, PNG, GIF, WebP (Max 2MB)
                        </p>
                        {(profilePreview || formData.profilePicture) && (
                          <button
                            type="button"
                            onClick={removeProfilePicture}
                            className="text-red-600 hover:text-red-700 font-medium transition-colors duration-300 flex items-center space-x-2"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Remove Picture</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Student Type Selection */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-700/50 dark:to-slate-600/50 p-6 rounded-2xl border border-blue-200 dark:border-slate-600">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <span>Student Type & Course</span>
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                        Student Type *
                      </label>
                      <div className="flex space-x-4">
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="studentType"
                            value="local"
                            checked={formData.studentType === 'local'}
                            onChange={(e) => setFormData(prev => ({ ...prev, studentType: e.target.value as 'local' | 'foreigner' }))}
                            className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-gray-700 dark:text-gray-300 font-medium">Local</span>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="studentType"
                            value="foreigner"
                            checked={formData.studentType === 'foreigner'}
                            onChange={(e) => setFormData(prev => ({ ...prev, studentType: e.target.value as 'local' | 'foreigner' }))}
                            className="w-5 h-5 text-purple-600 focus:ring-purple-500"
                          />
                          <span className="text-gray-700 dark:text-gray-300 font-medium">International</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                        Select Course *
                      </label>
                      <select
                        required
                        value={formData.course}
                        onChange={(e) => setFormData(prev => ({ ...prev, course: e.target.value as 'basics' | 'advance' | 'pro' }))}
                        className="w-full px-5 py-4 border-2 border-indigo-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white/70 backdrop-blur-sm dark:bg-slate-700/70 dark:border-slate-600 dark:text-white"
                      >
                        <option value="basics">
                          Basics - {formData.studentType === 'local' ? 'PKR 20,000' : '$100'}
                        </option>
                        <option value="advance">
                          Advance - {formData.studentType === 'local' ? 'PKR 30,000' : '$200'}
                        </option>
                        <option value="pro">
                          Pro - {formData.studentType === 'local' ? 'PKR 40,000' : '$300'}
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Fee Structure Display */}
                  {formData.studentType && (
                    <div className="bg-white/60 dark:bg-slate-800/60 rounded-2xl p-5 border border-blue-100 dark:border-slate-600">
                      <h4 className="font-bold text-gray-800 dark:text-white mb-4">
                        Fee Structure for {formData.studentType === 'local' ? 'Local' : 'International'} Students:
                      </h4>
                      <div className="grid grid-cols-3 gap-4">
                        {Object.entries(feeStructure[formData.studentType]).map(([course, fee]) => (
                          <div
                            key={course}
                            className={`p-4 rounded-xl border-2 transition-all duration-300 ${formData.course === course
                              ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-600'
                              : 'border-gray-200 bg-gray-50 dark:bg-slate-700 dark:border-slate-600'
                              }`}
                          >
                            <div className="text-center">
                              <div className="font-bold text-gray-800 dark:text-white capitalize mb-2">{course}</div>
                              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                {formData.studentType === 'local' ? `PKR ${fee.toLocaleString()}` : `$${fee}`}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>


                {/* Personal Information */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-slate-700/50 dark:to-slate-600/50 p-6 rounded-2xl border border-green-200 dark:border-slate-600">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <span>Personal Information</span>
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                        Student Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-5 py-4 border-2 border-green-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 bg-white/70 backdrop-blur-sm dark:bg-slate-700/70 dark:border-slate-600 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder="Enter student's full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-5 py-4 border-2 border-emerald-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 bg-white/70 backdrop-blur-sm dark:bg-slate-700/70 dark:border-slate-600 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder="student@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-5 py-4 border-2 border-green-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 bg-white/70 backdrop-blur-sm dark:bg-slate-700/70 dark:border-slate-600 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder="+92-300-1234567"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                        CNIC / Passport *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.cnic}
                        onChange={(e) => setFormData(prev => ({ ...prev, cnic: e.target.value }))}
                        className="w-full px-5 py-4 border-2 border-emerald-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 bg-white/70 backdrop-blur-sm dark:bg-slate-700/70 dark:border-slate-600 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder={formData.studentType === 'local' ? '12345-6789012-3' : 'PASSPORT-123456'}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                        Enrollment Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.enrollmentDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, enrollmentDate: e.target.value }))}
                        className="w-full px-5 py-4 border-2 border-green-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 bg-white/70 backdrop-blur-sm dark:bg-slate-700/70 dark:border-slate-600 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-slate-700/50 dark:to-slate-600/50 p-6 rounded-2xl border border-amber-200 dark:border-slate-600">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg">
                      <DollarSign className="w-5 h-5 text-white" />
                    </div>
                    <span>Payment Information</span>
                  </h3>
                  <div className="grid md:grid-cols-4 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                        Base Fee ({formData.studentType === 'local' ? 'PKR ' : '$'})
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={formData.feeAmount}
                        readOnly
                        className="w-full px-5 py-4 border-2 border-gray-300 rounded-2xl bg-gray-100 dark:bg-slate-600 dark:border-slate-500 dark:text-white font-bold text-blue-700 dark:text-blue-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                        Discount (%)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={formData.discount}
                        onChange={(e) => setFormData(prev => ({ ...prev, discount: e.target.value }))}
                        className="w-full px-5 py-4 border-2 border-green-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 bg-white/70 backdrop-blur-sm dark:bg-slate-700/70 dark:border-slate-600 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                        Final Amount ({formData.studentType === 'local' ? 'PKR ' : '$'})
                      </label>
                      <input
                        type="number"
                        value={formData.finalAmount}
                        readOnly
                        className="w-full px-5 py-4 border-2 border-gray-300 rounded-2xl bg-gray-100 dark:bg-slate-600 dark:border-slate-500 dark:text-white font-bold text-green-700 dark:text-green-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                        Amount Paid ({formData.studentType === 'local' ? 'PKR ' : '$'})
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={formData.paidAmount}
                        onChange={(e) => setFormData(prev => ({ ...prev, paidAmount: e.target.value }))}
                        className="w-full px-5 py-4 border-2 border-blue-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/70 backdrop-blur-sm dark:bg-slate-700/70 dark:border-slate-600 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  {/* Discount Summary */}
                  {formData.discount && Number(formData.discount) > 0 && (
                    <div className="mt-6 p-5 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-200 dark:border-green-800">
                      <div className="flex items-center space-x-3 mb-3">
                        <Percent className="w-5 h-5 text-green-600" />
                        <h4 className="font-bold text-green-800 dark:text-green-300">Discount Applied</h4>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Base Fee:</span>
                          <div className="font-bold text-gray-800 dark:text-white">
                            {formatCurrency(Number(formData.feeAmount), formData.studentType)}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Discount ({formData.discount}%):</span>
                          <div className="font-bold text-red-600 dark:text-red-400">
                            -{formatCurrency(Number(formData.discountAmount), formData.studentType)}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Final Amount:</span>
                          <div className="font-bold text-green-600 dark:text-green-400">
                            {formatCurrency(Number(formData.finalAmount), formData.studentType)}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Payment Progress */}
                  {Number(formData.finalAmount) > 0 && (
                    <div className="mt-6 p-5 bg-white/60 dark:bg-slate-800/60 rounded-2xl border border-blue-200 dark:border-slate-600">
                      <div className="flex justify-between items-center text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                        <span>Payment Progress</span>
                        <span className="text-lg text-blue-700 dark:text-blue-400">
                          {Math.round((Number(formData.paidAmount) / Number(formData.finalAmount)) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-600">
                        <div
                          className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 h-4 rounded-full transition-all duration-500 shadow-sm"
                          style={{ width: `${Math.min((Number(formData.paidAmount) / Number(formData.finalAmount)) * 100, 100)}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
                        <span className="font-semibold text-blue-700 dark:text-blue-400">
                          {formatCurrency(Number(formData.paidAmount), formData.studentType)} paid
                        </span>
                        <span className="font-semibold text-red-600 dark:text-red-400">
                          {formatCurrency(Number(formData.finalAmount) - Number(formData.paidAmount), formData.studentType)} remaining
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="mt-6">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                      Payment Status
                    </label>
                    <select
                      value={formData.status}
                      disabled
                      className="w-full px-5 py-4 border-2 border-gray-300 rounded-2xl bg-gray-100 dark:bg-slate-600 dark:border-slate-500 dark:text-white font-bold"
                    >
                      <option value="pending">Pending</option>
                      <option value="partial">Partial Payment</option>
                      <option value="paid">Fully Paid</option>
                      <option value="overdue">Overdue</option>
                    </select>
                  </div>
                </div>

                {/* Additional Notes */}
                <div className="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-slate-700/50 dark:to-slate-600/50 p-6 rounded-2xl border border-rose-200 dark:border-slate-600">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg">
                      <Star className="w-5 h-5 text-white" />
                    </div>
                    <span>Additional Information</span>
                  </h3>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                      Notes & Comments
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                      className="w-full px-5 py-4 border-2 border-rose-200 rounded-2xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-300 h-32 resize-none bg-white/70 backdrop-blur-sm dark:bg-slate-700/70 dark:border-slate-600 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      placeholder="Add notes about student progress, payment arrangements, or any special considerations..."
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t-2 border-slate-200 dark:border-slate-600">
                  <button
                    onClick={handleSubmit}
                    disabled={submitLoading}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-5 px-8 rounded-2xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {submitLoading ?
                      (
                        <>
                          <Loader2 className="w-6 h-6 animate-spin" />
                          <span className="text-lg">{editingStudent ? 'Updating Student...' : 'Adding Student...'}</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-6 h-6" />
                          <span className="text-lg">{editingStudent ? 'Update Student' : 'Add Student'}</span>
                        </>
                      )}
                  </button>
                  <button
                    onClick={resetForm}
                    disabled={submitLoading}
                    className="px-8 py-5 border-2 border-gray-300 text-gray-700 dark:text-gray-300 rounded-2xl font-bold hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none dark:border-slate-600 text-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes modal {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-modal {
          animation: modal 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        tbody tr {
          animation: slideIn 0.5s ease-out forwards;
          opacity: 0;
        }

        tbody tr:nth-child(1) { animation-delay: 0.1s; }
        tbody tr:nth-child(2) { animation-delay: 0.2s; }
        tbody tr:nth-child(3) { animation-delay: 0.3s; }
        tbody tr:nth-child(4) { animation-delay: 0.4s; }
        tbody tr:nth-child(5) { animation-delay: 0.5s; }
      `}</style>
    </div>
  );
};


export default StudentManagementSystem;
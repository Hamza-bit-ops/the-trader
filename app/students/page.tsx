'use client'
import React, { useState, useEffect, useMemo } from 'react';
import { PlusCircle, Search, Filter, Edit, Trash2, Phone, Mail, DollarSign, Clock, CheckCircle, XCircle, AlertCircle, User, Calendar, BookOpen, Loader2, Star, TrendingUp, CreditCard, Percent } from 'lucide-react';

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
  notes: string;
  createdAt?: string;
  updatedAt?: string;
}

const StudentManagementSystem = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
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
    loadStudents();
  }, []);

  // Calculate fees when student type or course changes
 useEffect(() => {
  if (formData.studentType && formData.course) {
    const baseFee = feeStructure[formData.studentType][formData.course];
    setFormData((prev) => ({
      ...prev,
      feeAmount: baseFee.toString(),
      discountAmount: "",
      finalAmount: baseFee.toString(),
    }));
  }
}, [formData.studentType, formData.course, feeStructure]);

  // Calculate discount and final amount
  useEffect(() => {
    if (formData.feeAmount && formData.discount) {
      const baseFee = Number(formData.feeAmount);
      const discountPercent = Number(formData.discount);
      const discountAmount = (baseFee * discountPercent) / 100;
      const finalAmount = baseFee - discountAmount;
      
      setFormData(prev => ({
        ...prev,
        discountAmount: discountAmount.toString(),
        finalAmount: finalAmount.toString()
      }));
    } else if (formData.feeAmount) {
      setFormData(prev => ({
        ...prev,
        discountAmount: '0',
        finalAmount: formData.feeAmount
      }));
    }
  }, [formData.feeAmount, formData.discount]);

  const loadStudents = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/students");
      if (res.ok) {
        const data = await res.json();
        setStudents(data);
      } else {
        // Demo data with new structure
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
            paidAmount: 30000,
            discount: 10,
            discountAmount: 3000,
            finalAmount: 27000,
            status: 'paid',
            enrollmentDate: '2024-02-01',
            notes: 'Completed all modules successfully'
          },
          {
            _id: '3',
            name: 'John Smith',
            email: 'john@example.com',
            phone: '+1-555-123-4567',
            cnic: 'PASSPORT-123456',
            studentType: 'foreigner',
            course: 'pro',
            feeAmount: 300,
            paidAmount: 0,
            discount: 0,
            discountAmount: 0,
            finalAmount: 300,
            status: 'pending',
            enrollmentDate: '2024-02-15',
            notes: 'New international student'
          }
        ]);
      }
    } catch (error) {
      console.error('Error loading students:', error);
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
          notes: 'Excellent progress in technical analysis'
        }
      ]);
    }
    setLoading(false);
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      alert("Student name is required");
      return false;
    }
    if (!formData.email.trim()) {
      alert("Email is required");
      return false;
    }
    if (!formData.phone.trim()) {
      alert("Phone number is required");
      return false;
    }
    if (!formData.cnic.trim()) {
      alert("CNIC/Passport is required");
      return false;
    }
    if (!formData.course) {
      alert("Course selection is required");
      return false;
    }
    if (!formData.enrollmentDate) {
      alert("Enrollment date is required");
      return false;
    }
    
    const paidAmount = Number(formData.paidAmount) || 0;
    const finalAmount = Number(formData.finalAmount);
    if (paidAmount > finalAmount) {
      alert("Paid amount cannot exceed final amount");
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
        feeAmount: Number(formData.feeAmount),
        paidAmount: Number(formData.paidAmount) || 0,
        discount: Number(formData.discount) || 0,
        discountAmount: Number(formData.discountAmount) || 0,
        finalAmount: Number(formData.finalAmount),
      };

      if (editingStudent) {
        const res = await fetch(`/api/students/${editingStudent._id}`, {
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
        } else {
          throw new Error('Failed to update student');
        }
      } else {
        const res = await fetch("/api/students", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        });
        
        if (res.ok) {
          const newStudent = await res.json();
          setStudents(prev => [newStudent, ...prev]);
        } else {
          throw new Error('Failed to create student');
        }
      }

      setShowForm(false);
      setEditingStudent(null);
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
        notes: "",
      });
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    }
    setSubmitLoading(false);
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
      notes: student.notes || ''
    });
    setEditingStudent(student);
    setShowForm(true);
  };

  const handleDelete = async (studentId: string) => {
    if (!window.confirm("Are you sure you want to delete this student? This action cannot be undone.")) {
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetch(`/api/students/${studentId}`, { 
        method: "DELETE" 
      });
      
      if (res.ok) {
        setStudents(prev => prev.filter(student => student._id !== studentId));
      } else {
        throw new Error('Failed to delete student');
      }
    } catch (error) {
      console.error('Error deleting student:', error);
      alert('Failed to delete student. Please try again.');
    }
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid': return 'bg-cyan-50 text-cyan-800 border border-cyan-300 dark:bg-cyan-900/20 dark:text-cyan-300 dark:border-cyan-700';
      case 'partial': return 'bg-blue-50 text-blue-800 border border-blue-300 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-700';
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

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.phone.includes(searchTerm) ||
      student.cnic.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: students.length,
    paid: students.filter(s => s.status === 'paid').length,
    pending: students.filter(s => s.status === 'pending').length,
    partial: students.filter(s => s.status === 'partial').length,
    totalRevenue: students.reduce((sum, s) => sum + (s.paidAmount || 0), 0),
    pendingRevenue: students.reduce((sum, s) => sum + ((s.finalAmount || 0) - (s.paidAmount || 0)), 0),
    locals: students.filter(s => s.studentType === 'local').length,
    foreigners: students.filter(s => s.studentType === 'foreigner').length
  };

  // Auto-calculate payment status based on paid amount
  useEffect(() => {
    if (formData.finalAmount && formData.paidAmount) {
      const finalAmount = Number(formData.finalAmount);
      const paid = Number(formData.paidAmount);
      
      if (paid >= finalAmount) {
        setFormData(prev => ({ ...prev, status: 'paid' })); 
      } else if (paid > 0) {
        setFormData(prev => ({ ...prev, status: 'partial' }));
      } else {
        setFormData(prev => ({ ...prev, status: 'pending' }));
      }
    }
  }, [formData.finalAmount, formData.paidAmount]);

  // Fixed formatCurrency function with proper error handling
  const formatCurrency = (amount: number | undefined | null, type: 'local' | 'foreigner') => {
    const safeAmount = amount || 0;
    return type === 'local' ? `₹${safeAmount.toLocaleString()}` : `$${safeAmount.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 p-4 lg:p-6 dark:from-blue-950 dark:via-slate-900 dark:to-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 lg:p-8 mb-8 border border-cyan-200/50 dark:bg-slate-800/90 dark:border-blue-800/50">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <div className="mb-6 lg:mb-0">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-cyan-400 via-blue-400 to-indigo-400 rounded-2xl shadow-lg">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Student Management
                </h1>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">Manage your trading academy students and track payments efficiently</p>
            </div>
            <button
              onClick={() => {
                setShowForm(true);
                setEditingStudent(null);
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  cnic: '',
                  studentType: 'local',
                  course: 'basics',
                  feeAmount: '',
                  paidAmount: '',
                  discount: '',
                  discountAmount: '',
                  finalAmount: '',
                  status: 'pending',
                  enrollmentDate: '',
                  notes: ''
                });
              }}
              className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-3 group"
            >
              <PlusCircle className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              <span>Add New Student</span>
            </button>
          </div>

          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-8 gap-4 lg:gap-6">
            {[
              { label: 'Total Students', value: stats.total, icon: User, color: 'from-cyan-400 to-blue-500', bg: 'bg-cyan-50 dark:bg-cyan-900/20' },
              { label: 'Local Students', value: stats.locals, icon: User, color: 'from-blue-400 to-indigo-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
              { label: 'International', value: stats.foreigners, icon: User, color: 'from-indigo-400 to-purple-500', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
              { label: 'Paid', value: stats.paid, icon: CheckCircle, color: 'from-cyan-500 to-cyan-600', bg: 'bg-cyan-50 dark:bg-cyan-900/20' },
              { label: 'Pending', value: stats.pending, icon: AlertCircle, color: 'from-slate-500 to-slate-600', bg: 'bg-slate-50 dark:bg-slate-900/20' },
              { label: 'Partial', value: stats.partial, icon: Clock, color: 'from-blue-500 to-indigo-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
              { label: 'Total Revenue', value: `₹${stats.totalRevenue.toLocaleString()}`, icon: TrendingUp, color: 'from-cyan-600 to-blue-700', bg: 'bg-cyan-50 dark:bg-cyan-900/20' },
              { label: 'Pending Revenue', value: `₹${stats.pendingRevenue.toLocaleString()}`, icon: DollarSign, color: 'from-indigo-500 to-purple-600', bg: 'bg-indigo-50 dark:bg-indigo-900/20' }
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={stat.label}
                  className={`${stat.bg} p-6 rounded-2xl border border-cyan-200/50 hover:shadow-lg transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 dark:border-blue-800/30`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center mb-4 shadow-md`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white mb-1">{stat.value}</div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 mb-8 border border-cyan-200/50 dark:bg-slate-800/90 dark:border-blue-800/50">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-600 w-5 h-5" />
              <input
                type="text"
                placeholder="Search students by name, email, phone, or CNIC..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-cyan-200 rounded-2xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 bg-white/70 backdrop-blur-sm dark:bg-slate-700/70 dark:border-blue-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-600 w-5 h-5" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-12 pr-8 py-4 border-2 border-blue-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/70 backdrop-blur-sm dark:bg-slate-700/70 dark:border-blue-700 dark:text-white"
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="partial">Partial</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-cyan-200/50 overflow-hidden dark:bg-slate-800/90 dark:border-blue-800/50">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-cyan-600" />
              <span className="ml-3 text-gray-600 dark:text-gray-300 font-medium">Loading students...</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-cyan-50/80 via-blue-50/80 to-indigo-50/80 border-b-2 border-cyan-200 dark:from-slate-700/50 dark:to-slate-600/50 dark:border-blue-800/50">
                  <tr>
                    <th className="text-left py-6 px-6 font-bold text-gray-700 dark:text-gray-200">
                      <div className="flex items-center space-x-2">
                        <User className="w-5 h-5 text-cyan-600" />
                        <span>Student Information</span>
                      </div>
                    </th>
                    <th className="text-left py-6 px-6 font-bold text-gray-700 dark:text-gray-200">
                      <div className="flex items-center space-x-2">
                        <CreditCard className="w-5 h-5 text-blue-600" />
                        <span>CNIC/Passport</span>
                      </div>
                    </th>
                    <th className="text-left py-6 px-6 font-bold text-gray-700 dark:text-gray-200">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="w-5 h-5 text-indigo-600" />
                        <span>Course & Type</span>
                      </div>
                    </th>
                    <th className="text-left py-6 px-6 font-bold text-gray-700 dark:text-gray-200">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-5 h-5 text-cyan-700" />
                        <span>Payment Details</span>
                      </div>
                    </th>
                    <th className="text-left py-6 px-6 font-bold text-gray-700 dark:text-gray-200">Status</th>
                    <th className="text-left py-6 px-6 font-bold text-gray-700 dark:text-gray-200">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-5 h-5 text-blue-700" />
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
                      className="border-b border-cyan-100/50 hover:bg-gradient-to-r hover:from-cyan-50/30 hover:to-blue-50/30 transition-all duration-300 dark:border-blue-800/50 dark:hover:from-slate-700/30 dark:hover:to-slate-600/30"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <td className="py-6 px-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 via-blue-400 to-indigo-400 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            {student.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-bold text-gray-800 dark:text-white text-lg">{student.name}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center space-x-1 mt-1">
                              <Mail className="w-3 h-3 text-cyan-600" />
                              <span>{student.email}</span>
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center space-x-1">
                              <Phone className="w-3 h-3 text-blue-600" />
                              <span>{student.phone}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-6 px-6">
                        <div className="text-sm font-semibold text-gray-800 dark:text-white bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-slate-700 dark:to-slate-600 px-4 py-2 rounded-xl inline-block border border-blue-200 dark:border-blue-700">
                          {student.cnic}
                        </div>
                      </td>
                      <td className="py-6 px-6">
                        <div className="space-y-2">
                          <div className="text-sm font-semibold text-gray-800 dark:text-white bg-gradient-to-r from-cyan-50 to-indigo-50 dark:from-slate-700 dark:to-slate-600 px-4 py-2 rounded-xl inline-block border border-cyan-200 dark:border-blue-700 capitalize">
                            {student.course}
                          </div>
                          <div className={`text-xs px-3 py-1 rounded-full font-medium ${student.studentType === 'local' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'}`}>
                            {student.studentType === 'local' ? '🏠 Local' : '🌍 International'}
                          </div>
                        </div>
                      </td>
                      <td className="py-6 px-6">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <div className="text-cyan-700 font-bold dark:text-cyan-400">
                              {formatCurrency(student.paidAmount, student.studentType)}
                            </div>
                            <div className="text-gray-500 text-sm">
                              of {formatCurrency(student.finalAmount, student.studentType)}
                            </div>
                          </div>
                          {student.discount > 0 && (
                            <div className="flex items-center space-x-2">
                              <Percent className="w-3 h-3 text-green-600" />
                              <span className="text-xs text-green-600 font-medium">
                                {student.discount}% discount (-{formatCurrency(student.discountAmount, student.studentType)})
                              </span>
                            </div>
                          )}
                          <div className="w-28 bg-gray-200 rounded-full h-3 dark:bg-gray-600">
                            <div
                              className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 h-3 rounded-full transition-all duration-1000 shadow-sm"
                              style={{ width: `${Math.min(((student.paidAmount || 0) / (student.finalAmount || 1)) * 100, 100)}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                            {Math.round(((student.paidAmount || 0) / (student.finalAmount || 1)) * 100)}% completed
                          </div>
                        </div>
                      </td>
                      <td className="py-6 px-6">
                        <span className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(student.status)}`}>
                          {getStatusIcon(student.status)}
                          <span className="capitalize">{student.status}</span>
                        </span>
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
                            onClick={() => handleEdit(student)}
                            className="p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 hover:scale-110 dark:text-blue-400 dark:hover:bg-slate-700 group border border-blue-200 dark:border-blue-700"
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
            </div>
          )}

          {filteredStudents.length === 0 && !loading && (
            <div className="text-center py-20">
              <div className="text-8xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">No students found</h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {/* Enhanced Add/Edit Student Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl w-full max-w-4xl max-h-screen overflow-y-auto transform animate-modal dark:bg-slate-800/95 border border-cyan-200/50 dark:border-blue-800/50">
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gradient-to-br from-cyan-400 via-blue-400 to-indigo-400 rounded-2xl shadow-lg">
                      <User className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                      {editingStudent ? 'Edit Student' : 'Add New Student'}
                    </h2>
                  </div>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setEditingStudent(null);
                    }}
                    className="p-3 hover:bg-gray-100 rounded-2xl transition-all duration-300 hover:scale-110 dark:hover:bg-slate-700"
                  >
                    <XCircle className="w-7 h-7 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>

                <div className="space-y-8">
                  {/* Student Type Selection */}
                  <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-slate-700/50 dark:to-slate-600/50 p-6 rounded-2xl border border-cyan-200 dark:border-blue-700">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
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
                              className="w-5 h-5 text-cyan-600 focus:ring-cyan-500"
                            />
                            <span className="text-gray-700 dark:text-gray-300 font-medium">🏠 Local</span>
                          </label>
                          <label className="flex items-center space-x-3 cursor-pointer">
                            <input
                              type="radio"
                              name="studentType"
                              value="foreigner"
                              checked={formData.studentType === 'foreigner'}
                              onChange={(e) => setFormData(prev => ({ ...prev, studentType: e.target.value as 'local' | 'foreigner' }))}
                              className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-gray-700 dark:text-gray-300 font-medium">🌍 International</span>
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
                          className="w-full px-5 py-4 border-2 border-blue-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/70 backdrop-blur-sm dark:bg-slate-700/70 dark:border-blue-700 dark:text-white"
                        >
                          <option value="">Choose a course...</option>
                          <option value="basics">
                            Basics - {formData.studentType === 'local' ? '₹20,000' : '$100'}
                          </option>
                          <option value="advance">
                            Advance - {formData.studentType === 'local' ? '₹30,000' : '$200'}
                          </option>
                          <option value="pro">
                            Pro - {formData.studentType === 'local' ? '₹40,000' : '$300'}
                          </option>
                        </select>
                      </div>
                    </div>

                    {/* Fee Structure Display */}
                    {formData.studentType && (
                      <div className="bg-white/60 dark:bg-slate-800/60 rounded-2xl p-5 border border-cyan-100 dark:border-blue-600">
                        <h4 className="font-bold text-gray-800 dark:text-white mb-4">
                          Fee Structure for {formData.studentType === 'local' ? 'Local' : 'International'} Students:
                        </h4>
                        <div className="grid grid-cols-3 gap-4">
                          {Object.entries(feeStructure[formData.studentType]).map(([course, fee]) => (
                            <div
                              key={course}
                              className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                                formData.course === course
                                  ? 'border-cyan-400 bg-cyan-50 dark:bg-cyan-900/20 dark:border-cyan-600'
                                  : 'border-gray-200 bg-gray-50 dark:bg-slate-700 dark:border-slate-600'
                              }`}
                            >
                              <div className="text-center">
                                <div className="font-bold text-gray-800 dark:text-white capitalize mb-2">{course}</div>
                                <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                                  {formData.studentType === 'local' ? `₹${fee.toLocaleString()}` : `${fee}`}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Personal Information */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-700/50 dark:to-slate-600/50 p-6 rounded-2xl border border-blue-200 dark:border-blue-700">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
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
                          className="w-full px-5 py-4 border-2 border-cyan-200 rounded-2xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 bg-white/70 backdrop-blur-sm dark:bg-slate-700/70 dark:border-blue-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
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
                          className="w-full px-5 py-4 border-2 border-blue-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/70 backdrop-blur-sm dark:bg-slate-700/70 dark:border-blue-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
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
                          className="w-full px-5 py-4 border-2 border-indigo-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white/70 backdrop-blur-sm dark:bg-slate-700/70 dark:border-blue-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
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
                          className="w-full px-5 py-4 border-2 border-cyan-300 rounded-2xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 bg-white/70 backdrop-blur-sm dark:bg-slate-700/70 dark:border-blue-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
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
                          className="w-full px-5 py-4 border-2 border-blue-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/70 backdrop-blur-sm dark:bg-slate-700/70 dark:border-blue-700 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-slate-700/50 dark:to-slate-600/50 p-6 rounded-2xl border border-indigo-200 dark:border-blue-700">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
                        <DollarSign className="w-5 h-5 text-white" />
                      </div>
                      <span>Payment Information</span>
                    </h3>
                    <div className="grid md:grid-cols-4 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                          Base Fee ({formData.studentType === 'local' ? '₹' :''})
                        </label>
                        <input
                          type="number"
                          required
                          min="0"
                          value={formData.feeAmount}
                          readOnly
                          className="w-full px-5 py-4 border-2 border-gray-300 rounded-2xl bg-gray-100 dark:bg-slate-600 dark:border-slate-500 dark:text-white font-bold text-cyan-700 dark:text-cyan-400"
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
                          className="w-full px-5 py-4 border-2 border-green-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 bg-white/70 backdrop-blur-sm dark:bg-slate-700/70 dark:border-blue-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                          placeholder="0"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                          Final Amount ({formData.studentType === 'local' ? '₹' : ''})
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
                          Amount Paid ({formData.studentType === 'local' ? '₹' :''})
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={formData.paidAmount}
                          onChange={(e) => setFormData(prev => ({ ...prev, paidAmount: e.target.value }))}
                          className="w-full px-5 py-4 border-2 border-blue-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/70 backdrop-blur-sm dark:bg-slate-700/70 dark:border-blue-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
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
                    {formData.finalAmount && formData.paidAmount && (
                      <div className="mt-6 p-5 bg-white/60 dark:bg-slate-800/60 rounded-2xl border border-cyan-200 dark:border-blue-700">
                        <div className="flex justify-between items-center text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                          <span>Payment Progress</span>
                          <span className="text-lg text-cyan-700 dark:text-cyan-400">
                            {Math.round((Number(formData.paidAmount) / Number(formData.finalAmount)) * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-600">
                          <div
                            className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 h-4 rounded-full transition-all duration-500 shadow-sm"
                            style={{ width: `${Math.min((Number(formData.paidAmount) / Number(formData.finalAmount)) * 100, 100)}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
                          <span className="font-semibold text-cyan-700 dark:text-cyan-400">
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
                        onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                        className="w-full px-5 py-4 border-2 border-blue-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/70 backdrop-blur-sm dark:bg-slate-700/70 dark:border-blue-700 dark:text-white"
                      >
                        <option value="pending">Pending</option>
                        <option value="partial">Partial Payment</option>
                        <option value="paid">Fully Paid</option>
                        <option value="overdue">Overdue</option>
                      </select>
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-slate-700/50 dark:to-slate-600/50 p-6 rounded-2xl border border-purple-200 dark:border-blue-700">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
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
                        className="w-full px-5 py-4 border-2 border-purple-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 h-32 resize-none bg-white/70 backdrop-blur-sm dark:bg-slate-700/70 dark:border-blue-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder="Add notes about student progress, payment arrangements, or any special considerations..."
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t-2 border-gradient-to-r from-cyan-200 to-indigo-200 dark:border-blue-700">
                    <button
                      onClick={handleSubmit}
                      disabled={submitLoading}
                      className="flex-1 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 text-white py-5 px-8 rounded-2xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {submitLoading ? (
                        <>
                          <Loader2 className="w-6 h-6 animate-spin" />
                          <span className="text-lg">{editingStudent ? 'Updating Student...' : 'Adding Student...'}</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-6 h-6" />
                          <span className="text-lg">{editingStudent ? 'Update Student' : 'Add Student'}</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setShowForm(false);
                        setEditingStudent(null);
                      }}
                      disabled={submitLoading}
                      className="px-8 py-5 border-3 border-gray-300 text-gray-700 dark:text-gray-300 rounded-2xl font-bold hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none dark:border-slate-600 text-lg"
                    >
                      Cancel
                    </button>
                  </div>
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
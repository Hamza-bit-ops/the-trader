'use client'
import React, { useState, useEffect } from 'react';
import { PlusCircle, Search, Filter, Edit, Trash2, Phone, Mail, DollarSign, Clock, CheckCircle, XCircle, AlertCircle, User, Calendar, BookOpen, Loader2 } from 'lucide-react';

interface Student {
  _id: string;
  id?: number;
  name: string;
  email: string;
  phone: string;
  course: string;
  feeAmount: number;
  paidAmount: number;
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
    course: '',
    feeAmount: '',
    paidAmount: '',
    status: 'pending',
    enrollmentDate: '',
    notes: ''
  });

  // Load students data
  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/students");
      if (res.ok) {
        const data = await res.json();
        setStudents(data);
      } else {
        console.error('Failed to fetch students');
        // For demo purposes, using sample data
        setStudents([
          {
            _id: '1',
            name: 'Ahmed Khan',
            email: 'ahmed@example.com',
            phone: '+92-300-1234567',
            course: 'Beginner Forex Course',
            feeAmount: 25000,
            paidAmount: 15000,
            status: 'partial',
            enrollmentDate: '2024-01-15',
            notes: 'Excellent progress in technical analysis'
          },
          {
            _id: '2',
            name: 'Sarah Ali',
            email: 'sarah@example.com',
            phone: '+92-301-2345678',
            course: 'Advanced Strategies',
            feeAmount: 35000,
            paidAmount: 35000,
            status: 'paid',
            enrollmentDate: '2024-02-01',
            notes: 'Completed all modules successfully'
          },
          {
            _id: '3',
            name: 'Hassan Sheikh',
            email: 'hassan@example.com',
            phone: '+92-302-3456789',
            course: 'Complete Trading Bootcamp',
            feeAmount: 50000,
            paidAmount: 0,
            status: 'pending',
            enrollmentDate: '2024-02-15',
            notes: 'New student, very enthusiastic'
          }
        ]);
      }
    } catch (error) {
      console.error('Error loading students:', error);
      // Using sample data for demo
      setStudents([
        {
          _id: '1',
          name: 'Ahmed Khan',
          email: 'ahmed@example.com',
          phone: '+92-300-1234567',
          course: 'Beginner Forex Course',
          feeAmount: 25000,
          paidAmount: 15000,
          status: 'partial',
          enrollmentDate: '2024-01-15',
          notes: 'Excellent progress in technical analysis'
        },
        {
          _id: '2',
          name: 'Sarah Ali',
          email: 'sarah@example.com',
          phone: '+92-301-2345678',
          course: 'Advanced Strategies',
          feeAmount: 35000,
          paidAmount: 35000,
          status: 'paid',
          enrollmentDate: '2024-02-01',
          notes: 'Completed all modules successfully'
        },
        {
          _id: '3',
          name: 'Hassan Sheikh',
          email: 'hassan@example.com',
          phone: '+92-302-3456789',
          course: 'Complete Trading Bootcamp',
          feeAmount: 50000,
          paidAmount: 0,
          status: 'pending',
          enrollmentDate: '2024-02-15',
          notes: 'New student, very enthusiastic'
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
    if (!formData.course.trim()) {
      alert("Course selection is required");
      return false;
    }
    if (!formData.feeAmount || Number(formData.feeAmount) <= 0) {
      alert("Valid fee amount is required");
      return false;
    }
    if (!formData.enrollmentDate) {
      alert("Enrollment date is required");
      return false;
    }
    
    const paidAmount = Number(formData.paidAmount) || 0;
    const feeAmount = Number(formData.feeAmount);
    if (paidAmount > feeAmount) {
      alert("Paid amount cannot exceed total fee amount");
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
      };

      if (editingStudent) {
        // Update existing student
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
        // Create new student
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

      // Reset form
      setShowForm(false);
      setEditingStudent(null);
      setFormData({
        name: "",
        email: "",
        phone: "",
        course: "",
        feeAmount: "",
        paidAmount: "",
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
      course: student.course,
      feeAmount: student.feeAmount.toString(),
      paidAmount: student.paidAmount.toString(),
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
      case 'paid': return 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800';
      case 'partial': return 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800';
      case 'pending': return 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800';
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600';
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
      student.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: students.length,
    paid: students.filter(s => s.status === 'paid').length,
    pending: students.filter(s => s.status === 'pending').length,
    partial: students.filter(s => s.status === 'partial').length,
    totalRevenue: students.reduce((sum, s) => sum + s.paidAmount, 0),
    pendingRevenue: students.reduce((sum, s) => sum + (s.feeAmount - s.paidAmount), 0)
  };

  // Auto-calculate payment status based on paid amount
  useEffect(() => {
    if (formData.feeAmount && formData.paidAmount) {
      const fee = Number(formData.feeAmount);
      const paid = Number(formData.paidAmount);
      
      if (paid >= fee) {
        setFormData(prev => ({ ...prev, status: 'paid' }));
      } else if (paid > 0) {
        setFormData(prev => ({ ...prev, status: 'partial' }));
      } else {
        setFormData(prev => ({ ...prev, status: 'pending' }));
      }
    }
  }, [formData.feeAmount, formData.paidAmount]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 lg:p-6 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 lg:p-8 mb-8 border border-white/20 dark:bg-gray-800/80 dark:border-gray-700/50">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <div className="mb-6 lg:mb-0">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Student Management
                </h1>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-lg">Manage your forex academy students and track payments efficiently</p>
            </div>
            <button
              onClick={() => {
                setShowForm(true);
                setEditingStudent(null);
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  course: '',
                  feeAmount: '',
                  paidAmount: '',
                  status: 'pending',
                  enrollmentDate: '',
                  notes: ''
                });
              }}
              className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-3 group"
            >
              <PlusCircle className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              <span>Add New Student</span>
            </button>
          </div>

          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-6">
            {[
              { label: 'Total Students', value: stats.total, icon: User, color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
              { label: 'Paid', value: stats.paid, icon: CheckCircle, color: 'from-emerald-500 to-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
              { label: 'Pending', value: stats.pending, icon: AlertCircle, color: 'from-orange-500 to-orange-600', bg: 'bg-orange-50 dark:bg-orange-900/20' },
              { label: 'Partial', value: stats.partial, icon: Clock, color: 'from-amber-500 to-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20' },
              { label: 'Total Revenue', value: `₹${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'from-purple-500 to-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
              { label: 'Pending Revenue', value: `₹${stats.pendingRevenue.toLocaleString()}`, icon: DollarSign, color: 'from-pink-500 to-pink-600', bg: 'bg-pink-50 dark:bg-pink-900/20' }
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={stat.label}
                  className={`${stat.bg} p-6 rounded-2xl border border-white/40 hover:shadow-lg transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 dark:border-gray-600/30`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center mb-4`}>
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
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 mb-8 border border-white/20 dark:bg-gray-800/80 dark:border-gray-700/50">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm dark:bg-gray-700/50 dark:border-gray-600 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-12 pr-8 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm dark:bg-gray-700/50 dark:border-gray-600 dark:text-white"
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
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden dark:bg-gray-800/80 dark:border-gray-700/50">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              <span className="ml-3 text-gray-600 dark:text-gray-300">Loading students...</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50/80 to-blue-50/80 border-b border-gray-200/50 dark:from-gray-700/50 dark:to-gray-600/50 dark:border-gray-600/50">
                  <tr>
                    <th className="text-left py-6 px-6 font-bold text-gray-700 dark:text-gray-200">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>Student</span>
                      </div>
                    </th>
                    <th className="text-left py-6 px-6 font-bold text-gray-700 dark:text-gray-200">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="w-4 h-4" />
                        <span>Course</span>
                      </div>
                    </th>
                    <th className="text-left py-6 px-6 font-bold text-gray-700 dark:text-gray-200">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4" />
                        <span>Payment</span>
                      </div>
                    </th>
                    <th className="text-left py-6 px-6 font-bold text-gray-700 dark:text-gray-200">Status</th>
                    <th className="text-left py-6 px-6 font-bold text-gray-700 dark:text-gray-200">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
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
                      className="border-b border-gray-100/50 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-all duration-300 dark:border-gray-700/50 dark:hover:from-gray-700/30 dark:hover:to-gray-600/30"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <td className="py-6 px-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            {student.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-bold text-gray-800 dark:text-white text-lg">{student.name}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center space-x-1 mt-1">
                              <Mail className="w-3 h-3" />
                              <span>{student.email}</span>
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center space-x-1">
                              <Phone className="w-3 h-3" />
                              <span>{student.phone}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-6 px-6">
                        <div className="text-sm font-semibold text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg inline-block">
                          {student.course}
                        </div>
                      </td>
                      <td className="py-6 px-6">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-1 text-emerald-600 font-bold dark:text-emerald-400">
                            <DollarSign className="w-4 h-4" />
                            <span>₹{student.paidAmount.toLocaleString()}</span>
                          </div>
                          <div className="text-gray-600 dark:text-gray-300 text-sm">
                            of ₹{student.feeAmount.toLocaleString()}
                          </div>
                          <div className="w-24 bg-gray-200 rounded-full h-2 dark:bg-gray-600">
                            <div
                              className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full transition-all duration-1000 shadow-sm"
                              style={{ width: `${Math.min((student.paidAmount / student.feeAmount) * 100, 100)}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {Math.round((student.paidAmount / student.feeAmount) * 100)}% paid
                          </div>
                        </div>
                      </td>
                      <td className="py-6 px-6">
                        <span className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(student.status)}`}>
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
                            className="p-3 text-blue-600 hover:bg-blue-100 rounded-xl transition-all duration-300 hover:scale-110 dark:text-blue-400 dark:hover:bg-gray-700 group"
                            title="Edit Student"
                          >
                            <Edit className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                          </button>
                          <button
                            onClick={() => handleDelete(student._id)}
                            className="p-3 text-red-600 hover:bg-red-100 rounded-xl transition-all duration-300 hover:scale-110 dark:text-red-400 dark:hover:bg-gray-700 group"
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
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl w-full max-w-3xl max-h-screen overflow-y-auto transform animate-modal dark:bg-gray-800/95 border border-white/20 dark:border-gray-700/50">
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      {editingStudent ? 'Edit Student' : 'Add New Student'}
                    </h2>
                  </div>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setEditingStudent(null);
                    }}
                    className="p-3 hover:bg-gray-100 rounded-2xl transition-all duration-300 hover:scale-110 dark:hover:bg-gray-700"
                  >
                    <XCircle className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>

                <div className="space-y-8">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center space-x-2">
                      <User className="w-5 h-5" />
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
                          className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm dark:bg-gray-700/50 dark:border-gray-600 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                          placeholder="Enter full name"
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
                          className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm dark:bg-gray-700/50 dark:border-gray-600 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
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
                          className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm dark:bg-gray-700/50 dark:border-gray-600 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                          placeholder="+92-300-1234567"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                          Enrollment Date *
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.enrollmentDate}
                          onChange={(e) => setFormData(prev => ({ ...prev, enrollmentDate: e.target.value }))}
                          className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm dark:bg-gray-700/50 dark:border-gray-600 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Course Information */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center space-x-2">
                      <BookOpen className="w-5 h-5" />
                      <span>Course Information</span>
                    </h3>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                        Course *
                      </label>
                      <select
                        required
                        value={formData.course}
                        onChange={(e) => setFormData(prev => ({ ...prev, course: e.target.value }))}
                        className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm dark:bg-gray-700/50 dark:border-gray-600 dark:text-white"
                      >
                        <option value="">Select Course</option>
                        <option value="Beginner Forex Course">Beginner Forex Course - ₹25,000</option>
                        <option value="Advanced Strategies">Advanced Strategies - ₹35,000</option>
                        <option value="Live Trading Sessions">Live Trading Sessions - ₹30,000</option>
                        <option value="Complete Trading Bootcamp">Complete Trading Bootcamp - ₹50,000</option>
                        <option value="Risk Management Mastery">Risk Management Mastery - ₹20,000</option>
                        <option value="Technical Analysis Pro">Technical Analysis Pro - ₹40,000</option>
                      </select>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center space-x-2">
                      <DollarSign className="w-5 h-5" />
                      <span>Payment Information</span>
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                          Total Fee (₹) *
                        </label>
                        <input
                          type="number"
                          required
                          min="0"
                          value={formData.feeAmount}
                          onChange={(e) => setFormData(prev => ({ ...prev, feeAmount: e.target.value }))}
                          className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm dark:bg-gray-700/50 dark:border-gray-600 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                          placeholder="25000"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                          Paid Amount (₹)
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={formData.paidAmount}
                          onChange={(e) => setFormData(prev => ({ ...prev, paidAmount: e.target.value }))}
                          className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm dark:bg-gray-700/50 dark:border-gray-600 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                          placeholder="0"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                          Payment Status
                        </label>
                        <select
                          value={formData.status}
                          onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                          className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm dark:bg-gray-700/50 dark:border-gray-600 dark:text-white"
                        >
                          <option value="pending">Pending</option>
                          <option value="partial">Partial</option>
                          <option value="paid">Paid</option>
                          <option value="overdue">Overdue</option>
                        </select>
                      </div>
                    </div>

                    {/* Payment Progress Indicator */}
                    {formData.feeAmount && formData.paidAmount && (
                      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                        <div className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          <span>Payment Progress</span>
                          <span>{Math.round((Number(formData.paidAmount) / Number(formData.feeAmount)) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-600">
                          <div
                            className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min((Number(formData.paidAmount) / Number(formData.feeAmount)) * 100, 100)}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-1">
                          <span>₹{Number(formData.paidAmount).toLocaleString()} paid</span>
                          <span>₹{(Number(formData.feeAmount) - Number(formData.paidAmount)).toLocaleString()} remaining</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Additional Notes */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center space-x-2">
                      <AlertCircle className="w-5 h-5" />
                      <span>Additional Information</span>
                    </h3>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                        Notes & Comments
                      </label>
                      <textarea
                        value={formData.notes}
                        onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                        className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 h-32 resize-none bg-white/50 backdrop-blur-sm dark:bg-gray-700/50 dark:border-gray-600 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder="Add any additional notes about the student, their progress, or payment arrangements..."
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4 pt-6 border-t border-gray-200 dark:border-gray-600">
                    <button
                      onClick={handleSubmit}
                      disabled={submitLoading}
                      className="flex-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-4 px-8 rounded-2xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {submitLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>{editingStudent ? 'Updating...' : 'Adding...'}</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          <span>{editingStudent ? 'Update Student' : 'Add Student'}</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setShowForm(false);
                        setEditingStudent(null);
                      }}
                      disabled={submitLoading}
                      className="px-8 py-4 border-2 border-gray-300 text-gray-700 dark:text-gray-300 rounded-2xl font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none dark:border-gray-600"
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
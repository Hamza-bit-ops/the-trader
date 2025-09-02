'use client'
import React, { useState, useEffect } from 'react';
import { PlusCircle, Search, Filter, Edit, Trash2, Eye, Phone, Mail, DollarSign, Clock, CheckCircle, XCircle } from 'lucide-react';

interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  course: string;
  feeAmount: number;
  paidAmount: number;
  status: string;
  enrollmentDate: string;
  notes: string;
}

const StudentManagementSystem = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
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

  // Mock data for demonstration
  const mockStudents: Student[] = [
    {
      id: 1,
      name: 'Ali Ahmed',
      email: 'ali.ahmed@example.com',
      phone: '+92-300-1234567',
      course: 'Beginner Forex Course',
      feeAmount: 25000,
      paidAmount: 25000,
      status: 'paid',
      enrollmentDate: '2023-10-15',
      notes: 'Completed the course with excellent performance'
    },
    {
      id: 2,
      name: 'Sara Khan',
      email: 'sara.khan@example.com',
      phone: '+92-321-9876543',
      course: 'Advanced Strategies',
      feeAmount: 35000,
      paidAmount: 15000,
      status: 'partial',
      enrollmentDate: '2023-11-20',
      notes: 'Needs to pay remaining amount by next month'
    },
    {
      id: 3,
      name: 'Usman Malik',
      email: 'usman.malik@example.com',
      phone: '+92-333-4567890',
      course: 'Live Trading Sessions',
      feeAmount: 20000,
      paidAmount: 0,
      status: 'pending',
      enrollmentDate: '2023-12-05',
      notes: 'Will start next week'
    }
  ];

  // Load data from localStorage or use mock data
  useEffect(() => {
    const loadStudents = () => {
      try {
        const savedStudents = localStorage.getItem('students');
        if (savedStudents) {
          setStudents(JSON.parse(savedStudents));
        } else {
          setStudents(mockStudents);
          localStorage.setItem('students', JSON.stringify(mockStudents));
        }
      } catch (error) {
        console.error('Error loading students:', error);
        setStudents(mockStudents);
      }
    };

    loadStudents();
  }, []);

  // Save to localStorage whenever students change
  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.course || !formData.feeAmount || !formData.enrollmentDate) {
      alert("Please fill in all required fields");
      return;
    }

    const studentData = {
      ...formData,
      id: editingStudent ? editingStudent.id : students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1,
      feeAmount: Number(formData.feeAmount),
      paidAmount: Number(formData.paidAmount),
    };

    if (editingStudent) {
      // Update existing student
      setStudents(students.map(student => 
        student.id === editingStudent.id ? studentData : student
      ));
    } else {
      // Add new student
      setStudents([...students, studentData]);
    }

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
  };

  const handleEdit = (student: Student) => {
    setFormData({
      ...student,
      feeAmount: student.feeAmount.toString(),
      paidAmount: student.paidAmount.toString()
    });
    setEditingStudent(student);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      setStudents(students.filter(student => student.id !== id));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800 border-green-200';
      case 'partial': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'pending': return 'bg-red-100 text-red-800 border-red-200';
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="w-4 h-4" />;
      case 'partial': return <Clock className="w-4 h-4" />;
      case 'pending': return <XCircle className="w-4 h-4" />;
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent mb-2">
                Student Management
              </h1>
              <p className="text-foreground">Manage your forex academy students and track payments</p>
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
              className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 mt-4 md:mt-0"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Add Student</span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { label: 'Total Students', value: stats.total, icon: '👥', color: 'blue' },
              { label: 'Paid', value: stats.paid, icon: '✅', color: 'green' },
              { label: 'Pending', value: stats.pending, icon: '⏳', color: 'red' },
              { label: 'Partial', value: stats.partial, icon: '⚠️', color: 'yellow' },
              { label: 'Total Revenue', value: `₹${stats.totalRevenue.toLocaleString()}`, icon: '💰', color: 'purple' },
              { label: 'Pending Revenue', value: `₹${stats.pendingRevenue.toLocaleString()}`, icon: '💸', color: 'orange' }
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="bg-gradient-to-br from-white to-gray-50 p-4 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 dark:from-gray-700 dark:to-gray-600 dark:border-gray-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className={`text-2xl font-bold text-${stat.color}-600 mb-1 dark:text-${stat.color}-400`}>{stat.value}</div>
                <div className="text-foreground text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground w-5 h-5" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden dark:bg-gray-800 dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200 dark:from-gray-700 dark:to-gray-600 dark:border-gray-500">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Student</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Course</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Payment</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Enrollment</th>
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => (
                  <tr
                    key={student.id}
                    className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 dark:border-gray-700 dark:hover:from-gray-700 dark:hover:to-gray-600"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full flex items-center justify-center text-white font-semibold">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">{student.name}</div>
                          <div className="text-sm text-foreground flex items-center space-x-1">
                            <Mail className="w-3 h-3" />
                            <span>{student.email}</span>
                          </div>
                          <div className="text-sm text-foreground flex items-center space-x-1">
                            <Phone className="w-3 h-3" />
                            <span>{student.phone}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm font-medium text-foreground">{student.course}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm">
                        <div className="flex items-center space-x-1 text-green-600 font-semibold dark:text-green-400">
                          <DollarSign className="w-3 h-3" />
                          <span>₹{student.paidAmount.toLocaleString()}</span>
                        </div>
                        <div className="text-foreground text-xs">
                          of ₹{student.feeAmount.toLocaleString()}
                        </div>
                        <div className="w-20 bg-gray-200 rounded-full h-1.5 mt-1 dark:bg-gray-600">
                          <div
                            className="bg-gradient-to-r from-green-500 to-green-600 h-1.5 rounded-full transition-all duration-500"
                            style={{ width: `${(student.paidAmount / student.feeAmount) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(student.status)}`}>
                        {getStatusIcon(student.status)}
                        <span className="capitalize">{student.status}</span>
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-foreground">
                      {new Date(student.enrollmentDate).toLocaleDateString('en-GB')}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(student)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-300 dark:text-blue-400 dark:hover:bg-gray-700"
                          title="Edit Student"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(student.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-300 dark:text-red-400 dark:hover:bg-gray-700"
                          title="Delete Student"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No students found</h3>
              <p className="text-foreground">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {/* Add/Edit Student Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-screen overflow-y-auto transform animate-modal dark:bg-gray-800">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                    {editingStudent ? 'Edit Student' : 'Add New Student'}
                  </h2>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setEditingStudent(null);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-300 dark:hover:bg-gray-700"
                  >
                    <XCircle className="w-6 h-6 text-foreground" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Student Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Enter full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="student@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="+92-300-1234567"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Course *
                      </label>
                      <select
                        required
                        value={formData.course}
                        onChange={(e) => setFormData(prev => ({ ...prev, course: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                        <option value="">Select Course</option>
                        <option value="Beginner Forex Course">Beginner Forex Course</option>
                        <option value="Advanced Strategies">Advanced Strategies</option>
                        <option value="Live Trading Sessions">Live Trading Sessions</option>
                        <option value="Complete Trading Bootcamp">Complete Trading Bootcamp</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Total Fee (₹) *
                      </label>
                      <input
                        type="number"
                        required
                        value={formData.feeAmount}
                        onChange={(e) => setFormData(prev => ({ ...prev, feeAmount: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="25000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Paid Amount (₹)
                      </label>
                      <input
                        type="number"
                        value={formData.paidAmount}
                        onChange={(e) => setFormData(prev => ({ ...prev, paidAmount: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Payment Status *
                      </label>
                      <select
                        required
                        value={formData.status}
                        onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                        <option value="pending">Pending</option>
                        <option value="partial">Partial</option>
                        <option value="paid">Paid</option>
                        <option value="overdue">Overdue</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Enrollment Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.enrollmentDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, enrollmentDate: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Notes
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 h-24 resize-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Additional notes about the student..."
                    />
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <button
                      onClick={handleSubmit}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                      {editingStudent ? 'Update Student' : 'Add Student'}
                    </button>
                    <button
                      onClick={() => {
                        setShowForm(false);
                        setEditingStudent(null);
                      }}
                      className="px-6 py-3 border border-gray-300 text-foreground rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 dark:border-gray-600 dark:hover:bg-gray-700"
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
          animation: modal 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default StudentManagementSystem;
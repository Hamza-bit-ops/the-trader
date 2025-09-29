"use client";
import React, { useState, useEffect, useMemo, useRef, ReactNode } from 'react';
import { Search, Filter, Edit, Trash2, Phone, Mail, DollarSign, Clock, CheckCircle, XCircle, AlertCircle, User, Calendar, BookOpen, Loader2, Star, TrendingUp, CreditCard, Percent, Upload, X, Camera, Save, UserPlus, Eye, EyeOff, Download, FileText, Lock } from 'lucide-react';

// Password Protection Component
const PasswordProtection = ({ children }: { children: ReactNode }) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate authentication process
    setTimeout(() => {
      if (password === 'gul-sher') {
        setIsAuthenticated(true);
      } else {
        setError('Incorrect password. Please try again.');
        setPassword(''); // Clear password field on error
      }
      setIsLoading(false);
    }, 800);
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/20 dark:bg-gray-800/90 dark:border-gray-700/50">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl">
              <Lock className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Secure Access Required
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Enter the password to access the student management system
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm dark:bg-gray-700/50 dark:border-gray-600 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 pr-12"
                placeholder="Enter your password"
                required
                autoComplete="off"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-xl">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-4 px-8 rounded-2xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Verifying...</span>
              </>
            ) : (
              <>
                <Lock className="w-5 h-5" />
                <span>Access System</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordProtection;

// Student Interface
// interface Student {
//   _id: string;
//   id?: number;
//   name: string;
//   email: string;
//   phone: string;
//   cnic: string;
//   studentType: 'local' | 'foreigner';
//   course: 'basics' | 'advance' | 'pro';
//   feeAmount: number;
//   paidAmount: number;
//   discount: number;
//   discountAmount: number;
//   finalAmount: number;
//   status: string;
//   enrollmentDate: string;
//   profilePicture?: string;
//   notes: string;
//   createdAt?: string;
//   updatedAt?: string;
// }

// // Main Student Management System Component
// const StudentManagementSystem = () => {
//   const [students, setStudents] = useState<Student[]>([]);
//   const [showForm, setShowForm] = useState(false);
//   const [showDetailModal, setShowDetailModal] = useState(false);
//   const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
//   const [editingStudent, setEditingStudent] = useState<Student | null>(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [courseFilter, setCourseFilter] = useState('all');
//   const [studentTypeFilter, setStudentTypeFilter] = useState('all');
//   const [loading, setLoading] = useState(false);
//   const [submitLoading, setSubmitLoading] = useState(false);
//   const [profilePreview, setProfilePreview] = useState<string>('');
//   const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
//   const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     cnic: '',
//     studentType: 'local' as 'local' | 'foreigner',
//     course: 'basics' as 'basics' | 'advance' | 'pro',
//     feeAmount: '',
//     paidAmount: '',
//     discount: '',
//     discountAmount: '',
//     finalAmount: '',
//     status: 'pending',
//     enrollmentDate: '',
//     profilePicture: '',
//     notes: ''
//   });

//   const feeStructure = useMemo(
//     () => ({
//       local: {
//         basics: 20000,
//         advance: 30000,
//         pro: 40000,
//       },
//       foreigner: {
//         basics: 100,
//         advance: 200,
//         pro: 300,
//       },
//     }),
//     []
//   );

//   // Load students data
//   useEffect(() => {
//     loadStudents();
//   }, []);

//   useEffect(() => {
//     const studentType = formData.studentType;
//     const course = formData.course;

//     if (!studentType || !course) return;

//     const baseFee = feeStructure[studentType][course] || 0;
//     const discountPercent = Number(formData.discount) || 0;
//     const discountAmount = (baseFee * discountPercent) / 100;
//     const finalAmount = baseFee - discountAmount;

//     const paidAmount = Number(formData.paidAmount) || 0;

//     let status = "pending";
//     if (paidAmount === finalAmount && finalAmount > 0) {
//       status = "paid";
//     } else if (paidAmount > 0 && paidAmount < finalAmount) {
//       status = "partial";
//     }

//     if (editingStudent && editingStudent.status === "paid" && paidAmount === finalAmount) {
//       status = "paid";
//     }

//     setFormData((prev) => ({
//       ...prev,
//       feeAmount: baseFee.toString(),
//       discountAmount: discountAmount.toString(),
//       finalAmount: finalAmount.toString(),
//       status,
//     }));
//   }, [formData.studentType, formData.course, formData.discount, formData.paidAmount, feeStructure, editingStudent]);

//   const loadStudents = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch("/api/students");
//       if (res.ok) {
//         const data = await res.json();
//         setStudents(data);
//       } else {
//         // Demo data with enhanced structure
//         setStudents([
//           {
//             _id: '1',
//             name: 'Ahmed Khan',
//             email: 'ahmed@example.com',
//             phone: '+92-300-1234567',
//             cnic: '12345-6789012-3',
//             studentType: 'local',
//             course: 'basics',
//             feeAmount: 20000,
//             paidAmount: 15000,
//             discount: 0,
//             discountAmount: 0,
//             finalAmount: 20000,
//             status: 'partial',
//             enrollmentDate: '2024-01-15',
//             profilePicture: '',
//             notes: 'Excellent progress in technical analysis'
//           },
//           {
//             _id: '2',
//             name: 'Sarah Ali',
//             email: 'sarah@example.com',
//             phone: '+92-301-2345678',
//             cnic: '12345-6789012-4',
//             studentType: 'local',
//             course: 'advance',
//             feeAmount: 30000,
//             paidAmount: 27000,
//             discount: 10,
//             discountAmount: 3000,
//             finalAmount: 27000,
//             status: 'paid',
//             enrollmentDate: '2024-02-01',
//             profilePicture: '',
//             notes: 'Completed all modules successfully'
//           },
//           {
//             _id: '3',
//             name: 'John Smith',
//             email: 'john@example.com',
//             phone: '+1-555-0123',
//             cnic: 'US-PASSPORT-789',
//             studentType: 'foreigner',
//             course: 'pro',
//             feeAmount: 300,
//             paidAmount: 0,
//             discount: 15,
//             discountAmount: 45,
//             finalAmount: 255,
//             status: 'pending',
//             enrollmentDate: '2024-03-10',
//             profilePicture: '',
//             notes: 'International student from USA'
//           }
//         ]);
//       }
//     } catch (error) {
//       console.error('Error loading students:', error);
//       setStudents([]);
//     }
//     setLoading(false);
//   };

//   // Handle profile picture upload
//   const handleProfilePictureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     if (!file.type.match(/^image\/(jpeg|jpg|png|gif|webp)$/)) {
//       alert('Please select a valid image file (JPEG, PNG, GIF, WebP)');
//       return;
//     }

//     if (file.size > 2 * 1024 * 1024) {
//       alert('Image size must be less than 2MB');
//       return;
//     }

//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const result = e.target?.result as string;
//       setFormData(prev => ({ ...prev, profilePicture: result }));
//       setProfilePreview(result);
//     };
//     reader.readAsDataURL(file);
//   };

//   const removeProfilePicture = () => {
//     setFormData(prev => ({ ...prev, profilePicture: '' }));
//     setProfilePreview('');
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   const validateForm = () => {
//     const errors = [];

//     if (!formData.name.trim()) errors.push("Student name is required");
//     if (!formData.email.trim()) errors.push("Email is required");
//     if (!formData.phone.trim()) errors.push("Phone number is required");
//     if (!formData.cnic.trim()) errors.push("CNIC/Passport is required");
//     if (!formData.studentType) errors.push("Student type is required");
//     if (!formData.course) errors.push("Course selection is required");
//     if (!formData.enrollmentDate) errors.push("Enrollment date is required");
//     const paidAmount = Number(formData.paidAmount) || 0;
//     const finalAmount = Number(formData.finalAmount);
//     if (paidAmount > finalAmount) errors.push("Paid amount cannot exceed the final amount");

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (formData.email && !emailRegex.test(formData.email)) {
//       errors.push("Please enter a valid email address");
//     }

//     if (errors.length > 0) {
//       alert("Please fix the following errors:\n\n" + errors.join("\n"));
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = async () => {
//     if (!validateForm()) return;
//     setSubmitLoading(true);
//     try {
//       const requestData = {
//         ...formData,
//         feeAmount: Number(formData.feeAmount) || 0,
//         paidAmount: Number(formData.paidAmount) || 0,
//         discount: Number(formData.discount) || 0,
//         discountAmount: Number(formData.discountAmount) || 0,
//         finalAmount: Number(formData.finalAmount) || 0,
//       };

//       if (editingStudent) {
//         const res = await fetch(`/api/students/${editingStudent._id}`, {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(requestData),
//         });
//         if (res.ok) {
//           const updatedStudent = await res.json();
//           setStudents(prev =>
//             prev.map(student =>
//               student._id === editingStudent._id ? updatedStudent : student
//             )
//           );
//           alert('Student updated successfully!');
//         } else {
//           const errorData = await res.json();
//           throw new Error(errorData.error || 'Failed to update student');
//         }
//       } else {
//         const res = await fetch("/api/students", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(requestData),
//         });
//         if (res.ok) {
//           const newStudent = await res.json();
//           setStudents(prev => [newStudent, ...prev]);
//           alert('Student added successfully!');
//         } else {
//           const errorData = await res.json();
//           throw new Error(errorData.error || 'Failed to create student');
//         }
//       }

//       resetForm();
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       alert(error instanceof Error ? error.message : 'An error occurred. Please try again.');
//     }
//     setSubmitLoading(false);
//   };

//   const resetForm = () => {
//     setShowForm(false);
//     setEditingStudent(null);
//     setProfilePreview('');
//     setFormData({
//       name: "",
//       email: "",
//       phone: "",
//       cnic: "",
//       studentType: "local",
//       course: "basics",
//       feeAmount: "",
//       paidAmount: "",
//       discount: "",
//       discountAmount: "",
//       finalAmount: "",
//       status: "pending",
//       enrollmentDate: "",
//       profilePicture: "",
//       notes: "",
//     });
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   const handleEdit = (student: Student) => {
//     setFormData({
//       name: student.name,
//       email: student.email,
//       phone: student.phone,
//       cnic: student.cnic,
//       studentType: student.studentType,
//       course: student.course,
//       feeAmount: student.feeAmount.toString(),
//       paidAmount: student.paidAmount.toString(),
//       discount: student.discount.toString(),
//       discountAmount: student.discountAmount.toString(),
//       finalAmount: student.finalAmount.toString(),
//       status: student.status,
//       enrollmentDate: student.enrollmentDate,
//       profilePicture: student.profilePicture || '',
//       notes: student.notes || ''
//     });
//     setProfilePreview(student.profilePicture || '');
//     setEditingStudent(student);
//     setShowForm(true);
//   };

//   const handleDelete = async (studentId: string) => {
//     if (!window.confirm("Are you sure you want to delete this student? This action cannot be undone.")) {
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetch(`/api/students/${studentId}`, {
//         method: "DELETE"
//       });
//       if (res.ok) {
//         setStudents(prev => prev.filter(student => student._id !== studentId));
//         alert('Student deleted successfully!');
//       } else {
//         throw new Error('Failed to delete student');
//       }
//     } catch (error) {
//       console.error('Error deleting student:', error);
//       alert('Failed to delete student. Please try again.');
//     }
//     setLoading(false);
//   };

//   const handleViewDetails = (student: Student) => {
//     setSelectedStudent(student);
//     setShowDetailModal(true);
//   };

//   const getStatusColor = (status: string) => {
//     switch (status.toLowerCase()) {
//       case 'paid': return 'bg-emerald-50 text-emerald-800 border border-emerald-300 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-700';
//       case 'partial': return 'bg-amber-50 text-amber-800 border border-amber-300 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-700';
//       case 'pending': return 'bg-slate-50 text-slate-700 border border-slate-200 dark:bg-slate-900/20 dark:text-slate-300 dark:border-slate-800';
//       case 'overdue': return 'bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800';
//       default: return 'bg-gray-50 text-gray-700 border border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600';
//     }
//   };

//   const getStatusIcon = (status: string) => {
//     switch (status.toLowerCase()) {
//       case 'paid': return <CheckCircle className="w-4 h-4" />;
//       case 'partial': return <Clock className="w-4 h-4" />;
//       case 'pending': return <AlertCircle className="w-4 h-4" />;
//       case 'overdue': return <XCircle className="w-4 h-4" />;
//       default: return <Clock className="w-4 h-4" />;
//     }
//   };

//   const filteredStudents = useMemo(() => students.filter(student => {
//     const searchTermLower = searchTerm.toLowerCase();
//     const matchesSearch = student.name.toLowerCase().includes(searchTermLower) ||
//       student.email.toLowerCase().includes(searchTermLower) ||
//       student.phone.includes(searchTerm) ||
//       student.cnic.toLowerCase().includes(searchTermLower);
//     const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
//     const matchesCourse = courseFilter === 'all' || student.course === courseFilter;
//     const matchesType = studentTypeFilter === 'all' || student.studentType === studentTypeFilter;
//     return matchesSearch && matchesStatus && matchesCourse && matchesType;
//   }), [students, searchTerm, statusFilter, courseFilter, studentTypeFilter]);

//   const stats = useMemo(() => {
//     const localStudents = students.filter(s => s.studentType === 'local');
//     const foreignStudents = students.filter(s => s.studentType === 'foreigner');

//     const localRevenue = localStudents.reduce((sum, s) => sum + (s.paidAmount || 0), 0);
//     const pendingLocalRevenue = localStudents.reduce((sum, s) => sum + Math.max(0, (s.finalAmount || 0) - (s.paidAmount || 0)), 0);

//     const foreignerRevenue = foreignStudents.reduce((sum, s) => sum + (s.paidAmount || 0), 0);
//     const pendingForeignerRevenue = foreignStudents.reduce((sum, s) => sum + Math.max(0, (s.finalAmount || 0) - (s.paidAmount || 0)), 0);

//     return {
//       total: students.length,
//       paid: students.filter(s => s.status === 'paid').length,
//       pending: students.filter(s => s.status === 'pending').length,
//       partial: students.filter(s => s.status === 'partial').length,
//       locals: localStudents.length,
//       foreigners: foreignStudents.length,
//       localRevenue,
//       pendingLocalRevenue,
//       foreignerRevenue,
//       pendingForeignerRevenue
//     };
//   }, [students]);

//   const formatCurrency = (amount: number | undefined | null, type: 'local' | 'foreigner') => {
//     const safeAmount = amount || 0;
//     return type === 'local' ? `PKR ${safeAmount.toLocaleString()}` : `$${safeAmount.toLocaleString()}`;
//   };

//   // Render the main system UI
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 lg:p-6 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 lg:p-8 mb-8 border border-slate-200/50 dark:bg-slate-800/90 dark:border-slate-700/50">
//           <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
//             <div className="mb-6 lg:mb-0">
//               <div className="flex items-center space-x-3 mb-4">
//                 <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl shadow-lg">
//                   <User className="w-8 h-8 text-white" />
//                 </div>
//                 <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
//                   Student Management
//                 </h1>
//               </div>
//               <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">Manage your trading academy students and track payments efficiently</p>
//             </div>
//             <button
//               onClick={() => {
//                 resetForm();
//                 setShowForm(true);
//               }}
//               className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-3 group"
//             >
//               <UserPlus className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
//               <span>Add New Student</span>
//             </button>
//           </div>

//           {/* Stats Grid */}
//           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 lg:gap-6">
//             {[
//               { label: 'Total Students', value: stats.total, icon: User, color: 'from-blue-500 to-blue-600' },
//               { label: 'Paid', value: stats.paid, icon: CheckCircle, color: 'from-emerald-500 to-emerald-600' },
//               { label: 'Pending', value: stats.pending, icon: AlertCircle, color: 'from-slate-500 to-slate-600' },
//               { label: 'Partial', value: stats.partial, icon: Clock, color: 'from-amber-500 to-amber-600' }
//             ].map((stat, index) => {
//               const IconComponent = stat.icon;
//               return (
//                 <div
//                   key={stat.label}
//                   className="bg-white/50 dark:bg-slate-800/50 p-4 lg:p-6 rounded-2xl border border-slate-200/50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
//                 >
//                   <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center mb-3 lg:mb-4 shadow-md`}>
//                     <IconComponent className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
//                   </div>
//                   <div className="text-xl lg:text-2xl xl:text-3xl font-bold text-gray-800 dark:text-white mb-1">{stat.value}</div>
//                   <div className="text-gray-600 dark:text-gray-300 text-xs lg:text-sm font-medium">{stat.label}</div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Simple table view - truncated for space */}
//         <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-200/50 overflow-hidden dark:bg-slate-800/90 dark:border-slate-700/50">
//           {loading ? (
//             <div className="flex items-center justify-center py-20">
//               <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
//               <span className="ml-3 text-gray-600 dark:text-gray-300 font-medium">Loading students...</span>
//             </div>
//           ) : (
//             <div className="p-6">
//               <div className="text-center">
//                 <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Student Data Protected</h2>
//                 <p className="text-gray-600 dark:text-gray-300">
//                   Student management system is now password protected. Only authorized users can access student information.
//                 </p>
//                 <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
//                   <p className="text-sm text-green-700 dark:text-green-300">
//                     ✅ Password protection active - Access requires authentication every session
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };


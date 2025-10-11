// components/StudentApplicationForm.tsx
'use client';
import React, { useState } from 'react';
import { Send, User, Mail, Phone, CreditCard, BookOpen, CheckCircle, Loader2 } from 'lucide-react';



type StudentType = "local" | "foreigner";
type CourseType = "basics" | "advance" | "pro";

interface StudentFormData {
    name: string;
    email: string;
    phone: string;
    cnic: string;
    studentType: StudentType;
    course: CourseType;
    status?: string;
}

const StudentApplicationForm = () => {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);


    const [formData, setFormData] = useState<StudentFormData>({
        name: "",
        email: "",
        phone: "",
        cnic: "",
        studentType: "local",
        course: "basics",
        status: 'pending',
    });

    const courseInfo = {
        local: {
            basics: { name: 'Basics Course', fee: 'PKR 20,000', duration: '4 weeks' },
            advance: { name: 'Advance Course', fee: 'PKR 30,000', duration: '6 weeks' },
            pro: { name: 'Pro Course', fee: 'PKR 40,000', duration: '8 weeks' }
        },
        foreigner: {
            basics: { name: 'Basics Course', fee: '$100', duration: '4 weeks' },
            advance: { name: 'Advance Course', fee: '$200', duration: '6 weeks' },
            pro: { name: 'Pro Course', fee: '$300', duration: '8 weeks' }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/students-the', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setSubmitted(true);
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    cnic: '',
                    studentType: 'local',
                    course: 'basics'
                });
            } else {
                throw new Error('Failed to submit application');
            }
        } catch (_error) {
            alert('Error submitting application. Please try again.');
        }

        setLoading(false);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-12 h-12 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Application Submitted!</h2>
                    <p className="text-gray-600 mb-6">
                        Thank you for applying! Our admin team will review your application and contact you soon with payment details.
                    </p>
                    <button
                        onClick={() => setSubmitted(false)}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                        Submit Another Application
                    </button>
                </div>
            </div>
        );
    }

    const selectedCourse = courseInfo[formData.studentType][formData.course];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 lg:p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-4">
                        Th3 Trad3rs Consultancy
                    </h1>
                    <p className="text-xl text-gray-600 font-medium">Student Application Form</p>
                    <p className="text-gray-500 mt-2">Apply now !</p>
                </div>

                {/* Application Form */}
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-slate-200/50">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Student Type Selection */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200">
                            <label className="block text-sm font-bold text-gray-700 mb-4">
                                Student Type *
                            </label>
                            <div className="flex gap-4">
                                <label className="flex-1 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="studentType"
                                        value="local"
                                        checked={formData.studentType === 'local'}
                                        onChange={(e) => setFormData(prev => ({ ...prev, studentType: e.target.value as 'local' | 'foreigner' }))}
                                        className="peer sr-only"
                                    />
                                    <div className="p-4 border-2 border-gray-200 rounded-xl peer-checked:border-blue-500 peer-checked:bg-blue-50 transition-all duration-300 text-center">
                                        <div className="font-bold text-gray-800">Local Student</div>
                                        <div className="text-sm text-gray-600 mt-1">Pakistan</div>
                                    </div>
                                </label>
                                <label className="flex-1 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="studentType"
                                        value="foreigner"
                                        checked={formData.studentType === 'foreigner'}
                                        onChange={(e) => setFormData(prev => ({ ...prev, studentType: e.target.value as 'local' | 'foreigner' }))}
                                        className="peer sr-only"
                                    />
                                    <div className="p-4 border-2 border-gray-200 rounded-xl peer-checked:border-purple-500 peer-checked:bg-purple-50 transition-all duration-300 text-center">
                                        <div className="font-bold text-gray-800">International</div>
                                        <div className="text-sm text-gray-600 mt-1">Other Countries</div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Personal Information */}
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200">
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <User className="w-5 h-5 text-green-600" />
                                Personal Information
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Full Name *
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-800 placeholder-gray-400"
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Email Address *
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-800 placeholder-gray-400"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Phone Number *
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="tel"
                                            required
                                            value={formData.phone}
                                            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-800 placeholder-gray-400"
                                            placeholder="+92-300-1234567"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        CNIC / Passport *
                                    </label>
                                    <div className="relative">
                                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            required
                                            value={formData.cnic}
                                            onChange={(e) => setFormData(prev => ({ ...prev, cnic: e.target.value }))}
                                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-800 placeholder-gray-400"
                                            placeholder={formData.studentType === 'local' ? '12345-6789012-3' : 'PASSPORT-123'}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Course Selection */}
                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-200">
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-amber-600" />
                                Select Your Course
                            </h3>
                            <div className="grid md:grid-cols-3 gap-4 mb-4">
                                {Object.entries(courseInfo[formData.studentType]).map(([key, info]) => (
                                    <label key={key} className="cursor-pointer">
                                        <input
                                            type="radio"
                                            name="course"
                                            value={key}
                                            checked={formData.course === key}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                setFormData((prev) => ({ ...prev, course: e.target.value as CourseType }))
                                            }
                                            className="peer sr-only"
                                        />
                                        <div className="p-4 border-2 border-gray-200 rounded-xl peer-checked:border-amber-500 peer-checked:bg-amber-50 transition-all duration-300 hover:shadow-md">
                                            <div className="font-bold text-gray-800 capitalize mb-2">{info.name}</div>
                                            <div className="text-2xl font-bold text-amber-600 mb-1">{info.fee}</div>
                                            <div className="text-sm text-gray-600">{info.duration}</div>
                                        </div>
                                    </label>
                                ))}
                            </div>

                            {/* Selected Course Info */}
                            <div className="bg-white/60 p-4 rounded-xl border border-amber-100">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600 font-medium">Selected Course:</span>
                                    <span className="font-bold text-amber-600 capitalize">{selectedCourse.name}</span>
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-gray-600 font-medium">Course Fee:</span>
                                    <span className="font-bold text-green-600">{selectedCourse.fee}</span>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-4 px-8 rounded-2xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                        <span>Submitting Application...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-6 h-6" />
                                        <span>Submit Application</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Footer Note */}
                <div className="text-center mt-6 text-gray-600">
                    <p className="text-sm">
                        After submission, our admin team will contact you with payment details and further instructions.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default StudentApplicationForm;
"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { mentorData } from "@/lib/data/mock-mentors";
import { ArrowLeft, Star, MapPin, Calendar, Mail, Clock, CheckCircle, Building2, Briefcase } from "lucide-react";
import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import Input from "@/components/ui/input";
import { motion } from "framer-motion";

export default function MentorProfilePage() {
  const params = useParams();
  const router = useRouter();
  const mentor = mentorData.find((m) => m.id === params.id);

  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [bookingSent, setBookingSent] = useState(false);

  if (!mentor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Mentor not found</p>
      </div>
    );
  }

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setEmailSent(true);
      setTimeout(() => {
        setEmailSent(false);
        setIsEmailModalOpen(false);
      }, 2000);
    }, 1000);
  };

  const handleBookSession = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setBookingSent(true);
      setTimeout(() => {
        setBookingSent(false);
        setIsBookingModalOpen(false);
      }, 2000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-6 transition-colors"
        >
          <ArrowLeft size={18} /> Back to Mentors
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm sticky top-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-50 mb-4 shadow-md">
                  <img src={mentor.image} alt={mentor.name} className="w-full h-full object-cover" />
                </div>
                <h1 className="text-2xl font-bold text-slate-900">{mentor.name}</h1>
                <p className="text-slate-500 font-medium mt-1">{mentor.role}</p>
                <p className="text-slate-400 text-sm mt-1 flex items-center gap-1">
                   <Building2 size={12} /> {mentor.organization}
                </p>

                <div className="flex items-center gap-1 mt-3 bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-sm font-bold">
                  <Star size={14} className="fill-yellow-500 text-yellow-500" />
                  {mentor.rating} <span className="text-yellow-600/60 font-normal">({mentor.reviews} reviews)</span>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <Button 
                  onClick={() => setIsBookingModalOpen(true)}
                  className="w-full justify-center gap-2 h-12 text-base"
                >
                  <Calendar size={18} /> Book a Session
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsEmailModalOpen(true)}
                  className="w-full justify-center gap-2 h-12 text-base"
                >
                  <Mail size={18} /> Send Email
                </Button>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Availability</h3>
                <div className="flex flex-wrap gap-2">
                  {mentor.availability?.map((day) => (
                    <span key={day} className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-md border border-green-100">
                      {day}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-4">About Me</h2>
              <p className="text-slate-600 leading-relaxed">
                {mentor.bio}
              </p>
            </div>

            {/* Expertise Section */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Expertise</h2>
              <div className="flex flex-wrap gap-3">
                {mentor.expertise.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 rounded-lg bg-slate-50 text-slate-700 font-medium border border-slate-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Session Details */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
               <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
               
               <h2 className="text-xl font-bold mb-2 relative z-10">1:1 Mentorship Session</h2>
               <p className="text-blue-100 mb-6 max-w-lg relative z-10">
                 Get personalized guidance on your career, resume review, or mock interview preparation.
               </p>
               
               <div className="flex items-center gap-6 relative z-10">
                 <div>
                    <p className="text-blue-200 text-xs font-bold uppercase tracking-wider">Rate</p>
                    <p className="text-2xl font-bold">{mentor.hourlyRate}</p>
                 </div>
                 <div className="h-8 w-px bg-white/20" />
                 <div>
                    <p className="text-blue-200 text-xs font-bold uppercase tracking-wider">Duration</p>
                    <p className="text-2xl font-bold">60 min</p>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Modal */}
      <Modal isOpen={isEmailModalOpen} onClose={() => setIsEmailModalOpen(false)} size="md">
        <div className="p-6">
          {emailSent ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Email Sent!</h3>
              <p className="text-slate-500 mt-2">Your message has been sent to {mentor.name}.</p>
            </div>
          ) : (
            <>
              <h3 className="text-xl font-bold text-slate-900 mb-1">Send a Message</h3>
              <p className="text-slate-500 text-sm mb-6">Send a direct email to {mentor.name}.</p>
              
              <form onSubmit={handleSendEmail} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                  <Input placeholder="e.g. Inquiry about mentorship" inputProps={{ required: true }} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                  <textarea 
                    className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary min-h-[120px]"
                    placeholder="Write your message here..."
                    required
                  />
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <Button type="button" variant="ghost" onClick={() => setIsEmailModalOpen(false)}>Cancel</Button>
                  <Button type="submit">Send Message</Button>
                </div>
              </form>
            </>
          )}
        </div>
      </Modal>

      {/* Booking Modal */}
      <Modal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} size="md">
        <div className="p-6">
          {bookingSent ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Request Sent!</h3>
              <p className="text-slate-500 mt-2">Your session request has been sent to {mentor.name}.</p>
            </div>
          ) : (
            <>
              <h3 className="text-xl font-bold text-slate-900 mb-1">Book a Session</h3>
              <p className="text-slate-500 text-sm mb-6">Schedule a 1:1 meeting with {mentor.name}.</p>
              
              <form onSubmit={handleBookSession} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Select Date</label>
                  <Input type="date" inputProps={{ required: true }} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Select Time</label>
                  <Input type="time" inputProps={{ required: true }} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Topic</label>
                  <Input placeholder="e.g. Resume Review" inputProps={{ required: true }} />
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <Button type="button" variant="ghost" onClick={() => setIsBookingModalOpen(false)}>Cancel</Button>
                  <Button type="submit">Confirm Booking</Button>
                </div>
              </form>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}

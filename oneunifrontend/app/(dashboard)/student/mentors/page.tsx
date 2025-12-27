"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MentorCard } from "@/components/student/mentors/MentorCard";
import { mentorData } from "@/lib/data/mock-mentors";
import { Search, Sparkles, Users, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import Select from "@/components/ui/select";

const FILTERS = ["All", "Engineering", "Product", "Design", "Data Science", "Marketing"];

const SORT_OPTIONS = [
  { label: "Recommended", value: "recommended" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Highest Rated", value: "rating_desc" },
];

export default function MentorsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recommended");

  const filteredMentors = mentorData.filter((mentor) => {
    const matchesFilter = activeFilter === "All" || mentor.role.includes(activeFilter) || mentor.expertise.some(e => e.includes(activeFilter));
    const matchesSearch = 
        mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.organization.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === "price_asc") {
      return parseInt(a.hourlyRate.replace(/[^0-9]/g, '')) - parseInt(b.hourlyRate.replace(/[^0-9]/g, ''));
    }
    if (sortBy === "price_desc") {
      return parseInt(b.hourlyRate.replace(/[^0-9]/g, '')) - parseInt(a.hourlyRate.replace(/[^0-9]/g, ''));
    }
    if (sortBy === "rating_desc") {
      return b.rating - a.rating;
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 px-8 py-12 md:px-12 md:py-16 mb-10 shadow-xl">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-60 h-60 bg-white/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/90 text-sm font-medium mb-6 backdrop-blur-sm border border-white/20 shadow-sm">
                <Sparkles size={14} className="text-yellow-300" />
                <span>New Mentors Added Weekly</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
                Master Your Career <br/> with <span className="text-blue-200">Expert Guidance</span>
              </h1>
              
              <p className="text-blue-100 text-lg md:text-xl max-w-xl leading-relaxed">
                Book 1:1 sessions with mentors from top companies and universities to accelerate your growth.
              </p>
            </div>

            {/* Right Side Decoration */}
            <div className="hidden lg:block relative">
               <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-2xl -rotate-6 flex items-center justify-center border border-white/20 shadow-2xl">
                  <Users size={48} className="text-white" />
               </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col gap-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                {/* Search Bar */}
                <div className="relative w-full md:max-w-lg">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <Search size={20} />
                    </div>
                    <input 
                        type="text" 
                        placeholder="Search mentors, roles, companies..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                    />
                </div>

                {/* Sort Dropdown */}
                <div className="w-full md:w-64 z-20">
                    <Select
                        options={SORT_OPTIONS}
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        placeholder="Sort by"
                        leftIcon={<SlidersHorizontal size={16} />}
                    />
                </div>
            </div>

            {/* Filter Chips */}
            <div className="flex gap-2 overflow-x-auto pb-2 w-full no-scrollbar">
                {FILTERS.map((filter) => (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={cn(
                            "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border",
                            activeFilter === filter
                                ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200"
                                : "bg-white text-slate-600 border-slate-200 hover:border-blue-200 hover:bg-blue-50"
                        )}
                    >
                        {filter}
                    </button>
                ))}
            </div>
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.length > 0 ? (
            filteredMentors.map((mentor, index) => (
            <motion.div
              key={mentor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <MentorCard
                id={mentor.id}
                name={mentor.name}
                role={mentor.role}
                organization={mentor.organization}
                image={mentor.image}
                expertise={mentor.expertise}
                rating={mentor.rating}
                reviews={mentor.reviews}
                hourlyRate={mentor.hourlyRate}
              />
            </motion.div>
          ))
          ) : (
            <div className="col-span-full text-center py-20">
                <p className="text-slate-500 text-lg">No mentors found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

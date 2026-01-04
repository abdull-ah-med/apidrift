export interface ProgramDetail {
  id: string;
  name: string;
  description: string;
  duration: string;
  creditHours: number;
  type: "BS" | "MS" | "PhD";
  department: string;
  overview: string;
  eligibility: string[];
  curriculum: {
    semester: string;
    courses: string[];
  }[];
  careerProspects: string[];
  feeStructure: {
    admissionFee: string;
    tuitionFeePerSemester: string;
    otherCharges: string;
  };
}

export const programDetails: Record<string, ProgramDetail> = {
  "bs-cs": {
    id: "bs-cs",
    name: "BS Computer Science",
    description: "A comprehensive program covering the fundamentals of computing, algorithms, and software development.",
    duration: "4 Years",
    creditHours: 134,
    type: "BS",
    department: "School of Electrical Engineering and Computer Science (SEECS)",
    overview: "The BS Computer Science program at NUST is designed to provide students with a strong foundation in both theoretical and practical aspects of computing. The curriculum covers a wide range of topics, including programming, data structures, algorithms, computer architecture, operating systems, and software engineering.",
    eligibility: [
      "Minimum 60% marks in SSC/O-Level",
      "Minimum 60% marks in HSSC/A-Level (Pre-Engineering/ICS)",
      "NUST Entrance Test (NET) qualification"
    ],
    curriculum: [
      {
        semester: "Semester 1",
        courses: ["Introduction to Computing", "Programming Fundamentals", "Calculus & Analytical Geometry", "English Composition", "Applied Physics"]
      },
      {
        semester: "Semester 2",
        courses: ["Object Oriented Programming", "Digital Logic Design", "Discrete Structures", "Communication Skills", "Linear Algebra"]
      },
      {
        semester: "Semester 3",
        courses: ["Data Structures & Algorithms", "Computer Organization & Assembly Language", "Multivariable Calculus", "Technical Writing", "University Elective I"]
      }
    ],
    careerProspects: [
      "Software Developer",
      "Data Scientist",
      "Systems Analyst",
      "Network Engineer",
      "AI Researcher"
    ],
    feeStructure: {
      admissionFee: "Rs. 35,000",
      tuitionFeePerSemester: "Rs. 120,000",
      otherCharges: "Rs. 15,000"
    }
  },
  "bs-se": {
    id: "bs-se",
    name: "BS Software Engineering",
    description: "Focuses on the systematic application of engineering principles to the development of software systems.",
    duration: "4 Years",
    creditHours: 136,
    type: "BS",
    department: "School of Electrical Engineering and Computer Science (SEECS)",
    overview: "The BS Software Engineering program emphasizes the software development lifecycle, quality assurance, and project management. Students learn to design, develop, and maintain large-scale software systems using modern tools and methodologies.",
    eligibility: [
      "Minimum 60% marks in SSC/O-Level",
      "Minimum 60% marks in HSSC/A-Level (Pre-Engineering/ICS)",
      "NUST Entrance Test (NET) qualification"
    ],
    curriculum: [
      {
        semester: "Semester 1",
        courses: ["Introduction to Computing", "Programming Fundamentals", "Calculus & Analytical Geometry", "English Composition", "Applied Physics"]
      },
      {
        semester: "Semester 2",
        courses: ["Object Oriented Programming", "Software Engineering", "Discrete Structures", "Communication Skills", "Linear Algebra"]
      }
    ],
    careerProspects: [
      "Software Engineer",
      "Quality Assurance Engineer",
      "Project Manager",
      "Full Stack Developer",
      "DevOps Engineer"
    ],
    feeStructure: {
      admissionFee: "Rs. 35,000",
      tuitionFeePerSemester: "Rs. 120,000",
      otherCharges: "Rs. 15,000"
    }
  },
  "bba": {
    id: "bba",
    name: "BBA (Hons)",
    description: "A premier business program designed to develop future leaders and entrepreneurs.",
    duration: "4 Years",
    creditHours: 132,
    type: "BS",
    department: "NUST Business School (NBS)",
    overview: "The BBA program at NBS provides a broad understanding of business functions, including marketing, finance, human resources, and operations. It focuses on developing analytical, leadership, and communication skills.",
    eligibility: [
      "Minimum 60% marks in SSC/O-Level",
      "Minimum 60% marks in HSSC/A-Level (Any Stream)",
      "NUST Entrance Test (NET) qualification"
    ],
    curriculum: [
      {
        semester: "Semester 1",
        courses: ["Principles of Management", "Microeconomics", "Business Mathematics", "English Composition", "Introduction to Psychology"]
      },
      {
        semester: "Semester 2",
        courses: ["Principles of Marketing", "Macroeconomics", "Business Statistics", "Communication Skills", "Financial Accounting"]
      }
    ],
    careerProspects: [
      "Marketing Executive",
      "Financial Analyst",
      "HR Specialist",
      "Business Consultant",
      "Entrepreneur"
    ],
    feeStructure: {
      admissionFee: "Rs. 35,000",
      tuitionFeePerSemester: "Rs. 140,000",
      otherCharges: "Rs. 15,000"
    }
  }
};

// Helper function to get program details with fallback for dummy data
export const getProgramDetails = (id: string): ProgramDetail => {
  if (programDetails[id]) {
    return programDetails[id];
  }
  
  // Fallback for other programs to ensure the page doesn't break
  return {
    id: id,
    name: id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    description: "Detailed information for this program is currently being updated. Please check back later.",
    duration: "4 Years",
    creditHours: 130,
    type: "BS",
    department: "NUST Department",
    overview: "This program offers a rigorous academic experience designed to prepare students for professional success in their chosen field. The curriculum is regularly updated to meet industry standards.",
    eligibility: [
      "Minimum 60% marks in SSC/O-Level",
      "Minimum 60% marks in HSSC/A-Level",
      "NUST Entrance Test (NET) qualification"
    ],
    curriculum: [
      {
        semester: "Year 1",
        courses: ["Foundation Course I", "Foundation Course II", "General Education I", "General Education II"]
      },
      {
        semester: "Year 2",
        courses: ["Core Course I", "Core Course II", "Core Course III", "Elective I"]
      }
    ],
    careerProspects: [
      "Industry Professional",
      "Researcher",
      "Consultant",
      "Academician"
    ],
    feeStructure: {
      admissionFee: "Rs. 35,000",
      tuitionFeePerSemester: "Rs. 115,000",
      otherCharges: "Rs. 15,000"
    }
  };
};

"use client";

interface Semester {
  semester: string;
  courses: string[];
}

interface CurriculumListProps {
  curriculum: Semester[];
}

export function CurriculumList({ curriculum }: CurriculumListProps) {
  return (
    <div className="space-y-6">
      {curriculum.map((sem, idx) => (
        <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden">
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
            <h4 className="font-bold text-primary">{sem.semester}</h4>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {sem.courses.map((course, cIdx) => (
              <div key={cIdx} className="flex items-center gap-3 text-text-body">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                <span className="font-medium">{course}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

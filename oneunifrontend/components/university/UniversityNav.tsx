"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { LayoutDashboard, GraduationCap, FileText, Coffee } from "lucide-react";
import { cn } from "@/lib/utils";

export function UniversityNav() {
  const pathname = usePathname();
  const params = useParams();
  const id = params?.id as string;

  const navItems = [
    {
      label: "Overview",
      href: `/student/university/${id}`,
      icon: LayoutDashboard,
      exact: true
    },
    {
      label: "Programs",
      href: `/student/university/${id}/programs`,
      icon: GraduationCap
    },
    {
      label: "Admissions & Fees",
      href: `/student/university/${id}/admissions`,
      icon: FileText
    },
    {
      label: "Campus Life",
      href: `/student/university/${id}/campus-life`,
      icon: Coffee
    }
  ];

  return (
    <div className="border-b border-slate-200 bg-white sticky top-0 z-20">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto scrollbar-none">
        <div className="flex gap-6 min-w-max">
          {navItems.map((item) => {
            const isActive = item.exact 
              ? pathname === item.href 
              : pathname.startsWith(item.href);
              
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-text-muted hover:text-text-body hover:border-slate-300"
                )}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { HiOutlineAcademicCap } from "react-icons/hi2";

interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  location: string;
  gpa?: string;
  courses?: string[];
}

const education: EducationItem[] = [
  {
    institution: "University of California, Irvine",
    degree: "Master of Computer Science",
    period: "Sept 2023 — Dec 2024",
    location: "Irvine, CA, USA",
    gpa: "4.0",
    courses: [
      "Cyber Security",
      "Parallel & Distributed Computing",
      "Artificial Intelligence",
      "Data Structures",
      "Algorithms",
      "Image Processing",
      "Machine Learning",
      "Deep Learning",
    ],
  },
  {
    institution: "Vellore Institute of Technology",
    degree: "B.Tech Computer Science and Engineering",
    period: "July 2016 — June 2020",
    location: "Vellore, India",
  },
];

export default function Education() {
  return (
    <SectionWrapper id="education">
      <h2 className="font-heading font-bold text-3xl md:text-4xl text-slate-dark section-heading">
        Education
      </h2>

      <div className="mt-10 space-y-6">
        {education.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-start gap-4">
              <div className="hidden sm:flex w-10 h-10 rounded-xl bg-azure-light text-azure items-center justify-center flex-shrink-0 mt-0.5">
                <HiOutlineAcademicCap className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <h3 className="font-heading font-semibold text-lg text-slate-dark">
                    {item.institution}
                  </h3>
                  <span className="text-xs text-slate-mid">{item.location}</span>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-sm text-azure font-medium">{item.degree}</p>
                  {item.gpa && (
                    <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-emerald-100 text-emerald-700">
                      GPA: {item.gpa}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-mid mt-1">{item.period}</p>

                {item.courses && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.courses.map((course) => (
                      <span
                        key={course}
                        className="px-2.5 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-600"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

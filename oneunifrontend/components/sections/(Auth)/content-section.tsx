export default function Content() {
  return (
    <>
      {/* Left Side - Brand Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#2563eb] relative overflow-hidden">
        <div className="absolute inset-0">{/* Placeholder for image */}</div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#2563eb] via-[#1e40af] to-[#1e3a8a] opacity-90" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-[60px] w-full">
          <div>
            <div className="flex items-center gap-[12px] mb-[8px]">
              <div className="w-[48px] h-[48px] bg-[#fbbf24] rounded-[12px] flex items-center justify-center">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="font-['Inter:Semi_Bold',sans-serif] text-[24px] text-white">
                EduPortal
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-[24px] max-w-[500px]">
            <h1 className="font-['Inter:Semi_Bold',sans-serif] text-[48px] text-white leading-[1.1] tracking-tight">
              Join the future of higher education
            </h1>
            <p className="font-['Inter:Regular',sans-serif] text-[18px] text-white/90 leading-[1.6]">
              Connect with thousands of students, access world-class resources,
              and shape your academic journey with our comprehensive learning
              platform.
            </p>

            {/* Features */}
            <div className="flex flex-col gap-[16px] mt-[16px]">
              <div className="flex items-center gap-[12px]">
                <div className="w-[24px] h-[24px] bg-[#fbbf24] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="font-['Inter:Regular',sans-serif] text-[16px] text-white">
                  Access to 10,000+ courses and resources
                </p>
              </div>
              <div className="flex items-center gap-[12px]">
                <div className="w-[24px] h-[24px] bg-[#fbbf24] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="font-['Inter:Regular',sans-serif] text-[16px] text-white">
                  Connect with students worldwide
                </p>
              </div>
              <div className="flex items-center gap-[12px]">
                <div className="w-[24px] h-[24px] bg-[#fbbf24] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="font-['Inter:Regular',sans-serif] text-[16px] text-white">
                  Track your academic progress
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="flex items-center gap-[48px] mt-[40px]">
            <div>
              <p className="font-['Inter:Semi_Bold',sans-serif] text-[32px] text-[#fbbf24]">
                50K+
              </p>
              <p className="font-['Inter:Regular',sans-serif] text-[14px] text-white/80">
                Active Students
              </p>
            </div>
            <div>
              <p className="font-['Inter:Semi_Bold',sans-serif] text-[32px] text-[#fbbf24]">
                200+
              </p>
              <p className="font-['Inter:Regular',sans-serif] text-[14px] text-white/80">
                Universities
              </p>
            </div>
            <div>
              <p className="font-['Inter:Semi_Bold',sans-serif] text-[32px] text-[#fbbf24]">
                95%
              </p>
              <p className="font-['Inter:Regular',sans-serif] text-[14px] text-white/80">
                Satisfaction Rate
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

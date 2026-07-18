import React from 'react'

const Text = () => {
  return (
   <>
  <div className="flex flex-col items-center justify-center text-center px-4 md:px-8">
  <div className="flex items-center gap-3 mb-4">
    <div className="h-1.5 w-10 bg-blue-300 rounded-md"></div>
    <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
      ATS Checker
    </h4>
  </div>

  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight max-w-3xl">
    Will Your Resume Make It Past the ATS Bots?
  </h1>

  <p className="mt-6 text-base sm:text-lg text-gray-600 max-w-2xl leading-7">
    75% of qualified candidates never make it to the interview stage because
    their resumes fail ATS scans. Don't be one of them. Upload your resume and
    find out if it will survive the digital gatekeepers in just 60 seconds.
  </p>
</div>
   </>
  )
}

export default Text
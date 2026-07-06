import React from 'react'

const Text = () => {
  return (
   <>
   <div className='flex flex-col items-center justify-center '>
   <div className='flex items-center '>
    <div className='h-1.5 w-10 bg-blue-300 rounded rounded-b-md'></div>
    <h4 className='text-2xl font-bold text-gray-800'>ATS Checker</h4>
   </div>
   <h1 className='text-5xl font-bold text-gray-800  text-center'>Will Your Resume Make It Past the ATS Bots?</h1>
   <p className='text-1xl text-gray-600 text-center'>75% of qualified candidates never make it to the interview stage because their resumes fail ATS scans. Don't be one of them. Upload your resume and find out if it will survive the digital gatekeepers in just 60 seconds.</p>
    </div>
   </>
  )
}

export default Text
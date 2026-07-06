

import React, { useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker?url";
import { useNavigate } from "react-router-dom";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const Card = () => {
  const fileRef = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    fileRef.current.click();
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type === "application/pdf") {
      readPDF(file);
    } else {
      alert("Only PDF allowed");
    }
  };

  // ✅ FIXED PDF READER
  const readPDF = async (file) => {
    const reader = new FileReader();

    reader.onload = async () => {
      const typedArray = new Uint8Array(reader.result);
      const pdf = await pdfjsLib.getDocument(typedArray).promise;

      let text = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();

        content.items.forEach((item) => {
          text += item.str + " ";
        });
      }

      // 🔥 CLEAN TEXT (IMPORTANT FIX)
      text = text.replace(/\s+/g, " ").trim();

      sendToAI(text);
    };

    reader.readAsArrayBuffer(file);
  };

  // ✅ FIXED API CALL
  const sendToAI = async (text) => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();

      console.log("✅ AI RESPONSE:", data);

      if (data.error) {
        alert(data.details || "AI Error");
        return;
      }

      // 🔥 FINAL SAFETY FIX (IMPORTANT FOR BLANK SUMMARY ISSUE)
      const safeData = {
        ...data,
        score: Number(data.score) || 0,
        summary:
          data.summary && data.summary.trim()
            ? data.summary
            : "Resume needs improvement in structure and ATS optimization.",
        weak_points: Array.isArray(data.weak_points)
          ? data.weak_points
          : [],
        improvements: Array.isArray(data.improvements)
          ? data.improvements
          : [],
        missing_keywords: Array.isArray(data.missing_keywords)
          ? data.missing_keywords
          : [],
        suggestions: Array.isArray(data.suggestions)
          ? data.suggestions
          : [],
      };

      navigate("/dashboard", {
        state: safeData,
      });
    } catch (err) {
      console.log(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">

      <div className="bg-white border rounded-lg shadow-md p-8 w-[400px] text-center">

        <h1 className="text-2xl font-bold mb-3">
          Upload Your Resume
        </h1>

        <p className="text-gray-600 mb-5">
          AI ATS Checker
        </p>

        <div
          onClick={handleClick}
          className="bg-blue-600 text-white p-3 rounded-full flex items-center justify-center gap-2 cursor-pointer"
        >
          <AiOutlineCloudUpload />
          <span>Upload PDF</span>
        </div>

        <input
          type="file"
          ref={fileRef}
          onChange={handleChange}
          className="hidden"
          accept=".pdf"
        />

        {loading && (
          <p className="mt-4 text-blue-600 font-semibold">
            Analyzing Resume...
          </p>
        )}

      </div>
    </div>
  );
};

export default Card;
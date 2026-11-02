import DashboardLayout from "../layouts/DashboardLayout";

import {
  UploadCloud,
  FileText,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResumeUpload = () => {

  const navigate = useNavigate();

  const userInfo = JSON.parse(
    localStorage.getItem(
      "userInfo"
    )
  );

  const [resumeData,
    setResumeData] =
    useState(null);

  const [loading,
    setLoading] =
    useState(false);

  const [uploadError, setUploadError] = useState("");

  // FETCH SAVED RESUME
  useEffect(() => {

    fetchResume();

  }, []);

  const fetchResume =
    async () => {

      try {

        const response =
          await axios.get(
            `${import.meta.env.VITE_API_URL}/api/resume/${userInfo._id}`,
            {
              headers: {
                Authorization: `Bearer ${userInfo.token}`,
              },
            }
          );

        setResumeData(
          response.data.resume
        );

      } catch (error) {

        setUploadError(
          error.response?.data?.message || "Could not load your saved resume."
        );

      }

    };

  // UPLOAD RESUME
  const handleUpload =
    async (e) => {

      try {

        const file =
          e.target.files[0];

        if (!file) return;

        setLoading(true);
        setUploadError("");

        // READ FILE TEXT
       const formData =
  new FormData();

formData.append(
  "resume",
  file
);

formData.append(
  "userId",
  userInfo._id
);

const response =
  await axios.post(
    `${import.meta.env.VITE_API_URL}/api/resume/analyze`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
  );

        setResumeData(
          response.data.resume
        );

      } catch (error) {

        setUploadError(
          error.response?.data?.message || "Resume analysis failed. Please try again."
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <DashboardLayout>

      {/* HEADER */}
      <div className="mb-10">

        <h1 className="text-4xl font-bold mb-3">

          Resume Analysis

        </h1>

        <p className="text-gray-400">

          Upload your resume for AI-based interview generation.

        </p>

        {uploadError && (
          <p role="alert" className="mb-4 text-red-400">
            {uploadError}
          </p>
        )}

      </div>

      {/* UPLOAD BOX */}
      <div className="hover:scale-[1.02]
transition-all duration-300
hover:border-purple-500/50 border border-dashed border-purple-500 rounded-3xl p-16 flex flex-col items-center justify-center text-center">

        <div className="bg-purple-600/20 p-6 rounded-full mb-6">

          <UploadCloud
            size={50}
            className="text-purple-400"
          />

        </div>

        <h2 className="text-2xl font-semibold mb-3">

          Upload Resume

        </h2>

        <p className="text-gray-400 mb-8 max-w-md">

          Upload your resume and let AI generate personalized interview analysis.

        </p>

        <label className="bg-purple-600 hover:bg-purple-700 hover:scale-105 active:scale-95 px-6 py-3 rounded-2xl font-medium transition-all duration-300 cursor-pointer">

          {
            loading
              ? "Analyzing..."
              : "Choose File"
          }

          <input
            type="file"
            accept=".pdf,application/pdf"
            onChange={
              handleUpload
            }
            hidden
          />

        </label>

      </div>

      {/* SHOW ONLY IF RESUME EXISTS */}
      {resumeData && (

        <div className="grid grid-cols-2 gap-6 mt-10">

          {/* LEFT */}
          <div className="hover:scale-[1.02]
transition-all duration-300
hover:border-purple-500/50 rounded-3xl p-6 border border-gray-800">

            <div className="flex items-center gap-4 mb-6">

              <div className="bg-purple-600/20 p-4 rounded-2xl">

                <FileText className="text-purple-400" />

              </div>

              <div>

                <h2 className="text-xl font-semibold">

                  {
                    resumeData.fileName
                  }

                </h2>

                <p className="text-gray-400 text-sm">

                  Resume analyzed successfully. Your AI interviewer is ready.

                </p>

              </div>

            </div>

            <button
              type="button"
              onClick={() => navigate("/interview")}
              className="mt-6 bg-purple-600 hover:bg-purple-700 px-5 py-3 rounded-xl font-medium transition-colors"
            >
              Start Resume-Based Interview
            </button>

            {/* SKILLS */}
            <div className="flex flex-wrap gap-3">

              {resumeData.skills?.map(
                (
                  skill,
                  index
                ) => (

                  <span
                    key={index}
                    className="bg-purple-600/20 text-purple-300 px-4 py-2 rounded-full"
                  >

                    {skill}

                  </span>

                )
              )}

            </div>

            {/* FEEDBACK */}
            <div className="mt-8">

              <h3 className="font-semibold mb-2">

                AI Feedback

              </h3>

              <p className="text-gray-400 leading-7">

                {
                  resumeData.feedback
                }

              </p>

            </div>

          </div>

          {/* RIGHT */}
          <div className="hover:scale-[1.02]
transition-all duration-300
hover:border-purple-500/50 rounded-3xl p-6 border border-gray-800">

            <h2 className="text-2xl font-semibold mb-6">

              AI Analysis

            </h2>

            <div className="space-y-5">

              {/* TECH */}
              <div>

                <p className="text-gray-400 mb-2">

                  Technical Skills

                </p>

                <div className="w-full bg-[#1F2937] rounded-full h-3">

                  <div
                    className="bg-purple-600 h-3 rounded-full"
                    style={{
                      width: `${resumeData.analysis?.technical}%`,
                    }}
                  ></div>

                </div>

              </div>

              {/* COMMUNICATION */}
              <div>

                <p className="text-gray-400 mb-2">

                  Communication

                </p>

                <div className="w-full bg-[#1F2937] rounded-full h-3">

                  <div
                    className="bg-purple-600 h-3 rounded-full"
                    style={{
                      width: `${resumeData.analysis?.communication}%`,
                    }}
                  ></div>

                </div>

              </div>

              {/* PROJECTS */}
              <div>

                <p className="text-gray-400 mb-2">

                  Project Strength

                </p>

                <div className="w-full bg-[#1F2937] rounded-full h-3">

                  <div
                    className="bg-purple-600 h-3 rounded-full"
                    style={{
                      width: `${resumeData.analysis?.projects}%`,
                    }}
                  ></div>

                </div>

              </div>

            </div>

          </div>

        </div>

      )}

    </DashboardLayout>

  );

};

export default ResumeUpload;
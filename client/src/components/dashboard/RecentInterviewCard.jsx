import { useState } from "react";

const RecentInterviewCard = ({
  interviews,
}) => {

  const [
    selectedFeedback,
    setSelectedFeedback,
  ] = useState(null);

  return (

    <>

      <div className="hover:scale-[1.02]
transition-all duration-300
hover:border-purple-500/50 rounded-3xl p-6 border border-gray-800">

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-xl font-semibold">

            Recent Interviews

          </h2>

        </div>

        <div className="space-y-4">

          {interviews.length === 0 ? (

            <div className="text-gray-400 text-center py-10">

              No interviews yet

            </div>

          ) : (

            interviews.map(
              (item, index) => (

                <div
                  key={index}
                  className="flex items-center justify-between bg-[#0D1320] p-4 rounded-2xl"
                >

                  {/* LEFT */}
                  <div>

                    <h3 className="font-medium text-lg">

                    {item.role
  ? `${item.role} Interview`
  : "General Interview"}

                    </h3>

                    <p className="text-sm text-gray-400 mt-1">

                      {new Date(
                        item.createdAt
                      ).toLocaleDateString()}

                    </p>

                    <p className="text-xs text-purple-400 mt-1">

                      {item.type || "Technical"} •{" "}
                      {item.difficulty || "Medium"}

                    </p>

                  </div>

                  {/* RIGHT */}
                  <div className="flex items-center gap-4">

                    <button
                      onClick={() =>
                        setSelectedFeedback(
                          item.feedback
                        )
                      }
                      className="bg-purple-500/20 text-purple-400 px-4 py-2 rounded-xl text-sm hover:bg-purple-500/30 transition-all duration-300"
                    >

                      View Feedback

                    </button>

                    <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">

                      {item.score}%

                    </div>

                  </div>

                </div>

              )
            )

          )}

        </div>

      </div>

      {/* FEEDBACK MODAL */}
      {selectedFeedback && (

        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

          <div className="bg-[#111827] border border-gray-700 rounded-3xl p-8 w-[500px] max-w-[90%]">

            <h2 className="text-2xl font-bold mb-5">

              Interview Feedback

            </h2>

            <p className="text-gray-300 leading-7">

              {selectedFeedback}

            </p>

            <button
              onClick={() =>
                setSelectedFeedback(
                  null
                )
              }
              className="mt-8 bg-purple-600 hover:bg-purple-700 px-5 py-3 rounded-xl transition-all duration-300"
            >

              Close

            </button>

          </div>

        </div>

      )}

    </>

  );

};

export default RecentInterviewCard;
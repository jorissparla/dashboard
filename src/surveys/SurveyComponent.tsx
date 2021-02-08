import * as React from "react";
// import './survey.css';

interface Props {
  sent: number;
  responded: number;
  pct_satisfied: number;
  pct_dissatisfied: number;
  satisfied_feedback: number;
  dissatisfied_feedback: number;
  feedback_comments: number;
  pct_feedback_comments: number;
  uncategorized?: number;
  pct_uncategorized?: number;
}

export const SurveyComponent: React.FC<Props> = ({ sent, responded, pct_satisfied, satisfied_feedback, pct_feedback_comments }) => {
  const pct = Math.round((100 * responded) / sent);
  return (
    <div className="bg-gray-100 pt-2 ">
      <div className="max-w-screen-xl mx-auto px-4 ">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl leading-9 font-extrabold text-gray-900 ">Quick Satisfaction Survey Results</h2>
          {/* <p className="mt-3 text-xl leading-7 text-gray-500 ">
       Quick Satisfaction Survey Results
      </p> */}
        </div>
      </div>
      <div className="mt-10 pb-12 bg-white ">
        <div className="relative">
          <div className="absolute inset-0 h-1/2 bg-gray-100"></div>
          <div className="relative max-w-screen-xl mx-auto px-4  lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="rounded-lg bg-white shadow-lg flex items-center justify-between">
                <div className="border-r border-gray-200 p-6 text-center ">
                  <p className="text-5xl leading-none font-extrabold text-indigo-600">{sent}</p>
                  <p className="mt-2 text-lg leading-6 font-medium text-gray-500">Invitations Sent</p>
                </div>
                <div className="border-r border-gray-200 p-6 text-center ">
                  <p className="text-5xl leading-none font-extrabold text-indigo-600">{responded}</p>
                  <p className="mt-2 text-lg leading-6 font-medium text-gray-500">Responses</p>
                </div>
                <div className="border-r border-gray-200 p-6 text-center ">
                  <p className="text-5xl leading-none font-extrabold text-teal-600">{pct}%</p>
                  <p className="mt-2 text-lg leading-6 font-medium text-gray-500">Responded</p>
                </div>
                <div className="border-t border-r border-gray-100 p-6 text-center ">
                  <p className="text-5xl leading-none font-extrabold text-indigo-600">{pct_satisfied}%</p>
                  <p className="mt-2 text-lg leading-6 font-medium text-gray-500">Satisfied</p>
                </div>
                <div className="border-r border-gray-100 p-6 text-center ">
                  <p className="text-5xl leading-none font-extrabold text-indigo-600">{satisfied_feedback}</p>
                  <p className="mt-2 text-lg leading-6 font-medium text-gray-500">Satisfied feedback</p>
                </div>
                <div className="border-r border-gray-100 p-6 text-center ">
                  <p className="text-5xl leading-none font-extrabold text-indigo-600">{pct_feedback_comments}%</p>
                  <p className="mt-2 text-lg leading-6 font-medium text-gray-500">Left Comments</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

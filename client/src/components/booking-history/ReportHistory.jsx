/* eslint-disable react/prop-types */
import cross from "../../assets/svgs/icons/icon-cross.svg";
import axios from "axios";
import { SERVER_API_URL } from "../../core/config.mjs";
import { useState } from "react";

const ReportHistory = ({ showReport, setShowReport }) => {
  const [issue, setIssue] = useState("");
  const [description, setDescription] = useState("");

  if (!showReport) {
    return null;
  }
  const handleCancel = () => {
    setIssue("");
    setDescription("");
    setShowReport(false);
  };
  const handleIssueChange = (e) => {
    setIssue(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSend = async () => {
    try {
      // ส่งข้อมูลรายงานไปยัง API
      const response = await axios.post(`${SERVER_API_URL}/booking-history/report`, {
        issue,
        description,
      });

      if (response.status === 200) {
        console.log("Report submitted successfully:");
        setIssue("");
        setDescription("");
        setShowReport(false);
      }
    } catch (error) {
      console.error("Error submitting report:", error.message);
    }
  };

  return (
    <>
      <div className="bg-black fixed w-full  inset-0 bg-opacity-40  flex items-end justify-center md:items-center ">
        <div className="bg-white flex flex-col h-[512px] rounded-t-[16px] w-full md:w-[800px] md:h-[800px]  md:rounded-2xl  ">
          <div className="flex justify-between border-b-[1px]  p-4 md:h-[80px] md:items-center  md:py-6 md:px-10 ">
            <h4 className="text-[20px] leading-7 w-full text-gray-600 font-bold ">
              Report
            </h4>
            <img
              src={cross}
              className="w-[24px] h-[24px] cursor-pointer"
              onClick={() => setShowReport(false)}
              alt="Close"
            />
          </div>

          <div className="flex flex-col gap-[80px] pt-[40px] pr-[16px] pb-[24px] pl-[16px] md:p-[40px] md:h-full md:justify-between ">
            <div className="flex gap-4  flex-col w-full  ">
              <div className="flex gap-1 flex-col">
                <p className="text-[16px] leading-6">Issue</p>
                <input
                  name="issue"
                  type="text"
                  placeholder="Subject"
                  value={issue}
                  onChange={handleIssueChange}
                  className="flex gap-2 w-full py-3 pr-[16px] pl-[12px] rounded-lg border "
                />
              </div>
              <div className="flex gap-1 flex-col">
                <p className="text-[16px] leading-6 ">Description</p>
                <textarea
                  name="description"
                  type="text"
                  placeholder="Describe detail..."
                  value={description}
                  onChange={handleDescriptionChange}
                  className="flex gap-2 border py-3 pr-[16px] pl-[12px] h-[140px] "
                ></textarea>
              </div>
            </div>
            <div className="flex justify-between gap-4">
              <button
                className="w-[120px] h-[48px] rounded-[99px] py-3 px-6 flex justify-center gap-2 btn-secondary "
                onClick={handleCancel}
                aria-label="Cancel report"
              >
                Cancel
              </button>
              <button
                className="w-[207px] h-[48px] rounded-[99px] py-3 px-6 flex justify-center gap-2 btn-primary md:w-[141px] "
                onClick={handleSend}
                aria-label="Send report"
              >
                Send Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportHistory;

import React from "react";
import Symptoms from "../symptoms";

export default function SymptomsPage() {
  return (
    <div className="h-screen bg-gray-100">
      <div className="m-2 p-3 bg-white shadow-lg">
        <h1 className="font-bold text-blue-700 text-2xl">Decommission Notice</h1>
        <p>
          This page has been decommissioned. Please use the{" "}
          <a href="https://teams.microsoft.com/l/channel/19%3a2367f209266a46f390f822d150ec2366%40thread.tacv2/General?groupId=cec0cc2c-6684-4c4a-bed7-7b52ca738d58&tenantId=457d5685-0467-4d05-b23b-8f817adda47c">
            LN Symptom request channel
          </a>
        </p>
        <p className="text-sm">December 8th, 2020</p>
      </div>
    </div>
  );
}

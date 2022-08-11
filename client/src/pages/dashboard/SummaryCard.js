import React from "react";

export default function SummaryCard({ title, value, light }) {
  return (
    <div
      className={`summary-card container-flex container-vertical bg-${
        light ? `primary-light` : `primary`
      }`}
    >
      <p className="text-small title">{title}</p>
      <p className="text-medium text-center value">{value}</p>
    </div>
  );
}

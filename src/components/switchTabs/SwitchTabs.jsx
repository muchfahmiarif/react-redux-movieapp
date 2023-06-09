import React, { useState } from "react";
import "./SwitchTabs.scss";

const SwitchTabs = ({ data, onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setLeft] = useState(0);

  const activeTabHandler = (tab, index) => {
    setLeft(index * 100); // if index = 0, left = 0, if index = 1, left = 100
    setTimeout(() => {
      // set timeout to make animation smooth
      setSelectedTab(index);
    }, 300);
    onTabChange(tab, index);
  };

  return (
    <div className="switchingTabs">
      <div className="tabItems">
        {data.map((tab, index) => (
          <span
            key={index}
            className={`tabItem ${selectedTab === index ? "active" : ""}}`}
            onClick={() => {
              activeTabHandler(tab, index);
            }}>
            {tab}
          </span>
        ))}
        <span className="movingBg" style={{ left: left }}></span>
      </div>
    </div>
  );
};

export default SwitchTabs;

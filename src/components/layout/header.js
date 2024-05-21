import React, { useState } from "react";
import Modal from "../modal";

const Header = () => {
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  // eslint-disable-next-line
  const [statsValue, setStatsValue] = useState([0, 0, 0, 0]);
  // eslint-disable-next-line
  const [statsChart, setStatsChart] = useState([]);

  const statTopContents = [
    "GAMES PLAYED",
    "LONGEST STREAK",
    "CURRENT STREAK",
    "WIN PERCENTAGE",
  ];

  const instruction = [
    <>You get eight guesses, try any current NBA player!</>,
    <>
      <span className="green">Green in any column</span> indicates a match!
    </>,
    <>
      <span className="yellow">Yellow in any column</span> indicates this
      attribute is within 2 (inches, years, numbers) of the mystery player
    </>,
    <>
      Please note that player "AGE" is how old they were at the START of the
      season.
    </>,
    <>Refresh the page for a new player!</>,
  ];

  return (
    <div className="top-bar">
      <div>
        {/* <button
          onClick={() => {
            setShowStatsModal(true);
          }}
        >
          STATS
        </button> */}
        <Modal
          show={showStatsModal}
          setShow={setShowStatsModal}
          title="YOUR STATS"
          containerClassName="modal nopad"
        >
          <div className="stats">
            {statTopContents.map((item, index) => (
              <div>
                <h4>
                  {item.split(" ").map((word) => (
                    <>
                      {word} <br />
                    </>
                  ))}
                </h4>
                <p>
                  {statsValue[index]}
                  {index === 3 ? "%" : ""}
                </p>
              </div>
            ))}
          </div>
          <div className="distribution-chart">
            <h4>Guess Distribution</h4>
            {Array(8)
              .fill(0)
              .map((_, index) => (
                <div className={statsChart[index] ? "count" : "count none"}>
                  <div> {index + 1} </div>
                  <div className="bar-container">
                    <div className="bar" style={{ width: "7%" }}></div>
                    <div> {statsChart[index] ? statsChart[index] : "0"} </div>
                  </div>
                  <div></div>
                </div>
              ))}
          </div>
        </Modal>
      </div>
      <div>
        <button
          onClick={() => {
            setShowHowToPlay(true);
          }}
        >
          HOW TO PLAY
        </button>
        <Modal
          show={showHowToPlay}
          setShow={setShowHowToPlay}
          title="GUESS THE MYSTERY PLAYER!"
          containerClassName="modal"
        >
          <div className="how-to-play">
            <div className="container">
              <ul>
                {instruction.map((item, _index) => (
                  <li key={_index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Header;

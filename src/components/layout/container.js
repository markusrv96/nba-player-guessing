import React, { useState } from "react";
import Select, { components } from "react-select";
import { reducedDIV } from "../../utils";
import Modal from "../modal";
import Options from "../../database/options.json";
import QuestionMark from "../assets/question.png";

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <></>
    </components.DropdownIndicator>
  );
};

const Placeholder = (props) => {
  return <components.Placeholder {...props} />;
};

const ValueContainer = ({ children, ...props }) => (
  <components.ValueContainer {...props}>{children}</components.ValueContainer>
);
const Container = ({ randId, source }) => {
  const options = Options;
  const [selectedArray, setSelectedArray] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showSilhou, setShowSilhou] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const [resultGuess, setResultGuess] = useState(false);

  const tableHeader = ["", "TEAM", "CONF", "DIV", "POS", "HT", "AGE", "#"];

  return (
    <main>
      <div className="container">
        <Select
          defaultValue={selectedOption}
          value={selectedOption}
          onChange={(e) => {
            setSelectedOption(e.value);
            var tmp = selectedArray;
            if (parseInt(e.id) === randId && tmp.length <= 8) {
              setResultGuess(true);
              tmp.push(randId);
              setShowSilhou(true);
            } else if (tmp.length >= 8) {
              tmp.push(randId);
              if (parseInt(randId) === e.id) {
                setResultGuess(true);
              } else {
                setResultGuess(false);
              }
              setShowSilhou(true);
            } else {
              tmp.push(parseInt(e.id));
            }
            setSelectedArray(tmp);
          }}
          isDisabled={resultGuess || selectedArray.length >= 9}
          options={options}
          isSearchable
          components={{
            DropdownIndicator,
            Placeholder,
            ValueContainer,
          }}
          placeholder={
            resultGuess === true
              ? `You solved it in ${selectedArray.length}`
              : resultGuess === false && selectedArray.length >= 9
              ? "Game Over"
              : `Guess ${selectedArray.length} of 8`
          }
          styles={{
            valueContainer: (base) => ({
              ...base,
              padding: "10px",
              fontSize: "18px",
              fontWeight: "700",
              color: "black",
            }),
            container: (base) => ({
              ...base,
              color: "black",
            }),
          }}
          menuIsOpen={menuIsOpen}
          onInputChange={(e) => {
            if (e) {
              setMenuIsOpen(true);
            } else {
              setMenuIsOpen(false);
            }
          }}
        />
        <div>
          <div className="text-center">
            <button
              className="silhouette-toggle"
              onClick={() => {
                setShowSilhou(true);
              }}
            >
              {resultGuess === true || selectedArray.length >= 9
                ? "Show Result"
                : "Show Silhouette"}
            </button>
          </div>
          <Modal
            show={showSilhou}
            setShow={setShowSilhou}
            title=""
            containerClassName="modal"
          >
            <div className="text-center">
              <div
                className={
                  resultGuess === true || selectedArray.length >= 9
                    ? "mystery-image reveal"
                    : "mystery-image"
                }
              >
                <div
                  className="inner"
                  style={{
                    backgroundImage: `url("${source[randId]["Image Link"]}")`,
                  }}
                ></div>
                {resultGuess === true || selectedArray.length >= 9 ? (
                  <></>
                ) : (
                  <img alt="Question mark" src={QuestionMark} className="qm" />
                )}
              </div>
              <div
                className={
                  resultGuess === true
                    ? "result success"
                    : resultGuess === false && selectedArray.length >= 9
                    ? "result failed"
                    : "result"
                }
              >
                {resultGuess === true ? (
                  <>
                    <h3> Great Job! </h3>
                    <h2> {source[randId].PLAYER} </h2>
                    <h3> You solved it in {selectedArray.length} guesses </h3>
                    <br />
                    <button
                      className="silhouette-toggle"
                      onClick={() => {
                        window.location.reload();
                      }}
                      style={{
                        color: "var(--correct-color)",
                      }}
                    >
                      <h3> Play again </h3>
                    </button>
                  </>
                ) : resultGuess === false && selectedArray.length >= 9 ? (
                  <>
                    <h3> Sorry, the correct answer is </h3>
                    <h2> {source[randId].PLAYER} </h2>
                    <br />
                    <button
                      className="silhouette-toggle"
                      onClick={() => {
                        window.location.reload();
                      }}
                    >
                      <h3> Try again </h3>
                    </button>
                  </>
                ) : (
                  <>
                    <h3>Who is this</h3>
                    <h2> Mystery Player? </h2>
                  </>
                )}
              </div>
            </div>
          </Modal>
        </div>
      </div>
      <div className="container table-container">
        <div
          className="game-table"
          style={selectedArray.length < 1 ? { display: "none" } : {}}
        >
          <div className="game-table__head">
            <div className="game-table__row">
              {tableHeader.map((item, _index) => (
                <div key={_index} className="game-table__cell">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="game-table__body">
            {selectedArray.map((item, _index) => {
              console.log("Debug ====>", source[item].TEAM, source[randId]);
              var nameClassName =
                source[item].PLAYER === source[randId].PLAYER
                  ? "game-table__cell green"
                  : "game-table__cell";
              var teamClassName =
                source[item].TEAM?.toLowerCase() ===
                source[randId].TEAM?.toLowerCase()
                  ? "game-table__cell green"
                  : "game-table__cell";
              var confClassName =
                source[item].CONFERENCE === source[randId].CONFERENCE
                  ? "game-table__cell green"
                  : "game-table__cell";
              var diviClassName =
                source[item].DIVISION === source[randId].DIVISION
                  ? "game-table__cell green"
                  : "game-table__cell";
              var posClassName =
                source[item].POS === source[randId].POS
                  ? "game-table__cell green"
                  : source[item].POS.includes(source[randId].POS)
                  ? "game-table__cell yellow"
                  : "game-table__cell";
              var temp = source[item].HEIGHT.split("'");
              const htItem = parseFloat(
                parseFloat(temp[0]) * 30.48 + parseFloat(temp[1]) * 2.54
              );
              temp = source[randId].HEIGHT.split("'");
              const trueHtItem = parseFloat(
                parseFloat(temp[0]) * 30.48 + parseFloat(temp[1]) * 2.54
              );
              var HTClassName =
                htItem === trueHtItem
                  ? "game-table__cell green"
                  : htItem > trueHtItem - 5.08 && htItem < trueHtItem + 5.08
                  ? "game-table__cell yellow"
                  : "game-table__cell";
              const ageItem = parseInt(source[item].AGE);
              const trueAgeItem = parseInt(source[randId].AGE);
              var AgeClassName =
                ageItem === trueAgeItem
                  ? "game-table__cell green"
                  : ageItem >= trueAgeItem - 2 && ageItem <= trueAgeItem + 2
                  ? "game-table__cell yellow"
                  : "game-table__cell";
              const sharpItem = parseInt(source[item]["#"]);
              const trueSharpItem = parseInt(source[randId]["#"]);

              var sharpClassName =
                source[item]["#"] === source[randId]["#"]
                  ? "game-table__cell green"
                  : sharpItem >= trueSharpItem - 2 &&
                    sharpItem <= trueSharpItem + 2
                  ? "game-table__cell yellow"
                  : "game-table__cell";

              var rowClassName = "game-table__row";
              if (_index === 8 && resultGuess === false) {
                rowClassName = "game-table__row failed";
              } else if (
                _index === selectedArray.length - 1 &&
                resultGuess === true
              ) {
                rowClassName = "game-table__row correct";
              }

              return (
                <div key={_index} className={rowClassName}>
                  <div
                    className={nameClassName}
                    style={{ justifyContent: "space-between" }}
                  >
                    <div className="text" style={{ textAlign: "left" }}>
                      {source[item].PLAYER}
                    </div>
                    <img
                      src={source[item]["Image Link"]}
                      width={100}
                      alt="player"
                    />
                  </div>
                  <div className={teamClassName}>
                    <div>
                      <img
                        src={source[item]["Team Logo Link"]}
                        alt="team"
                        className="team-logo"
                        style={{
                          display: "block",
                          margin: "0px auto",
                          width: "100%",
                        }}
                      />
                      <div className="text"> {source[item].TEAM} </div>
                    </div>
                  </div>
                  <div className={confClassName}>
                    <div>
                      <div className="text"> {source[item].CONFERENCE} </div>
                    </div>
                  </div>
                  <div className={diviClassName}>
                    <div>
                      <div className="text">
                        {reducedDIV(source[item].DIVISION)}
                      </div>
                    </div>
                  </div>
                  <div className={posClassName}>
                    <div>
                      <div className="text"> {source[item].POS} </div>
                    </div>
                  </div>
                  <div className={HTClassName}>
                    <div>
                      <div className="text"> {source[item].HEIGHT}" </div>
                      {htItem !== trueHtItem ? (
                        <div className="dir">
                          {htItem < trueHtItem ? "↑" : "↓"}
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <div className={AgeClassName}>
                    <div>
                      <div className="text"> {source[item].AGE} </div>
                      {ageItem !== trueAgeItem ? (
                        <div className="dir">
                          {ageItem < trueAgeItem ? "↑" : "↓"}
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <div className={sharpClassName}>
                    <div>
                      <div className="text"> {source[item]["#"]} </div>
                      {sharpItem !== trueSharpItem ? (
                        <div className="dir">
                          {sharpItem < trueSharpItem ? "↑" : "↓"}
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Container;

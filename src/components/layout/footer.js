import React from "react";
const Footer = () => {
  return (
    <div className="footer-container">
      <footer className="text-center">
        <p>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://guesscentral.com/"
            className="logo"
          >
            <span> Brought to you by </span>
            <br />
            {/* <h4> NBA Quizzes.com </h4> */}
            <img
              src="/original_logo.png"
              height={24}
              style={{ marginTop: "8px" }}
              alt="logo"
            />
            <br />
          </a>
          <div className="terms_privacy">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://guesscentral.com/terms_conditions.html"
            >
              <span> Terms of Service </span>
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://guesscentral.com/privacy_policy.html"
            >
              <span> Privacy Policy </span>
            </a>
          </div>
        </p>
      </footer>
    </div>
  );
};

export default Footer;

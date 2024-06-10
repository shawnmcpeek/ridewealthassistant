import React from "react";
import "../../app3.scss";

function BugHelpSection({ onRender }) {
  React.useEffect(() => {
    onRender();
  }, [onRender]);
  return (
    <section className="bug-help-section">
      <h3>
        RWA would love to hear from you. Do you have a bug to report? Is there a
        feature you'd like to see? Just need help or just want to get in touch?
      </h3>
      <form action="https://formsubmit.co/shawnmcpeek@gmail.com" method="POST">
        <div className="input-group">
          <div className="input-row">
            <label>
              <span>Name:</span>
              <input
                className="input"
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                required
              />
            </label>
            <label>
              <span>Email:</span>
              <input
                className="input"
                type="email"
                id="email"
                name="email"
                placeholder="E-Mail"
                required
              />
            </label>
          </div>
          <div className="input-row">
            <label>
              <span>Subject:</span>
              <textarea
                className="input"
                id="subject"
                name="subject"
                placeholder="Subject"
                required
                rows="3" // Adjust the number of rows as needed
              ></textarea>
            </label>
          </div>
        </div>
        <button className="primary-button" type="submit">
          Send
        </button>
      </form>
    </section>
  );
}

export default BugHelpSection;

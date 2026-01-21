import { Footer } from "./sections/Footer";
import { Frame } from "./sections/Frame";
import { FrameWrapper } from "./sections/FrameWrapper";
import { Group } from "./sections/Group";
import "./style.css";

export const FrameScreen = () => {
  return (
    <div className="frame-screen">
      <Frame />
      <FrameWrapper />
      
      <section className="rocket-section">
        <img
          className="rocket-bg"
          alt="Rocket Background"
          src="https://c.animaapp.com/6PVGKTMi/img/group-427320681.png"
        />
        <img
          className="rocket-icon"
          alt="Rocket Launch"
          src="https://c.animaapp.com/6PVGKTMi/img/material-symbols-light-rocket-launch-outline.svg"
        />
      </section>

      <section className="contact-header" id="contact">
        <h2 className="contact-title">Contact Us</h2>
        <p className="contact-subtitle">
          Any question or remarks? Just write us a message!
        </p>
      </section>

      <Group />
      <Footer />
    </div>
  );
};

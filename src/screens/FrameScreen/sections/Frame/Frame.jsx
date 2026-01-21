import { useState } from "react";
import { BookingModal } from "../../../../components/BookingModal/BookingModal";
import "./style.css";

export const Frame = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);

  return (
    <div className="frame">
      <BookingModal isOpen={isBookingOpen} onClose={closeBooking} />
      
      <img
        className="nature"
        alt="Nature"
        src="https://c.animaapp.com/6PVGKTMi/img/nature-17.png"
      />

      <img
        className="img"
        alt="Group"
        src="https://c.animaapp.com/6PVGKTMi/img/group-890.png"
      />

      <div className="rectangle" />

      <div className="div" />

      <div className="rectangle-2" />

      <div className="rectangle-3" />

      <div className="rectangle-4" />

      <div className="rectangle-5" />

      <div className="rectangle-6" />

      <div className="rectangle-7" />

      <div className="rectangle-8" />

      <div className="rectangle-9" />

      <div className="rectangle-10" />

      <div className="rectangle-11" />

      <div className="heading">
        <div className="title-caption">
          <p className="from-idea-to-online">FROM IDEA TO ONLINE SUCCESS</p>
          <h1 className="hero-title">
            <span className="hero-title-dark">Complete Digital</span>{" "}
            <span className="hero-title-orange">Solutions</span>
          </h1>
        </div>

        <p className="text-wrapper">
          Accelerate your business growth with modern, scalable, and
          result-driven digital solutions.
        </p>
      </div>

      <div className="button-info">
        <div className="buttons">
          <button className="button" onClick={openBooking}>
            <div className="text-wrapper-2">Book a Call</div>
          </button>

          <button className="button-2">
            <div className="text-wrapper-3">How it works</div>

            <img
              className="icon"
              alt="Icon"
              src="https://c.animaapp.com/6PVGKTMi/img/icon.svg"
            />
          </button>
        </div>
      </div>

      <div className="navigation">
        <div className="div-2">
          <img
            className="img-2"
            alt="System Next IT Logo"
            src="https://c.animaapp.com/6PVGKTMi/img/frame-1000001802@4x.png"
          />

          <div className="menus">
            <div className="menu">
              <div className="text-wrapper-4">Services</div>

              <img
                className="expand-more"
                alt="Expand more"
                src="https://c.animaapp.com/6PVGKTMi/img/expand-more-1.svg"
              />
            </div>

            <div className="menu">
              <div className="text-wrapper-4">Features</div>

              <img
                className="expand-more"
                alt="Expand more"
                src="https://c.animaapp.com/6PVGKTMi/img/expand-more-1.svg"
              />
            </div>

            <div className="menu">
              <div className="text-wrapper-4">Company</div>
            </div>

            <div className="menu">
              <div className="text-wrapper-4">Pricing</div>
            </div>

            <div className="menu">
              <div className="text-wrapper-4">Help</div>
            </div>
          </div>

          <div className="buttons-2">
            <button className="button-3">
              <img
                className="carbon-language"
                alt="Carbon language"
                src="https://c.animaapp.com/6PVGKTMi/img/carbon-language.svg"
              />

              <div className="text-wrapper-3">বল</div>
            </button>

            <button className="button-3">
              <div className="text-wrapper-3">Sign in</div>
            </button>

            <button className="button" onClick={openBooking}>
              <div className="text-wrapper-2">Book a Call</div>
            </button>
          </div>
        </div>
      </div>

      <img
        className="element"
        alt="Element"
        src="https://c.animaapp.com/6PVGKTMi/img/6-6.png"
      />
    </div>
  );
};

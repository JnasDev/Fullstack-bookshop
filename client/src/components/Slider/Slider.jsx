import React from "react";
import "./Slider.scss";

// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const data = [
  "https://images.ctfassets.net/fzn2n1nzq965/5fDpKNFniFyecSqo6ExpRx/1b8cc1a1ac5464fc1acfd2d65689f661/Stripe_Bookshop_Thumbnail.jpg?fm=webp&q=80",
  "https://media.timeout.com/images/105754215/image.jpg",
  "https://images.squarespace-cdn.com/content/v1/5b20735b5417fc763b71fcd1/1602332253421-L5KPLZ7L2V83NZ1JL5TN/skylark11.jpg?format=1500w",
];

import { motion } from "framer-motion";

const Slider = ({ text }) => {
  const letters = Array.from(text);

  // Variants for Container
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
    }),
  };

  // Variants for each letter
  const child = {
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: -20,
      y: 10,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="slider">
      <div className="container">
        <Carousel
          responsive={responsive}
          className="Carousels"
          autoPlay={true}
          autoPlaySpeed={3000}
          infinite={true}
          showDots={false}
        >
          <div>
            <img src={data[0]} />
          </div>

          <div>
            <img src={data[1]} />
          </div>

          <div>
            <img src={data[2]} />
          </div>
        </Carousel>
        <div className="contain__frame_mo">
          <div className="frame_mo">
            <div className="container__first_text">
              <motion.div
                style={{
                  overflow: "hidden",
                  display: "flex",
                  fontSize: "2rem",
                }}
                variants={container}
                initial="hidden"
                animate="visible"
              >
                {letters.map((letter, index) => (
                  <motion.span
                    className="span_for_text"
                    variants={child}
                    key={index}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            <motion.div
              style={{ overflow: "hidden", display: "flex", fontSize: "2rem" }}
              variants={container}
              initial="hidden"
              animate="visible"
            >
              <motion.span className="span_text_2">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptatum atque maiores alias necessitatibus repellat libero
                  qui facilis deserunt inventore ad autem, similique, quis quo
                  ea at porro aliquam molestias, aut sint eaque. Molestiae
                  accusamus laudantium beatae facere mollitia, natus voluptates
                  nam neque illo ullam quasi, perferendis amet, deserunt a ab.
                </p>
              </motion.span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;

//Here I will include which technologies we used as well as who worked on this project

import React, { Component } from 'react';
import { motion } from 'framer-motion';
import Emoji from 'react-emoji-render';

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <motion.div
          transition={{ ease: 'easeOut', duration: 1 }}
          initial={{ opacity: 0 }}
          animate={{ x: [-100, 0], opacity: 1 }}
        >
          <h1>meet the team</h1>
          <div id="team">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: [0.9, 1.05] }}
            >
              <img src="https://cdn141.picsart.com/312232886042211.png" />
              <h2>Inderprit Sin(gh)s</h2>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: [0.9, 1.05] }}
            >
              <img src="https://lh3.googleusercontent.com/proxy/00mTaiz0wUeoSaN79z6drFNCqsqVUPGRLtYbYpeaQfWYw12zYLb3zeBb0hlbXrZ0yNlXahUWlh8dpXrDXeWBGOAfO0AsPSnB-UNPBYiCYx_Gj8i7cJBBE4qJwRD1wi8YEFrLZCs3aDldd64OeSeY5HxDr4OiQqZ7DqyfMMvxxwAopV7AwQ6XlY0" />
              <h2>Felicia Heiney</h2>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: [0.9, 1.05] }}
            >
              <img src="https://i.pinimg.com/originals/3a/5c/e8/3a5ce8ab71a201a08a0cab427be1462f.png" />
              <h2>Linda Laura</h2>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: [0.9, 1.05] }}
            >
              <img src="https://i.kym-cdn.com/photos/images/original/002/052/347/cd3.png" />
              <h2>Arjan Mitra</h2>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          transition={{ ease: 'easeOut', duration: 1 }}
          initial={{ opacity: 0 }}
          animate={{ x: [100, 0], opacity: 1 }}
        >
          <h1>meet the stack</h1>
          <div id="technologies">
            <img
              className="techPic"
              src="https://www.freecodecamp.org/news/content/images/2020/02/Ekran-Resmi-2019-11-18-18.08.13.png"
            />
            <img
              className="techPic"
              src="https://cdn.freebiesupply.com/logos/thumbs/2x/nodejs-1-logo.png"
            />
            <img
              className="techPic"
              src="https://upload.wikimedia.org/wikipedia/commons/4/49/Redux.png"
            />
            <img
              className="techPic"
              src="https://www.framer.com/images/social/motion.png"
            />
            <img
              className="techPic"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Oauth_logo.svg/598px-Oauth_logo.svg.png"
            />
            <img
              className="techPic"
              src="http://getpandaeats.com/stripe/assets/img/stripe.png"
            />
          </div>
        </motion.div>
      </div>
    );
  }
}

export default About;

//Here I will include which technologies we used as well as who worked on this project

import React, { Component } from "react";

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>a thanks from all our lovely devs</h1>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div>
            <img src="https://www.memesmonkey.com/images/memesmonkey/e1/e1d25ec2016a08a16e8e7a8a63f82ec1.jpeg" />
            <h2>Inderprit Singh</h2>
          </div>
          <div>
            <img
              src="https://m.media-amazon.com/images/I/61SNmu7Je-L._AC_SX466_.jpg"
              style={{ height: "60%" }}
            />
            <h2>Felicia Heiney</h2>
          </div>
          <div>
            <img src="https://i.pinimg.com/originals/3a/5c/e8/3a5ce8ab71a201a08a0cab427be1462f.png" />
            <h2>Linda Laura</h2>
          </div>
          <div>
            <img src="https://pbs.twimg.com/profile_images/1205636289871171584/2s9D1YQj.jpg" />
            <h2>Arjan Mitra</h2>
          </div>
        </div>

        <h1>technologies used</h1>
        <img src="https://www.freecodecamp.org/news/content/images/2020/02/Ekran-Resmi-2019-11-18-18.08.13.png" />
        <img src="https://cdn.freebiesupply.com/logos/thumbs/2x/nodejs-1-logo.png" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/4/49/Redux.png" />
        <img src="https://www.framer.com/images/social/motion.png" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Oauth_logo.svg/598px-Oauth_logo.svg.png" />
        <img src="http://getpandaeats.com/stripe/assets/img/stripe.png" />
      </div>
    );
  }
}

export default About;

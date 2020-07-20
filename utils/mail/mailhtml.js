
const { auth: { issuer } } = require('../../config');

module.exports = (code, expires) => {
  return `
  <style type="text/css">
    @media screen {
      @font-face {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
      }

      ...

      body, h1, h2, h3, h4, h5, h6, p {
        font-family: "Lato", "Lucida Grande", "Lucida Sans Unicode", Tahoma, Sans-Serif;
      }
    </style>
    <div style="text-align: center;">
      <img src="https://s3.wasabisys.com/noco-prod-5e443c238d2c4b00190ca350/2000b260-a97f-46e3-b2ed-3a34664e27c4.png" style="min-width: 100px; width: 20%; max-width: 400px;"/>
      <div style="text-align: left;">
        <p> Hi,</p>
        <p> Your code to log in to ${issuer} is</p>
        <h2> ${code} </h2>
        <p>It will expire in ${expires} minutes.</p>
      </div>
      <div style="margin-top:50px;">
        <p style="height: 25px;"> Sent By
          <a href="https://noco.io?utm_source=client email" style="margin-left: 4px; height: 15px;">
            <img src="https://s3.us-west-1.wasabisys.com/noco/logo.png" style="height: 15px;"/>
          </a>
        </p>

      </div>
    </div>
  `
}

import React from 'react';

import './footer.scss';

// &nbsp; => entité HTML, représente un espace insécable, on recommande au
// navigateur de ne pas sauter une ligne à cet endroit

const Footer = () => (
  <footer className="footer">
    <p>DevOfThrones, le blog du développeur React&nbsp;- 2020&nbsp;&copy;</p>
  </footer>
);

export default Footer;

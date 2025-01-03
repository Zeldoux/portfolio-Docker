import React from 'react';

import LogoSVG from '../Assets/LogoSVG';

function Profile() {
  return (
    <section className="profile section-container">
      <h2 className="title-banner">Yoann Sousa - Développeur Web</h2>
      <div className="profile-content">
        <div className="profile-text">
          
          <div className="profile-section">
            <h3 className="section-title">À propos de moi</h3>
            <p className="profile-description">
              Autodidacte passionné, je m’investis dans le développement web depuis plusieurs années. <br />
              Créatif et curieux, j’ai récemment suivi une formation certifiante sur OpenClassrooms 
              pour devenir Développeur Web. <br />
              Cette expérience m’a permis d’approfondir mes compétences techniques et de travailler sur 
              divers projets pratiques, dont certains sont présentés ci-dessous.<br />
            </p>
          </div>
          
          <div className="divider"></div>
          
          <div className="profile-section ">
            <h3 className="section-title">Expertise</h3>
            <p className="profile-description">
              Polyvalent, je maîtrise les technologies front-end comme Javascript et React et CSS, SCSS 
              ainsi que le back-end avec Node.js , express mais aussi la gestion de données avec MongoDB. et MySQL Je suis également familier avec 
              les pratiques DevOps et l’intégration continue.
            </p>
            <p className="profile-description mobile-hide">
              Mon approche consiste à allier technique et créativité pour transformer 
              des idées en solutions web modernes et performantes.
            </p>
          </div>
        </div>
        <div className="logo-container">
          <LogoSVG className="landing-logo" />
        </div>
      </div>
    </section>
  );
}

export default Profile;

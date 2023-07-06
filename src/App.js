class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <HeroSection />
        <AboutMeSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
      </div>
    );
  }
}

class Header extends React.Component {
  render() {
    return (
      <header id="header">
      {/*-------header title------*/}
      <div id="title" className="logo">
      <i className="fa-solid fa-bars menu-icon"></i>
      <h1>Sonu Shivcharan</h1>
    
      </div>
      {/*----navbar----*/}
      <div id="navbar">
      <ul className="nav-list">
      <li><a href="#about-me-section">About</a></li>
     <li><a href="#projects-section">Projects</a></li>
     <li> <a href="#contact-section">Contact</a></li>
      </ul>
      </div>
      
      </header>
    );
  }
}

class HeroSection extends React.Component {
  render() {
const Circles = (<div id="circle-container">
      <div className="circle circle1"></div>
      <div className="circle circle2"></div>
      <div className="circle circle3"></div>
      <div className="circle circle4"></div>
      </div>);
    return (
      <section id="hero-section">
    {Circles}
    <div>
      <h1>Hey I'm Sonu</h1>
      <p>A Web Developer</p>
      </div>
      </section>
    );
  }
}

class AboutMeSection extends React.Component {
  render() {
    return (
      <section id="about-me-section">
      <h2>About Me</h2>
      <div>
      
      </div>
      </section>
    );
  }
}

class SkillsSection extends React.Component {
  render() {
    return (
      <section id="skills-section">
        {/* Skills section content goes here */}
      </section>
    );
  }
}

class ProjectsSection extends React.Component {
  render() {
    return (
      <section id="projects-section">
        {/* Projects section content goes here */}
      </section>
    );
  }
}

class ContactSection extends React.Component {
  render() {
    return (
      <section id="contact-section">
        {/* Contact section content goes here */}
      </section>
    );
  }
}

class Footer extends React.Component {
  render() {
    return (
      <footer>
        {/* Footer content goes here */}
      </footer>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<App />);



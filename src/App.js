
class App extends React.Component {
  constructor(props){
      super(props);
      this.state={
        scrollTop:0,
        screenWidth:window.innerWidth,
        isNavOpen:false,
        openSharePanel:false,
        isContentLoaded:false,
        aboutMe:{},
        mySkills:{},
        projects:{},
        navBar:{}
      };
   }
  componentDidMount() {
      window.addEventListener("scroll", this.handleScroll);
      window.addEventListener("resize", this.handleResize);
  fetch("./src/data.json")
      .then((resp)=>resp.json())
      .then((data)=>{
        this.setState({
          isContentLoaded: true,
          aboutMe: data.aboutMe,
          mySkills: data.mySkills,
          projects: data.projects,
          contact : data.contact,
          navBar : data.navBar,
          socialProfiles:data.socialProfiles.profile
        });
        console.log("Data fetched Sucessfully");
      })
      .catch((err)=>console.log("falied to fetch", err));
      document.getElementById("footer").style.position="relative";
    }
  componentDidUpdate(prevProps, prevState){
      const getHeight=((name)=> document.getElementById(name).offsetHeight);
      if(prevState.aboutSectionHeight==null){
      this.setState({
        heroSectionHeight : getHeight("hero-section"),
        aboutSectionHeight: getHeight("about-me-section"),
        skillSectionHeight: getHeight("skills-section"),
        projectsSectionHeight: getHeight("projects-section"),
        contactSectionHeight : getHeight("contact")
      });
      }
  }
    componentWillUnmount() {
      window.removeEventListener("scroll", this.handleScroll);
      window.removeEventListener("resize", this.handleResize);
    }
    //handles resizes
    handleResize=()=>{
      this.setState({screenWidth: window.innerWidth});
      console.log("resized to : ", this.state.screenWidth)
    }
    
    updateState=((value=false, elem=null)=>{
      if(elem=="sideNav"){
        this.setState({isNavOpen: value});
  setTimeout(()=>console.log(this.state), 500);
      }else if(elem=="sharePanel"){
        console.log("Open share panel");
        this.setState({openSharePanel:value})
      }else{
        this.setState({isNavOpen: false,
          openSharePanel:false
        });
      }
     
    });
  handleScroll=()=>{
      const scrollTop = window.pageYOffset;
        this.setState({scrollTop: scrollTop});
    };
    render() {
  const state = this.state;
  let i;
  i=(state.screenWidth<=480)?150: 450;
      return (
        <div>
          <Header 
          scrollTop={state.scrollTop} 
          state={state} 
          updateState={this.updateState}
          navBar={state.navBar}
          />
          <SideNav updateState={this.updateState} state={state} sideNav={state.navBar} />
          <HeroSection scrollTop={state.scrollTop} margin={state.heroSectionHeight} />
          <AboutMeSection scrollTop={state.scrollTop} aboutMe={state.aboutMe} isLoaded={state.isContentLoaded} updateState={this.updateState}/>
          <SkillsSection mySkills={state.mySkills} scrollHeight={(state.heroSectionHeight + state.aboutSectionHeight)-i} scrollTop={state.scrollTop} />
          <ProjectsSection projectItems={state.projects} scrollHeight={(state.heroSectionHeight + state.aboutSectionHeight + state.skillSectionHeight)-i} scrollTop={state.scrollTop} screenWidth={state.screenWidth}/>
          <ContactSection contact={state.contact} scrollHeight={(state.heroSectionHeight + state.aboutSectionHeight + state.skillSectionHeight + state.projectsSectionHeight) - i}  scrollTop={state.scrollTop} />
          <Footer profiles={state.socialProfiles}/>
  
          <div className="modal flex" style={{
            display: `${state.isNavOpen || state.openSharePanel ? 'block' : 'none'}`
          }} onClick={this.updateState} />
  {state.openSharePanel? <SharePanel /> : null}
        </div>
      );
    }
  }
  class SharePanel extends React.Component{
    constructor(props){
      super(props);
    }
    
    render(){
      return (
        <div className="panel-container flex" style={{width:"100%", position:"relative"}}>
        <div id="share-panel" style={{animation:"0.1s slideUp ease 1"}}>
        <h4>Share Via</h4>
        </div>
        </div>
        )
    }
  }
  class Header extends React.Component {
    constructor(props){
      super(props);
    }
    upliftState=()=>{
      this.props.updateState(true, "sideNav");
    }
    render() {
  let changeStyle={
    backgroundColor:"transparent",
    color:"#fff"
  }
  if(this.props.scrollTop>100){
  changeStyle.backdropFilter="blur(5px)";
  changeStyle.backgroundColor="rgba(12,12,12,0.7)";
  }
  const {items : navItems} = this.props.navBar;
      return (
        <header id="header" style={changeStyle}>
        {/*-------header title------*/}
        <div id="title">
        <i className="fa-solid fa-bars menu-icon" onClick={this.upliftState} />
        <h1>Portfolio</h1>
        
        <div id="nav">
        <div className="nav-list">
        {
          navItems && navItems.map((item)=> <a key={item.name+"Nav"} href={item.url} className="nav-item" >{item.name}</a>)
        }
        </div>
        </div>
      
        </div>
        </header>
      );
    }
  }
  class SideNav extends React.Component{
    constructor(props){
      super(props);
    }
  upliftState=()=>{
      this.props.updateState(false, "sideNav");
    }
    render(){
      let sideNav={
        marginLeft:"0",
      };
      if(this.props.state.isNavOpen){
        sideNav.marginLeft="0";
      }else{
        sideNav.marginLeft="-16rem";
      }
   const {items : navItems} = this.props.sideNav;
      return (
        <div id="side-nav" style={sideNav}>
   <h3>Portfolio</h3>
         <ul className="side-nav-list">
       {
         navItems && navItems.map((item)=>{
         return(
           <a key={item.name+"Side"} href={item.url} className="side-nav-item" title={item.name} onClick={this.upliftState}>
           <li>{item.name}</li>
           </a>
           );
         })
       }
         </ul>
        </div>
        )
    }
  }
  class HeroSection extends React.Component {
    constructor(props){
      super(props);
      this.state={
        headline:""
      };
  }
    render() {
      let scrollTop = this.props.scrollTop;
        let circle ={
    borderRadius: "50%",
    animation: "rotate 1s ease 1",
    transition:"transform 0.3s ease",
    transform: `rotate(${(scrollTop>=600)?300:0.5*scrollTop}deg)`
  }
  const Circles = (<div id="circle-container" className="hero-background">
        <div className="circle1" style={circle}></div>
        <div className="circle2" style={circle}></div>
        <div className="circle3" style={circle}></div>
        <div className="circle4" style={circle}></div>
        </div>);
        const centerBTN = {
          width:"100%",
          position:"absolute",
          bottom:"10%",
          display:"flex",
          justifyContent:"center",
        zIndex:5
        };
     let backBlur={
      width:"100%",
      height:"100%",
      position:"absolute",
      top:"0",
      display:"none",
      transition:"0.3s"
     };
    
      return (
        <section id="hero-section">
   {Circles}
   <div style={backBlur}></div>
      <div>
      <h3>Hey I'm</h3>
        <h1>Sonu Shivcharan</h1>
        <div id="about">
        <span>A </span><span>Web developer</span>
        </div>
        </div>
        <div style={centerBTN}>
   <button className="action-btn">
   <a href="#contact">Get In Touch</a>
   </button>
        </div>
        </section>
      );
    }
  }
  
  class AboutMeSection extends React.Component {
    constructor(props){
      super(props);
    }
  upliftState=()=>{
      this.props.updateState(true, "sharePanel");
    }
    render() {
      const props= this.props;
  const {description} = props.aboutMe;
  const imgUrl = (props.isLoaded)? props.aboutMe.profileImg.url : " ";
  const headLine = (props.isLoaded)? props.aboutMe.headLine:" ";
  
      return (
        <section id="about-me-section">
        <h2 className="text-gradient">About Me</h2>
      <div className={`about-me-content ${props.scrollTop>=230? 'slideUp': 'shiftDown'}`}>
      <div className="flex" style={{flexDirection:"column"}}>
      <div className={`profile-picture ${this.props.scrollTop>=230? 'slideUp' : 'shiftDown'}`}>
      <img src={imgUrl} />
      </div>
      <div className="flex name-and-headline">
        <h2 className="name">Sonu Shivcharan</h2>
        <p className="headline">{headLine}</p>
   <div className="flex links">
        <span className="connect">Connect +<span className="tool-tip">On LinkedIn</span></span> <span id="share-icon" onClick={this.upliftState}><i className="fa fa-share-nodes" style={{color:"#2ca2ff"}} /> </span>
        </div>
        </div>
        
        </div>
      <div className={`about ${this.props.scrollTop>=250? 'slideUp' :'shiftDown' }`}>
      {description && description.map((item, index)=><p key={"p"+index}>{item}</p>)}
       </div>
      </div>
        </section>
        );
    }
  }
  
  class SkillsSection extends React.Component {
    constructor(props){
      super(props);
      this.state={
        level:0
      };
    }
      
  increment=()=>{
     if(this.state.level<=100){
      this.setState({
      level: this.state.level+1,
      })
      setTimeout(()=>this.increment(),5);
     }
    }
    render() {
      const props = this.props;
      const {skills} = props.mySkills;
      //FIX ME : calling increment() properly
     /* if(props.scrollTop>=(props.scrollHeight-100) && props.scrollTop<=props.scrollHeight+500){
            this.increment();
  }
  */
      return (
        <section id="skills-section">
        <h2 className="text-gradient">My Skils</h2>
        <div id="skills-container">
        {
          skills && skills.map((skill)=>{
          return (<div className={`skill ${(props.scrollTop>=props.scrollHeight-100)?'slideUp':'shiftDown'}`}key={skill.name}>
          <p className="name">{skill.name} {parseInt((skill.level/100)*this.state.level)}%</p>
          <div className="level-wrapper">
          <div className="level" style={{
              width: `${skill.level}%`,
              transform : `translateX(-${(props.scrollTop>=props.scrollHeight)?0:100}%)`
            } }></div>
          </div>
          </div>)
          })
        }
        </div>
        </section>
      );
    }
  }
  
  
  /*----project items----*/
  class ProjectsSection extends React.Component {
    constructor(props){
      super(props);
    }
    render() {
      const props = this.props;
      const {items} = props.projectItems;
      return (
        <section id="projects-section">
        <h2>My Projects</h2>
        <div id="projects-container">
        {
          items && items.map((item)=>{
          let i=200, j;
         j=(props.screenWidth<=480)?0:400;
            return(
            <div key={item.name} className={`project-item ${(props.scrollTop>=(props.scrollHeight-j)+(item.id*i))?'slideUp':'shiftDown'}`}>
            <div className="img-container">
            <div style={{
            background:`url(${item.img.url})`, 
            backgroundSize:"cover", 
            backgroundPosition:"center" 
            }} className="project-img" />
            </div>
   <h3>{item.name}</h3>
            </div>
            )
          })
        }
        </div>
        </section>
      );
    }
  }
  class ContactForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: "",
        email: "",
        message: ""
      };
    }
  
    handleInputChange = event => {
      const { name, value } = event.target;
      this.setState({ [name]: value });
    };
  
    handleSubmit = event => {
      event.preventDefault();
      // 
    };
  
    render() {
      return (
        <form id="contact-form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={this.state.name}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              placeholder="Type Your Message"
              value={this.state.message}
              onChange={this.handleInputChange}
              required
            ></textarea>
          </div>
          <button type="submit" id="submit-btn">Submit</button>
        </form>
      );
    }
  }
  
  class ContactSection extends React.Component {
    constructor(props){
      super(props);
    }
    render() {
      const props = this.props;
      const {contact} = props;
      console.log(props);
      let TagLine;
      if(typeof contact=="object"){
        TagLine = contact.tagline;
      }
      return (
        <section id="contact">
        <h2>Contact</h2>
        <div className="content">
        <div id="tag-line" className="text-gradient">
        <h2>{TagLine}</h2>
        </div>
        
        <div id="form-container" className={`${(props.scrollTop>=props.scrollHeight)?'slideRight':'shiftLeft'}`}>
        <ContactForm />
        </div>
        </div>
          {/* Contact section content goes here */}
        </section>
      );
    }
  }
  
  class Footer extends React.Component {
    render() {
      const {profiles} = this.props;
      
      return (
        <footer id="footer">
        <div className="footer-links">
      {
        profiles && profiles.map((profile)=>{
          return(
          <a href={profile.url} key={profile.name}>
          <i className={`${profile.fontAwesomeClass} footer-icon`}></i>
          </a>
          )
        })
      }
      
        </div>
       <p> Built with <i className="fa fa-heart" style={{color:"#fcb4e1"}}/> using <i className="fa-brands fa-react" style={{fontSize:"1.5rem",color:"#47cbfe", transform:"translateY(4px)"}} /> </p>
        
        <br />
        <div className="copy"><p><i className="fa fa-copyright" /> Copyright Sonu Shivcharan</p></div>
        </footer>
      );
    }
  }
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(<App />);
  
  
  
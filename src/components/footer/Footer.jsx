import React, {useState} from 'react'
import './footer.css'
import scandiLogo from '../../resources/images/scandiweb_logo.png'
import linkedinLogo from '../../resources/images/linkedin_logo.png'
import githubLogo from '../../resources/images/github_logo.png'

const Footer = () => {

const [info, setInfo] = useState(false)

function handleInfo(){
  setInfo(!info)
}

  return (
    <section id={"external-links" + (info? '-show' : '')}>
      <div id="footer-header">
        <button id='info-button' onClick={handleInfo}>
          Click me!
        </button>
      </div>
      <div id="project-presentation">
        <h5>This project was made for Scandiweb's Junior Dev Admission Test. It uses PHP, MySQL and React.</h5>
        <div id="social-links">
          <div id="git-link">
          <a className='links' href="https://github.com/PJRuas/scandiweb-challenge" target="_blank" rel="noreferrer" >
          <img src={githubLogo} alt="Github Logo" id='github-logo' className='link-image'/>
            </a>
          <h5>See it on GitHub!</h5>
          </div>
          <div id="linke-link">
            <a className='links' href="https://www.linkedin.com/in/pedro-janelli-da-silva-ruas/" target="_blank" rel="noreferrer">
            <img src={linkedinLogo} alt="Linkedin Logo" id='linkedin-logo' className='link-image'/>
              </a>
            <h5>Visit my LinkedIn</h5>
          </div>
          <div id="scandi-link">
            <a className='links' href="https://scandiweb.com" target="_blank" rel="noreferrer" ><img src={scandiLogo} alt="ScandiWeb Logo" id='scandi-logo' className='link-image'/></a>
            <h5>Visit ScandiWeb</h5>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer
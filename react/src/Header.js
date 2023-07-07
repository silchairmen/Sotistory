import MenuExampleSizeLarge from './components/Menu'

const Header= () => {
  const styleLink = document.createElement("link");
  styleLink.rel = "stylesheet";
  styleLink.href ="https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
  document.head.appendChild(styleLink);

  return(
    <MenuExampleSizeLarge />
  )
}

export default Header;

import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import Clock from 'react-live-clock';

// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Input,
  InputGroup,
  NavbarBrand,
  Navbar,
  NavLink,
  Nav,
  Container,
  Modal,
  NavbarToggler,
  ModalHeader,
} from "reactstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import './AdminNavbar.css'
import { API } from "config";
import { useSelector } from "react-redux";

function AdminNavbar(props) {
  let history = useHistory()
  const [collapseOpen, setcollapseOpen] = React.useState(false);
  const [modalSearch, setmodalSearch] = React.useState(false);
  const [color, setcolor] = React.useState("navbar-transparent");
  const user = useSelector(state=>state.auth.data)
  React.useEffect(() => {
    window.addEventListener("resize", updateColor);
    // Specify how to clean up after this effect:
    return function cleanup() {
      window.removeEventListener("resize", updateColor);
    };
  });
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && collapseOpen) {
      setcolor("bg-white");
    } else {
      setcolor("navbar-transparent");
    }
  };
  // this function opens and closes the collapse on small devices
  const toggleCollapse = () => {
    if (collapseOpen) {
      setcolor("navbar-transparent");
    } else {
      setcolor("bg-white");
    }
    setcollapseOpen(!collapseOpen);
  };
  const logout=()=>{
    API.get('auth/logout').then((res)=>{
      console.log(res)
      sessionStorage.clear()
      history.push('/login')
    }).catch(err=>{
      sessionStorage.clear()
      history.push('/login')
    })
  }
  // this function is to open the Search modal
  const toggleModalSearch = () => {
    setmodalSearch(!modalSearch);
  };
  return (
    <>
      <Navbar className={classNames("navbar-absolute", color)} expand="lg">
        <Container fluid>
          <div className="navbar-wrapper">
            <div
              className={classNames("navbar-toggle d-inline", {
                toggled: props.sidebarOpened,
              })}
            >
              <NavbarToggler onClick={props.toggleSidebar}>
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </NavbarToggler>
            </div>
            {/* <NavbarBrand href="#pablo" onClick={(e) => e.preventDefault()}>
              {props.brandText}
            </NavbarBrand> */}
          </div>
          <NavbarToggler onClick={toggleCollapse}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </NavbarToggler>
          <Collapse navbar isOpen={collapseOpen}>
           
          
        
            <Nav className="ml-auto" navbar>
            <div className="show-datetime mr-auto">
                <span className="show-date"><Clock format={'dddd, MMM Mo, YYYY'}/></span>
                <span className="show-time"><Clock  format={'h:mm:ssa'} ticking={true}/></span>
              </div>
              {/* <InputGroup className="search-bar">
                <Button color="link" onClick={toggleModalSearch}>
                  <i className="tim-icons icon-zoom-split" />
                  <span className="d-lg-none d-md-block">Search</span>
                </Button>
              </InputGroup> */}
              {/* <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  data-toggle="dropdown"
                  nav
                >
                  <div className="notification d-none d-lg-block d-xl-block" />
                  <i className="tim-icons icon-sound-wave" />
                  <p className="d-lg-none">Notifications</p>
                </DropdownToggle>
                <DropdownMenu className="dropdown-navbar" right tag="ul">
                  <NavLink tag="li">
                    <DropdownItem className="nav-item">
                      Mike John responded to your email
                    </DropdownItem>
                  </NavLink>
                  <NavLink tag="li">
                    <DropdownItem className="nav-item">
                      You have 5 more tasks
                    </DropdownItem>
                  </NavLink>
                  <NavLink tag="li">
                    <DropdownItem className="nav-item">
                      Your friend Michael is in town
                    </DropdownItem>
                  </NavLink>
                  <NavLink tag="li">
                    <DropdownItem className="nav-item">
                      Another notification
                    </DropdownItem>
                  </NavLink>
                  <NavLink tag="li">
                    <DropdownItem className="nav-item">
                      Another one
                    </DropdownItem>
                  </NavLink>
                </DropdownMenu>
              </UncontrolledDropdown> */}
          
              <UncontrolledDropdown nav>
             
                <DropdownToggle className="mr-4"
                  caret
                  color="default"
                  nav
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="user-name-view">{user.first_name+' '+user.last_name}</span>
                  <div className="photo">
                    <img
                      alt="..."
                      src={require("assets/img/anime3.png").default}
                    />
                       
                    </div>
                 
                  
                  <b className="caret d-none d-lg-block d-xl-block" />
                  <p className="d-lg-none custom-logout" onClick={logout}>Log out</p>
                </DropdownToggle>

                <DropdownMenu className="dropdown-navbar" right tag="ul">
                  <NavLink tag="li">
                    <DropdownItem className="nav-item">Profile</DropdownItem>
                  </NavLink>
                  {/* <NavLink tag="li">
                    <DropdownItem className="nav-item">Settings</DropdownItem>
                  </NavLink> */}
                  <DropdownItem divider tag="li" />
                  <NavLink tag="li">
                    <DropdownItem onClick={logout} className="nav-item">Logout</DropdownItem>
                  </NavLink>
                </DropdownMenu>
              </UncontrolledDropdown>
              
              <NavLink className="log-out-nav" onClick={logout}>Logout</NavLink>
              <li className="separator d-lg-none" />
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
      
      <Modal
        modalClassName="modal-search"
        isOpen={modalSearch}
        toggle={toggleModalSearch}
      >
        <ModalHeader>
          <Input placeholder="SEARCH" type="text" />
          <button
            aria-label="Close"
            className="close"
            onClick={toggleModalSearch}
          >
            <i className="tim-icons icon-simple-remove" />
          </button>
        </ModalHeader>
      </Modal>
    </>
  );
}

export default AdminNavbar;

import React from "react";
import { useState } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

function UserProfile() {

  // const [username,setUserName]=useState('')
  // const [email,setEmail]=useState('')
  // const [firstname,setFirstName]=useState('')
  // const [lastname, setLastName]=useState('')
  // const [city,setCity]=useState('')
  // const [postalcode,setPostalCode]=useState('')
  // const [address,setAddress]=useState('')
  // const [usercountry,setCountry]=useState('')
  // const [aboutme,setAboutMe]=useState('')
  
  const [user,setUser]= useState({username: "",
                                  email:"",
                                  firstName:"",
                                  lastName:"",
                                  country:"",
                                  city:"",
                                  address: "",
                                  postalcode:"",
                                  
  })
  const setUserProfile = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
  }

  function print(){

  }
  
 function onSave(){
  
  console.log('user',user)

 }
 const submit_form=()=>[
  alert('u clicked submit')
 ]

  return (
    <>
      <div className="content">
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">Edit Profile</h5>
              </CardHeader>
              <CardBody>
                <Form onSubmit={submit_form}>
                  <Row>
                    <Col className="pr-md-1" md="5">
                      <FormGroup>
                        <label>Company (disabled)</label>
                        <Input
                          defaultValue="Creative Code Inc."
                          disabled
                          placeholder="Company"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="3">
                      <FormGroup>
                        <label>Username</label>
                        <Input
                          name="username"
                          placeholder="Username"
                          type="text"
                          value={user.username}
                          onChange={setUserProfile}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <Input 
                        name="email"
                        placeholder="mike@email.com" 
                        type="email" 
                        value={user.email}
                        onChange={setUserProfile}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>First Name</label>
                        <Input
                          name="firstName"
                          placeholder="Company"
                          type="text"
                          value={user.firstName}
                          onChange={setUserProfile}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="6">
                      <FormGroup>
                        <label>Last Name</label>
                        <Input
                          name="lastName"
                          placeholder="Last Name"
                          type="text"
                          value={user.lastName}
                          onChange={setUserProfile}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Address</label>
                        <Input
                          name= "address"
                          placeholder="Home Address"
                          type="text"
                          value={user.address}
                          onChange={setUserProfile}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>City</label>
                        <Input
                          name= "city"
                          placeholder="City"
                          type="text"
                          value={user.city}
                          onChange={setUserProfile}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>Country</label>
                        <Input
                          name= "country"
                          placeholder="Country"
                          type="text"
                          value={user.country}
                          onChange={setUserProfile}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <label>Postal Code</label>
                        <Input 
                        name="postalcode"
                        placeholder="ZIP Code"
                         type="number" 
                         value={user.postalcode}
                         onChange={setUserProfile}
                         />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="8">
                      <FormGroup>
                        <label>About Me</label>
                        <Input
                          cols="80"
                          
                          placeholder="Here can be your description"
                          rows="4"
                          type="textarea"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter>
                <Button onClick={onSave} className="btn-fill" color="primary" type="button">
                  Save
                </Button>
              </CardFooter>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <CardBody>
                <CardText />
                <div className="author">
                  <div className="block block-one" />
                  <div className="block block-two" />
                  <div className="block block-three" />
                  <div className="block block-four" />
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar"
                      src={require("assets/img/emilyz.jpg").default}
                    />
                    <h5 className="title">Mike Andrew</h5>
                  </a>
                  <p className="description">Ceo/Co-Founder</p>
                </div>
                <div className="card-description">
                  Do not be scared of the truth because we need to restart the
                  human foundation in truth And I love you like Kanye loves
                  Kanye I love Rick Owens’ bed design but the back is...
                </div>
              </CardBody>
              <CardFooter>
                <div className="button-container">
                  <Button className="btn-icon btn-round" color="facebook">
                    <i className="fab fa-facebook" />
                  </Button>
                  <Button className="btn-icon btn-round" color="twitter">
                    <i className="fab fa-twitter" />
                  </Button>
                  <Button className="btn-icon btn-round" color="google">
                    <i className="fab fa-google-plus" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default UserProfile;

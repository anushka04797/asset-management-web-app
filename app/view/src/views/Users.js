import React, { useEffect, useRef, useState } from "react";
import UpArrow from "../assets/icons/up-arrow.svg";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import SearchField from 'react-search-field';
import SafePondDot from '../assets/icons/safe-pond.svg'
import PaperIcon from '../assets/icons/Paper.svg'
import RefreshIcon from '../assets/icons/refresh.svg'
// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  Nav,
  NavLink,
  ButtonToolbar,
  Table,
  ButtonToggle,
  Row,
  TabContent,
  TabPane,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input

} from "reactstrap";

// core components
import {
  chartExample1,
  chartExample2,

  chartExample4,
} from "variables/charts.js";
// import "../../src/assets/css/Users.css";
import '../index.css'
import { useDispatch, useSelector } from "react-redux";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { API } from "config";
import { generate_graph_data } from "helper";
import { useLocation } from 'react-router';
import { useSnackbar } from 'notistack';
import store from "store/store";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { fetchUsersData } from "store/slices/userSlice";
import Mailto from "components/MailTo/MailTo";

function Users(props) {
  const animatedComponents = makeAnimated();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  let location = useLocation()
  const dispatch = useDispatch()
  const [showAssetUpdateModal,setShowAssetUpdateModal] = useState(false)
  const closeForm=()=>{
      setShowAssetUpdateModal(false)
      setSelectedUser(null)
  }
  const users = useSelector(state => state.users.data)
  
  // const device_data_ref = React.forwardRef(null)
  {/**Code for writing table search */ }
  function onChange(value, event) {
    console.log(value,event)
  }
  const [selected_user,setSelectedUser]=useState()
  
  useEffect(()=>{
    // console.log(device_data_ref.current)
    console.log('users mounted')
  },[])
  const [message,setMessage]=useState()
  const [assets,setAssets]=useState()
  const [selectedAssets,setSelectedAssets]=useState('')
  const get_free_assets=()=>{
    API.get('assets/list/').then((res)=>{
      console.log('all assets',res.data)
      let temp=[]
      res.data.data.forEach((asset,idx)=>{
        temp.push({value:asset.id,label:asset.ast_name,data:asset})
      })
      setAssets(temp)
    }).catch(err=>{
      console.log(err.response.data)
    })
  }
  
  const handleAssetsChange=(options,actionMeta)=>{
    let temp ='';
    options.forEach((option,idx)=>{
      if(idx < options.length-1){
        temp+=option.value+','
      }
      else{
        temp+=option.value
      }
    })
    setSelectedAssets(temp)
  }
  const assign_asset_to_user=()=>{
    API.post('assets/assign/to/user/',{user_id:selected_user.id,asset_ids:selectedAssets}).then((res)=>{
      setSelectedAssets('')
      closeForm()
      get_free_assets()
      dispatch(fetchUsersData())
      enqueueSnackbar('Assets assigned to user',{variant:'success'})
    })
  }
  const swap_user_verification_status=(user_id)=>{
    API.post('auth/user/active/inactive/',{user_id:user_id}).then(res=>{
      console.log(res.data)
      dispatch(fetchUsersData())
      enqueueSnackbar('User activation status updated',{variant:'success'})
    }).catch(err=>{
      enqueueSnackbar('Something went wrong, Please try again later',{variant:'warning'})
    })
  }
  React.useEffect(()=>{
    get_free_assets()
  },[])
  return (
    <>
    <Modal
        isOpen={showAssetUpdateModal}
        size='md'
        className="p-2"
      >
        <ModalHeader className="custom-modal-header">
          <span style={{color:'white'}}>Assign ponds to {selected_user?.first_name}</span>
        </ModalHeader>
        <ModalBody className="custom-modal-design" >
          <Form>
            {/* <FormGroup>
              <Input value={message} onChange={(e)=>setMessage(e.target.value)} type="textarea" className="modal-custom-input" placeholder="Type here..." />
            </FormGroup> */}
            <FormGroup>
              <Select onChange={handleAssetsChange} components={animatedComponents} closeMenuOnSelect={false} isMulti options={assets}/>
            </FormGroup>
          </Form>
          <div className="moadl-button-holder">
            <Button type="button" onClick={assign_asset_to_user} className="okay-button-modal">
              Save
            </Button>
            <Button className="cancel-button-modal ml-2"
              onClick={() => closeForm()}
            >
              cancel
            </Button>
          </div>
        </ModalBody>
        {/* <ModalFooter className="p-2">
          
        </ModalFooter> */}
      </Modal>

      {/**modal ends */}
      <div className="content">
        <Row>
          {/*______CARD FOR VIEWING DATA IN TABLE______ */}
          <Col lg="12" md="12">
            <Card className="table-holder-class">

              <CardHeader>
                {/* <CardTitle tag="h4">Simple Table</CardTitle> */}
              </CardHeader>
              <CardBody>
                {/**SERACH FIELD */}
                <SearchField
                  className="table-search"
                  placeholder='Search by'
                  onChange={onChange}
                />
                <Table className="tablesorter pond-details" responsive hover>
                  <thead className="text-primary">
                    <tr>
                      <th className="pond-value-pointer">User ID</th>
                      <th className="pond-value-pointer">Name</th>
                      <th className="pond-value-pointer">Email</th>
                      <th className="pond-value-pointer">Phone</th>
                      <th className="pond-value-pointer">Status</th>
                      {/* <th className="text-center pond-value-pointer">Action</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {users.length>0 && Array.from(users).map((user, idx) => (
                      <tr key={idx}>
                        <td className="pond-actual-value">{idx+1}</td>
                        <td className="pond-actual-value">{user.first_name+' '+user.last_name}</td>
                        <td className="pond-actual-value"><Mailto email={user.usr_email}/></td>
                        <td className="pond-actual-value">{user.user_phone!=null?user.user_phone.phn_cell:''}</td>
                        <td className={`pond-actual-value ${user.is_active ? "status-text-active" : "status-text-inactive"}`}>{user.is_active?'Active':'Inactive'}</td>
                        {/* <td className="text-center pond-actual-value">{user.ph}</td>
                        <td className="text-center pond-actual-value">{user.temp} ℃</td>
                        <td className="text-center pond-actual-value">{user.tds} mg/L</td>
                        <td className="text-center pond-actual-value">comment</td> */}
                        {/* <th className="text-center pond-actual-value ml-auto">
                        <ButtonToolbar aria-label="Toolbar with button groups">
                          <ButtonGroup aria-label="Third group" className="m-auto" size="sm">
                            <Button onClick={()=>{setSelectedUser(user);setShowAssetUpdateModal(true)}}>Manage Ponds</Button>
                          </ButtonGroup>
                        </ButtonToolbar>
                        </th> */}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Users;

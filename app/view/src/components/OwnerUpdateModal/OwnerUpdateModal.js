import React,{useState} from 'react'
import { API } from 'config'
import { useDispatch,useSelector } from 'react-redux'
import {
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
    Form,
    FormGroup,
  } from "reactstrap";
import { useSnackbar } from 'notistack';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { fetchPortableGenerators } from 'store/slices/portableGeneratorSlice';
import { USER_ID } from 'config';

const OwnerUpdateModal = (props) => {
    const animatedComponents = makeAnimated();
    const dispatch = useDispatch()
    const [person,setSelectedPerson]=useState()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const users = useSelector(state => {
        let temp=[]
        Array.from(state.users.data).forEach((user,idx)=>{
            temp.push({label:user.first_name+' '+user.last_name,value:user.id,data:user})
        })
        return temp
    })
    function closeForm(){
        props.close()
    }
    
    const handlePersonChange=(options,actionMeta)=>{
        setSelectedPerson(options.data)
    }
    const assign_user_to_pond = () => {
        console.log({user_id:person.id,asset_ids:String(props.pond.id)})
        API.post('assets/assign/to/user/',{user_id:person.id,asset_ids:String(props.pond.id)}).then((res) => {
            console.log(res)
            closeForm()
            dispatch(fetchPortableGenerators({user_id:sessionStorage.getItem(USER_ID)}))
            enqueueSnackbar('Person assigned to pond', { variant: 'success' })
        })
    }
    return (
        <>
            <Modal
                isOpen={props.show}
                size='md'
                className="p-2"
            >
                <ModalHeader className="custom-modal-header">
                    <span style={{ color: 'white' }}>Assign Person to {props.pond?.name}</span>
                </ModalHeader>
                <ModalBody className="custom-modal-design" >
                    <Form>
                        {/* <FormGroup>
                            <Input value={message} onChange={(e)=>setMessage(e.target.value)} type="textarea" className="modal-custom-input" placeholder="Type here..." />
                        </FormGroup> */}
                        <FormGroup>
                            <Select onChange={handlePersonChange} components={animatedComponents} closeMenuOnSelect={true} isMulti={false} options={users} />
                        </FormGroup>
                    </Form>
                    <div className="moadl-button-holder">
                        <Button type="button" onClick={assign_user_to_pond} className="okay-button-modal">
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
        </>
    )
}

export default OwnerUpdateModal
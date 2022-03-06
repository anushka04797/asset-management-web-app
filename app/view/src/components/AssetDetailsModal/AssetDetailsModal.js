import { API } from 'config';
import { capitalizeFirstLetter } from 'helper';
import React, { useState } from 'react'
import {
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter

} from "reactstrap";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const AssetDetailsModal = (props) => {
    const [show, setShow] = useState(props.show)
    const [assetDetails, setAssetDetails] = useState([])
    const [expandedDevice,setExpandedDevice]=useState(null)

    const closeModal = () => {
        props.close()
    }
    React.useEffect(() => {
        API.get('assets/details/' + props.asset?.id + '/').then((res) => {
            console.log(res.data)
            setAssetDetails(res.data.data.device_asset)
        })
    }, [])
    
    const handleDeviceAccordionChange = (panel) => (event, isExpanded) => {
        setExpandedDevice(isExpanded ? panel : false);
    };
    return (
        <>
            {/**MODAl FOR SHOWING REAL TIME DATA */}
            <Modal
                isOpen={props.show}
                size='md'
                className="p-2"
            >
                <ModalHeader className="custom-modal-header">
                    <span style={{ color: 'white', fontSize: '18px' }}>{capitalizeFirstLetter(props.asset.ast_name)} Details</span>
                </ModalHeader>
                <ModalBody className="custom-modal-design" >
                    {assetDetails && assetDetails.map((item,idx)=>(<Accordion key={idx} expanded={expandedDevice == idx} onChange={handleDeviceAccordionChange(item)} sx={{backgroundColor:'info.main',color:'white'}}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                {item.ddev_name}
                            </Typography>
                            <Typography sx={{ color: 'text.secondary' }}>I am an accordion</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                                Aliquam eget maximus est, id dignissim quam.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>))}
                </ModalBody>
                <ModalFooter>
                    <div className="modal-button-holder">
                        <Button className="mr-1" outline size="sm"
                            onClick={() => { }}
                        >
                            Print
                        </Button>
                        <Button size="sm" outline type="button" onClick={() => { props.close() }} className="okay-button-modal btn-warning">
                            Cancel
                        </Button>
                    </div>
                </ModalFooter>
            </Modal>
            {/**modal ends */}
        </>
    )
}

export default AssetDetailsModal
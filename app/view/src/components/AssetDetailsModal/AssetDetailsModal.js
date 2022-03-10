import { API } from 'config';
import { capitalizeFirstLetter } from 'helper';
import React, { useState, forwardRef } from 'react'
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
import ReactToPrint from 'react-to-print';
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as FileSaver from 'file-saver';


const AssetDetailsModal = forwardRef((props, ref) => {
    const [show, setShow] = useState(props.show)
    const [assetDetails, setAssetDetails] = useState([])
    const [expandedDevice, setExpandedDevice] = useState(null)
    const [pdfTitle, setPdfTitle] = useState();
    const [pdfData, setPdfData] = useState([])

    const closeModal = () => {
        props.close()
    }
    const componentRef = React.useRef(null);

    React.useEffect(() => {
        API.get('assets/details/' + props.asset?.id + '/').then((res) => {
            console.log('asset details', res.data)
            setAssetDetails(res.data.data)
            setPdfData(res.data.data.device_asset)
        })
    }, [])

    const handleDeviceAccordionChange = (panel) => (event, isExpanded) => {
        setExpandedDevice(isExpanded ? panel : false);
    };
    
    function export_pdf() {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(20);

        const title = "Asset Overview";
        const asset_name="Name : "+assetDetails.ast_name;
        const asset_river_name = "River : "+assetDetails.ast_river.riv_name
        const headers = [["#",
            "Device",
            "Serial No",
            "Location",
            "Status",
            "Configuration Date"]];
        const uData = pdfData.map((elt, idx) => [idx + 1, elt.dev_name, elt.dev_serial_no,elt.dev_location,elt.dev_status.dev_status_name,elt.dev_created_at]);
        let content = {
            startY: 100,
            head: headers,
            body: uData
        };

        
        doc.text(title, marginLeft, 40);
        doc.line(40, 50, 500, 50);
        doc.setFontSize(12);
        doc.text(asset_name, marginLeft, 70);
        doc.text(asset_river_name, marginLeft, 90);
        
        doc.autoTable(content);
        doc.text('Page ' + String(doc.internal.getNumberOfPages()),210-20,297-30,null,null,"right");
        //doc.save("asset_details.pdf")
        doc.autoPrint({variant: 'non-conform'});
        // doc.save("asset_details.pdf")
        window.open(doc.output('bloburl'), '_blank');
    }
    return (
        <>
            {/**MODAl FOR SHOWING REAL TIME DATA */}
            <Modal
                isOpen={props.show}
                size='lg'
                className="p-2"
                backdrop={true}
            >
                <ModalHeader className="custom-modal-header" toggle={closeModal} closeAriaLabel={"Close"}>
                    <span style={{ color: 'white', fontSize: '22px', fontWeight: "bold" }}>Asset Overview</span><br /><span style={{ color: 'white', fontSize: '14px' }}>{capitalizeFirstLetter(props.asset.ast_name)}</span>
                </ModalHeader>
                <ModalBody className="custom-modal-design" ref={componentRef}>
                    <div id='overview'>
                        {assetDetails.device_asset && Array.from(assetDetails.device_asset).map((item, idx) => (
                        <Accordion key={idx} expanded={expandedDevice == item} onChange={handleDeviceAccordionChange(item)} sx={{ backgroundColor: 'info.main', color: 'white' }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                                sx={{ backgroundColor: "#ffffff" }}
                            >
                                {/* <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            {item.dev_name}
                        </Typography> */}
                                <span style={{ color: 'grey', fontSize: '16px' }}>{item.dev_name}</span>
                                {/* <Typography>{item.dev_name}</Typography> */}
                            </AccordionSummary>
                            <AccordionDetails sx={{ backgroundColor: "#ffffff", color: "#000000" }}>
                                <ul>
                                    <li>
                                        <Typography sx={{ fontSize: "14px" }}>
                                            Serial No : {item.dev_serial_no}
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography sx={{ fontSize: "14px" }}>
                                            Status : {item.dev_status.dev_status_name}
                                        </Typography>
                                    </li>
                                    {item.device_sensors.length > 0 && <li>
                                        <Typography sx={{ fontSize: "14px" }}>
                                            Sensors :
                                        </Typography>
                                        <ul>
                                            {item.device_sensors.map((item, idx) => (
                                                <li key={idx}>
                                                    <Typography sx={{ fontSize: "12px" }}>
                                                        {idx + 1}. {item.sen_name}
                                                    </Typography>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>}
                                </ul>

                                {/* <Typography>
                                Sensors :
                                
                            </Typography> */}
                            </AccordionDetails>
                        </Accordion>))}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <div className="modal-button-holder">
                        {/* <Button className="mr-1" outline size="sm"
                            onClick={handlePrint}
                        >
                            Print
                        </Button> */}
                        <ReactToPrint
                            trigger={() => <Button className="mr-1" outline size="sm">Print this out!</Button>}
                            content={export_pdf}
                        />
                        <Button size="sm" outline type="button" onClick={() => { props.close() }} className="okay-button-modal btn-warning">
                            Cancel
                        </Button>
                    </div>
                </ModalFooter>
            </Modal>
            {/**modal ends */}
        </>
    )
})

export default AssetDetailsModal
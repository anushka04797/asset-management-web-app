import React, { useEffect, useRef, useState } from "react";

// react plugin used to create charts

import SearchField from 'react-search-field';
import SafePondDot from '../assets/icons/safe-pond.svg'
import OfflineDot from '../assets/icons/offline.svg'
import axios from 'axios';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import Typography from '@mui/material/Typography';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  Row,
  Col,
  Dropdown, DropdownItem, DropdownToggle, DropdownMenu,ButtonGroup,ButtonToggle,ButtonToolbar
} from "reactstrap";

// core components

import "../../src/assets/css/Dashboard.css";
import '../index.css'
import { useDispatch, useSelector } from "react-redux";

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { API } from "config";
import { useLocation } from 'react-router';
import { useSnackbar } from 'notistack';
import store from "store/store";

import AssetDetailsModal from "components/AssetDetailsModal/AssetDetailsModal";
import { capitalizeFirstLetter } from "helper";
// import { MapContainer } from "../components/google-map/GoogleMap";



function Dashboard(props) {
  const graph_div_ref = useRef(null)
  const [searchText, setSearchText] = useState(' ')
  const executeScroll = () => graph_div_ref.current.scrollIntoView()
  
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const dispatch = useDispatch()
  let location = useLocation()
  const [assets, setassets] = useState([])
  const [filtered_assets,setFilteredAssets]=useState([])
  
  function onEnter(value, event) {
    console.log(value);
    alert("hello " + value);

  }
  // const device_data_ref = React.forwardRef(null)
  {/**Code for writing table search */ }
  function filterBy_AssetName_RiverName(value) {
    return value.data.ast_name 
  }
  function onChange(value, event) {
    //var str= document.getElementById("searchText").value;
    //alert() //+ {str});
    // var a= document.getElementById("searchText");
    // console.log(a)
    setSearchText(value)
    if(value.length>0){
      console.log(value, event)
      setFilteredAssets(filtered_assets.filter(asset=>String(asset.data.ast_name).toLowerCase().includes(String(value).toLowerCase()) || String(asset.data.ast_river?.riv_name).toLowerCase().includes(String(value).toLowerCase())))
      // console.log(temp)
    }
    else{
      
      setFilteredAssets(assets)
    }
  }

  const [showTaskForm, setShowTaskForm] = useState(false);
  const [currentActiveTab, setCurrentActiveTab] = useState('1');
  const toggleTaskForm = () => {
    setShowTaskForm(!showTaskForm);
  };
  const closeForm = () => {
    setShowTaskForm(false)
  }
  // Toggle active state for Tab
  const toggle = tab => {
    if (currentActiveTab !== tab) setCurrentActiveTab(tab);
  }
  const [isOpen, setOpen] = useState(false)
  const toggleDropDown = () => {
    setOpen(!isOpen)
  }
  
  const [selected_option, setSelectedOption] = useState('Export')
  

  const [pdfTitle, setPdfTitle] = useState();
  const [pdfData, setPdfData] = useState([])

  const [data, setData] = useState([]);

  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';
  //const fileName = 'a'
  const exportToCSV = (csvData) => {
    const xlData = [];
    for (let i = 0; i < csvData.length; i++) {
      const item = csvData[i];
      xlData.push({
        'Sl. No': i + 1, 'Serial No.': item.ast_serial, 'Asset Name': item.ast_name, 'Asset type': item.ast_type.ast_title, 'River': item.ast_river.riv_name, 'Address': item.ast_address ? item.ast_address + ', ' + item.ast_union.uni_name + ', ' + item.ast_upazila.upa_name + ', ' + item.ast_district.dis_name + ', ' + item.ast_division.div_name :
          item.ast_union.uni_name + ', ' + item.ast_upazila.upa_name + ', ' + item.ast_district.dis_name + ', ' + item.ast_division.div_name, 'Status': item.ast_status.ast_status_name, 'Date & time': date(item.ast_updated_at ? item.ast_updated_at : item.ast_created_at)
      })
    }

    console.log('data', xlData);

    const fileName = 'asset data'
    const ws = XLSX.utils.json_to_sheet(xlData);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  }

  function export_pdf() {
    // const unit = "pt";
    //     const size = "A4"; // Use A1, A2, A3 or A4
    //     const orientation = "portrait"; // portrait or landscape

    //     const marginLeft = 40;
    //     const doc = new jsPDF(orientation, unit, size);

    //     doc.setFontSize(15);

    //     const title = "Timecard of" + " " + pdfTitle;
    //     const headers = [["#",
    //         "Project Name (Work Package)",
    //         "Task Title",
    //         "Actual Work Done",
    //         "Hour(s)",
    //         "Date Created"]];
    //     const uData = pdfData.map((elt, idx) => [idx + 1, elt.data.project.sub_task + ' (' + elt.data.project.work_package_number + ')', elt.data?.project.task_title, elt.data.actual_work_done, elt.data.hours_today, elt.data.date_created]);
    //     let content = {
    //         startY: 50,
    //         head: headers,
    //         body: uData
    //     };

    //     doc.text(title, marginLeft, 30);
    //     doc.autoTable(content);
    //     doc.save("Timecard of" + " " + pdfTitle + ".pdf")

  }
  const columns = [
    { field: 'serial_no', headerName: 'Serial No.', flex: 0.5, headerAlign: 'center',align:"center" },
    // { field: 'Name', headerName: 'Name', width: 130 },
    {
      field: 'asset_name',
      headerName: 'Asset Name',
      sortable: true,
      flex: 0.5,
      // valueGetter: (params) =>`${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'asset_type',
      headerName: 'Asset Type',
      sortable: true,
      flex: 0.5
    },
    {
      field: 'river',
      headerName: 'River',
      sortable: true,
      flex: 0.3,
    },
    {
      field: 'address',
      headerName: 'Address',
      sortable:true,
      flex: 1,
    },
    {
      field: 'status',
      headerName: 'Status',
      sortable:true,
      flex: 0.3,
    },
    {
      field: 'date_time',
      headerName: 'Date & Time',
      sortable:true,
      flex: 0.5,
    },
    
    // {
    //   field: "action",
    //   headerName: "Action",
    //   headerAlign: 'center',
    //   sortable: false,
    //   width: 300,
    //   flex: 1,
    //   align:"center",
      
    //   renderCell: (params) => {
    //     const show = (e) => {
    //       e.stopPropagation(); // don't select this row after clicking
    //       console.log('e',e)
    //       console.log('params',params.row)
    //       const api = params.api;
    //       const thisRow = {};

    //       api.getAllColumns().filter((c) => c.field !== "__check__" && !!c).forEach(
    //         (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
    //       );
          
          
    //       // return alert(JSON.stringify(thisRow, null, 4));
    //     };
    //     const manage_person=(e)=>{
    //       e.stopPropagation(); // don't select this row after clicking
          
    //     }
    //     return <ButtonToolbar aria-label="Toolbar with button groups">
    //       <ButtonGroup aria-label="Third group" className="m-auto" size="sm">
    //         <ButtonToggle size="sm" onClick={show} type="button">Detail</ButtonToggle>
    //         <ButtonToggle type="button" onClick={manage_person}>Manage Person</ButtonToggle>
    //       </ButtonGroup>
    //     </ButtonToolbar>
    //   }
    // },
  ];
  React.useEffect(() => {
    if (location.state?.from == 'login') {
      enqueueSnackbar('Welcome ', { variant: 'success' })
    }
    // dispatch(fetchPortableGenerators('daily'))
  }, [])
  const [selectedAsset, setSelectedAsset] = useState()
  const [showAssetDetailModal, setShowAssetDetailModal] = useState(false)
  const showDetailModal = (item) => {
    console.log(item)
    setSelectedAsset(item)
    setShowAssetDetailModal(true)
  }

  useEffect(() => {
    axios.get('http://dma.com.bd:8004/assets/list/?format=json').then(function (response) {
        console.log(response.data)
        let temp=[]
        Array.from(response.data.data).forEach((item,idx)=>{
          temp.push({
            'id':idx+1,
            'serial_no':  item.ast_serial,
            'asset_name': item.ast_name,
            'asset_type': item.ast_type?.ast_title || '',
            "river":  item.ast_river.riv_name,
            "address": item.ast_address ? item.ast_address + ', ' + item.ast_union.uni_name + ', ' + item.ast_upazila.upa_name + ', ' + capitalizeFirstLetter(item.ast_district.dis_name) + ', ' + (item.ast_division?.div_name || ''): item.ast_union.uni_name + ', ' + item.ast_upazila.upa_name + ', ' + capitalizeFirstLetter(item.ast_district.dis_name)+', ' + (item.ast_division?.div_name || '') ,
            "status": item.ast_status.ast_status_name,
            "data": item,
            'date_time':date(item.ast_updated_at ? item.ast_updated_at : item.ast_created_at),
          })
        })
        setassets(temp)
        setFilteredAssets(temp)
    }).catch(error => console.log(error));

  }, []);

  const listItems = data.map((item) =>
    <li>{item.success}</li>
  );

  function date(d) {
    let newDate = new Date(d);

    console.log('date ' + newDate.toLocaleDateString())
    console.log('time ' + newDate.toLocaleTimeString())

    return (newDate.toLocaleDateString() + ' ' + newDate.toLocaleTimeString())
  }

  return (
    <>
      {showAssetDetailModal && <AssetDetailsModal show={showAssetDetailModal} asset={selectedAsset} close={() => setShowAssetDetailModal(false)} />}

      <div className="content">
      <Row style={{marginTop:"40px"}}>
          <Col lg="12" md="12">
            <Row>
              <Col>
              <Typography variant="h5" component="div" mb={2} sx={{color:"rgba(255, 255, 255, 0.7)"}}>List of Asset</Typography>
              </Col>
              <Col>
              <SearchField
                  className="table-search"
                  placeholder='Search by asset/river'
                  onChange={onChange}
                />
              </Col>
            </Row>
              
            <div style={{width: '100%',backgroundColor:"#1A1A2E" }} >
              
              <DataGrid
                sx={{
                  boxShadow: 20,
                  border: 0,
                  fontFamily: '"Raleway", sans-serif',
                  borderColor: '#000000',
                  '& .MuiDataGrid-root': {
                    color: "rgba(255, 255, 255, 0.7)"
                  },
                  '& .MuiDataGrid-cell:hover': {
                    color: '#f06a28',
                  },
                  '& .super-app-theme--header': {
                    textAlign: 'center',
                  },
                  '& .MuiDataGrid-cell': {
                    textAlign: "center",
                    inlineSize: "15px"
                  },
                  '& .MuiDataGrid-row': {
                    cursor: "pointer"
                  },
                  '& .MuiDataGrid-columnHeaderTitle': {
                    fontWeight: "700"
                  },
                  '& .MuiSvgIcon-root': {
                    color: "#ffffff"
                  },
                  '& .MuiButton-text':{
                    color:'#dfbdba'
                  },
                  color: "rgba(255, 255, 255, 255)"
                }}
                autoHeight={true}
                
                color="rgba(255, 255, 255, 0.7)"
                loading={assets.length === 0}
                disableSelectionOnClick={true}
                rows={filtered_assets}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                // checkboxSelection
                components={{
                  Toolbar: GridToolbar,
                }}
                onRowClick={(rowData) => { showDetailModal(rowData.row.data) }}
              // getRowClassName={(params) => `super-app-theme--${params.row.status}`}
              />
            </div>
            

          </Col>
        </Row>
        
      </div>
    </>
  );
}
export default Dashboard;


//  <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"></script>
// <script>
// function export_data(){
// 	let data=document.getElementById('data');
// 	var fp=XLSX.utils.table_to_book(data,{sheet:'vishal'});
// 	XLSX.write(fp,{
// 		bookType:'xlsx',
// 		type:'base64'
// 	});
// 	XLSX.writeFile(fp, 'test.xlsx');
// }
// </script> 

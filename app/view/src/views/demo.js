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
                  //type = "text"
                  className="table-search"
                  // id = "searchText"
                  placeholder='Search '
                  size="sm"
                  onEnter={onEnter}
                //onChange={onChange}

                />
                {/* <BasicMenu/> */}
                <Dropdown isOpen={isOpen} toggle={toggleDropDown} className="pull-right mr-1" size="sm">
                  <DropdownToggle><i className="fa fa-calendar mr-2"></i>{selected_option} <i className="fas fa-caret-down"></i></DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={() => export_pdf()} style={{ color: 'black' }}>PDF</DropdownItem>
                    <DropdownItem onClick={() => exportToCSV(assets)} style={{ color: 'black' }}>Excel</DropdownItem>
                  </DropdownMenu>
                </Dropdown>

                <Table className="tablesorter pond-details" responsive hover>
                  <thead className="text-primary">
                    <tr>
                      <th className="pond-value-pointer">Serial No</th>
                      {/* <th className="pond-value-pointer">Person</th> */}
                      <th className="pond-value-pointer">Asset Name</th>
                      <th className="text-center pond-value-pointer">Asset Type</th>
                      <th className="text-center pond-value-pointer">River</th>
                      <th className="text-center pond-value-pointer">Address</th>
                      <th className="text-center pond-value-pointer">Status</th>
                      <th className="text-center pond-value-pointer">Date and Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assets.map((item, idx) => (

                      <tr key={idx} onClick={() => { showDetailModal(item) }} style={{ cursor: 'pointer' }} onFocus={() => { console.log(idx) }}>
                        <td className="pond-actual-value" title={item.owner_name + ' ' + item.phone}>{item.status == 'Offline' ? <img src={OfflineDot} className="name-dot" /> : <img src={SafePondDot} className="name-dot" />} {item.ast_serial}</td>
                        {/* <td className="pond-actual-value" title={pond.phone}>{pond.owner_name}</td> */}
                        <td className="pond-actual-value">{item.ast_name}</td>
                        <td className="text-center pond-actual-value">{item.ast_type?.ast_title || ''}</td>
                        <td className="text-center pond-actual-value">{item.ast_river.riv_name} </td>
                        <td className="text-center pond-actual-value">{item.ast_address ? item.ast_address + ', ' + item.ast_union.uni_name + ', ' + item.ast_upazila.upa_name + ', ' + capitalizeFirstLetter(item.ast_district.dis_name) + ', ' + (item.ast_division?.div_name || ''): item.ast_union.uni_name + ', ' + item.ast_upazila.upa_name + ', ' + capitalizeFirstLetter(item.ast_district.dis_name)+', ' + (item.ast_division?.div_name || '') }</td>
                        <td className="text-center pond-actual-value">{item.ast_status.ast_status_name} </td>
                        <th className="text-center pond-actual-value">{date(item.ast_updated_at ? item.ast_updated_at : item.ast_created_at)}
                          {/* {new Date(item.ast_created_at)} */}

                          {/* {item.ast_updated_at?item.ast_updated_at:item.ast_created_at} */}
                          {/* <ButtonToolbar aria-label="Toolbar with button groups">
                          <ButtonGroup aria-label="Third group" className="m-auto" size="sm">
                            <ButtonToggle onClick={()=>show_pond_device_data(item)} type="button">Detail</ButtonToggle> */}
                          {/* <ButtonToggle type="button" onClick={()=>{setShowPersonUpdate(true);setSelectedPond(item);}}>Manage Person</ButtonToggle> */}
                          {/* </ButtonGroup>
                        </ButtonToolbar> */}
                        </th>

                        {/* <th className="text-center pond-actual-value">
                          <ButtonToggle type="button" onClick={()=>show_pond_device_data(pond)} className="table-view-button">{selected_pond?.id==pond.id?'Hide':'Detail'}</ButtonToggle>
                        </th> */}
                      </tr>
                    ))
                    }
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
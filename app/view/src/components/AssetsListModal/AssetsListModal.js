import React from 'react'

const AssetsListModal = () => {
    return (
        <>
            <Modal
                isOpen={showTaskForm}
                size='md'
                className="p-2"
            >
                <ModalHeader className="custom-modal-header">
                    <span style={{ color: 'white' }}>Send Instruction</span>
                </ModalHeader>
                <ModalBody className="custom-modal-design" >
                    <Form>
                        <FormGroup>
                            <Input value={message} onChange={(e) => setMessage(e.target.value)} type="textarea" className="modal-custom-input" placeholder="Type here..." />
                        </FormGroup>
                    </Form>
                    <div className="moadl-button-holder">
                        <Button className="cancel-button-modal" size="sm"
                            onClick={() => closeForm()}
                        >
                            cancel
                        </Button>
                        <Button size="sm" type="button" onClick={send_instruction} className="okay-button-modal">
                            send
                        </Button>
                    </div>
                </ModalBody>
                {/* <ModalFooter>
          
        </ModalFooter> */}
            </Modal>
        </>
    )
}

export default AssetsListModal
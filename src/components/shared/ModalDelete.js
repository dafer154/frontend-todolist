import React, { Component } from 'react'

export class ModalDelete extends Component {
    
    state = {
      show: this.props.show  
    }

    render() {
        return (
            <Modal
                size="sm"
                show={show}
                onHide={() => setSmShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Small Modal
          </Modal.Title>
                </Modal.Header>
                <Modal.Body>...</Modal.Body>
            </Modal>
        )
    }
}

export default ModalDelete

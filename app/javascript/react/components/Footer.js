import React, {Component} from 'react'
import Modal from 'react-modal'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    }
  }
    
  openModal = () => {
    this.setState({ modalIsOpen: true });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }
  
  render() {
    const amazonURL = 'https://amzn.to/30luOih'
    const ebayURL = 'http://rover.ebay.com/rover/1/711-53200-19255-0/1?icep_ff3=1&pub=5575498984&toolid=10001&campid=5338525958&customid=&ipn=psmain&icep_vectorid=229466&kwid=902099&mtid=824&kw=lg'

    return(
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className='w3' style={{padding: '50px'}}>
            <div className="logo-text" href="#">product<span className="logo-text-bold">fetch</span></div>
            <br/>
            ProductFetch is an product research application that 
            <br/>
            simulatenously searches the best new and used prices 
            <br/>
            from Amazon and Ebay. 
            <br/>
            <br/>
            Built by GTH Industries, 2019
          </div>
        </Modal>
        <div style={{ backgroundColor: '#ececec', height: '120px', display: 'flex', alignItems: 'center'}}>
          <div className="row s4 w3 columns">
            <div>
              <a href={amazonURL} target="_blank">Amazon Direct Link</a>
              <br/>
              <a href={ebayURL} target="_blank">Ebay Direct Link</a>
              <br/>
              <a onClick={this.openModal} target="_blank">About ProductFetch</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Footer
import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Button, Form, Row, Col, Alert } from 'react-bootstrap';

export class upload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            file: '',
            alertshow: false,
            alertvariant: '',
            alertmsg: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            file : e.target.files[0]
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", this.state.file);

        try {
            const fileUpload = await axios.post("http://localhost:5000/upload", formData);
            localStorage.setItem('filename',fileUpload.data.filename);
            this.setState({
                alertshow : true,
                alertvariant : 'success',
                alertmsg: 'Success'
            })

            const timeId = setTimeout(() => {
                this.setState({
                    alertshow : false
                })
            }, 3000)
          
            return () => {
                clearTimeout(timeId)
            }

        } catch (e) {
            console.log(e)
            this.setState({
                alertshow : true,
                alertvariant : 'danger',
                alertmsg: e.msg ? e.msg : 'something wrong'
            })

            const timeId = setTimeout(() => {
                this.setState({
                    alertshow : false
                })
            }, 3000)
          
            return () => {
                clearTimeout(timeId)
            }
        }
    }

    render() {
        return (
            <Fragment>
                {
                    this.state.alertshow && <Alert variant={this.state.alertvariant} onClose={() => this.setState({
                        alertshow : false
                    })} dismissible>
                        {this.state.alertmsg}
                    </Alert>
                }
               

                <Form onSubmit={this.handleSubmit}>
                    <Row className="justify-content-md-center">
                        <Col xs="auto">
                            <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                                File
                            </Form.Label>
                            <Form.Control type="file" className="mb-2" placeholder="File" onChange={this.handleChange} />
                        </Col>
                    </Row>

                    <Row className='mt-2 justify-content-md-center' >
                        <Col xs="auto">
                            <Button variant="outline-primary" type="submit">Submit</Button>
                        </Col>
                    </Row>
                </Form>
            </Fragment>
            
        )
    }
}

export default upload

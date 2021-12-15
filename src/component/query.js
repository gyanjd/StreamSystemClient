import React, { Component, Fragment } from 'react'
import axios from 'axios';
import { Button, Form, Row, Col, Alert, ListGroup } from 'react-bootstrap';

export class query extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filename: '',
            query: '',
            for_whom: '',
            limit: '',
            queryOption: [],
            alertshow: false,
            alertvariant: '',
            alertmsg: '', 
            resData: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            filename : localStorage.getItem('filename'),
            query : this.state.query,
            for_whom : this.state.for_whom,
            limit : this.state.limit
        }

        try {
            const fileUpload = await axios.post("http://localhost:5000/action", data);

            this.setState({
                resData : fileUpload.data
            });

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
            console.log(e);
            this.setState({
                alertshow : true,
                alertvariant : 'danger',
                alertmsg: e.msg ? e.msg : 'something wrong',
                resData: '',
                for_whom: '',
                limit: ''
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

    async componentDidMount(){
        try {
            const queryData = await axios.get("http://localhost:5000/getquery");
            localStorage.setItem('query',JSON.stringify(queryData.data.query));
            this.setState({
                queryOption : JSON.parse(localStorage.getItem('query'))
            });
        } catch (e) {
            console.log(e);
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
                            <Form.Label column lg={2}> condition </Form.Label>
                                <Form.Select name="query" value ={this.state.query} onChange={this.handleChange}>
                                <option value="-1" defaultValue>select</option>
                                {
                                    this.state.queryOption.length > 0 && this.state.queryOption.map(
                                        (q) => {
                                            return <option key={q.id} value={q.id}>{q.type}</option>
                                        }
                                    )
                                }
                            </Form.Select>
                        </Col>
                        
                        <Col xs="auto">
                            <Form.Label column lg={2}> Value </Form.Label>
                            <Form.Control type="text" name="for_whom" value ={this.state.for_whom} onChange={this.handleChange} placeholder="enter value" />
                        </Col>

                        {
                            this.state.query === "0" && 
                            <Col xs="auto">
                                <Form.Label column lg={2}> Limit </Form.Label>
                                <Form.Control type="text" name="limit" value ={this.state.limit} onChange={this.handleChange} placeholder="enter limit" />
                            </Col>
                        }
                    </Row>

                    <Row className='mt-2 justify-content-md-center'>
                        <Col xs="auto">
                            <Button variant="outline-primary" type="submit">Submit</Button>
                        </Col>
                    </Row>
                </Form>

                <Row style={{ 'marginTop' : 25}}>
                    {
                        this.state.resData && 
                        <ListGroup> 
                            {
                                this.state.resData.map((d) => {
                                    return <ListGroup.Item key={d.sl}>username : {d.username}, coontent : {d.text}, place : {d.location}, use hashtag : {

                                        d.hashtag.map((dd, index) => {
                                            return <span key={index}>{dd}, </span>
                                        })

                                    } </ListGroup.Item>
                                })
                            }                
                        </ListGroup>
                    }
                </Row>
            </Fragment>
        )
    }
}

export default query

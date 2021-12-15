import Upload from './component/upload'; 
import Query from './component/query';
import { Container, Row, Col } from 'react-bootstrap';

function App() {
  return (
    <Container>
      <Row className="justify-content-md-center" style={{ 'marginTop' : 25}}>
        <Col>
          <Upload />
        </Col>
      </Row>

      <Row className="justify-content-md-center" style={{ 'marginTop' : 25}}>
        <Col><Query /></Col>
      </Row>

    </Container>
  );
}

export default App;

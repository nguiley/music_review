import { Container, Row, Col, Button } from 'react-bootstrap';

function SongRating({ trackName, artistName, rating, setRating }) {

  // Handle rating change
  const handleRating = (newRating) => {
    setRating(newRating);
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h4>Rate the Song</h4>
          <p>
            <strong>{trackName}</strong> by <em>{artistName}</em>
          </p>
          <div>
            {[1, 2, 3, 4, 5].map((num) => (
              <Button
                key={num}
                variant={num <= rating ? 'warning' : 'secondary'}
                onClick={() => handleRating(num)}
                className="mr-2"
              >
                {num}⭐
              </Button>
            ))}
          </div>
          <div className="mt-2">
            <strong>Rating: </strong> {rating} / 5
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default SongRating;

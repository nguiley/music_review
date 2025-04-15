// src/components/ReviewTextBox.js
import { FormControl, Button } from 'react-bootstrap';

function ReviewTextBox({ reviewText, setReviewText }) {

  // Handle review change
  const handleReviewChange = (event) => {
    setReviewText(event.target.value);  // Update the review text
  };

  return (
    <div>
      <FormControl
        as="textarea"
        rows={4}
        placeholder="Write your review here..."
        value={reviewText}
        onChange={handleReviewChange}
      />
    </div>
  );
}

export default ReviewTextBox;
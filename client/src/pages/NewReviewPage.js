import SongSearchBox from '../components/SongSearchBox';
import SongRating from '../components/SongRating';
import SongReview from '../components/SongReview';
import { useState, useEffect, use } from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../contexts/authContext'
import { useNavigate } from 'react-router-dom';

function NewReviewPage() {
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [rating, setRating] = useState(1); // Rating state (1-5)
    const [reviewText, setReviewText] = useState("");

    const { userLoggedIn, currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!userLoggedIn) {
            navigate('/LoginPage');
        }
    }, [userLoggedIn])

    useEffect(() => {
        if (rating) console.log(rating);
    }, [rating])

    useEffect(() => {
        if (selectedTrack) console.log(selectedTrack);
    }, [selectedTrack])

    async function handleSubmit() {
        try {
            const newReview = { 
                track_id: String(selectedTrack.id),
                user_id: String(currentUser.uid),
                rating: Number(rating), 
                review_text: String(reviewText),
                review_title: String(`${selectedTrack.name} by ${selectedTrack.artists[0]?.name}`),
                image_url: String(selectedTrack.album.images[0].url)
            };
            const response = await fetch(`http://localhost:5000/api/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newReview)
            })

            if (!response.ok) {
                console.error('Problem submitting review:', response.statusText);
                return;
            }

            const data = await response.json();
            console.log('Successfully submitted review:', data);
        } catch (error) {
            console.error('Failure: ', error);
        }
    };

    return (
        <div className="App">
            <SongSearchBox selectedTrack={selectedTrack} setSelectedTrack={setSelectedTrack} />
            {selectedTrack && selectedTrack.artists && selectedTrack.artists.length > 0 && (
                <SongRating
                    trackName={selectedTrack.name}
                    artistName={selectedTrack.artists[0]?.name || 'Unknown Artist'} // Default value for safety
                    rating={rating}
                    setRating={setRating}
                />
            )}
            {selectedTrack && selectedTrack.artists && selectedTrack.artists.length > 0 && rating && (
                <SongReview
                    trackName={selectedTrack.name}
                    artistName={selectedTrack.artists[0]?.name || 'Unknown Artist'} // Default value for safety
                    reviewText={reviewText}
                    setReviewText={setReviewText}
                />
            )}
            {selectedTrack && selectedTrack.artists && selectedTrack.artists.length > 0 && rating && (
                <Button className="mt-2" onClick={handleSubmit} variant="primary">
                    Submit
                </Button>
            )}
        </div>
    );
}

export default NewReviewPage;
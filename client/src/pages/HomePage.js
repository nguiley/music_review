import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import { useAuth } from '../contexts/authContext'

function HomePage() {
    const { userLoggedIn, currentUser } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [userName, setUserName] = useState("");

    async function getReviews() {
        try {
            const response = await fetch(`http://localhost:5000/api/reviews`);

            if (!response.ok) {
                console.error('Problem getting reviews:', response.statusText);
                return;
            }

            const data = await response.json();
            setReviews(data);
            console.log('Reviews:', data);
        } catch (error) {
            console.error('Failure: ', error);
        }
    }

    useEffect(() => {
        getReviews();
        if (userLoggedIn) {
            console.log(currentUser);
            if (currentUser.displayName) {
                setUserName(currentUser.displayName);
            }
        }
    }, [])

    const ReviewCard = ({ track_id, image_url, review_title, year, rating, reviewer, created_at, commentCount, likes, review_text }) => {
        return (
            <div>
                <hr></hr>
                <div className="review-card">
                    <div>
                        <a href={track_id}><img className="poster" src={image_url} alt={`${review_title} image`} height={150}/></a>
                    </div>
                    <div className="details">
                        <h2 className="movie-title"><a href={track_id}>{review_title}</a></h2>
                        <div className="meta">
                            <p className="rating">Rating: {rating}</p>
                            <p className="date">Date: {created_at}</p>
                        </div>
                        <p className="review-text">{review_text ? `Review: ${review_text}` : ''}</p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>
            <Container>
                <h3 className='welcome'>{userLoggedIn ? `Welcome back${userName ? ` ${userName}` : ''}!` : 'Welcome!'}</h3>
                {reviews.map((review, index) => (
                    <ReviewCard key={index} {...review} />
                ))}
            </Container>
        </div>
    )
}

export default HomePage;
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import styles from './SongPage.module.css';

function SongPage() {
    const { track_id } = useParams();
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    async function searchTrackId() {
        try {
            const response = await fetch(`http://localhost:5000/api/search-track-id?query=${track_id}`);
            await response.json()
                .then((data) => {
                    console.log(data);
                    if (data) {
                        setSearchResults(data);
                        setLoading(false);
                    } else {
                        setSearchResults([]);
                    }
                })
        } catch (err) {
            console.error('Failed to search track id', err);
            setError(true);
        }
    }

    useEffect(() => {
        setError(false);
        searchTrackId()
    }, [])

    if (!loading) {
        return (
            <div className={styles.container}>
                <div className={styles['image-container']}>
                    <img
                        src={searchResults.album.images[0].url}
                        alt={searchResults.name}
                        className={styles.image}
                    />
                </div>
                <div className={styles['info-container']}>
                    <h1>{searchResults.name}</h1>
                    <p>Album: {searchResults.album.name}</p>
                    <p>ADD MORE INFO HERE AND MAKE BUTTON TAKE USER TO SONG ON SPOTIFY</p>
                    <button>Learn More</button>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <Container>
                    <h3 className='welcome'>Loading...</h3>
                </Container>
            </div>
        )
    }
}

export default SongPage;
import { Container, InputGroup, FormControl, ListGroup } from 'react-bootstrap';
import { useState, useEffect } from 'react';

function SongSearchBox({ selectedTrack, setSelectedTrack }) {
    const [searchInput, setSearchInput] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [searchResults, setSearchResults] = useState([]); // To store the search results
    const [timer, setTimer] = useState(null); // Timer for debouncing
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [selectedTrackText, setSelectedTrackText] = useState("");

    async function search() {
        try {
            const response = await fetch(`http://localhost:5000/api/search?query=${searchInput}`);
            await response.json()
                .then((data) => {
                    console.log(data);
                    if (data) {
                        setSearchResults(data);
                        setSelectedIndex(null);
                    } else {
                        setSearchResults([]);
                    }
                })
        } catch (error) {
            console.error('Failed to search tracks', error);
        }
    }

    // Debounce the search function: trigger only if no input for 1 second
    useEffect(() => {
        if (searchInput === selectedTrackText) {
            setSearchResults([]);
            return;
        }
        
        if (timer) clearTimeout(timer); // Clear any existing timer

        if (!searchInput.trim()) {
            // If input is empty, clear results immediately
            setSearchResults([]);
            return;
        }

        const newTimer = setTimeout(() => {
            if (searchInput) search(); // Call search after 1 second
        }, 1000);

        setTimer(newTimer);

        // Cleanup timeout when the component unmounts or input changes
        return () => clearTimeout(newTimer);
    }, [searchInput]); // Trigger this effect when searchInput changes

    // Handle item click
    const handleSelect = (index) => {
        const SelectedTrack = searchResults[index];
        const SelectedTrackText = `${SelectedTrack.name} by ${SelectedTrack.artists[0]?.name}`;
        setSelectedTrackText(SelectedTrackText);
        setSelectedTrack(SelectedTrack);
        setSearchInput(SelectedTrackText); // Update the search box
        setSearchResults([]); // Clear the search results
        setSelectedIndex(null); // Reset the selection index
    };

    return (
        <div>
            <Container>
                <InputGroup className="mb-3" size="lg">
                    <FormControl
                        placeholder="Search for Song to Review"
                        type="text"
                        value={searchInput}
                        onChange={(event) => {
                            setSearchInput(event.target.value);
                            setSelectedTrackText("");
                            setSelectedTrack(null);
                        }}
                    />
                </InputGroup>
                {(searchResults.length > 0) && (
                    <ListGroup>
                        {searchResults.map((track, index) => (
                            <ListGroup.Item
                                key={track.id}
                                className={`list-group-item ${selectedIndex === index ? "selected" : ""
                                    }`}
                                onClick={() => handleSelect(index)}
                            >
                                {track.name} by {track.artists[0]?.name}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Container>
        </div>
    )
}

export default SongSearchBox;
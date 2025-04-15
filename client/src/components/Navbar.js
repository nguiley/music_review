import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useAuth } from '../contexts/authContext';
import { doSignOut } from '../firebase/auth';

function MyNavbar() {
    const { userLoggedIn } = useAuth();

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">Music Review</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="/NewReviewPage">Make a Review</Nav.Link>
                        {userLoggedIn ? (
                            <Nav.Link href="/" onClick={doSignOut}>
                                Logout
                            </Nav.Link>
                        ) : (
                            <Nav.Link href="/LoginPage">Login / Register</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNavbar;

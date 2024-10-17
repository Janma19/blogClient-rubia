import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { Notyf } from 'notyf';

import UserContext from '../context/UserContext';

export default function Register() {
    const notyf = new Notyf();
    const { user } = useContext(UserContext);

    // State hooks to store the values of the input fields
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (username !== "" && email !== "" && password !== "" && password === confirmPassword) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [username, email, password, confirmPassword]);

    function registerUser(e) {
        // Prevents page redirection via form submission
        e.preventDefault();

        fetch('http://localhost:4000/users/register', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                username: username,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);

            if (data.message === "Registered Successfully") {
                setEmail('');
                setUsername('');
                setPassword('');
                setConfirmPassword('');

                notyf.success("Registration successful");
            }
        });
    }

    return (
        user.id !== null ? (
            <Navigate to="/posts" />
        ) : (
            <Form onSubmit={registerUser}>
                <h1 className="my-5 text-center">Register</h1>

                <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Username"
                        required
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter Email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Confirm Password:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        required
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>

                {isActive ? (
                    <Button variant="primary" type="submit" id="submitBtn">Submit</Button>
                ) : (
                    <Button variant="danger" type="submit" id="submitBtn" disabled>Submit</Button>
                )}
            </Form>
        )
    );
}

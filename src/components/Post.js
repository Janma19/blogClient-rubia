import { useState, useEffect, useContext } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Notyf } from 'notyf';
import UserContext from '../context/UserContext';

export default function Post() {
    const notyf = new Notyf();
    const { user } = useContext(UserContext);

    // State hooks to store the values of the input fields and posts
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [posts, setPosts] = useState([]);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (title !== "" && content !== "") {
            setIsActive(true);
        } else {
            setIsActive(false);
        }

        fetchPosts();
    }, [title, content]);

    function createPost(e) {
        e.preventDefault();

        fetch('http://localhost:4000/posts', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                title: title,
                content: content
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.message === "Post created successfully") {
                notyf.success("Post created successfully");
                setTitle('');
                setContent('');
                fetchPosts(); // Refresh the post list
            } else {
                notyf.error(data.error || "Error creating post");
            }
        });
    }

    function fetchPosts() {
        fetch('http://localhost:4000/posts', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setPosts(data);
        });
    }

    return (
        <div>
            {user.id !== null ? (
                <div>
                    <Form onSubmit={createPost}>
                        <h1 className="my-5 text-center">Create Post</h1>

                        <Form.Group>
                            <Form.Label>Title:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Title"
                                required
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Content:</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                placeholder="Enter Content"
                                required
                                value={content}
                                onChange={e => setContent(e.target.value)}
                            />
                        </Form.Group>

                        {isActive ? (
                            <Button variant="primary" type="submit">Submit</Button>
                        ) : (
                            <Button variant="danger" type="submit" disabled>Submit</Button>
                        )}
                    </Form>

                    <div className="mt-5">
                        <h2 className="text-center">Posts</h2>
                        {posts.map(post => (
                            <Card key={post._id} className="my-3">
                                <Card.Body>
                                    <Card.Title>{post.title}</Card.Title>
                                    <Card.Text>{post.content}</Card.Text>
                                    <footer className="blockquote-footer">
                                        By {post.author.username}
                                    </footer>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                </div>
            ) : (
                <p className="text-center">Please login to view or create posts.</p>
            )}
        </div>
    );
}

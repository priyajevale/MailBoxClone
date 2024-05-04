import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleForgotPassword = () => {
    setLoading(true);
    setError(null);

    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDpBHhQx38EYKLP7O0EKTc6Lxo2c_cebHs`,
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
          requestType: "PASSWORD_RESET",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error.message);
        } else {
          setSuccess(true);
        }
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container>
      <h1 className="mt-4">Forgot Password</h1>
      <Form>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}

          />
        </Form.Group>
        <Button
          variant="primary"
          className="mt-3"
          onClick={handleForgotPassword}
          disabled={loading}
        >
          Reset Password
        </Button>
        {loading && <p>Loading...</p>}
        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}
        {success && (
          <Alert variant="success" className="mt-3">
            Password reset email sent. Check your inbox to reset your password.
          </Alert>
        )}
      </Form>
    </Container>
  );
};

export default ForgotPassword;
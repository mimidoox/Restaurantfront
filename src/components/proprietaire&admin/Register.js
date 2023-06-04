import React, { useState } from 'react';

function Register() {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    // Send a POST request to the signup endpoint
    const response = await fetch('http://localhost:8082/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nom, prenom, email, login, password }),
    });

    if (response.ok) {
      // Handle successful signup
      console.log('Signup successful');
    } else {
      // Handle signup failure
      console.log('Signup failed');
    }
  };

  return (
    <Container>
    <h1>Signup</h1>
    <Form onSubmit={handleSignup}>
      <FormGroup>
        <Label for="nom">Nom:</Label>
        <Input type="text" id="nom" value={nom} onChange={(e) => setNom(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label for="prenom">Prénom:</Label>
        <Input type="text" id="prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label for="email">Email:</Label>
        <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label for="login">Login:</Label>
        <Input type="text" id="login" value={login} onChange={(e) => setLogin(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label for="password">Password:</Label>
        <Input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </FormGroup>
      <Button type="submit" color="primary">Signup</Button>
    </Form>
  </Container>
  );
}

export default Register;

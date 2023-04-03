import { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios'

export const CreatePatient = () => {

  const [patient, setPatient] = useState({
    name: '',
    lastName: '',
    birthDate: '',
    disease: ''
  })

  const [message, setMessage] = useState('')

  const createPatientHandle = async () => {
    try {
      if (patient.name && patient.lastName && patient.birthDate && patient.disease) {
        await axios.post(`${process.env.BACKEND_URL}/patients`, { ...patient })
        updateMessage('Paciente cadastrado com sucesso')
      }
    } catch (error) {
      updateMessage('Ocorreu um erro ao tentar cadastrar o paciente')
      console.log(error)
    }
  }

  const updateMessage = (message) => {
    setMessage(message)
    setTimeout(() => setMessage(''), 3000)
  }

  const handleChange = (event) => {
    const value = event.target.value
    const name = event.target.name

    setPatient({
      ...patient,
      [name]: value
    })
  }

  return (
    <Container>
      <Form action='POST' method='POST'>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control name='name' type="text" placeholder="Nome" value={patient.name} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Control name='lastName' type="text" placeholder="Ultimo nome" value={patient.lastName} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Control name='birthDate' type="date" placeholder="Data de nascimento" value={patient.birthDate} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Control name='disease' type="text" placeholder="Doença" value={patient.disease} onChange={handleChange} />
        </Form.Group>
        <Button type='button' onClick={createPatientHandle}>Enviar</Button>
        <span> {message}</span>
      </Form>
      <Link to='/'>
        <Button type='button'>Voltar</Button>
      </Link>
    </Container>
  )
}
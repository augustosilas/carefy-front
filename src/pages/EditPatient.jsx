import { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios'

export const EditPatient = () => {
  const { state: { id, name, lastName, birthDate, disease } } = useLocation()

  const formatDateToPicker = (date) => {
    const convertedDate = new Date(date)

    const day = `${convertedDate.getDate() + 1}`.padStart(2, '0')
    const month = `${convertedDate.getMonth() + 1}`.padStart(2, '0')
    const year = convertedDate.getFullYear()

    return `${year}-${month}-${day}`
  }

  const formatDate = (date) => {
    const convertedDate = new Date(date)

    const day = `${convertedDate.getDate()}`.padStart(2, '0')
    const month = `${convertedDate.getMonth()}`.padStart(2, '0')
    const year = convertedDate.getFullYear()

    return `${year}-${month}-${day}`
  }

  const [patient, setPatient] = useState({
    name: name ?? '',
    lastName: lastName ?? '',
    birthDate: birthDate ?? '',
    disease: disease ?? ''
  })

  const [message, setMessage] = useState('')

  const editPatientHandle = async () => {
    try {
      console.log('patient', patient)
      if (Reflect.ownKeys(patient).length) {
        await axios.patch(`http://localhost:3008/patients/${id}`, { ...patient })
        updateMessage('Paciente atualizado com sucesso')
      }
    } catch (error) {
      updateMessage('Ocorreu um erro ao tentar atulizar os dados do paciente')
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
      [name]: (name === 'birthDate' && value.length === 10) ? formatDateToPicker(value) : value
    })
  }

  return (
    <Container>
      <Form action='POST' method='POST'>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control
            name='name'
            type="text"
            placeholder="Nome"
            defaultValue={patient.name}
            value={patient.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Control
            name='lastName'
            type="text"
            placeholder="Ultimo nome"
            defaultValue={patient.lastName}
            value={patient.lastName}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Control
            type="date"
            name='birthDate'
            defaultValue={patient.birthDate ? formatDate(patient.birthDate) : 'dd/mm/aaaa'}
            // value={patient.birthDate}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Control
            name='disease'
            type="text"
            placeholder="Doença"
            value={patient.disease}
            onChange={handleChange}
          />
        </Form.Group>

        <Button
          type='button'
          onClick={editPatientHandle}
        >
          Enviar
        </Button>

        <span> {message}</span>
      </Form>
      <Link to='/'>
        <Button type='button' onClick={() => console.log(patient)}>Voltar</Button>
      </Link>
    </Container>
  )
}
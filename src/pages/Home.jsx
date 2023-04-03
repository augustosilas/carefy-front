import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { Table, Button, Pagination } from 'react-bootstrap'
import axios from 'axios'

const Home = () => {
  const [patients, setPatients] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3008/patients')
      .then(({ data }) => {
        setPatients(data)
      })
      .catch(console.log)
  }, [])

  const formateData = (birthDate) => {
    return new Intl
      .DateTimeFormat('pt-BR', { month: "long", day: "2-digit", year: "numeric" })
      .format(new Date(birthDate))
  }

  const deletePatientHandle = async (patientId) => {
    try {
      await axios.delete(`http://localhost:3008/patients/${patientId}`)
      setPatients(patients.filter(patient => patient.id !== patientId))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Data de nascimento</th>
            <th>Doença</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {
            patients.map(patient => (
              <tr key={patient.id}>
                <td>{patient.name} {patient.lastName}</td>
                <td>{formateData(patient.birthDate)}</td>
                <td>{patient.disease}</td>
                <td>
                  <Link to={{
                    pathname: '/edit',
                  }}
                    state={{ ...patient }}
                  >
                    <Button variant="outline-dark">Editar</Button>
                  </Link>
                  <Button variant="outline-dark" onClick={async () => {
                    await deletePatientHandle(patient.id)
                  }}>Deletar</Button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
      <Link to='/create'>
        <Button variant="primary" size="lg">
          Cadastrar
        </Button>
      </Link>
    </div >
  )
}

export { Home }
import Link from "next/link"
import fetch from "isomorphic-unfetch"
import { Button, Card } from 'semantic-ui-react'
import { useState } from 'react'
import Image from 'next/image'
import gsdImage from '../assets/GSD.jpg'

interface gundam {
  _id: string;
  title: string;
}

interface PageProps {
  gundamData: gundam[]
}

const Index = ({ gundamData }: PageProps) => {
  const [gundamNotes, setGundamNotes] = useState(gundamData)
  const [sortType, setSortType] = useState('ascending')
  
  const updateGundamNotes = gundamData.sort((a, b) => {
    const isReversed = (sortType === 'ascending') ? 1 : -1
    return isReversed * a.title.localeCompare(b.title)
  })

  const sortCountries = (sortby) => {
    setSortType(sortby)
    setGundamNotes(updateGundamNotes)
  }

  return (
    <div className="list-container">
      <h1>Mecha Data List</h1>

      <div className="filters">
        <Image
          src={gsdImage}
          width="1200px"
          height="600px"
        />
        <Button className='ascending-button' secondary onClick={() => sortCountries('ascending')}>Sort Ascending</Button>
        <Button className='descending-button' secondary onClick={() => sortCountries('descending')}>Sort Descending</Button>
      </div>
      <div className="grid wrapper">        
      {gundamNotes.map(gundamNote => {        
        return(
          <div key={gundamNote._id}>
            <Card>
              <Card.Content>
                <Card.Header>
                  <Link href={`/${gundamNote._id}`}>
                    <a>{gundamNote.title}</a>
                  </Link>
                </Card.Header>
              </Card.Content>
              <Card.Content extra>
                <Link href={`/${gundamNote._id}/edit`}>
                  <Button primary>Update</Button>
                </Link>
                <Link href={`/${gundamNote._id}`}>
                  <Button primary>View</Button>
                </Link>
              </Card.Content>
            </Card>
          </div>
        )
      })
      }
      </div>
    </div>
  )
}

Index.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/notes')
  const { data } = await res.json()

  return { gundamData: data }
}

 export default Index
import Link from "next/link"
import { Button, Card, Loader } from 'semantic-ui-react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import gsdImage from '../../../assets/GSD.jpg'
import { useRouter } from "next/router";
import * as Realm from "realm-web";

const Index = () => {
  const { query } = useRouter()
  const [gundamNotes, setGundamNotes] = useState([])
  const [sortType, setSortType] = useState('ascending')
  
  useEffect(() => {
    const fetchData = async () => {
      if (query.term) {
        const REALM_APP_ID = process.env.NEXT_PUBLIC_REALM_APP_ID
        const app = new Realm.App({ id: REALM_APP_ID })
        const credentials = Realm.Credentials.anonymous()
        try {
            const user = await app.logIn(credentials)
            const searchedGundamNotes = await user.functions.searchGundamNotes(query.term)
            setGundamNotes(() => searchedGundamNotes)
        } catch (error) {
            console.error(error)
        }
      }
    }
    fetchData()
  }, [query])

  const updateGundamNotes = gundamNotes.sort((a, b) => {
    const isReversed = (sortType === 'ascending') ? 1 : -1
    return isReversed * a.title.localeCompare(b.title)
  })

  const sortCountries = (sortby) => {
    setSortType(sortby)
    setGundamNotes(updateGundamNotes)
  }

  return (
    <div className="list-container">
      <h1>Search Mecha Data List</h1>
      <div className="filters">
        <Image
          src={gsdImage}
          width="1200px"
          height="600px"
        />
        <div>
        <Button className='ascending-button' secondary onClick={() => sortCountries('ascending')}>Sort Ascending</Button>
        <Button className='descending-button' secondary onClick={() => sortCountries('descending')}>Sort Descending</Button>
        </div>        
      </div>
      <div className="grid wrapper">
      {Object.keys(gundamNotes).length === 0 && <Loader />}       
      {gundamNotes && gundamNotes.map(gundamNote => {        
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

 export default Index
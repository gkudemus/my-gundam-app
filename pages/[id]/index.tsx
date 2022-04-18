
import fetch from 'isomorphic-unfetch'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Confirm, Button, Loader } from 'semantic-ui-react'

interface PageProps {
    gundamNotes: any
}

const GundamEntryNote = ({ gundamNotes }: PageProps) => {
    const [confirm, setConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const [search, setSearch] = useState(gundamNotes.title)
    const [results, setResults] = useState([])
    const [searchInfo, setSearchInfo] = useState({})

    useEffect(() => {
        if (isDeleting) {
            deleteNote();
        }
    }, [isDeleting])

    const open = () => setConfirm(true)
    const close = () => setConfirm(false)
    const back = () => router.push("/")

    const deleteNote = async () => {
        const noteId = router.query.id;
        try {
            const deleted = await fetch(`http://localhost:3000/api/notes/${noteId}`, {
                method: "Delete"
            })
            router.push("/");
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async () => {
        setIsDeleting(true);
        close();
    }

    const handleSearch = async e => {
        e.preventDefault()
        if(search === '') return

        const endpoint = `https:en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${search}`

        const response = await fetch(endpoint)
        if(!response.ok) throw Error(response.statusText)

        const json = await response.json()
        setResults(json.query.search)
        setSearchInfo(json.query.searchinfo)
    }

    return (
        <div className="note-container">
            {isDeleting
                ? <Loader active />
                :
                <>
                    <h1>{gundamNotes.title}</h1>
                    <h5>Description</h5>
                    <p>{gundamNotes.description}</p>
                    <h5>Armaments</h5>
                    <p>{gundamNotes.armaments}</p>
                    <h5>Equipment</h5>
                    <p>{gundamNotes.equipment}</p>
                    <h5>History</h5>
                    <p>{gundamNotes.history}</p>
                    <h5>Pilot</h5>
                    <p>{gundamNotes.pilot}</p>
                    <Button color='red' onClick={open}>Delete</Button>
                    <Button color='green' onClick={back}>Back</Button>
                    <div className='wiki-container'>
                        <h3>learn more about {gundamNotes.title} in Wiki.</h3>
                        <form onSubmit={handleSearch}>
                            <input 
                                className='wiki-search-box' 
                                type='text' 
                                placeholder={gundamNotes.title}
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                            <button className='wiki-search-button' type="submit">search</button>
                            {(searchInfo.totalhits) ? <h3>Search Result Hits: {searchInfo.totalhits} </h3> : null }
                            <div className='results'>
                                {results.map((result, idx) => {
                                    const wikiUrl = `https://en.wikipedia.org/?curid=${result.pageid}`
                                    return (
                                        <div className='result' key={idx}>
                                            <h3>{result.title}</h3>
                                            <p dangerouslySetInnerHTML={{ __html: result.snippet}}></p>
                                            <a href={wikiUrl} target='_blank' rel='nofollow'>Read more</a>
                                        </div>                                       
                                    )
                                })}
                            </div>
                        </form>               
                    </div>
                </>
            }
            <Confirm
                open={confirm}
                onCancel={close}
                onConfirm={handleDelete}
            />            
        </div>
    )
}

GundamEntryNote.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`http://localhost:3000/api/notes/${id}`)
    const { data } = await res.json()
    return { gundamNotes: data }
}

export default GundamEntryNote
import { useState, useEffect } from 'react'
import fetch from 'isomorphic-unfetch'
import { Button, Form, Loader } from 'semantic-ui-react'
import { useRouter } from 'next/router'

const EditGundamNote = ({ note }) => {
    const [form, setForm] = useState({ 
        title: note.title, 
        description: note.description,
        armaments: note.armaments,
        equipment: note.equipment,
        history: note.history,
        pilot: note.pilot
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errors, setErrors] = useState({
        title: '', 
        description: '',
        armaments: '',
        equipment: '',
        history: '',
        pilot: ''
    })
    const router = useRouter()

    useEffect(() => {
        if (isSubmitting) {
            if(errors.title === '' && 
            errors.description === '' &&
            errors.armaments === '' &&
            errors.equipment === '' &&
            errors.history === '' &&
            errors.pilot === ''){
                updateNote();
            }
            else {
                setIsSubmitting(false);
            }
        }
    }, [errors])

    const updateNote = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/notes/${router.query.id}`, {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let errs = validate();
        setErrors(errs);
        setIsSubmitting(true);
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const validate = () => {
        let errors = {
            title: '', 
            description: '',
            armaments: '',
            equipment: '',
            history: '',
            pilot: ''
        }
        
        if(!form.title) errors.title = 'Title is required'
        if(!form.description) errors.title = 'Description field is required'        
        if(!form.armaments) errors.armaments = 'Armaments field is required'           
        if(!form.equipment) errors.equipment = 'Equipment field is required'            
        if(!form.history) errors.history = 'History field is required'        
        if(!form.pilot) errors.pilot = 'Pilot field is required'
        return errors
    }

    const back = () => router.push("/")

    return (
        <div className="form-container">
            <h1>Update Mecha Entry</h1>
            <div>
                {
                    isSubmitting
                        ? <Loader active inline='centered' />
                        : <Form onSubmit={handleSubmit}>
                            <Form.Input
                                error={errors.title ? { content: 'Please enter a title', pointing: 'below' } : null}
                                label='Title'
                                placeholder='Title'
                                name='title'
                                value={form.title}
                                onChange={handleChange}
                            />
                            <Form.TextArea
                                label='Description'
                                placeholder='Description'
                                name='description'
                                error={errors.description ? { content: 'Please enter a description', pointing: 'below' } : null}
                                value={form.description}
                                onChange={handleChange}
                            />
                            <Form.TextArea
                                label='Armaments'
                                placeholder='Armaments'
                                name='armaments'
                                error={errors.armaments ? { content: 'Please enter armaments details', pointing: 'below' } : null}
                                value={form.armaments}
                                onChange={handleChange}
                            />
                            <Form.TextArea
                                label='Equipment'
                                placeholder='Equipment'
                                name='equipment'
                                error={errors.equipment ? { content: 'Please enter equipment details', pointing: 'below' } : null}
                                value={form.equipment}
                                onChange={handleChange}
                            />
                            <Form.TextArea
                                label='History'
                                placeholder='History'
                                name='history'
                                error={errors.history ? { content: 'Please enter history details', pointing: 'below' } : null}
                                value={form.history}
                                onChange={handleChange}
                            />
                            <Form.TextArea
                                label='Pilot'
                                placeholder='Pilot'
                                name='pilot'
                                error={errors.pilot ? { content: 'Please enter history details', pointing: 'below' } : null}
                                value={form.pilot}
                                onChange={handleChange}
                            />
                            <Button type='submit'>Update</Button>
                            <Button color='green' onClick={back}>Back</Button>
                        </Form>
                }
            </div>
        </div>
    )
}

EditGundamNote.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`http://localhost:3000/api/notes/${id}`)
    const { data } = await res.json()

    return { note: data }
}

export default EditGundamNote
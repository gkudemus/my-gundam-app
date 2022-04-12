import { useState, useEffect } from "react";
import fetch from 'isomorphic-unfetch'
import { Button, Form, Loader } from "semantic-ui-react";
import { useRouter } from 'next/router'

const newEntry = () => {
    const [form, setForm] = useState({ title: '', description: '' })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errors, setErrors] = useState({title: '', description: ''})
    const router = useRouter()

    useEffect(() => {
        if(isSubmitting){
            if(errors.title === '' && errors.description === ''){
                createEntry()
            } else {
                setIsSubmitting(false)
            }
        }
    }, [errors])

    const createEntry = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/notes', {
                method: 'POST',
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

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        let errors = validate()
        setErrors(errors)
        setIsSubmitting(true)
    }

    const validate = () => {
        let errors = {
            title: '',
            description: ''
        }

        if(!form.title) {
            errors.title = 'Title is required'
        }
        if(!form.description) {
            errors.description = 'Description is required'
        }

        return errors
    }

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    return(
        <div className="form-container">
            <h1>Create Mecha Entry</h1>
            <div>
                {isSubmitting 
                    ?<Loader active inline='centered' />
                    :<Form onSubmit={handleSubmit}>
                        <Form.Input
                            error={errors.title ? { content: 'Please enter a title', pointing: 'below' } : null}
                            label='Title'
                            placeholder='Title'
                            name='title'
                            onChange={handleChange}
                        />
                        <Form.TextArea
                            label='Description'
                            placeholder='Description'
                            name='description'
                            error={errors.description ? { content: 'Please enter a description', pointing: 'below' } : null}
                            onChange={handleChange}
                        />
                        <Button type='submit'>Create</Button>
                    </Form>
                }
            </div>
        </div>
    )
}

export default newEntry
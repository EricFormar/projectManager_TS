import {ChangeEvent, useState} from 'react' 
 
export const useForm = <T extends object> (initialState : T) => { 
    const [formValues, setFormValues] = useState(initialState); 
 
    const handleInputChange = (e : ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>{ 
        setFormValues({ 
            ...formValues, 
            [e.target.name] : e.target.value 
        }) 
    }; 
 
    const reset = (values  = initialState) => { 
        setFormValues(values) 
    } 
 
    return { 
        formValues, 
        handleInputChange, 
        reset 
    } 
}
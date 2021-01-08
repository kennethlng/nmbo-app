import { useContext, useEffect, useState } from "react"
import { AuthUserContext } from '../Session'
import TextField from '@material-ui/core/TextField';

export default function UserEmailInput() {
    const authUser = useContext(AuthUserContext); 
    const [email, setEmail] = useState(''); 
    const [currentEmail, setCurrentEmail] = useState(''); 

    useEffect(() => {
        if (authUser) {
            setEmail(authUser.email);
            setCurrentEmail(authUser.email); 
        }
    }, [authUser])

    const handleChange = e => setEmail(e.target.value); 

    return (
        <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            type="email"
            label="Email"
            name="email"
            value={email}
            onChange={handleChange}
        />
    )
}
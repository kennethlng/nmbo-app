import { useState } from "react"
import TextField from '@material-ui/core/TextField';

export default function UserPasswordInput() {
    const [password, setPassword] = useState(''); 

    const handleChange = e => setPassword(e.target.value); 

    return (
        <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            type="password"
            label="Password"
            name="password"
            value={password}
            onChange={handleChange}
        />
    )
}
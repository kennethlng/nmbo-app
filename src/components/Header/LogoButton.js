import Button from '@material-ui/core/Button'
import Logo from '../Logo';
import * as ROUTES from '../../constants/routes'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    logo: {
        height: 35,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    }
}))

export default function LogoButton() {
    const router = useRouter(); 
    const classes = useStyles(); 

    const handleClick = () => {
        router.push(ROUTES.HOME)
    }

    return (
        <Button
          onClick={handleClick}
        >
          <div className={classes.logo}>
            <Logo/>
          </div>
        </Button>
    )
}
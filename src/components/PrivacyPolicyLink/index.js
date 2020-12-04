import Link from '@material-ui/core/Link';
import * as ROUTES from '../../constants/routes'; 
import { useRouter } from 'next/router';

export default function PrivacyPolicyLink() {
    const router = useRouter(); 

    const handleClick = e => {
        e.preventDefault(); 

        router.push(ROUTES.PRIVACY_POLICY); 
    }

    return (
        <Link component="button" variant="body2" onClick={handleClick} color="textSecondary">
            Privacy
        </Link>
    )
}
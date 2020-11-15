import EmailButton from './EmailButton'
import MessengerButton from './MessengerButton'
import TwitterButton from './TwitterButton'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="level">
                <div className="level-left">
                    <div className="level-item">
                        © NMBO 2020. All Rights Reserved
                    </div>
                </div>
                <div className="level-right">
                    <div className="level-item">
                        <EmailButton/>
                        <MessengerButton/>
                        <TwitterButton/>
                    </div>
                </div>
            </div>
        </footer>
    )
}
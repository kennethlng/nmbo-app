import * as SOCIAL from '../../constants/social'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="level">
                <div className="level-left">
                    <div className="level-item">
                        © Copyright NMBO. All Rights Reserved
                    </div>
                </div>
                <div className="level-right">
                    <div className="level-item">
                        <a href={`mailto:${SOCIAL.EMAIL}`}>
                            <span className="icon is-medium">
                                <i className="fas fa-envelope fa-lg"></i>
                            </span>
                        </a>
                        <a href={SOCIAL.MESSENGER} target="_blank">
                            <span className="icon is-medium">
                                <i className="fab fa-facebook-messenger fa-lg"></i>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
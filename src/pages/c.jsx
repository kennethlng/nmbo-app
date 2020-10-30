import App from '../components/App'
import Head from 'next/head'
import { db } from '../lib/firebase'
import { useContext, useEffect, useState } from 'react'
import { AuthUserContext } from '../components/Session'
import * as DB from '../constants/db'
import * as META from '../constants/meta'
import * as ROUTES from '../constants/routes'
import { UserProject } from '../models/UserProject'
import UserProjectsMenuList from '../components/UserProjectsMenuList'; 

export default function Projects() {
    const authUser = useContext(AuthUserContext);
    const [userProjects, setUserProjects] = useState([]); 

    useEffect(() => {
        if (authUser) {
            db.collection(DB.USERS).doc(authUser.uid).collection(DB.USER_PROJECTS)
            .orderBy(DB.TITLE)
            .get()
            .then(function(querySnapshot) {
                let arr = []; 
                querySnapshot.forEach(function(doc) {
                    let obj = new UserProject(doc);
                    arr.push(obj); 
                })
                setUserProjects(arr); 
            })
            .catch(function(error) {
                console.log("Error retrieving user projects: ", error)
            })
        }
    }, [authUser])

    return (
        <App>
            <Head>
                <title>{META.PROJECTS_TITLE}</title>
                <meta name="title" content={META.PROJECTS_TITLE} />
                <meta property="og:url" content={META.URL + ROUTES.PROJECTS} />
                <meta property="og:title" content={META.PROJECTS_TITLE} />
                <meta property="twitter:url" content={META.URL + ROUTES.PROJECTS} />
                <meta property="twitter:title" content={META.PROJECTS_TITLE} />
            </Head>
            <section className="section">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-half">
                            <h1 className="title is-1 has-text-weight-bold">
                                Checklists
                            </h1>
                            <aside className="menu">
                                <UserProjectsMenuList
                                    userProjects={userProjects}
                                />
                            </aside>
                        </div>
                    </div>
                </div>
            </section>
        </App>
    )
}
import App from '../components/App'
import Head from 'next/head'
import { db, firebase } from '../lib/firebase'
import { useContext, useEffect, useState } from 'react'
import { AuthUserContext } from '../components/Session'
import * as DB from '../constants/db'
import * as META from '../constants/meta'
import * as ROUTES from '../constants/routes'
import * as PAGE_TITLE from '../constants/pageTitle'
import * as LIST_ID from '../constants/listId'
import * as LIST_NAME from '../constants/listName'
import { UserProject } from '../models/UserProject'
import { useRouter } from 'next/router'

export default function Projects() {
    const authUser = useContext(AuthUserContext);
    const router = useRouter(); 
    const [userProjects, setUserProjects] = useState([]); 

    useEffect(() => {
        // Log event for page view
        firebase.analytics().logEvent('page_view', {
            page_path: router.pathname,
            page_title: PAGE_TITLE.PROJECTS,
            page_location: window.location.href
        })

        // Log Google Analytics event for viewing item list
        firebase.analytics().logEvent('view_item_list', {
            item_list_id: LIST_ID.ALL_USER_PROJECTS,
            item_list_name: LIST_NAME.ALL_USER_PROJECTS
        })
    }, [])

    useEffect(() => {
        // Fetch authUser's user_projects
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

    const handleRowClick = (userProject) => {
        // Log Google Analytics event for selecting item
        firebase.analytics().logEvent('select_item', {
            items: [{
                item_id: userProject[DB.ID],
                item_name: userProject[DB.TITLE],
                item_list_name: LIST_NAME.ALL_USER_PROJECTS,
                item_list_id: LIST_ID.ALL_USER_PROJECTS
            }],
            item_list_name: LIST_NAME.ALL_USER_PROJECTS,
            item_list_id: LIST_ID.ALL_USER_PROJECTS
        })

        // Route to project page
        router.push(ROUTES.PROJECT(userProject[DB.ID]))
    }

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
                                <ul className="menu-list">
                                    {userProjects.map(userProject => (
                                        <li key={userProject[DB.ID]}>
                                            <a onClick={() => handleRowClick(userProject)}>
                                                <p className="is-size-5">
                                                    {userProject[DB.TITLE]}
                                                </p>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </aside>
                        </div>
                    </div>
                </div>
            </section>
        </App>
    )
}
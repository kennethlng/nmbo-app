import App from '../../components/App'
import { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { db, firebase } from '../../lib/firebase'
import Head from 'next/head'
import * as META from '../../constants/meta'
import * as DB from '../../constants/db'
import * as ROUTES from '../../constants/routes'
import * as EVENTS from '../../constants/events'
import ProjectTasks from '../../components/ProjectTasks'
import ProjectDoesntExistPlaceholder from '../../components/ProjectDoesntExistPlaceholder'
import SetProjectTitleInput from '../../components/SetProjectTitleInput'
import AddProjectTask from '../../components/AddProjectTask'
import { AuthUserContext } from '../../components/Session'

export default function Project({ data }) {
    const router = useRouter(); 
    const authUser = useContext(AuthUserContext); 

    useEffect(() => {
        if (data) {
            // Log event for page_view
            firebase.analytics().logEvent(EVENTS.PAGE_VIEW, {
                page_path: router.pathname,
                page_title: data[DB.TITLE],
                page_location: window.location.href
            })

            // Log event for view_item
            firebase.analytics().logEvent(EVENTS.VIEW_ITEM, {
                items: [{ 
                    item_id: router.query.id, 
                    item_name: data[DB.TITLE]
                }]
            })
        }
    }, [])

    useEffect(() => {
        // Map user_project doc for authUser
        if (authUser) {
            let projectId = router.query.id;
            let batch = db.batch(); 

            let userProjectRef = db.collection(DB.USERS).doc(authUser.uid).collection(DB.USER_PROJECTS).doc(projectId);
            batch.set(userProjectRef, {
                [DB.ID]: router.query.id,
                [DB.TITLE]: data[DB.TITLE],
                [DB.CREATED_BY]: data[DB.CREATED_BY],
                [DB.VISIT_COUNTER]: firebase.firestore.FieldValue.increment(1)
            }, { merge: true })

            let projectUserRef = db.collection(DB.PROJECTS).doc(projectId).collection(DB.PROJECT_USERS).doc(authUser.uid); 
            batch.set(projectUserRef, {
                [DB.PHOTO_URL]: authUser.photoURL,
                [DB.DISPLAY_NAME]: authUser.displayName
            }, { merge: true })

            batch.commit()
            .catch(error => console.log(error))
        }
    }, [authUser])

    return (
        <App>
            <Head>
                <title>{data ? META.PROJECT_TITLE(data.title) : META.CHECKLIST_DOESNT_EXIST}</title>
                <meta name="title" content={data ? META.PROJECT_TITLE(data.title) : META.CHECKLIST_DOESNT_EXIST}/>
                <meta property="og:url" content={data ? META.URL + ROUTES.PROJECT(router.query.id) : META.URL}/>
                <meta property="og:title" content={data ? META.PROJECT_TITLE(data.title) : META.CHECKLIST_DOESNT_EXIST}/>
                <meta property="twitter:url" content={data ? META.URL + ROUTES.PROJECT(router.query.id) : META.URL}/>
                <meta property="twitter:title" content={data ? META.PROJECT_TITLE(data.title) : META.CHECKLIST_DOESNT_EXIST}/>
            </Head>
            {data ? (
                <section className="section">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-three-fifths is-two-thirds-tablet">
                                <SetProjectTitleInput
                                    initialValue={data[DB.TITLE]}
                                />
                                <div className="block">
                                    <AddProjectTask />
                                </div>
                                <div className="block mb-6">
                                    <ProjectTasks />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <ProjectDoesntExistPlaceholder/>
            )}
        </App>
    )
}

export async function getServerSideProps(context) {
    const ref = db.collection("projects").doc(context.params.id);
    const doc = await ref.get(); 

    return {
        props: {
            data: doc.exists ? JSON.parse(JSON.stringify(doc.data())) : null
        }
    }
}
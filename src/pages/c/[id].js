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
import ProjectTitleInput from '../../components/ProjectTitleInput'
import AddProjectTask from '../../components/AddProjectTask'
import { AuthUserContext } from '../../components/Session'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import LinearProgress from '@material-ui/core/LinearProgress'

export default function Project({ data }) {
    const router = useRouter(); 
    const authUser = useContext(AuthUserContext); 

    useEffect(() => {
        // If the checklist exists
        if (data) {
            // Log event for page_view
            firebase.analytics().logEvent(EVENTS.PAGE_VIEW, {
                page_path: router.pathname,
                page_title: data[DB.TITLE] ? data[DB.TITLE] : "Untitled",
                page_location: window.location.href
            })

            // Log event for view_item
            firebase.analytics().logEvent(EVENTS.VIEW_ITEM, {
                items: [{ 
                    item_id: router.query.id, 
                    item_name: data[DB.TITLE] ? data[DB.TITLE] : "Untitled",
                }]
            })

            // Map user_project doc for authUser
            if (authUser) {
                let projectId = router.query.id;
                let batch = db.batch(); 
    
                let userProjectRef = db.collection(DB.USERS).doc(authUser.uid).collection(DB.USER_PROJECTS).doc(projectId);
                batch.set(userProjectRef, {
                    [DB.ID]: router.query.id,
                    [DB.TITLE]: data[DB.TITLE] ? data[DB.TITLE] : "🧐 Untitled",
                    [DB.CREATED_BY]: data[DB.CREATED_BY],
                    [DB.VISIT_COUNTER]: firebase.firestore.FieldValue.increment(1)
                }, { merge: true })
    
                let projectUserRef = db.collection(DB.PROJECTS).doc(projectId).collection(DB.PROJECT_USERS).doc(authUser.uid); 
                batch.set(projectUserRef, {
                    [DB.ID]: authUser.uid,
                    [DB.PHOTO_URL]: authUser.photoURL,
                    [DB.DISPLAY_NAME]: authUser.displayName
                }, { merge: true })
    
                batch.commit()
                .catch(error => console.log(error))
            }
        }
    }, [data, authUser])

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
            <Container maxWidth="sm">
                {data ? (
                    authUser ? (
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <ProjectTitleInput
                                    projectId={router.query.id}
                                    initialValue={data[DB.TITLE]}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <AddProjectTask
                                    projectId={router.query.id}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <ProjectTasks 
                                    projectId={router.query.id}
                                />
                            </Grid>
                        </Grid>
                    ) : <LinearProgress/>
                ) : (
                    <ProjectDoesntExistPlaceholder/>
                )}
            </Container>
        </App>
    )
}

export async function getServerSideProps(context) {
    const ref = db.collection(DB.PROJECTS).doc(context.params.id);
    const doc = await ref.get(); 

    return {
        props: {
            data: doc.exists ? JSON.parse(JSON.stringify(doc.data())) : null
        }
    }
}

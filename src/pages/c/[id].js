import App from '../../components/App'
import { useEffect, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { db, firebase } from '../../lib/firebase'
import Head from 'next/head'
import * as META from '../../constants/meta'
import * as DB from '../../constants/db'
import * as ROUTES from '../../constants/routes'
import ProjectTasks from '../../components/ProjectTasks'
import ProjectDoesntExistPlaceholder from '../../components/ProjectDoesntExistPlaceholder'
import SetProjectTitleInput from '../../components/SetProjectTitleInput'
import AddProjectTask from '../../components/AddProjectTask'
import { AuthUserContext } from '../../components/Session'

export default function Project({ data }) {
    const router = useRouter(); 
    const authUser = useContext(AuthUserContext); 

    useEffect(() => {
        if (data && authUser) {
            db.collection(DB.USERS).doc(authUser.uid).collection(DB.USER_PROJECTS).doc(router.query.id).set({
                [DB.ID]: router.query.id,
                [DB.TITLE]: data[DB.TITLE],
                [DB.CREATED_BY]: data[DB.CREATED_BY],
                [DB.VISIT_COUNTER]: firebase.firestore.FieldValue.increment(1)
            }, { merge: true })
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
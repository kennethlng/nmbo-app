import App from '../../components/App'
import { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { db, firebase } from '../../lib/firebase'
import Head from 'next/head'
import * as META from '../../constants/meta'
import * as DB from '../../constants/db'
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
            db.collection(DB.USERS).doc(authUser.uid).collection(DB.USER_PROJECTS).doc(router.query.id).set({
                [DB.ID]: router.query.id,
                [DB.TITLE]: data[DB.TITLE],
                [DB.CREATED_BY]: data[DB.CREATED_BY],
                [DB.VISIT_COUNTER]: firebase.firestore.FieldValue.increment(1)
            }, { merge: true })
            .catch(error => console.log(error))
        }
    }, [])

    return (
        <App>
            <Head>
                <title>{META.PROJECT_TITLE(data ? data.title : "🤔")}</title>
            </Head>
            <section className="hero">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-three-fifths is-two-thirds-tablet">
                                {data ? (
                                    <div>
                                        <div className="block">
                                            <SetProjectTitleInput
                                                initialValue={data[DB.TITLE]}
                                            />
                                        </div>
                                        <div className="block">
                                            <AddProjectTask/>
                                        </div>
                                        <div className="block mb-6">
                                            <ProjectTasks/>
                                        </div>
                                    </div>
                                ) : (
                                    <ProjectDoesntExistPlaceholder/>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
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
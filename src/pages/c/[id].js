import App from '../../components/App'
import { db } from '../../lib/firebase'
import Head from 'next/head'
import * as META from '../../constants/meta'
import * as DB from '../../constants/db'
import ProjectTasks from '../../components/ProjectTasks'
import ProjectDoesntExistPlaceholder from '../../components/ProjectDoesntExistPlaceholder'
import SetProjectTitleInput from '../../components/SetProjectTitleInput'

export default function Project({ data }) {
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
            data: doc.exists ? doc.data() : null
        }
    }
}
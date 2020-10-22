import App from '../../components/App'
import { db } from '../../lib/firebase'
import Head from 'next/head'
import * as META from '../../constants/meta'
import ProjectTasks from '../../components/ProjectTasks'

export default function Project({ data }) {
    if (data) {
        return (
            <App>
                <Head>
                    <title>{META.PROJECT_TITLE(data.title)}</title>
                </Head>
                {data.title}
                <ProjectTasks/>
            </App>
        )
    }

    return <div>This project doesn't exist</div>
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
import App from '../../components/App'
import { db } from '../../lib/firebase'
import Head from 'next/head'

export default function Project({ data }) {
    if (data) {
        return (
            <App>
                <Head>
                    <title>{data.title}</title>
                </Head>
                {data.title}
            </App>
        )
    }

    return <div>Nothing</div>
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
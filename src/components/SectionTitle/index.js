export default function SectionTitle(props) {
    const { content } = props; 

    return (
        <h2 className="title is-spaced is-1 has-text-weight-bold">
            {content}
        </h2>
    )
}
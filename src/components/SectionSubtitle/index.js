export default function SectionSubtitle(props) {
    const { content } = props;

    return (
        <p className="subtitle is-5 has-text-grey">
            {content}
        </p>
    )
}
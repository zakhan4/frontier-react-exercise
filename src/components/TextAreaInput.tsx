interface ITextAreaInputProps {
    data: Frontier.Element,
    value: string,
    fieldChanged: (fieldId: string, value: string | string[] | boolean) => void
}

function TextAreaInput(props: ITextAreaInputProps) {
    const metadata: Frontier.ElementMeta = props.data.metadata
    return (
        <div>
            <label htmlFor={props.data.id}>{props.data.question_text}</label>
            <br />
            <textarea
                id={props.data.id}
                name={props.data.id}
                required={metadata.required}
                placeholder={metadata.placeholder}
                value={props.value}
                rows={5}
                cols={50}
                onChange={(event) => { props.fieldChanged(props.data.id, event.target.value) }}
            />
        </div>
    );
}

export default TextAreaInput
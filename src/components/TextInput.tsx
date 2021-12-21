interface ITextInputProps {
    data: Frontier.Element,
    value: string,
    fieldChanged: (fieldId: string, value: string | string[] | boolean) => void
}

function TextInput(props: ITextInputProps) {
    const metadata: Frontier.ElementMeta = props.data.metadata

    return (
        <div>
            <label htmlFor={props.data.id}>{props.data.question_text}</label>
            <br />
            <input
                id={props.data.id}
                data-testid={props.data.id}
                name={props.data.id}
                type={metadata.format}
                required={metadata.required}
                pattern={metadata.pattern}
                step={metadata.step}
                placeholder={metadata.placeholder}
                value={props.value}
                onChange={(event) => props.fieldChanged(props.data.id, event.target.value)}
            />
        </div>
    );
}

export default TextInput
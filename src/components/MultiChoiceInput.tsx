interface IMultiChoiceInputProps {
    data: Frontier.Element,
    value: string[],
    fieldChanged: (fieldId: string, value: string | string[] | boolean) => void
}


function MultiChoiceInput(props: IMultiChoiceInputProps) {
    const metadata: Frontier.ElementMeta = props.data.metadata
    const options: JSX.Element[] | undefined = metadata.options?.map((option) => {
        return <option key={option.value} value={option.value}>{option.label}</option>
    })
    return (
        <div>
            <label htmlFor={props.data.id}>{props.data.question_text}</label>
            <br />
            <select
                id={props.data.id}
                name={props.data.id}
                required={metadata.required}
                value={props.value}
                multiple
                onChange={(event) => {
                    const options = Array.from(event.target.selectedOptions, option => option.value)
                    props.fieldChanged(props.data.id, options)
                }}
            >
                {options}
            </select>
        </div>
    );
}

export default MultiChoiceInput
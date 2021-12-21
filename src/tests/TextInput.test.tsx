import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Dictionary } from "components/Section";
import TextInput from "../components/TextInput"

it("TextInput render and onChange test", () => {
    const textInputData: Frontier.Element = {
        id: "test-input",
        type: "text",
        question_text: "Please specify the component name for which this test is written",
        metadata: {
            required: true,
            format: "text",
            placeholder: "something",
        }
    }
    let object: Dictionary = { "test-input": "" }
    const fieldChanged = jest.fn().mockImplementation((fieldId: string, value: string | string[] | boolean) => {
        object[fieldId] = (object[fieldId] as string) + value
    })
    const screen = render(<TextInput
        key={textInputData?.id}
        data={textInputData}
        value=""
        fieldChanged={fieldChanged} />)

    userEvent.type(screen.getByTestId(textInputData.id), 'first');

    expect(fieldChanged).toHaveBeenCalledTimes(5)
    expect(object).toHaveProperty(textInputData.id)
    expect(object[textInputData.id]).toBe('first')
});
import formInstructions from '../data/form_instructions.json'
import FormGenerator from './FormGenerator'
import "../styles/base.css"

function App() {
  const job = formInstructions as Frontier.Job

  // Check your console to see the full instructions!
  console.log(job)

  return (
    <div className='App' style={{ backgroundColor: job.theme.background_color, color: job.theme.text_color }}>
      <img src="https://frontier-public-assets.s3-us-west-2.amazonaws.com/frontier-corona-logo.svg"
        alt="Frontier Logo" width={100} height={100} />
      <h1>Frontier</h1>
      <FormGenerator jobData={job} />
    </div>
  );
}

export default App;

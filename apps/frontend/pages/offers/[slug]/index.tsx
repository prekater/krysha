import React from 'react';
import { Form, Field } from 'react-final-form'

const MyForm = () => (
  <Form
    onSubmit={() => console.log(1)}
    validate={() => {
       return {}
    }}
    render={({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <h2>Simple Default Input</h2>
        <div>
          <label>First Name</label>
          <Field name="firstName" component="input" placeholder="First Name" />
        </div>


        <button type="submit">Submit</button>
      </form>
    )}
  />)


const Offer = (props) => {
  return (
    <div>

    </div>
  );
}

export default Offer;

import Form from 'react-bootstrap/Form';

export const FilterNote = ({optionFilter,setSearchValue}) => {
    const handlerChange = (e)=> {
        setSearchValue(e.target.value)
        console.log(e)
  
    }
  return (
    <>
    <p>Categories</p>
    <Form.Select aria-label="Default select example" onChange={handlerChange} style = {{width : '50%'}}>
    <option value = ""></option>
    {optionFilter.length && optionFilter.map(value => (
    <option  key={value} value={value}>{value}</option>
    )
    )}

  </Form.Select>
    </>
  )
}

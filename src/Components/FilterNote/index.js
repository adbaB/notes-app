import Form from "react-bootstrap/Form";
import "./index.css";
export const FilterNote = ({ optionFilter, setSearchValue }) => {
  const handlerChange = (e) => {
    setSearchValue(e.target.value);
  };
  return (
    <>
      <p className="categories">Categories</p>
      <Form.Select
        aria-label="Default select example"
        onChange={handlerChange}
        style={{ width: "50%" }}
      >
        <option value=""></option>
        {optionFilter.length &&
          optionFilter.map((value, index) => (
            <option key={index} value={value.id}>
              {value.description}
            </option>
          ))}
      </Form.Select>
    </>
  );
};

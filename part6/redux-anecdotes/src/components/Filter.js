import { connect } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

const Filter = (props) => {
  const handleChange = (event) => {
    const filterWord = event.target.value
    props.filterChange(filterWord)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const ConnnectedFilter = connect(
  null,
  { filterChange }
)(Filter)

export default ConnnectedFilter
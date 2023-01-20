import './index.css'

const LanguageFilterItem = props => {
  const {itemDetails, updateActiveOptionId} = props
  const {language, id} = itemDetails

  const buttonClick = () => {
    updateActiveOptionId(id)
  }
  return (
    <li className="li-items" onClick={buttonClick}>
      <button type="button" className="button">
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem

import './index.css'

const RepositoryItem = props => {
  const {productData} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = productData

  return (
    <li className="card">
      <div>
        <img src={avatarUrl} alt={name} className="image" />
      </div>
      <h1 className="name">{name}</h1>
      <div className="flex">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="sm-image"
        />

        <p>{starsCount} stars</p>
      </div>
      <div className="flex">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png "
          alt="forks"
          className="sm-image"
        />
        <p>{issuesCount} forks</p>
      </div>

      <div className="flex">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png "
          alt="open issues"
          className="sm-image"
        />
        <p>{forksCount} open issues</p>
      </div>
    </li>
  )
}
export default RepositoryItem

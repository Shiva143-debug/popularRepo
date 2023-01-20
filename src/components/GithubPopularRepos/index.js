import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    productsList: [],
    languageId: languageFiltersData[0].id,
    activeId: languageFiltersData[0].id,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProducts()
  }

  getTheList = data => {
    const updatedData = data.map(each => ({
      name: each.name,
      id: each.id,
      issuesCount: each.issues_count,
      forksCount: each.forks_count,
      starsCount: each.stars_count,
      avatarUrl: each.avatar_url,
    }))

    return updatedData
  }

  getProducts = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {languageId} = this.state
    // this.setState({
    //   isLoading: true,
    // })

    const response = await fetch(
      ` https://apis.ccbp.in/popular-repos?language=${languageId}`,
    )
    const data = await response.json()
    if (response.ok === true) {
      const dataList = this.getTheList(data.popular_repos)
      this.setState({
        productsList: dataList,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  updateActiveOptionId = id => {
    this.setState(
      {activeId: id, languageId: id, productsList: []},
      this.getProducts,
    )
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className=" failure-view"
      />
      <h1 className="heading">Something went Wrong</h1>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader" className="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderProductsList = () => {
    const {productsList} = this.state
    // console.log(productsList)
    return (
      <>
        <ul className="products-list">
          {productsList.map(product => (
            <RepositoryItem productData={product} key={product.id} />
          ))}
        </ul>
      </>
    )
  }

  getResult = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductsList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {activeId, languageId} = this.state
    return (
      <div className="Home">
        <h1 className="head">Popular</h1>

        <ul className="items-list-container">
          {languageFiltersData.map(eachItem => (
            <LanguageFilterItem
              key={eachItem.id}
              itemDetails={eachItem}
              activeId={activeId}
              languageId={languageId}
              updateActiveOptionId={this.updateActiveOptionId}
            />
          ))}
        </ul>

        {this.getResult()}
      </div>
    )
  }
}
export default GithubPopularRepos

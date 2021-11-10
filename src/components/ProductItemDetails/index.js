// Write your code here
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Loader} from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'

import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'
import './index.css'

class ProductItemDetails extends Component {
  state = {
    productDetails: {},
    similarProductsList: [],
    count: 1,
    isLoading: true,
  }

  componentDidMount() {
    this.getProductItemDetails()
  }

  getProductItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/products/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    const updatedData = {
      availability: data.availability,
      brand: data.brand,
      description: data.description,
      id: data.id,
      imageUrl: data.image_url,
      price: data.price,
      rating: data.rating,
      similarProducts: data.similar_products,
      style: data.style,
      title: data.title,
      totalReviews: data.total_reviews,
    }

    const similarProductsList = updatedData.similarProducts
    const updatedSimilarProductsList = similarProductsList.map(eachItem => ({
      availability: eachItem.availability,
      brand: eachItem.brand,
      description: eachItem.description,
      id: eachItem.id,
      imageUrl: eachItem.image_url,
      price: eachItem.price,
      rating: eachItem.rating,
      style: eachItem.style,
      title: eachItem.title,
      totalReviews: eachItem.total_reviews,
    }))
    console.log(similarProductsList)
    this.setState({
      productDetails: updatedData,
      similarProductsList: updatedSimilarProductsList,
    })
  }

  clickPlus = () => {
    this.setState(prevState => ({count: prevState.count + 1}))
  }

  clickMinus = () => {
    const {count} = this.state
    if (count > 1) {
      this.setState(prevState => ({count: prevState.count - 1}))
    }
  }

  render() {
    const {productDetails, similarProductsList, count, isLoading} = this.state
    return (
      <div>
        <Header />

        <div className="details-container">
          <img
            src={productDetails.imageUrl}
            className="details-img"
            alt="product"
          />
          <div>
            <h1 className="title">{productDetails.title}</h1>
            <p>Rs {productDetails.price}/-</p>
            <div className="rating-review-container">
              <div className="rating-container">
                <p>{productDetails.rating}</p>
                <AiFillStar />
              </div>
              <p>{productDetails.totalReviews} Reviews</p>
            </div>
            <p>{productDetails.description}</p>
            <p>
              <span className="bold-text">Available:</span>{' '}
              {productDetails.availability}
            </p>
            <p>
              <span className="bold-text">Brand:</span> {productDetails.brand}
            </p>
            <hr />
            <div className="add-remove-container">
              <button onClick={this.clickMinus} className="btn" testid="minus">
                <BsDashSquare />
              </button>

              <p>{count}</p>
              <button onClick={this.clickPlus} className="btn" testid="plus">
                <BsPlusSquare />
              </button>
            </div>
            <button className="add-cart-btn" type="button">
              Add To Cart
            </button>
          </div>
        </div>
        <h1 className="similar-heading">Similar Products</h1>
        <ul className="similar-items-container">
          {similarProductsList.map(eachItem => (
            <SimilarProductItem productDetails={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </div>
    )
  }
}

export default ProductItemDetails

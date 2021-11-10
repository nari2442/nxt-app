// Write your code here
import './index.css'

const SimilarProductItem = props => {
  const {productDetails} = props
  const {availability, brand, imageUrl, title, price, rating} = productDetails
  return (
    <li className="similar-list-item">
      <img
        src={imageUrl}
        className="similar-img"
        alt={`similar product ${title}`}
      />
      <h1 className="similar-title">{title}</h1>
      <p>by {brand}</p>
      <div className="rating-review-container">
        <p className="price">Rs {price}/-</p>
        <div className="similar-rating-container">
          <p>{rating}</p>
        </div>
      </div>
    </li>
  )
}
export default SimilarProductItem

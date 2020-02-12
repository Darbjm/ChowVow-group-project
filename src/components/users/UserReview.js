import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class UserReview extends React.Component {
  state = {
    user: {},
    review: '',
    timestamps: ''
    // avgRating: ''
  }

  async componentDidMount() {
    const chefId = this.props.match.params.id
    try {
      const res = await axios.get(`/api/chefs/${chefId}`)
      this.setState({ user: res.data, review: res.data.review, rating: res.data.rating })
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  render() {
    if (!this.state.user.name) return null
    const { name, _id, image, timestamps } = this.state.user
    console.log(this.state.user)
    return (
      <>
        {/* {this.state.user.map(user => ( */}
          <Link to={`/chefs/${_id}`} key={_id}>
            <div className="box">
              <h1>{name}</h1>
              <article className="media">
                <img src={image} alt={name} />
                <div className="info">
                  <div className="bio">
                    {/* {this.state.rating.reduce(rate => (
                    <h3 key={rate._id} className="subtitle">{rate.rating}</h3>
                  ))} */}
                    {/* <h3 className="subtitle">★ ★ ★ ★ ☆</h3> */}
                    <h3 className="subtitle">Date reviewed: {timestamps}</h3>
                    {this.state.review.map((rev, i) => (
                      <h3 key={i} className="subtitle">Comments: {rev.review}</h3>
                    ))}
                    {/* <h3 className="subtitle">{this.state.review}</h3> */}
                  </div>
                </div>
              </article>
            </div>
          </Link>
        {/* ))} */}
      </>
    )
  }
}

export default UserReview
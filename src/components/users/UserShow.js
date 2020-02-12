import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'

class UserShow extends React.Component {
  state = {
    user: {},
    skills: [],
    avgRating: 0,
    numOfRatings: 0,
    colab: true
  }

  async componentDidMount() {
    const chefId = this.props.match.params.id
    try {
      const res = await axios.get(`/api/chefs/${chefId}`)
      this.setState({ user: res.data, skills: res.data.skills })
      if (res.data.rating.length < 1) return
      this.calculateAvgRating(res)
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  handleChange = ({ target: { name, value } }) => {
    const user = { ...this.state.user, [name]: value }
    this.setState({ user })
  }

  handleSubmit = async e => {
    e.preventDefault()
    const chefId = this.props.match.params.id
    try {
      const res = await axios.post(`/api/chefs/${chefId}/rating`, this.state.user)
      this.calculateAvgRating(res)
    } catch (err) {
      this.setState({ error: 'Invalid Credentials' })
    }
  }

  calculateAvgRating = (res) => {
    const numOfRatings = res.data.rating.length
    const ratingNums = []
    res.data.rating.map(rate => ratingNums.push(rate.rating))
    const sum = ratingNums.reduce((previous, current) => current += previous)
    const avg = (sum / ratingNums.length).toFixed(1)
    this.setState({ avgRating: avg, numOfRatings })
  }
  
  offerPending = async () => {
    const chefId = this.props.match.params.id
    try {
      await axios.post(`/api/chefs/${chefId}/offersPending`, null ,{
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      }) 
      this.changeButton()
    } catch (err) {
      console.log(err.response)
    }
  }
  
  changeButton = () => {
    this.setState({ colab: false })
  }

  // handleDelete = async () => {
  //   const chefId = this.props.match.params.id
  //   try {
  //     await axios.delete(`/api/chefs/${chefId}`, {
  //       headers: { Authorization: `Bearer ${Auth.getToken()}` }
  //     })
  //     this.props.history.push('/chefs')
  //   } catch (err) {
  //     console.log(err.response)
  //   }
  // }

  // isOwner = () => Auth.getPayload().sub === this.state.chef._id // Subject is the user id

  render() {
    const { name, city, image } = this.state.user
    const { numOfRatings, avgRating, skills, colab } = this.state
    console.log(this.state.user)
    if (!this.state.user) return null
    return (
      <section className="userSection">
        <div className="userContainer">
          <div className="userInfo">
            <h2 className="title">{name}</h2>
            <hr />
            <div className="starRating">
              {numOfRatings ? (<><h2>{avgRating} ★</h2><p>{numOfRatings} ratings</p></>) : <p>No ratings received</p>}
            </div>
            <hr />
            <h2 className="title">LOCATION:</h2>
            <p>{city}</p>
            <hr />
          </div>
          <div className="userImage">
            <button className="button is-warning">EDIT</button>
            <hr />
            <figure className="imageContainer">
              <img className="chefImage" src={image} alt={name} />
            </figure>
            <hr />
            {colab ? <button className="button is-success" onClick={this.offerPending}>Colaborate?</button> : <button className="button is-danger">Sent</button>}
          </div>
          <div className="skills-recipes">
            <h2 className="title">SKILLS:</h2>
            {skills.map((skill, i) => <p key={i}>{skill}</p>)}
          </div>
          <div className="rating">
            <p>Rate {name}:</p>
            <form onSubmit={this.handleSubmit}>
              <input onChange={this.handleChange} name="rating" type="number" min="1" max="5"></input>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </section>
    )
  }
}

export default UserShow

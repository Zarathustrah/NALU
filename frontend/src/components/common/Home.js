import React from "react";
import { getAllSpots } from "../../lib/api";

class Home extends React.Component {
  state = {
    search: "",
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.history.push(`/surfspots?search=${this.state.search}`);
  };
  render() {
    return (
      <section className="hero is-fullheight is-primary is-bold homebackground">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-1 frontpage wavy">
              <p> N </p> <p> A </p> <p> L </p> <p> U </p>
            </h1>
            <div className="columns">
              <form
                onSubmit={this.handleSubmit}
                className="column is-half is-offset-one-quarter searchbar"
              >
                <div className="field search">
                  <div className="control">
                    <input
                      className="input is-rounded is-primary"
                      type="text"
                      name="search"
                      placeholder="Where you do you want to go?"
                      onChange={this.handleChange}
                      value={this.state.search}
                    />
                  </div>
                </div>
                <div className="field search-button">
                  <input
                    type="submit"
                    className="button is-rounded is-primary"
                    value="Go!"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Home;

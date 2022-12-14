import React from "react";
import AllItem from "./pages/AllItem";
import AddNew from "./pages/AddNew";
import axios from "axios";

export default class Menu extends React.Component {
  state = {
    page: "list",
    data: [],
    newItemName: "",
    newItemType: "",
    newItemPrice: "",
  };

  BASE_API_URL = "http://localhost:8888";

  async componentDidMount() {
    console.log(`ComponentDidMount`);
    const response = await axios.get(`${this.BASE_API_URL}/pandatea`);
    console.log(response.data);
    this.setState({
      data: response.data,
    });
  }

  renderPage() {
    if (this.state.page === "list") {
      return <AllItem items={this.state.data} />;
    } else if (this.state.page === "add") {
      return (
        <AddNew
          update={this.updateFormField}
          name={this.state.newItemName}
          type={this.state.newItemType}
          price={this.state.newItemPrice}
          add={this.addNew}
        />
      );
    }
  }

  switchPage = (page) => {
    this.setState({
      page: page,
    });
  };

  updateFormField = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  addNew = async () => {
    console.log("adding new item")
    const newItem = {
      name: this.state.newItemName,
      type: this.state.newItemType,
      price: this.state.newItemPrice,
    };

    const response = await axios.post(`${this.BASE_API_URL}/pandatea`, newItem);
    newItem._id = response.data.insertedId;

    this.setState({
      data: [...this.state.data, newItem],
      page: "list",
      newItemName: "",
      newItemType: "",
      newItemPrice: "",
    });
    console.log(`New item added: ${response.data.insertedId}`);
  };

  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg bg-light">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="#"
                    onClick={() => this.switchPage("list")}
                  >
                    All Items
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#"
                    onClick={() => this.switchPage("add")}
                  >
                    Add New Item
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container">{this.renderPage()}</div>
      </React.Fragment>
    );
  }
}

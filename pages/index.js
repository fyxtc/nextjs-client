import Link from "next/link";
import Router from "next/router";
import {SERVER_URL} from '../settings';

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: ""
    };
    console.log(SERVER_URL)
  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  handleContentChange(e) {
    this.setState({ content: e.target.value });
  }

  handleSubmit() {
    console.log(this.state.title);
    console.log(this.state.content);
    fetch(SERVER_URL + "texts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    }).then(() => {
      Router.push("/view");
    });
  }

  render() {
    return (
      <form>
        <label>
          title:
          <br />
          <input
            type="text"
            name="title"
            onChange={this.handleTitleChange.bind(this)}
          />
        </label>
        <br />
        content:
        <br />
        <textarea
          rows="3"
          cols="20"
          onChange={this.handleContentChange.bind(this)}
        ></textarea>
        <br />
        <button type="button" onClick={this.handleSubmit.bind(this)}>
          Submit
        </button>
      </form>
    );
  }
}

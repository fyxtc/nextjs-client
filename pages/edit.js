import Router from "next/router";
import {SERVER_URL} from '../settings';

export default class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      content: null,
      isLock: false,
      isFound: true
    };
  }

  static getInitialProps = ({ query }) => {
    return { query };
  };

  componentDidMount() {
    var id = this.props.query.id;
    let thiz = this;
    fetch(SERVER_URL + "text/" + id)
      .then(function(resp) {
        console.log(resp);
        if (resp.status == 404) {
          thiz.setState({ isFound: false });
          throw new Error("404 NOT FOUND");
        } else {
          if (resp.status == 200) {
            console.log("download >>>>>>>> " + id);
            var tempLink = document.createElement("a");
            tempLink.href = SERVER_URL + "download/" + id;
            tempLink.click();
            return resp.json();
          } else {
            throw new Error("UNKNOWN ERROR CODE: " + resp.status);
          }
        }
      })
      .then(data => {
        console.log(data);
        if (!data.isLock) {
          thiz.setState({ title: data.title });
          thiz.setState({ content: data.content });
        } else {
          thiz.setState({ isLock: data.isLock });
        }
      })
      .catch(function(err) {
        console.log(err);
      });

    // setTimeout(() => {
    //   window.addEventListener("beforeunload", (ev) => 
    //   {  
    //     fetch(SERVER_URL + "unlock/" + this.props.query.id)
    //   });
    // }, 2000)

    setTimeout(() => {
      fetch(SERVER_URL + "lock/" + this.props.query.id)
    }, 60 * 1000)
  }

  componentWillUnmount(){
    fetch(SERVER_URL + "unlock/" + this.props.query.id)
  }

  handleContentChange(e) {
    this.setState({ content: e.target.value });
  }

  handleSave() {
    console.log(this.state.title);
    console.log(this.state.content);
    fetch(SERVER_URL + "text/" + this.props.query.id, {
      method: "PUT",
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
    var nofoundView = <p> 404 NOT FOUND </p>;
    var loadingView = <p>loading</p>;
    var lockingView = <p>current page is edited by other</p>;
    var editView = (
      <div>
        <textarea
          rows="3"
          cols="20"
          value={this.state.content}
          onChange={this.handleContentChange.bind(this)}
        ></textarea>
        <br/>
        <button
          type="button"
          value={this.props.query.id}
          onClick={this.handleSave.bind(this)}
        >
          {" "}
          save{" "}
        </button>
      </div>
    );

    if (!this.state.isFound) {
      return nofoundView;
    } else {
      if (!this.state.isLock) {
        if (!this.state.content) {
          return loadingView;
        } else {
          return editView;
        }
      } else {
        return lockingView;
      }
    }
  }
}

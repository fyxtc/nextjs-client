import Link from "next/link";
import Router from "next/router";
import {SERVER_URL} from '../settings';

export default class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }
  componentDidMount() {
    fetch(SERVER_URL + "texts")
      .then(resp => resp.json())
      .then(json => {
        console.log(json);
        this.setState({ data: json });
      });
  }

  render() {
    if (!this.state.data) {
      return <p> loading </p>;
    } else {
      if(this.state.data.message){
        return <p>{this.state.data.message}</p>
      }else{
        return this.state.data.map(data => (
          <li key={data.tid}>
            {data.title}
            &nbsp;&nbsp;
            <Link href={"/edit?id=" + data.tid}>
              <button type="button" value={data.tid}>
                {" "}
                edit{" "}
              </button>
            </Link>
          </li>
        ));
      }
    }
  }
}

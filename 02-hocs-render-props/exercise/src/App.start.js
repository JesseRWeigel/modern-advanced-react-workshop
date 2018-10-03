import React from "react";
import { CSSTransition } from "react-transition-group";
import createMediaListener from "./lib/createMediaListener";
import { Earth, Galaxy, Trees } from "./lib/screens";

const hocMedia = Comp => {
  const media = createMediaListener({
    big: "(min-width : 1000px)",
    tiny: "(max-width: 600px)"
  });
  class HOCMedia extends React.Component {
    state = {
      media: media.getState()
    };
    componentDidMount() {
      media.listen(media => this.setState({ media }));
    }

    componentWillUnmount() {
      media.dispose();
    }
    render() {
      return <Comp {...this.props} {...this.state} />;
    }
  }
  return HOCMedia;
};

class App extends React.Component {
  render() {
    const { media } = this.props;

    return (
      <CSSTransition classNames="fade" timeout={300}>
        {media.big ? (
          <Galaxy key="galaxy" />
        ) : media.tiny ? (
          <Trees key="trees" />
        ) : (
          <Earth key="earth" />
        )}
      </CSSTransition>
    );
  }
}

export default hocMedia(App);

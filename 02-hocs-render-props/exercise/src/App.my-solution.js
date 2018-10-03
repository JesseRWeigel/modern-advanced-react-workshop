import React from "react";
import { CSSTransition } from "react-transition-group";
import createMediaListener from "./lib/createMediaListener";
import { Earth, Galaxy, Trees } from "./lib/screens";

const media = createMediaListener({
  big: "(min-width : 1000px)",
  tiny: "(max-width: 600px)"
});

class MediaQueries extends React.Component {
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
    return this.props.children(this.state.media);
  }
}

class App extends React.Component {
  render() {
    return (
      <MediaQueries>
        {media => (
          <CSSTransition classNames="fade" timeout={300}>
            {media.big ? (
              <Galaxy key="galaxy" />
            ) : media.tiny ? (
              <Trees key="trees" />
            ) : (
              <Earth key="earth" />
            )}
          </CSSTransition>
        )}
      </MediaQueries>
    );
  }
}

export default App;

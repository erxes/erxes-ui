import { fadeIn, slideDown } from "../utils/animations";
import React from "react";
import styled from "styled-components";
import { readFile } from "../utils/core";
import CommonPortal from "./CommonPortal";
import Icon from "./Icon";
import { IAttachment } from "types";

export const PreviewWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  padding: 40px;
  background: rgba(48, 67, 92, 0.8);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
  z-index: 50000;
  animation-name: ${fadeIn};
  animation-duration: 0.3s;
  animation-timing-function: ease;
  cursor: zoom-out;

  img {
    width: auto;
    max-width: 80%;
    max-height: 80%;
    max-height: 80vh;
    box-shadow: 0 2px 10px -3px rgba(0, 0, 0, 0.5);
    transition: max-width 0.1s ease, max-height 0.1s ease;
    animation-name: ${slideDown};
    animation-duration: 0.3s;
    animation-timing-function: ease;
  }

  iframe {
    border-raidus: 3ps;
    background-color: #fff;
    padding: 10px;
    max-width: 80%;
    max-height: 80%;
    max-height: 80vh;
  }
`;

const PreviewOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  right: 0;
  left: 0;
  height: 100px;
  bottom: 0;
  z-index: 30;
  cursor: default;
  text-align: center;

  > div {
    color: #fff;
    padding: 12px 10%;

    h4 {
      margin: 0 0 8px;
    }

    p {
      margin-bottom: 5px;
      font-size: 14px;
      opacity: 0.8;
    }
  }
`;

const Image = styled.img`
  cursor: zoom-in;
  transition: all 0.3s;

  &:hover {
    opacity: 0.8;
  }
`;

const PreviewBtn = styled.a`
  position: absolute;
  height: 100px;
  bottom: 0;
  z-index: 40;
  width: 10%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  > i {
    color: #fff;
    opacity: 0.6;
    padding: 36px;
    transition: all ease 0.3s;
  }

  &:hover {
    > i {
      opacity: 1;
      transform: translateX(-5%) scale(1.1);
    }
  }

  &.left {
    left: 0;
  }

  &.right {
    right: 0;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: center;
  font-size: 14px;

  > a {
    text-decoration: underline;
    color: #fff;
    margin-right: 20px;
    opacity: 0.8;
    transition: all ease 0.3s;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }

    > i {
      margin-right: 5px;
    }
  }
`;

const KEYCODES = {
  ESCAPE: 27,
};

type Props = {
  alt?: string;
  src?: string;
  size?: number;
  onLoad?: () => void;
  full?: boolean;
  index?: number;
  currentAttach?: IAttachment;
  onSlidePrev?: () => void;
  onSlideNext?: () => void;
};

type State = {
  visible: boolean;
};

class AttachmentWithPreview extends React.Component<Props, State> {
  state = { visible: false };

  onToggle = () => {
    this.setState({ visible: !this.state.visible });
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeydown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeydown);
  }

  handleKeydown = (e) => {
    if (e.keyCode === KEYCODES.ESCAPE && this.state.visible) {
      this.setState({ visible: false });
    }
  };

  renderPreview() {
    const { alt, currentAttach } = this.props;

    if (!currentAttach) {
      return null;
    }

    if (currentAttach.type.startsWith("image")) {
      return <img alt={alt} src={readFile(currentAttach.url || "")} />;
    }

    return (
      <iframe
        src={
          "https://docs.google.com/viewer?url=" +
          readFile(currentAttach.url || "") +
          "&embedded=true"
        }
        width="100%"
      ></iframe>
    );
  }

  render() {
    const { alt, src, size, onLoad, currentAttach } = this.props;

    return (
      <>
        <Image
          {...this.props}
          src={readFile(src || "")}
          onLoad={onLoad}
          onClick={this.onToggle}
        />
        {this.state.visible && (
          <CommonPortal>
            <PreviewWrapper>
              {!currentAttach ? (
                <img alt={alt} src={readFile(src || "")} />
              ) : (
                this.renderPreview()
              )}
              <PreviewOverlay>
                <div>
                  <h4>{alt}</h4>
                  <p>Size - {size && Math.round(size / 1000)}kB</p>
                  <Actions>
                    <a>
                      <Icon icon="external-link-alt" size={12} /> Open in new
                      tab
                    </a>
                    <a>
                      <Icon icon="cancel" size={10} /> Delete
                    </a>
                  </Actions>
                </div>
              </PreviewOverlay>
              <PreviewBtn className="left" onClick={this.props.onSlidePrev}>
                <Icon icon="angle-left" size={32} />
              </PreviewBtn>
              <PreviewBtn className="right" onClick={this.props.onSlideNext}>
                <Icon icon="angle-right" size={32} />
              </PreviewBtn>
            </PreviewWrapper>
          </CommonPortal>
        )}
      </>
    );
  }
}

export default AttachmentWithPreview;

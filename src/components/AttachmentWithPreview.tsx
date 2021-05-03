import React from "react";
import styled from "styled-components";
import { readFile } from "../utils/core";
import CommonPortal from "./CommonPortal";
import Icon from "./Icon";
import { IAttachment } from "types";
import { PreviewWrapper, Image } from "./ImageWithPreview";

const PreviewOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  right: 0;
  left: 0;
  height: 100px;
  bottom: 0;
  z-index: 50000;
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

const PreviewBtn = styled.a`
  position: absolute;
  height: 100px;
  bottom: 0;
  z-index: 60000;
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

const CloseAttachment = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  padding: 20px 30px;
  color: #fff;
  cursor: pointer;
  transition: all ease 0.3;
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }
`;

const KEYCODES = {
  ESCAPE: 27,
  ARROWRIGHT: 39,
  ARROWLEFT: 37,
};

type Props = {
  index?: number;
  onLoad?: () => void;
  full?: boolean;
  icon?: string;
  attachment: IAttachment;
  currentAttach?: IAttachment;
  onSlidePrev?: (index: number) => void;
  onSlideNext?: (index: number) => void;
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
    const { currentAttach } = this.props;

    if (!currentAttach) {
      return null;
    }

    if (currentAttach.type.startsWith("image")) {
      return (
        <img alt={currentAttach.name} src={readFile(currentAttach.url || "")} />
      );
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

  renderModal() {
    const { visible } = this.state;
    const { index, currentAttach, onSlideNext, onSlidePrev } = this.props;

    if (!visible) {
      return null;
    }

    return (
      <CommonPortal>
        <PreviewWrapper onClick={this.onToggle}>
          <CloseAttachment>
            <Icon icon="cancel" size={20} onClick={this.onToggle} />
          </CloseAttachment>

          {this.renderPreview()}
        </PreviewWrapper>
        {currentAttach && (
          <>
            <PreviewOverlay>
              <div>
                <h4>{currentAttach.name}</h4>
                <p>
                  Size -{" "}
                  {currentAttach.size && Math.round(currentAttach.size / 1000)}
                  kB
                </p>
                <Actions>
                  <a
                    href={currentAttach.url || ""}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon icon="external-link-alt" size={12} /> Open in new tab
                  </a>
                  <a
                    href={readFile(currentAttach.url || "")}
                    rel="noopener noreferrer"
                  >
                    <Icon icon="download-1" size={12} /> Download
                  </a>
                </Actions>
              </div>
            </PreviewOverlay>
            {onSlidePrev && (
              <PreviewBtn
                className="left"
                onClick={() => onSlidePrev(index || 0)}
              >
                <Icon icon="angle-left" size={32} />
              </PreviewBtn>
            )}
            {onSlideNext && (
              <PreviewBtn
                className="right"
                onClick={() => onSlideNext(index || 0)}
              >
                <Icon icon="angle-right" size={32} />
              </PreviewBtn>
            )}
          </>
        )}
      </CommonPortal>
    );
  }

  renderAttachmentPreview() {
    const { onLoad, attachment, icon } = this.props;

    if (icon) {
      return <Icon icon={icon} onClick={this.onToggle} />;
    }

    return (
      <Image
        src={readFile(attachment.url || "")}
        onLoad={onLoad}
        onClick={this.onToggle}
      />
    );
  }

  render() {
    return (
      <>
        {this.renderAttachmentPreview()}
        {this.renderModal()}
      </>
    );
  }
}

export default AttachmentWithPreview;

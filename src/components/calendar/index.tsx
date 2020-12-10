import dayjs from 'dayjs';
import React from 'react';
import styled from 'styled-components';
import { IDateColumn } from '../types';
import {
  getCurrentDate,
  getFullTitle,
  monthColumns,
  nextMonth,
  previousMonth
} from '../../utils/calendar';
import Button from '../button';

const Header = styled.div`
  display: inline-block;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  flex: 1;
  overflow: hidden;
  background: #e5e8ec;
  margin: 0 5px;
  min-width: 280px;
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 5px 0px;
`;

const ContentHeader = styled.div`
  padding: 8px 16px 2px;
  font-weight: bold;
  font-size: 14px;
`;

const Item = styled.div`
  margin-left: 8px;

  &:first-of-type {
    margin: 0;
  }
`;

type State = {
  currentDate: dayjs.Dayjs;
};

type ItemButton = {
  icon?: string;
  text?: string;
  onClick: () => void;
  btnStyle?: string;
  translator?: (key: string, options?: any) => string;
};

type CalendarProps = {
  renderContent: (
    renderMonths: () => React.ReactNode[],
    renderMiddleContent: () => React.ReactNode
  ) => React.ReactNode;
  renderColumn: (date: IDateColumn) => React.ReactNode;
  translator?: (key: string, options?: any) => string;
};

class Calendar extends React.Component<CalendarProps, State> {
  state = { currentDate: getCurrentDate() };

  onPreviousClick = () => {
    const currentDate = previousMonth(this.state.currentDate);

    this.setState({ currentDate });
  };

  onNextClick = () => {
    const currentDate = nextMonth(this.state.currentDate);

    this.setState({ currentDate });
  };

  setCurrentDate = () => {
    this.setState({ currentDate: getCurrentDate() });
  };

  renderMiddleContent = () => {
    return (
      <Header>
        <HeaderWrapper>
          {renderButton({ icon: 'leftarrow', onClick: this.onPreviousClick })}
          {renderButton({ icon: 'rightarrow', onClick: this.onNextClick })}
          {renderButton({
            onClick: this.setCurrentDate,
            text: 'Today',
            btnStyle: 'primary'
          })}
        </HeaderWrapper>
      </Header>
    );
  };

  renderMonths = () => {
    const { currentDate } = this.state;
    const months = monthColumns(currentDate, 3);

    return months.map((date: IDateColumn, index: number) =>
      this.renderColumns(index, date)
    );
  };

  renderColumns(index: number, date: IDateColumn) {
    return (
      <Content key={index}>
        <ContentHeader>{getFullTitle(date)}</ContentHeader>
        {this.props.renderColumn(date)}
      </Content>
    );
  }

  render() {
    const { renderContent } = this.props;

    return <>{renderContent(this.renderMonths, this.renderMiddleContent)}</>;
  }
}

function renderButton(props: ItemButton) {
  const { text, translator, ...buttonProps } = props;

  return (
    <Item>
      <Button
        btnStyle="simple"
        translator={translator}
        size="small"
        {...buttonProps}
      >
        {text && translator ? translator(text) : text}
      </Button>
    </Item>
  );
}

export default Calendar;

import { RULE_CONDITIONS, VISITOR_AUDIENCE_RULES } from "./constants";
import React from "react";
import styled from "styled-components";
import styledTS from "styled-components-ts";
import Button from "../button";
import FormGroup from "../form/Group";
import ControlLabel from "../form/Label";
import FormControl from "../form/Control";
import colors from "../../styles/colors";
import dimensions from "../../styles/dimensions";

const FlexItem = styledTS<{
  count?: string;
  overflow?: string;
  v?: string;
  h?: string;
  direction?: string;
}>(styled.div)`
  display: flex;
  height: 100%;
  border-right: 1px solid ${colors.borderPrimary};
  flex: ${(props) => (props.count ? props.count : 1)};
  ${(props) => {
    if (props.overflow) {
      return `
        overflow: ${props.overflow};
      `;
    }
    return null;
  }};
  ${(props) => {
    if (props.v) {
      return `
        align-items: ${props.v};
      `;
    }
    return null;
  }};
  ${(props) => {
    if (props.h) {
      return `
        justify-content: ${props.h};
      `;
    }
    return null;
  }};
  ${(props) => {
    if (props.direction) {
      return `
        flex-direction: ${props.direction};
      `;
    }
    return null;
  }};

  &:last-of-type {
    border: none;
  }
`;

const FlexPad = styled(FlexItem)`
  padding: ${dimensions.coreSpacing}px;
  flex: 1;
  border-right: ${colors.borderPrimary};
  padding: ${dimensions.coreSpacing}px;
`;

const InlineForm = styled.div`
  display: flex;
  flex-direction: row;

  > *:not(:first-child) {
    margin-left: ${dimensions.unitSpacing}px;
  }
`;

export interface IConditionsRule {
  _id: string;
  kind?: string;
  text: string;
  condition: string;
  value: string;
}

const RuleDescription = styled.p`
  text-transform: initial;
`;

type ConditionsRuleProps = {
  rules: IConditionsRule[];
  onChange: (name: "rules", rules: IConditionsRule[]) => void;
};

type State = {
  rules: IConditionsRule[];
};

class ConditionsRule extends React.Component<ConditionsRuleProps, State> {
  constructor(props: ConditionsRuleProps) {
    super(props);

    this.state = {
      rules: this.props.rules || [],
    };
  }

  addRule = (e) => {
    const rules = this.state.rules;
    const selectedOption = e.target.options[e.target.selectedIndex];

    if (selectedOption.value) {
      rules.push({
        _id: Math.random().toString(),
        kind: selectedOption.value,
        text: selectedOption.text,
        condition: "",
        value: "",
      });

      this.setState({ rules });
    }
  };

  renderDescription(rule) {
    let description;
    switch (rule.kind) {
      case "browserLanguage":
        description =
          "Recognizes which language is set for visitor’s browser. Insert only Language codes in value field as appointed in ISO-639, i.e “en” for English, “fr” for French, “de” for German etc.";
        break;
      case "currentPageUrl":
        description =
          "Write your desired page URL, excluding domain name. For example: If you want to place your engagement message on https://office.erxes.io/pricing - then write /pricing";
        break;
      case "country":
        description =
          "Locates visitor’s physical location in country  resolution. Insert only Country codes in value field as appointed in ISO-3166 standard, i.e “gb” for Great Britain, “fr” for French, “de” for German, “jp” for Japanese etc.";
        break;
      case "city":
        description =
          "Locates visitor’s physical location in city resolution. Write a name of the City in value field. If Country’s not set, every city with same name will meet the criteria.";
        break;
      default:
        description = "Counts individual visitor’s visitting number.";
    }
    return description;
  }

  renderRule(rule) {
    const remove = () => {
      let rules = this.state.rules;

      rules = rules.filter((r) => r._id !== rule._id);

      this.setState({ rules });
      this.props.onChange("rules", rules);
    };

    const changeProp = (name, value) => {
      const rules = this.state.rules;

      // find current editing one
      const currentRule = rules.find((r) => r._id === rule._id);

      // set new value
      if (currentRule) {
        currentRule[name] = value;
      }

      this.setState({ rules });
      this.props.onChange("rules", rules);
    };

    const onChangeValue = (e) => {
      changeProp("value", e.target.value);
    };

    const onChangeCondition = (e) => {
      changeProp("condition", e.target.value);
    };

    return (
      <FormGroup key={rule._id}>
        <ControlLabel>
          {rule.text}
          <RuleDescription>{this.renderDescription(rule)}</RuleDescription>
        </ControlLabel>
        <InlineForm>
          <FormControl
            componentClass="select"
            defaultValue={rule.condition}
            onChange={onChangeCondition}
          >
            {RULE_CONDITIONS[rule.kind].map((cond, index) => (
              <option key={index} value={cond.value}>
                {cond.text}
              </option>
            ))}
          </FormControl>

          <FormControl
            type="text"
            value={rule.value}
            onChange={onChangeValue}
          />
          <Button
            size="small"
            onClick={remove}
            btnStyle="danger"
            icon="times"
          />
        </InlineForm>
      </FormGroup>
    );
  }

  render() {
    return (
      <FlexPad overflow="auto" direction="column">
        <FormGroup>
          <ControlLabel>Add rule</ControlLabel>
          <FormControl componentClass="select" onChange={this.addRule}>
            {VISITOR_AUDIENCE_RULES.map((rule, index) => (
              <option key={index} value={rule.value}>
                {rule.text}
              </option>
            ))}
          </FormControl>
        </FormGroup>

        <FormGroup>
          {this.state.rules.map((rule) => this.renderRule(rule))}
        </FormGroup>
      </FlexPad>
    );
  }
}

export default ConditionsRule;

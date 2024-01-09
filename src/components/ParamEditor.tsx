import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

// types

export interface Param {
  id: number;
  name: string;
  type: `string`;
}

interface ParamValue {
  paramId: number;
  value: string;
}

type Color = string;

export interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  model: Model;
}

type changeEventType = ChangeEvent<HTMLInputElement>;

// styles

const Form = styled.form`
  width: 600px;
  margin: 100px auto;
  padding: 40px;
  border-radius: 20px;
  border: 1px solid black;
`;

const InputItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  &:last-child {
    margin: 0;
  }
`;

const InputLabel = styled.label`
  width: 25%;
`;

const Input = styled.input`
  flex-grow: 1;
`;

class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      model: this.props.model,
    };
  }

  public getModel(): Model {
    return this.state.model;
  }

  handleChangeValue(event: changeEventType, id: number) {
    this.setState((prevState) => ({
      ...prevState,
      model: {
        ...prevState.model,
        paramValues: prevState.model.paramValues.map((param) => {
          if (param.paramId !== id) return param;

          return {
            ...param,
            value: event.target.value,
          };
        }),
      },
    }));
  }

  params = () => {
    return this.props.params.map((param) => {
      let modelParam = this.state.model.paramValues.find(
        (val) => param.id === val.paramId
      );
      return (
        <InputItem key={param.id}>
          <InputLabel>{param.name}</InputLabel>
          <Input
            type={param.type}
            value={modelParam?.value || ''}
            onChange={(e) => this.handleChangeValue(e, param.id)}
          />
        </InputItem>
      );
    });
  };

  render() {
    return <Form>{this.params()}</Form>;
  }
}

export default ParamEditor;

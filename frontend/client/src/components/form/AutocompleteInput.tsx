import * as React from 'react';
import * as Autosuggest from 'react-autosuggest';
import { url } from '../../util/index';
import { IConstraint, IError, IInputFetchHandler, IInputValueHandler } from '../../types/index';

import FieldFeedbackPanel from './FieldFeedbackPanel';

const NoConstraint: IConstraint = {
  message: '',
  validate: v => true
};

interface IAutocompleteProps {
  name: string;
  label: string;
  value: string;
  onFetch: IInputFetchHandler;
  onChange: IInputValueHandler;
  disabled: boolean;
};

interface IAutocompleteState {
  suggestions?: any[];
};

export default class AutocompleteInput extends React.Component<IAutocompleteProps, IAutocompleteState> {
  setState(arg0: { suggestions: any; }) {
    throw new Error('Method not implemented.');
  }
  state: { suggestions: any[]; };
  props: any;

  constructor(props: IAutocompleteProps) {
    super(props);
    const newLocal = this.state = {
      suggestions: []
    };
  }

  getSuggestionValue(suggestion: any) {
    return suggestion;
  }

  renderSuggestion(suggestion: React.ReactNode) {
    return (
      <span>{suggestion}</span>
    );
  }

  onSuggestionsFetchRequested = ({ value }) => {
    console.log('fetch value: ' + value);
    this.props.onFetch(value, (data) => {
      this.setState({
        suggestions: data
      });
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onChange = (event: any, { newValue, method }: any) => {
    this.props.onChange(newValue);
  };

  render() {
    const { suggestions } = this.state;
    const value = this.props.value;
    const inputProps = {
      placeholder: '',
      value,
      onChange: this.onChange
    };
    const cssGroup = `form-group`;
    return (
        <div className={cssGroup}>
          <label className='col-sm-2 control-label'>{this.props.label}</label>
          <div className={this.props.disabled ? 'disable-form-control col-sm-10' : 'col-sm-10' }>
            <Autosuggest
                className='form-control'
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps} />
            </div>
        </div>
      );
  };
}

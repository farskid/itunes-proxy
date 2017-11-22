import React from 'react';
import PropTypes from 'prop-types';

// Components
import { Form, FormGroup, Label, Input } from 'reactstrap';
import Button from '../Button/Button';
import List from '../List/List';

// Constants
import { MEDIATYPES, ENTITIES_MEDIATYPES } from '../../constants';

class SearchForm extends React.Component {
  constructor() {
    super();
    this.state = {
      searchTerm: '',
      media: 'all',
      entities: [],
      entity: 'all'
    };

    // Bindings
    this.onSubmit = this.onSubmit.bind(this);
    this.search = this.search.bind(this);
    this.setFormValueToState = this.setFormValueToState.bind(this);
    this.setupEntityFromMedia = this.setupEntityFromMedia.bind(this);
  }
  componentDidMount() {
    this.setupEntityFromMedia(this.state.media);
  }
  onSubmit(evt) {
    evt.preventDefault();
    this.search();
  }
  setupEntityFromMedia(media) {
    this.setState({
      entities: ENTITIES_MEDIATYPES[media],
      entity: ENTITIES_MEDIATYPES[media][0]
    });
  }
  setFormValueToState(key, value) {
    this.setState({
      [key]: value
    });
  }
  search() {
    const { searchTerm, media, entity } = this.state;
    this.props.search(searchTerm, media, entity);
  }

  render() {
    return (
      <div className="search">
        <Form className="ui-form" action="#" onSubmit={this.onSubmit}>
          <FormGroup>
            <Label for="search_term">Search Term</Label>
            <Input
              type="text"
              id="search_term"
              placeholder="e.g: James Blunt"
              value={this.state.searchTerm}
              onChange={e => {
                this.setFormValueToState('searchTerm', e.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="media">Media</Label>
            <Input
              onChange={e => {
                this.setFormValueToState(
                  'media',
                  e.target.options[e.target.selectedIndex].value
                );
                this.setupEntityFromMedia(e.target.value);
              }}
              value={this.state.media}
              type="select"
              id="media"
            >
              {Object.values(MEDIATYPES).map(media => (
                <option key={media} value={media}>
                  {media}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="entity">Entity</Label>
            <Input
              onChange={e =>
                this.setFormValueToState(
                  'entity',
                  e.target.options[e.target.selectedIndex].value
                )}
              value={this.state.entity}
              type="select"
              id="entity"
            >
              {this.state.entities.map(ent => (
                <option key={ent} value={ent}>
                  {ent}
                </option>
              ))}
            </Input>
          </FormGroup>
          <Button
            loading={this.props.loading}
            loadingContent="Searching..."
            disabled={!this.state.searchTerm || this.props.loading}
            type="submit"
            color="primary"
          >
            Search
          </Button>
        </Form>
        <List {...this.props} />
      </div>
    );
  }
}

export default SearchForm;

SearchForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  search: PropTypes.func.isRequired
};

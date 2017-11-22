import React from 'react';
import PropTypes from 'prop-types';

// Components
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import Button from '../Button/Button';
import List from '../List/List';

// Constants
import { MEDIATYPES, ENTITIES_MEDIATYPES } from '../../constants';

class LookupForm extends React.Component {
  constructor() {
    super();
    this.state = {
      id: '',
      media: 'all',
      entities: [],
      entity: 'all',
      type: 'id'
    };

    // Bindings
    this.onSubmit = this.onSubmit.bind(this);
    this.lookup = this.lookup.bind(this);
    this.setFormValueToState = this.setFormValueToState.bind(this);
    this.setupEntityFromMedia = this.setupEntityFromMedia.bind(this);
  }

  componentDidMount() {
    this.setupEntityFromMedia(this.state.media);
  }
  onSubmit(evt) {
    evt.preventDefault();
    this.lookup();
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
  lookup() {
    const { id, media, entity, type } = this.state;
    this.props.lookup(id, media, entity, type);
  }

  render() {
    return (
      <div className="lookup">
        <Form className="ui-form" action="#" onSubmit={this.onSubmit}>
          <FormGroup>
            <Label for="id_lookup">ID</Label>
            <Input
              type="text"
              id="id_lookup"
              placeholder="single such as 564 or multiple such as 12,23,44"
              defaultValue={this.props.id}
              value={this.state.id}
              onChange={e => {
                this.setFormValueToState('id', e.target.value);
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
          <FormGroup check disabled>
            <Row>
              <Col xs="auto">
                <Label check>
                  <Input
                    checked={this.state.type === 'id'}
                    onChange={() => this.setFormValueToState('type', 'id')}
                    type="radio"
                    name="id-type"
                  />{' '}
                  iTunes (artist) ID
                </Label>
              </Col>
              <Col xs="auto">
                <Label check style={{ marginLeft: 10 }}>
                  <Input
                    checked={this.state.type === 'amgArtistId'}
                    onChange={() =>
                      this.setFormValueToState('type', 'amgArtistId')}
                    type="radio"
                    name="id-type"
                  />{' '}
                  AMG artist ID
                </Label>
              </Col>
              <Col xs="auto">
                <Label check style={{ marginLeft: 10 }}>
                  <Input
                    checked={this.state.type === 'UPC'}
                    onChange={() => this.setFormValueToState('type', 'UPC')}
                    type="radio"
                    name="id-type"
                  />{' '}
                  UPC
                </Label>
              </Col>
              <Col xs="auto">
                <Label check style={{ marginLeft: 10 }}>
                  <Input
                    checked={this.state.type === 'amgAlbumId'}
                    onChange={() =>
                      this.setFormValueToState('type', 'amgAlbumId')}
                    type="radio"
                    name="id-type"
                  />{' '}
                  AMG album ID
                </Label>
              </Col>
              <Col xs="auto">
                <Label check style={{ marginLeft: 10 }}>
                  <Input
                    checked={this.state.type === 'amgVideoId'}
                    onChange={() =>
                      this.setFormValueToState('type', 'amgVideoId')}
                    type="radio"
                    name="id-type"
                  />{' '}
                  AMG video ID
                </Label>
              </Col>
              <Col xs="auto">
                <Label check style={{ marginLeft: 10 }}>
                  <Input
                    checked={this.state.type === 'ISBN'}
                    onChange={() => this.setFormValueToState('type', 'ISBN')}
                    type="radio"
                    name="id-type"
                  />{' '}
                  ISBN
                </Label>
              </Col>
            </Row>
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
            disabled={!this.state.id || this.props.loading}
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

export default LookupForm;

LookupForm.propTypes = {
  id: PropTypes.string,
  loading: PropTypes.bool,
  lookup: PropTypes.func
};

LookupForm.defaultProps = {
  id: '',
  loading: false,
  lookup: () => {}
};

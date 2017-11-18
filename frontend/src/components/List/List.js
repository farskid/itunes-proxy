import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

// Components
import {
  Card,
  CardTitle,
  CardBody,
  CardSubtitle,
  CardFooter
} from 'reactstrap';
import LazyAudio from '../LazyAudio/LazyAudio';
import Time from '../Time/Time';
import Date from '../Date/Date';

const List = ({
  items,
  emptyText = 'No Results',
  loading = false,
  loadingText = 'Loading...'
}) => {
  if (!items) {
    return null;
  }

  if (!Array.isArray(items)) {
    throw new Error('<List /> expecets items property of type Array.');
  }

  if (loading) {
    return <p className="list-indicator">{loadingText}</p>;
  }

  if (!items.length) {
    return <p className="list-indicator">{emptyText}</p>;
  }

  return (
    <ul className="ui-list">
      {items.map(item => (
        <li className="list-item" key={uuid.v4()}>
          <Card>
            <CardBody>
              <CardTitle className="list-item__title text-ellipsis text-primary">
                {item.trackName}
                {item.collectionName}
              </CardTitle>
              <CardSubtitle className="list-item__subtitle  text-ellipsis">
                <strong>{item.artistName}</strong>{' '}
                <div>
                  <small>
                    {item.trackPrice}
                    {item.collectionPrice}
                    {item.price} {item.currency}
                  </small>
                </div>
              </CardSubtitle>
            </CardBody>
            <CardBody>
              <div className="list-item__info">
                <p>
                  {item.trackTimeMillis && 'Duration'}
                  <span className="value">
                    {item.trackTimeMillis && (
                      <Time divider=":" milliseconds={item.trackTimeMillis} />
                    )}
                  </span>
                </p>
                <p>
                  {item.trackCount && 'Tracks'}{' '}
                  <span className="value">
                    {item.trackCount && item.trackCount}
                  </span>
                </p>
                {item.releaseDate ? (
                  <p>
                    Released:{' '}
                    <span className="value">
                      <Date
                        dateString={item.releaseDate}
                        format="DD MMM, YYYY"
                      />
                    </span>
                  </p>
                ) : (
                  ''
                )}
                {item.primaryGenreName ? (
                  <p>
                    Genre:{' '}
                    <span className="value">{item.primaryGenreName}</span>
                  </p>
                ) : (
                  ''
                )}
              </div>
            </CardBody>
            {item.previewUrl && (
              <CardFooter className="list-item__footer">
                {item.previewUrl ? <LazyAudio src={item.previewUrl} /> : ''}
              </CardFooter>
            )}
          </Card>
        </li>
      ))}
    </ul>
  );
};

export default List;

List.propTypes = {
  items: PropTypes.array,
  emptyText: PropTypes.string,
  loading: PropTypes.bool,
  loadingText: PropTypes.string
};

List.defaultProps = {
  items: null,
  emptyText: 'No Results',
  loading: false,
  loadingText: 'Loading...'
};

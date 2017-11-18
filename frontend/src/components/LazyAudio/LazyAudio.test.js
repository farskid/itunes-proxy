import React from 'react';
import { shallow } from 'enzyme';
import LazyAudio from './LazyAudio';

let src;

beforeAll(() => {
  src = 'http://wavy.audio/wp-content/uploads/2017/11/LANDR-WavyNov.mp3?_=1';
});

afterAll(() => {
  src = null;
});

describe('<LazyAudio />', () => {
  it('not activated by default', () => {
    const audio = shallow(<LazyAudio src={src} />);
    expect(audio.state().activated).toBe(false);
  });

  it('should render a button when not activated', () => {
    const audio = shallow(<LazyAudio src={src} />);
    expect(audio.html()).toBe(
      '<div class="ui-audio"><button type="button" class="btn btn-secondary">Play</button></div>'
    );
  });
});

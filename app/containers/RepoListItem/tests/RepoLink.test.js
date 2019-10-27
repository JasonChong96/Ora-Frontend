import 'jest-styled-components';
import React from 'react';
import renderer from 'react-test-renderer';
import { render } from 'react-testing-library';
import RepoLink from '../RepoLink';

describe('<RepoLink />', () => {
  it('should match the snapshot', () => {
    const renderedComponent = renderer.create(<RepoLink />).toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should have a className attribute', () => {
    const { container } = render(<RepoLink />);
    expect(container.firstChild.hasAttribute('class')).toBe(true);
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const { container } = render(<RepoLink id={id} />);
    expect(container.firstChild.hasAttribute('id')).toBe(true);
    expect(container.firstChild.id).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const { container } = render(<RepoLink attribute="test" />);
    expect(container.firstChild.hasAttribute('attribute')).toBe(false);
  });
});
